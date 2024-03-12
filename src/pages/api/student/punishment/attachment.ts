// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import formidable from 'formidable'
import { uploadFile } from '../../../../utils/S3Helpers'
import { getPunishmentFiles } from '../../../../utils/helpers'

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

    const punishmentAttachment = getPunishmentFiles(
      student?.student_attachments ? student?.student_attachments : []
    )

    try {
      const response = await uploadFile(
        files.files[0],
        student?.nik,
        fields.type,
        punishmentAttachment[0]?.file_name
      )
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

      return res.status(200).json({ msg: 'upload success' })
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
