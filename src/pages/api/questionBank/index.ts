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
            option_text: JSON.stringify(body.option),
            answer: body.answerSelected,
            weight: body.point,
            exam_id: '4a7790d9-7804-4808-9f58-183f3177',
          },
        ],
      })
      return res.status(200).json(question)
    } catch (err) {
      // console.log(err)
      return res.status(400).json(err)
    }
  }
}
