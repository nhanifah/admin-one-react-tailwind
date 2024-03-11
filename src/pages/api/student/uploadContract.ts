// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, students_progress } from '@prisma/client'
import formidable from 'formidable'
import { uploadFile } from '../../../utils/S3Helpers'
import { getContractFiles, getTranskripFiles } from '../../../utils/helpers'

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const form = formidable({})

    const [fields, files]: any = await form.parse(req)

    const student = await prisma.students.findUnique({
      include: {
        student_attachments: true,
      },
      where: {
        id: fields.id[0],
      },
    })

    const contract_attachments = getContractFiles(
      student?.student_attachments ? student?.student_attachments : []
    )

    try {
      const response = await uploadFile(
        files.files[0],
        student?.nik,
        'contract',
        contract_attachments[0]?.file_name
      )
      if (response == 'Failed Upload') {
        throw 'Failed Upload'
      }

      if (contract_attachments.length == 0) {
        const attachments = await prisma.student_attachments.create({
          data: {
            file_name: response.path,
            file_url: response.url,
            student_id: fields.id[0],
          },
        })
      } else {
        const attachments = await prisma.student_attachments.updateMany({
          where: {
            file_name: contract_attachments[0].file_name,
          },
          data: {
            uploaded_at: new Date(),
          },
        })
      }

      await prisma.students.update({
        where: {
          id: fields.id[0],
        },
        data: {
          progress: students_progress['success'],
        },
      })

      return res.status(200).json({ msg: 'upload success' })
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
