import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, cbt_questions_type } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const batch = await prisma.batch_registration.findMany({
      include: {
        interview_schedule: true,
      },
    })

    return res.status(200).json({ data: batch })
  } else if (req.method == 'POST') {
    const body = req.body

    try {
      const batch = await prisma.batch_registration.createMany({
        data: [
          {
            batch_name: body.batch_name,
            quota: body.quota,
            end_date: new Date(body.end_date),
          },
        ],
      })
      return res.status(200).json({ data: batch })
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
