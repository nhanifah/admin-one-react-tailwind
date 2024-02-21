import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const { id } = req.query

    const answer: object[] = await prisma.$queryRaw`SELECT * FROM cbt_questions LEFT JOIN (
        SELECT cbt_answers.* FROM cbt_answers LEFT JOIN students ON cbt_answers.student_id = students.id 
        WHERE cbt_answers.student_id = ${id}) as student_answer 
        ON cbt_questions.id = student_answer.question_id WHERE cbt_questions.type = 'essay'`

    const withCheck = answer.map((item) => {
      return {
        ...item,
        checked: false,
        answerPoint: 0,
      }
    })
    return res.status(200).json(withCheck)
  }
}
