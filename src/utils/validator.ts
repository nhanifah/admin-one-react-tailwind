import { z } from 'zod'

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
        return schema.option.length > 0
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
