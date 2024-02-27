import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, cbt_questions_type } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const { id }: any = req.query
    const batch = await prisma.batch_registration.findMany({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        students: {
          include: {
            student_attachments: true,
          },
        },
      },
    })

    batch[0].students = batch[0].students.map((item, index) => {
      return {
        ...item,
        checked: false,
      }
    })

    return res.status(200).json({ data: batch })
  } else if (req.method == 'PUT') {
    const body = await req.body
    const { id }: any = req.query
    try {
      const batch = await prisma.batch_registration.update({
        where: {
          id: id,
        },
        data: {
          batch_name: body.batch_name,
          quota: body.quota,
          end_date: new Date(body.end_date),
        },
      })

      return res.status(200).json({ data: batch })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Update Failed', data: error })
    }
  }
}
