// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, students_progress } from '@prisma/client'
import formidable from 'formidable'
import { uploadFile } from '../../../utils/S3Helpers'
import { fileTypeFromBuffer } from 'file-type'
import { Writable } from 'stream'

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
      where: {
        id: fields.id[0],
      },
    })

    try {
      const response = await uploadFile(files.files[0], student?.nik, 'contract')
      if (response == 'Failed Upload') {
        throw 'Failed Upload'
      }

      const attachments = await prisma.student_attachments.create({
        data: {
          file_name: response.path,
          file_url: response.url,
          student_id: fields.id[0],
        },
      })

      await prisma.students.update({
        where: {
          id: fields.id[0],
        },
        data: {
          progress: students_progress['success'],
        },
      })

      return res.status(200).json({ data: attachments })
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
