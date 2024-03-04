import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, cbt_questions_type } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const { id }: any = req.query
    const interview = await prisma.interview_schedule.findUnique({
      where: {
        id: id,
      },
      include: {
        students: {
          include: {
            student_attachments: true,
          },
        },
      },
    })

    return res.status(200).json({ data: interview })
  } else if (req.method == 'PUT') {
    const body = req.body
    const { id }: any = req.query
    try {
      const interview_date = new Date(body.interview_date)
      interview_date.setHours(interview_date.getHours() + 7)

      const interview = await prisma.interview_schedule.update({
        where: {
          id: id,
        },
        data: {
          interview_date: interview_date,
          interview_location: body.interview_location,
        },
      })

      return res.status(200).json({ data: interview })
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
