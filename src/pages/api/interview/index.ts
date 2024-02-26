import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, cbt_questions_type } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const body = req.body

    try {
      const interview_date = new Date(body.interview_date)
      interview_date.setHours(interview_date.getHours() + 7)
      const interview = await prisma.interview_schedule.createMany({
        data: [
          {
            batch_id: body.batch_id,
            interview_location: body.interview_location,
            interview_date: interview_date,
          },
        ],
      })

      return res.status(200).json({ data: interview })
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
