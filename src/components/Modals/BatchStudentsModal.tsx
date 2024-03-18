'use client'

import { mdiUpdate } from '@mdi/js'
import WideCardBoxModal from '../CardBox/WideModal'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeModalStudents } from '../../stores/batchSlice'
import toast from 'react-hot-toast'
import TableBatchStudents from '../Table/BatchStudents'
import { Field, Form, Formik } from 'formik'
import Button from '../Button'
import { useRef, useState } from 'react'
import { studentProgressSchema } from '../../utils/validator'
import { useStudentClients } from '../../hooks/requestData'
import React from 'react'

export default function BatchStudentsModal() {
  const { updateProgress } = useStudentClients('success')
  const dispatch = useAppDispatch()
  const modalStudents = useAppSelector((state) => state.batch.modalStudents)
  const selectedBatch = useAppSelector((state) => state.batch.batch_selected)
  const selectedStudents = useAppSelector((state) => state.batch.students_selected)
  const formRef = useRef<any>()
  const handleModalAction = () => {
    dispatch(closeModalStudents())
    // Reset the form
  }
  const [loading, setLoading] = useState(false)

  const updateButton = () => {
    return (
      <Button
        target="_blank"
        icon={mdiUpdate}
        label="Update progress"
        color="contrast"
        roundedFull
        small
        className="mr-3"
        onClick={() => formRef.current.handleSubmit()}
        loading={loading}
        disabled={loading}
      />
    )
  }

  const handleSubmit = async (values, { resetForm }) => {
    // console.log(selectedStudents)
    setLoading(true)

    const selectedStudentsId: string[] = []
    selectedStudents.map((item, index) => {
      if (item.checked) {
        selectedStudentsId.push(item.id)
      }
    })
    try {
      studentProgressSchema.parse({
        selectedStudentsId,
        ...values,
      })
    } catch (error) {
      console.log(error)
      // setValidationErrors(error.errors)
setTimeout(() => {
        setValidationErrors([])
      }, 3000)
      toast.error(error.errors[0].message)
      setLoading(false)
      return
    }

    const { status, data } = await updateProgress({ selectedStudentsId, ...values })
    if (status == 200) {
      console.log(data)
      dispatch(closeModalStudents())
      toast.success(`${data.data.count} progress siswa berhasil diupdate!`)
    } else {
      console.log(data)
      toast.error('progress siswa gagal diupdate!')
    }
    setLoading(false)
  }

  const selectEl = () => {
    return (
      <Formik
        initialValues={{
          progress: 'registering',
        }}
        innerRef={formRef}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Field
              name="progress"
              id="progress"
              component="select"
              className="py-0 rounded-full h-full dark:text-black"
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
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <WideCardBoxModal
      title={`Daftar siswa ${selectedBatch.batch_name}`}
      buttonColor="info"
      buttonLabel="Done"
      isActive={modalStudents}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
      customEl={selectEl()}
      withButton={updateButton()}
    >
      <TableBatchStudents />
    </WideCardBoxModal>
  )
}
