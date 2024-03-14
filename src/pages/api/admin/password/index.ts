import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcrypt'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'PUT') {
    const body = req.body

    const admin = await prisma.admins.findFirst({
      where: {
        email: body.email,
      },
    })

    const isPasswordCorrect = await compare(body.currentPassword, admin?.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'Password salah!' })
    }

    try {
      const updatedAdmin = await prisma.admins.updateMany({
        where: {
          email: body.email,
        },
        data: {
          password: await hash(body.newPassword, 10),
        },
      })

      return res.status(200).json({ msg: 'Update success' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }
}
