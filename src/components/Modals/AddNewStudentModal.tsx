'use client'

import { Field, Form, Formik } from 'formik'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import React, { useRef } from 'react'
import { closeStudentAddModal } from '../../stores/batchSlice'
import Divider from '../Divider'
import { mdiBookEducation, mdiIdCard, mdiMail, mdiBriefcase, mdiWhatsapp, mdiAccount } from '@mdi/js'
import { useStudentClients } from '../../hooks/requestData'
import toast from 'react-hot-toast'
import { studentSchema } from '../../utils/validator'

export default function AddNewStudentModal() {
    const { updateData } = useStudentClients('dataSiswa')
    const studentAddModal = useAppSelector((state) => state.batch.studentAddModal)
    const dispatch = useAppDispatch()
    const formRef = useRef<any>()

    const handleModalAction = async (values) => {
        // console.log(values)
        const payload = {
            id: values.id,
            full_name: values.full_name,
            birthdate: values.birthdate,
            nik: values.nik,
            whatsapp_number: values.whatsapp_number,
            email: values.email,
            last_education: values.last_education,
            work_now: values.work_now,
            province: values.province,
            city: values.city,
            subdistrict: values.subdistrict,
            village: values.village,
            address_detail: values.address_detail,
            guardian_name: values.guardian_name,
            guardian_phone: values.guardian_phone,
        }

        // validate payload
        try {
            studentSchema.parse(payload)
        } catch (error) {
            toast.error(error.errors[0].message)
            return
        }


        try {
            const { status, data } = await updateData(payload)
            data
            if (status === 200) {
                toast.success('Data siswa berhasil ditambahkan')
                dispatch(closeStudentAddModal())
            } else {
                toast.error('Data siswa gagal ditambahkan')
            }
        } catch (error) {
            toast.error('Data siswa gagal ditambahkan')
            console.log(error)
        }
        // dispatch(closeStudentAddModal())
    }

    const closeModalAction = () => {
        dispatch(closeStudentAddModal())
    }

    return (
        <CardBoxModal
            title="Ubah Biodata Siswa"
            buttonColor="success"
            buttonLabel="Simpan"
            isActive={studentAddModal}
            onConfirm={() => formRef.current?.submitForm()}
            onCancel={closeModalAction}
        >
            <Formik
                initialValues={{
                }}
                innerRef={formRef}
                onSubmit={handleModalAction}
            >
                <Form>
                    <FormField label="Nama Lengkap" labelFor="full_name" icons={[mdiAccount]}>
                        <Field name="full_name" placeholder="Nama Lengkap" id="full_name" autoFocus />
                    </FormField>

                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="Tanggal Lahir">
                            <Field name="birthdate" type="date" />
                        </FormField>
                        <FormField label="NIK" icons={[mdiIdCard]}>
                            <Field name="nik" placeholder="nik" type="number" />
                        </FormField>
                    </div>

                    <FormField label="Jenis Kelamin" labelFor="gender" icons={[mdiAccount]}>
                        <Field as="select" name="gender" placeholder="Nama Lengkap" id="gender">
                            <option selected disabled>Pilih Jenis Kelamin</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </Field>
                    </FormField>

                    <FormField label="Bidang kerja" labelFor="want_to_work" icons={[mdiAccount]}>
                        <Field as="select" name="want_to_work" id="want_to_work">
                            <option selected disabled>Pilih Jenis Kerja</option>
                            <option value="food">Food</option>
                            <option value="nurse">Nurse</option>
                            <option value="other">Other</option>
                        </Field>
                    </FormField>

                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="Kontak" icons={[mdiWhatsapp]}>
                            <Field name="whatsapp_number" placeholder="Whatsapp" />
                        </FormField>
                        <FormField label="Email" icons={[mdiMail]}>
                            <Field type="email" name="email" placeholder="Email" />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="Pendidikan Terakhir" icons={[mdiBookEducation]}>
                            <Field name="last_education" placeholder="Pendidikan terakhir" />
                        </FormField>
                        <FormField label="Pekerjaan Sekarang" icons={[mdiBriefcase]}>
                            <Field name="work_now" placeholder="Pekerjaan sekarang" />
                        </FormField>
                    </div>

                    <Divider />

                    <FormField label="Domisili" labelFor="address">
                        <Field name="province" placeholder="Provinsi" id="province" />
                    </FormField>
                    <FormField labelFor="address">
                        <Field name="city" placeholder="Kota / Kabupaten" id="city" />
                    </FormField>
                    <FormField labelFor="address">
                        <Field name="subdistrict" placeholder="Kecamatan" id="subdistrict" />
                    </FormField>

                    <FormField>
                        <Field name="village" placeholder="Kelurahan / Desa" id="village" />
                    </FormField>

                    <FormField label="Alamat Lengkap" hasTextareaHeight>
                        <Field
                            name="address_detail"
                            as="textarea"
                            placeholder="Alamat Lengkap"

                        />
                    </FormField>
                    <Divider />

                    <FormField label="Biodata Orangtua" icons={[mdiMail, mdiWhatsapp]}>
                        <Field name="guardian_name" placeholder="Nama Orangtua" />
                        <Field name="guardian_phone" placeholder="Whatsapp Orangtua" />
                    </FormField>
                </Form>
            </Formik>
        </CardBoxModal>
    )
}
