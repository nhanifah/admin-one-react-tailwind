import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'PUT') {
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
  } else if (req.method == 'GET') {
    const data = await prisma.batch_registration.findMany()

    return res.status(400).json(data)
  }
}
