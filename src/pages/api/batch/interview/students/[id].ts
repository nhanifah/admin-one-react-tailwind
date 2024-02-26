import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const { id } = req.query

    const students = await prisma.students.findMany({
      where: {
        interview_id: id,
      },
    })
    // const interview = await prisma.interview_schedule.findFirst({
    //   where: {
    //     id: {
    //       equals: id,
    //     },
    //   },
    //   include: {
    //     batch_registration: true,
    //     students: true,
    //   },
    //   orderBy: [
    //     {
    //       interview_date: 'asc',
    //     },
    //     {
    //       batch_registration: {
    //         batch_name: 'asc',
    //       },
    //     },
    //   ],
    // })

    return res.status(200).json(students)
  }
}
