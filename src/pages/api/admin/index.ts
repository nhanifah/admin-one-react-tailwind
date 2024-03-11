import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'PUT') {
    const body = req.body

    try {
      const admin = await prisma.admins.updateMany({
        where: {
          email: body.oldEmail,
        },
        data: {
          name: body.name,
          email: body.email,
        },
      })

      return res.status(200).json({ msg: 'Update success' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }
}
