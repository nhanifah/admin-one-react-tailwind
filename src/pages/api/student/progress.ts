import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, payments_type, installments_discount } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

type PaymentsParams = {
  student_id: string | null
  batch_id: string | null
  amount: number
  type: payments_type
}

type InstallmentParams = {
  payment_id: string
  installment_number: number
  amount: number
  discount: installments_discount
  due_date: Date
  payment_date?: Date
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'PUT') {
    const body = await req.body

    try {
      const response = await prisma.students.updateMany({
        where: {
          id: {
            in: body.selectedStudentsId,
          },
        },
        data: {
          progress: body.progress,
        },
      })

      if (body.progress == 'contract') {
        // Get Students
        let students = await prisma.students.findMany({
          where: {
            id: {
              in: body.selectedStudentsId,
            },
          },
        })

        // Generate Payments PaymentsParams
        let data: PaymentsParams[] = []
        students.map((item) => {
          const params: PaymentsParams[] = [
            {
              student_id: item.id,
              batch_id: item.batch_id,
              amount: item.dormitory == 'yes' ? 13500000 : 10500000,
              type: payments_type['pendaftaran'],
            },
            {
              student_id: item.id,
              batch_id: item.batch_id,
              amount: item.dormitory == 'yes' ? 10000000 : 7000000,
              type: payments_type['pendidikan'],
            },
          ]
          data = [...data, ...params]
        })

        const payment = await prisma.payments.createMany({
          data: data,
        })

        // Create installment
        const studentsWithPayments = await prisma.students.findMany({
          where: {
            id: {
              in: body.selectedStudentsId,
            },
          },
          include: {
            payments: true,
          },
        })

        let installment_params: InstallmentParams[] = []
        studentsWithPayments.map((item) => {
          item.payments.map((payment) => {
            if (payment.type == 'pendaftaran') {
              for (let i = 1; i <= 2; i++) {
                const params: InstallmentParams = {
                  payment_id: payment.id,
                  amount: i == 1 ? 7000000 : item.dormitory == 'yes' ? 6500000 : 3500000,
                  due_date: new Date(),
                  discount: installments_discount['no'],
                  installment_number: i,
                }
                installment_params.push(params)
              }
              return
            }
            if (item.installment == 'yes') {
              for (let i = 1; i <= 5; i++) {
                const params: InstallmentParams = {
                  payment_id: payment.id,
                  amount: item.dormitory == 'yes' ? 2600000 : 2000000,
                  due_date: new Date(),
                  discount: installments_discount['no'],
                  installment_number: i,
                }
                installment_params.push(params)
              }
              return
            } else {
              const params: InstallmentParams = {
                payment_id: payment.id,
                amount: item.dormitory == 'yes' ? 10000000 : 7000000,
                due_date: new Date(),
                discount: installments_discount['no'],
                installment_number: 1,
              }
              installment_params.push(params)
              return
            }
          })
        })

        const installments = await prisma.installments.createMany({
          data: installment_params,
        })

        return res
          .status(200)
          .json({ message: 'Success', data: data, payments: payment, installments })
      }

      return res.status(200).json({ message: 'Success', data: response })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Update failed' })
    }
  }
}
