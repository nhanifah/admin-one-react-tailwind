import { mdiCloseBox } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Button from '../../components/Button'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeEditModal } from '../../stores/interviewSlice'
import { EditInterviewSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useBatchClients, useInterviewScheduleClients } from '../../hooks/requestData'
import React from 'react'

type errors = {
  message: string[]
}

export default function EditBatchModal() {
  const dispatch = useAppDispatch()
  const selectedInterview = useAppSelector((state) => state.interview.interviewSchedules)
  const editModal = useAppSelector((state) => state.interview.editModal)
  const formRef = useRef<any>()
  const [validationErrors, setValidationErrors] = useState([])
  const { editInterview } = useInterviewScheduleClients()
  const [loading, setLoading] = useState(false)

  const handleModalAction = () => {
    dispatch(closeEditModal())
  }

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    try {
      EditInterviewSchema.parse(values)
    } catch (error) {
      console.log(error)
      setValidationErrors(error.errors)
      setLoading(false)
      return
    }

    const { status, data } = await editInterview(selectedInterview.id, values)
    if (status == 200) {
      console.log(data)
      toast.success('Batch berhasil di Update!')
      dispatch(closeEditModal())
    } else {
      console.log(data)
      toast.error('Batch gagal di Update!')
    }
    setLoading(false)
  }

  return (
    <CardBoxModal
      title="Edit Interview"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={editModal}
      onConfirm={() => formRef?.current?.handleSubmit()}
      onCancel={handleModalAction}
    >
      <div
        className={`${
          validationErrors.length == 0 ? 'hidden' : ''
        } bg-red-100 p-2.5 text-red-800 rounded-lg relative min-h-[60px]`}
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
      <Formik
        initialValues={{
          interview_date: selectedInterview.interview_date,
          interview_location: selectedInterview.interview_location,
        }}
        onSubmit={handleSubmit}
        // onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FormField label="Tanggal Interview" labelFor="interview_date">
              <Field name="interview_date" type="datetime-local" />
            </FormField>
            <FormField label="Tempat Interview" labelFor="interview_location">
              <Field name="interview_location" placeholder="Tempat Interview" autoFocus />
            </FormField>
          </Form>
        )}
      </Formik>
    </CardBoxModal>
  )
}
