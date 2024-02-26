'use client'

import { Field, Form, Formik } from 'formik'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { updateInterviewSchedulesSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useBatchClients, useBatchInterviewClients } from '../../hooks/requestData'
import React from 'react'
import { closeUpdateModal, setStudents, showUpdateModal } from '../../stores/interviewSlice'
import { InterviewSchedules, Students } from '../../interfaces'
import axios from 'axios'

export default function UpdateInterviewScheduleModal() {
  const dispatch = useAppDispatch()
  const selectedStudents = useAppSelector((state) => state.interview.students)
  const interviewSchedule = useAppSelector((state) => state.interview.interviewSchedules)
  const [schedules, setSchedules] = useState<InterviewSchedules[]>([])
  const updateModal = useAppSelector((state) => state.interview.updateModal)
  const formRef = useRef<any>()
  const { updateStudentsSchedule } = useBatchInterviewClients()

  useEffect(() => {
    const getInterviewSchedules = async () => {
      try {
        const response = await axios.get(`/api/batch/interview/${interviewSchedule.batch_id}`)
        setSchedules(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    getInterviewSchedules()
  }, [])

  const handleModalAction = () => {
    dispatch(closeUpdateModal())
    // Reset the form
  }

  const handleSubmit = async (values, { resetForm }) => {
    const checkedStudent: Students[] = []
    const studentsId: string[] = []
    selectedStudents.map((item, index) => {
      if (item.checked) {
        checkedStudent.push(item)
        studentsId.push(item.id)
      }
    })

    try {
      updateInterviewSchedulesSchema.parse({
        students: studentsId,
        ...values,
      })
    } catch (error) {
      console.log(error)
      toast.error(error.errors[0].message)
      return
    }

    const { status, data } = await updateStudentsSchedule({
      selectedStudentsId: studentsId,
      ...values,
    })
    if (status == 200) {
      console.log(data)
      const students = await axios.get(`/api/batch/interview/students/${interviewSchedule.id}`)
      dispatch(setStudents(students.data))
      dispatch(closeUpdateModal())
      toast.success('Jadwal interview siswa berhasil diubah!')
    } else {
      console.log(data)
      toast.error('Jadwal interview siswa gagal diubah!')
    }
  }

  return (
    <CardBoxModal
      title="Ubah Jadwal Interview"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={updateModal}
      onConfirm={() => formRef?.current?.handleSubmit()}
      onCancel={handleModalAction}
    >
      <Formik
        initialValues={{
          shedule: schedules[0]?.id,
        }}
        onSubmit={handleSubmit}
        // onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FormField label="Jadwal Interview" labelFor="schedule">
              <Field
                name="schedule"
                id="schedule"
                component="select"
                className="py-0 rounded-full h-full"
                onChange={(e) => setFieldValue('schedule', e.target.value)}
              >
                {schedules.map((item: InterviewSchedules, index) => (
                  <option className="capitalize" selected value={item.id}>
                    {new Date(item.interview_date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'UTC',
                    })}{' '}
                    ({item.interview_location})
                  </option>
                ))}
              </Field>
            </FormField>
          </Form>
        )}
      </Formik>
    </CardBoxModal>
  )
}
