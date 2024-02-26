import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, cbt_questions_type } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const { id } = req.query
    const batch = await prisma.batch_registration.findMany({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        students: true,
      },
    })

    batch[0].students = batch[0].students.map((item, index) => {
      return {
        ...item,
        checked: false,
      }
    })

    return res.status(200).json({ data: batch })
  }
}
