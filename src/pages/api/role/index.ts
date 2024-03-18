// crud student
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
import { roleSchema } from '../../../utils/validator'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getToken({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method == 'GET') {
    // join relation with batch_registration & master_referral
    // create interface for user
    type MasterRole = {
      id: string
      name: string
      access: string[]
      created_at: Date
      updated_at: Date
    }

    const users: MasterRole[] = []
    const adminDb = await prisma.master_roles.findMany({})

    adminDb.map((user) => {
      // convert master_roles.access to array
      users.push({
        ...user,
        access: JSON.parse(user.access),
      })
    })
    return res.status(200).json({ data: users })
  } else if (req.method == 'POST') {
    const body = req.body

    try {
      roleSchema.parse(body)
    } catch (error) {
      return res.status(400).json({ message: error.errors[0].message })
    }

    const data = {
      data: {
        name: body.name,
        access: JSON.stringify(body.accessList),
      },
    }

    try {
      await prisma.master_roles.create(data)
      return res.status(200).json({ message: 'Role Created Successfully' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Role gagal ditambahkan' })
    }
  } else if (req.method == 'PUT') {
    const body = req.body
    try {
      roleSchema.parse(body)
    } catch (error) {
      return res.status(400).json({ message: error.errors[0].message })
    }

    const data = {
      name: body.name,
      access: JSON.stringify(body.accessList),
    }

    try {
      await prisma.master_roles.update({
        where: {
          id: body.id,
        },
        data: data,
      })
      return res.status(200).json({ message: 'Role Updated Successfully' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Role gagal diubah!' })
    }
  } else if (req.method == 'DELETE') {
    const body = req.body
    console.log('ID', body)

    try {
      await prisma.master_roles.delete({
        where: {
          id: body.id,
        },
      })

      return res.status(200).json({ message: 'Role berhasil dihapus' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Role gagal dihapus' })
    }
  }
}
