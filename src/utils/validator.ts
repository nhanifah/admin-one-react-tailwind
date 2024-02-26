import { z } from 'zod'

const studentSchema = z.object({
  id: z.string(),
})

export const broadcastSchema = z.object({
  students: z
    .string()
    .array()
    .nonempty({ message: 'Minimal memilih 1 siswa untuk mengirim pesan broadcast!' }),
  message: z
    .string({ required_error: 'Pesan broadcast tidak boleh kosong!' })
    .refine((value) => value.length > 0, { message: 'Pesan broadcast tidak boleh kosong!' }),
})

export const studentProgressSchema = z.object({
  selectedStudentsId: z
    .string()
    .array()
    .nonempty({ message: 'Pilih siswa yang ingin diupdate progressnya' }),
  progress: z
    .string({ required_error: 'Harus memilih progress' })
    .refine((value) => value.length > 0, { message: 'Harus memilih progress' }),
})

export const answerCheckedSchema = z.object({
  answers: z.array(
    z.object({
      checked: z.custom((data) => data, { message: 'Masih ada yang belum dicek' }),
    })
  ),
})

export const batchSchema = z.object({
  batch_name: z
    .string({
      required_error: 'Nama batch harus diisi',
    })
    .refine((value) => value.length > 0, { message: 'Nama batch harus diisi' }),
  quota: z
    .string()
    .or(z.number())
    .refine((value) => parseInt(String(value)) > 0, { message: 'Quota tidak boleh 0' }),
  end_date: z
    .string({
      required_error: 'Tanggal penutupan batch harus diisi',
    })
    .refine((value) => value.length > 0, { message: 'Tanggal penutupan batch harus diisi' }),
})

export const questionSchema = z
  .object({
    questionType: z.string(),
    question: z.string().min(1, { message: 'Pertanyaan harus diisi' }),
    option: z.string().array().optional(),
    point: z
      .string()
      .or(z.number())
      .refine(
        (value) => {
          const pattern = /^\d+$/
          return pattern.test(String(value))
        },
        { message: 'Point harus angka' }
      )
      .refine((value) => parseInt(String(value)) > 0, { message: 'Point soal tidak boleh 0' }),
    answerSelected: z.string().optional(),
  })
  .refine(
    (schema) => {
      if (schema.questionType == 'multipleChoice') {
        if (schema.option) {
          return schema?.option?.length > 0
        }
      } else {
        return true
      }
    },
    {
      message: 'Pilihan jawaban belum ditambahkan',
    }
  )
  .refine(
    (schema) => {
      if (schema.questionType == 'multipleChoice') {
        return schema.answerSelected != ''
      } else {
        return true
      }
    },
    {
      message: 'Belum memilih jawaban yang benar',
    }
  )
