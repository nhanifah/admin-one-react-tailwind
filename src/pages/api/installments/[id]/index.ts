import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'PUT') {
    const { id }: any = req.query

    try {
      const installment = await prisma.installments.update({
        where: {
          id: id,
        },
        data: {
          payment_date: new Date(),
        },
      })

      return res.status(200).json(installment)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
