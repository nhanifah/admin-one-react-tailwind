// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from '@prisma/client'
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const student = await prisma.students.findMany()

  res.status(200).json(student)
}
