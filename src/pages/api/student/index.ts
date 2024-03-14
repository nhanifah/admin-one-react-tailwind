// crud student
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getToken({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
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
  } else if (req.method == 'PUT') {
    const body = await req.body

    try {
      const student = await prisma.students.update({
        where: {
          id: body.id,
        },
        data: {
          full_name: body.full_name,
          whatsapp_number: body.whatsapp_number,
          email: body.email,
          nik: body.nik,
          province: body.province,
          city: body.city,
          subdistrict: body.subdistrict,
          village: body.village,
          address_detail: body.address_detail,
          batch_id: body.batch_id,
          interview_schedule: body.interview_schedule,
          dormitory: body.dormitory,
          guardian_name: body.guardian_name,
          guardian_phone: body.guardian_phone,
          progress: body.progress,
        },
      })

      return res.status(200).json(student)
    } catch (error) {
      return res.status(400).json(error)
    }
  } else if (req.method == 'DELETE') {
    const body = await req.body
    console.log('id:', body.id)

    try {
      await prisma.students.delete({
        where: {
          id: body.id,
        },
      })

      return res.status(200).json({ message: 'delete success' })
    } catch (error) {
      return res.status(400).json({ message: 'delete failed' })
    }
  }
}
