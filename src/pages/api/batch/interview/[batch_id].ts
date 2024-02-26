import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const { batch_id } = req.query
    const interview = await prisma.interview_schedule.findMany({
      where: {
        batch_id: {
          equals: batch_id,
        },
      },
      include: {
        batch_registration: true,
        students: true,
      },
      orderBy: [
        {
          interview_date: 'asc',
        },
        {
          batch_registration: {
            batch_name: 'asc',
          },
        },
      ],
    })

    return res.status(200).json({ data: interview })
  } else if (req.method == 'PUT') {
    const body = await req.body
    try {
      const students = await prisma.students.updateMany({
        where: {
          id: {
            in: body.selectedStudentsId,
          },
        },
        data: {
          interview_id: body.schedule,
        },
      })
      return res.status(200).json({ data: students })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Terjadi kesalahan' })
    }
  }
}
