import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, cbt_questions_type } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const body = await req.body

    try {
      const question = await prisma.cbt_questions.createMany({
        data: [
          {
            type: cbt_questions_type[body.questionType],
            question_text: body.question,
            option_text: body.questionType == 'essay' ? null : JSON.stringify(body.option),
            answer: body.questionType == 'essay' ? null : body.answerSelected,
            weight: parseInt(body.point),
            exam_id: '1e8c3b0d-a7e2-4e61-979a-1102189459a8',
          },
        ],
      })
      return res.status(200).json(question)
    } catch (err) {
      // console.log(err)
      return res.status(400).json(err)
    }
  } else if (req.method == 'GET') {
    const questions = await prisma.cbt_questions.findMany()

    return res.status(200).json({ data: questions })
  } else if (req.method == 'DELETE') {
    const body = await req.body

    try {
      const question = await prisma.cbt_questions.delete({
        where: {
          id: body.id,
        },
      })

      console.log('delete success')
      return res.status(200).json({ message: 'delete success' })
    } catch (error) {
      console.log('delete failed')
      return res.status(400).json({ message: 'delete failed' })
    }
  } else if (req.method == 'PUT') {
    const body = await req.body

    try {
      const question = await prisma.cbt_questions.update({
        where: {
          id: body.id,
        },
        data: {
          type: cbt_questions_type[body.questionType],
          question_text: body.question,
          option_text: body.questionType == 'essay' ? null : JSON.stringify(body.option),
          answer: body.questionType == 'essay' ? null : body.answerSelected,
          weight: body.point,
        },
      })

      console.log('update success')
      return res.status(200).json({ message: 'update sucess', data: question })
    } catch (error) {
      console.log('update failed')
      return res.status(400).json({ message: 'update failed' })
    }
  }
}
