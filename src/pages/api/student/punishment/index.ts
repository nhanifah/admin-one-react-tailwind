// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const body = req.body

    try {
      const start_date = new Date(body.start_date)
      start_date.setHours(start_date.getHours() + 7)
      const end_date = new Date(body.end_date)
      end_date.setHours(end_date.getHours() + 7)
      const response = await prisma.student_punishments.create({
        data: {
          student_id: body.student_id,
          punishment_type: body.type,
          description: body.description,
          start_date,
          end_date,
        },
      })

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
