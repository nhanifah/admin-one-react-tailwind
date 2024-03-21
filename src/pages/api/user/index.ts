// crud student
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt"
import { Admin } from '../../../interfaces'
import { userManager } from '../../../utils/validator'
import { hash } from 'bcrypt'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getToken({ req })

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    if (req.method == 'GET') {

        const users: Admin[] = [];
        const adminDb = await prisma.admins.findMany({
            include: {
                master_roles: true,
            },
        })

        adminDb.map((user) => {
            // convert master_roles.access to array
            users.push({
                ...user,
                master_roles: {
                    ...user.master_roles,
                    access: JSON.parse(user.master_roles.access),
                },
            })
        })
        return res.status(200).json({ data: users })

    } else if (req.method == 'POST') {
        const body = await req.body

        // validate body
        try {
            userManager.parse(body)
        } catch (error) {
            return res.status(400).json({ message: error.errors[0].message })
        }

        try {
            const student = await prisma.admins.createMany({
                data: [
                    {
                        name: body.name,
                        username: body.username,
                        email: body.email,
                        password: await hash('password', 10),
                        role: body.master_roles.id,
                    },
                ],
            })

            return res.status(200).json(student)
        } catch (error) {
            return res.status(400).json(error)
        }
    } else if (req.method == 'PUT') {
        const body = await req.body

        // validate body
        try {
            userManager.parse(body)
        } catch (error) {
            return res.status(400).json({ message: error.errors[0].message })
        }

        try {
            const student = body.sandi ? await prisma.admins.update({
                where: {
                    id: body.id,
                },
                data: {
                    password: await hash(body.sandi, 10),
                },
            }) : await prisma.admins.update({
                where: {
                    id: body.id,
                },
                data: {
                    name: body.name,
                    username: body.username,
                    email: body.email,
                    role: body.master_roles.id,
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
            await prisma.admins.delete({
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
