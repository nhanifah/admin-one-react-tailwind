import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    // return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method == 'GET') {
    // join relation with batch_registration & master_referral
    const { progress } = req.query
    if (progress == 'success') {
      const students = await prisma.students.findMany({
        where: {
          progress: {
            in: ['success', 'blocked', 'blacklist', 'hold'],
          },
        },
        include: {
          batch_registration: true,
          master_referral: true,
          student_attachments: true,
        },
      })
      return res.status(200).json({ data: students })
    } else if (progress == 'dataSiswa') {
      const students = await prisma.students.findMany({
        where: {
          progress: {
            in: ['success'],
          },
        },
        include: {
          batch_registration: true,
          master_referral: true,
          student_attachments: true,
        },
      })
      return res.status(200).json({ data: students })
    } else {
      const students = await prisma.students.findMany({
        where: {
          progress: {
            in: ['registering', 'psychotest', 'assessment', 'qualified', 'payment'],
          },
        },
        include: {
          batch_registration: true,
          master_referral: true,
          student_attachments: true,
        },
      })
      return res.status(200).json({ data: students })
    }
  }
}
