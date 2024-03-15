// crud student
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt"
import { Formidable } from "formidable";
import xlsx from 'xlsx';

const prisma = new PrismaClient({ log: ['query', 'error'] })

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getToken({ req })

    if (!session) {
        // return res.status(401).json({ message: 'Unauthorized' })
    }

    if (req.method == 'GET') {
        return res.status(200).json({ data: 'hello' })
    } else if (req.method == 'POST') {
        interface DataItem {
            [key: string]: string | number | null; // Sesuaikan dengan jenis data sesungguhnya dari properti
        }
        try {
            const form = new Formidable();
        
            const [fields, files] = await form.parse(req);
            fields; // Tidak digunakan, tetapi tetap diperlukan agar tidak ada warning
            // Pastikan ada file yang diunggah
            if (!files || !files.file || !files.file[0] || !files.file[0].filepath) {
                throw new Error('Tidak ada file yang diunggah atau path file tidak ditemukan.');
            }
        
            const workbook = xlsx.readFile(files.file[0].filepath);
            const sheet_name_list = workbook.SheetNames;
            const xlData: DataItem[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        
            // Ubah kunci agar sesuai dengan basis data
            const newKey = {
                'Gender': 'gender',
                'WhatsApp': 'whatsapp_number',
                'Email': 'email',
                'NIK': 'nik',
                'Provinsi': 'province',
                'Kota': 'city',
                'Kecamatan': 'subdistrict',
                'Desa / Kelurahan': 'village',
                'Alamat Detail': 'address_detail',
                'Pendidikan Terakhir': 'last_education',
                'Pekerjaan sekarang': 'work_now',
                'Ingin bekerja dibidang': 'want_to_work',
                'Batch Belajar': 'process_batch',
                'Asrama': 'dormitory',
                'Mencicil': 'installment',
                'Referral': 'process_referral',
                'Tanggal lahir': 'process_birthdate',
                'Nama Orangtua / wali': 'guardian_name',
                'Nomor telepon Orangtua / wali': 'guardian_phone',
                'Progress': 'progress',
                'Nama Lengkap': 'full_name',
            }
        
            xlData.forEach((item: DataItem) => {
                Object.keys(item).forEach((key) => {
                    if (newKey[key]) {
                        item[newKey[key]] = item[key];
                        delete item[key];
                    }
                });
            });
        
            // Proses data dan ambil batch_id untuk setiap item
            const batchIdPromises = xlData.map(async (item: DataItem) => {
                if (typeof item.dormitory === 'string') {
                    item.dormitory = item.dormitory.toLowerCase() === 'ya' ? 'yes' : 'no';
                }
                if (typeof item.installment === 'string') {
                    item.installment = item.installment.toLowerCase() === 'ya' ? 'yes' : 'no';
                }
                // Konversi tipe item.process_batch menjadi string
                if (typeof item.process_batch === 'number' && item.process_batch !== null) {
                    item.process_batch = item.process_batch.toString();
                }
                if (item.process_referral !== undefined && item.process_referral !== null) {
                    item.process_referral = item.process_referral.toString();
                }
                if (item.birthdate !== undefined && item.birthdate !== null) {
                    item.birthdate = item.birthdate.toString();
                }
                if (item.progress !== undefined && item.progress !== null) {
                    item.progress = item.progress.toString();
                }
                if (item.want_to_work !== undefined && item.want_to_work !== null) {
                    item.want_to_work = item.want_to_work.toString();
                }
                if (item.whatsapp_number !== undefined && item.whatsapp_number !== null) {
                    item.whatsapp_number = item.whatsapp_number.toString();
                }
                if (item.guardian_phone !== undefined && item.guardian_phone !== null) {
                    item.guardian_phone = item.guardian_phone.toString();
                }
                if (item.nik !== undefined && item.nik !== null) {
                    item.nik = item.nik.toString();
                }
                if (item.process_birthdate !== undefined && item.process_birthdate !== null) {
                    item.process_birthdate = item.process_birthdate.toString();
                }
                if (item.full_name !== undefined && item.full_name !== null) {
                    item.full_name = item.full_name.toString();
                } else {
                    item.full_name = '';
                }

                // Dapatkan batch id dari database
                const batch = await prisma.batch_registration.findFirst({
                    where: {
                        batch_name: item.process_batch
                    }
                });

                // Dapakan referral id dari database
                const referral = await prisma.master_referral.findFirst({
                    where: {
                        name: item.process_referral
                    }
                });

                // Format ulang tanggal lahir dari mm-dd-yyyy menjadi yyyy-mm-dd
                if (item.process_birthdate) {
                    const [month, day, year] = item.process_birthdate.split('-');
                    item.birthdate = Date.parse(`${year}-${month}-${day}`);
                }

                // Mengecilkan semua huruf pada progress, want_to_work
                if (item.progress) {
                    item.progress = item.progress.toLowerCase();
                }

                if (item.want_to_work) {
                    item.want_to_work = item.want_to_work.toLowerCase();
                }

                // Hapus properti process_batch dari item
                delete item.process_batch;
                delete item.process_referral;
                delete item.process_birthdate;
        
                return { ...item, batch_id: batch ? batch.id : null, referral_id: referral ? referral.id : null, full_name: item.full_name };
            });
        
            const xlDataWithBatchIds = await Promise.all(batchIdPromises);

            // simpan data ke database
            await prisma.students.createMany({
                data: xlDataWithBatchIds,
                skipDuplicates: true,
            });
        
            // console.log('Data berhasil diimpor:', xlDataWithBatchIds);
        
            return res.status(200).json({ status: 'success', message: 'Data berhasil diimport' });
        } catch (error) {
            console.error('Terjadi kesalahan saat memproses data:', error);
            return res.status(500).json({ status: 'error', message: 'Terjadi kesalahan saat memproses data.', error: error.message});
        }
        
    } else if (req.method == 'DELETE') {
        const body = await req.body
        console.log('id:', body.id)

        try {
            await prisma.students.delete({
                where: {
                    id: body.id,
                },
            })

            return res.status(200).json({ message: 'delete success' })
        } catch (error) {
            return res.status(400).json({ message: 'delete failed' })
        }
    }
}
