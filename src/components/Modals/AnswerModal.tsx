import { mdiScoreboard, mdiCloseBox, mdiCheckBold, mdiCancel } from '@mdi/js'
import { Field, Form, Formik, FieldArray } from 'formik'
import Button from '../Button'
import CardBoxModal from '../CardBox/Modal'
import FormField from '../Form/Field'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { setIsModalActive } from '../../stores/modalSlice'
import { answerCheckedSchema } from '../../utils/validator'
import { studentAnswer } from '../../interfaces'
import toast from 'react-hot-toast'
import { useStudentPhyscotestAnswerClients } from '../../hooks/requestData'
import { resetAnswer, setChecked, setUnchecked } from '../../stores/answerSlice'
import React from 'react'

type errors = {
  message: string[]
}

export default function AnswerModal() {
  const dispatch = useAppDispatch()
  const isModalActive = useAppSelector((state) => state.modal.isModalActive)
  const answerList = useAppSelector((state) => state.answer.answerList)
  const studentName = useAppSelector((state) => state.answer.studentName)
  const studentId = useAppSelector((state) => state.answer.studentId)
  const { createResult } = useStudentPhyscotestAnswerClients()
  const [loading, setLoading] = useState(false)

  const formRef = useRef<any>()

  const [validationErrors, setValidationErrors] = useState([])

  const handleModalAction = () => {
    dispatch(setIsModalActive(false))
    // Reset the form
  }

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    try {
      answerCheckedSchema.parse(values)
    } catch (error) {
      console.log(error.errors[0].message)
      toast.error(error.errors[0].message)
      setLoading(false)
      return
    }

    const { status, data } = await createResult({ answers: values.answers, student_id: studentId })
    if (status == 200) {
      console.log(data)
      resetForm({
        values: {
          answers: [],
        },
      })
      dispatch(resetAnswer)
      toast.success('Hasil ujian berhasil dinilai!')
      dispatch(setIsModalActive(false))
    } else {
      console.log(data)
      toast.error('Hasil ujian gagal dinilai!')
    }
    setLoading(false)
  }

  return (
    <CardBoxModal
      title="Koreksi Jawaban"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={isModalActive}
      onConfirm={() => formRef?.current?.handleSubmit()}
      onCancel={handleModalAction}
      loading={loading}
      disabled={loading}
    >
      <div
        className={`${
          validationErrors.length == 0 ? 'hidden' : ''
        } bg-red-100 p-2.5 text-red-800 rounded-lg relative`}
      >
        <Button
          icon={mdiCloseBox}
          iconSize={20}
          color="danger"
          className="p-0 absolute right-4 top-2.5 bg-main-200"
          onClick={() => setValidationErrors([])}
        />
        <ul>
          {validationErrors.map((item: errors, i) => (
            <li key={`error-${i}`}>{item.message}</li>
          ))}
        </ul>
      </div>
      <Formik initialValues={{ answers: answerList }} onSubmit={handleSubmit} innerRef={formRef}>
        {({ setFieldValue, values }) => (
          <FieldArray name="answers">
            {() => {
              return (
                <>
                  <div className="p-2.5 rounded-lg shadow-md border font-bold">
                    Nama: {studentName}
                  </div>
                  <Form>
                    {values.answers.map((item: studentAnswer, index: number) => {
                      return (
                        <div key={index} className="shadow-md border p-2.5 mb-4 rounded-lg">
                          <FormField hasTextareaHeight label="Pertanyaan" noMargin={true}>
                            <Field
                              // name="textarea"
                              as="textarea"
                              placeholder="Your text here"
                              name={`answers[${index}].question_text`}
                              disabled
                            />
                          </FormField>
                          <FormField hasTextareaHeight label="Jawaban" noMargin={true}>
                            <Field
                              name={`answers[${index}].selected_option`}
                              as="textarea"
                              disabled
                            />
                          </FormField>
                          <div className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-8">
                              <FormField label="Point" labelFor="point" icons={[mdiScoreboard]}>
                                <Field
                                  name={`answers[${index}].answerPoint`}
                                  placeholder="Poin"
                                  type="number"
                                  max={item.weight}
                                  min={0}
                                />
                              </FormField>
                            </div>
                            <Button
                              icon={mdiCancel}
                              iconSize={24}
                              color="danger"
                              className="col-span-2 h-12"
                              disabled={!item.checked}
                              onClick={() => {
                                setFieldValue(`answers[${index}].checked`, false)
                                dispatch(setUnchecked())
                              }}
                            />
                            <Button
                              icon={mdiCheckBold}
                              iconSize={24}
                              color="success"
                              className="col-span-2 h-12"
                              disabled={item.checked}
                              onClick={() => {
                                setFieldValue(`answers[${index}].checked`, true)
                                dispatch(setChecked())
                              }}
                            />
                          </div>
                          <span className="block mt-1 font-semibold">
                            Bobot pertanyaan: {item.weight}
                          </span>
                        </div>
                      )
                    })}
                  </Form>
                </>
              )
            }}
          </FieldArray>
        )}
      </Formik>
    </CardBoxModal>
  )
}
