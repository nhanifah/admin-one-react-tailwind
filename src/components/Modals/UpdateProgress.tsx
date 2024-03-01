'use client'

import { Field, Form, Formik } from 'formik'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { studentProgressSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useStudentClients } from '../../hooks/requestData'
import React from 'react'
import { closeProgressModal, setStudents } from '../../stores/interviewSlice'
import { Students } from '../../interfaces'
import axios from 'axios'

export default function UpdateInterviewScheduleModal() {
  const dispatch = useAppDispatch()
  const selectedStudents = useAppSelector((state) => state.interview.students)
  const interviewSchedule = useAppSelector((state) => state.interview.interviewSchedules)
  const progressModal = useAppSelector((state) => state.interview.progressModal)
  const formRef = useRef<any>()
  const { updateProgress } = useStudentClients('')
  const [loading, setLoading] = useState(false)

  const handleModalAction = () => {
    dispatch(closeProgressModal())
  }

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    const checkedStudent: Students[] = []
    const studentsId: string[] = []
    selectedStudents.map((item, index) => {
      if (item.checked) {
        checkedStudent.push(item)
        studentsId.push(item.id)
      }
    })

    try {
      studentProgressSchema.parse({
        selectedStudentsId: studentsId,
        ...values,
      })
    } catch (error) {
      console.log(error)
      toast.error(error.errors[0].message)
      setLoading(false)
      return
    }

    const { status, data } = await updateProgress({ selectedStudentsId: studentsId, ...values })
    if (status == 200) {
      console.log(data)
      const students = await axios.get(`/api/batch/interview/students/${interviewSchedule.id}`)
      dispatch(setStudents(students.data))
      dispatch(closeProgressModal())
      toast.success(`${data.data.count} progress siswa berhasil diupdate!`)
    } else {
      console.log(data)
      toast.error('progress siswa gagal diupdate!')
    }
    setLoading(false)
  }

  return (
    <CardBoxModal
      title="Ubah Progress Siswa"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={progressModal}
      onConfirm={() => formRef?.current?.handleSubmit()}
      onCancel={handleModalAction}
      loading={loading}
      disabled={loading}
    >
      <Formik
        initialValues={{
          progress: 'registering',
        }}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FormField label="Progress" labelFor="progress">
              <Field
                name="progress"
                id="progress"
                component="select"
                className="py-0 rounded-full h-full"
                onChange={(e) => setFieldValue('progress', e.target.value)}
              >
                <option className="capitalize" selected value="registering">
                  Registering
                </option>
                <option className="capitalize" value="psychotest">
                  Psychotest
                </option>
                <option className="capitalize" value="assessment">
                  Assessment
                </option>
                <option className="capitalize" value="qualified">
                  Qualified
                </option>
                <option className="capitalize" value="payment">
                  Payment
                </option>
                <option className="capitalize" value="success">
                  Success
                </option>
                <option className="capitalize" value="blocked">
                  Blocked
                </option>
                <option className="capitalize" value="hold">
                  Hold
                </option>
                <option className="capitalize" value="blacklist">
                  Blacklist
                </option>
              </Field>
            </FormField>
          </Form>
        )}
      </Formik>
    </CardBoxModal>
  )
}
