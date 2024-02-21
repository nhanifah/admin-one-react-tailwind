import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, cbt_questions_type } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error'] })

type MultipleChoiceAnswers = {
  id: string
  exam_id: string
  type: string
  question_text: string
  option_text: string
  answer: string
  weight: number
  selected_option: string
  minimal_value: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const body = await req.body
    const results = await prisma.cbt_results.findMany({
      include: {
        cbt_examination: true,
        students: true,
      },
    })

    return res.status(200).json({ data: results })
  } else if (req.method == 'PUT') {
    const body = await req.body
    console.log(body)

    let total_points = 0

    // Count essay question
    body.answers.map((item) => {
      total_points += item.answerPoint
    })

    // Count multiple choice question
    const multiple_choice_answers: MultipleChoiceAnswers[] =
      await prisma.$queryRaw`SELECT cbt_questions.*, student_answer.selected_option, cbt_examination.minimal_value FROM cbt_questions LEFT JOIN (
    SELECT cbt_answers.* FROM cbt_answers 
		LEFT JOIN students ON cbt_answers.student_id = students.id 
    WHERE cbt_answers.student_id = ${body.student_id} ) as student_answer 
    ON cbt_questions.id = student_answer.question_id 
    JOIN cbt_examination ON cbt_questions.exam_id = cbt_examination.id
    WHERE cbt_questions.type = 'multipleChoice';`

    console.log(multiple_choice_answers)

    multiple_choice_answers.map((item) => {
      if (item.selected_option == item.answer) {
        total_points += item.weight
      }
    })

    await prisma.students.update({
      where: {
        id: body.student_id,
      },
      data: {
        progress:
          total_points >= multiple_choice_answers[0].minimal_value ? 'qualified' : 'blocked',
      },
    })

    try {
      const result = await prisma.cbt_results.updateMany({
        where: {
          exam_id: body.answers[0].exam_id,
          student_id: body.student_id,
        },
        data: {
          checked: 'yes',
          total_points: total_points,
        },
      })

      console.log('update success')
      return res.status(200).json({ message: 'update sucess', data: result })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'update failed' })
    }
  }
}
