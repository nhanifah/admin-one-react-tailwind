import { mdiChatQuestion, mdiScoreboard, mdiWrench, mdiPlusCircle, mdiCloseBox } from '@mdi/js'
import { Field, Form, Formik, FormikFormProps } from 'formik'
import Button from '../../components/Button'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { batchSchema, interviewScheduleSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useBatchClients, useInterviewScheduleClients } from '../../hooks/requestData'
import React from 'react'
import { closeAddModal } from '../../stores/interviewSlice'

type errors = {
  message: string[]
}

export default function AddInterviewSchedules() {
  const dispatch = useAppDispatch()
  const addModal = useAppSelector((state) => state.interview.addModal)
  const formRef = useRef<any>()
  const [validationErrors, setValidationErrors] = useState([])
  const { clients } = useBatchClients()
  const { createInterview } = useInterviewScheduleClients()
  const [loading, setLoading] = useState(false)

  const handleModalAction = () => {
    dispatch(closeAddModal())
    // Reset the form
  }

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    try {
      interviewScheduleSchema.parse(values)
    } catch (error) {
      console.log(error)
      setValidationErrors(error.errors)
      setLoading(false)
      return
    }

    const { status, data } = await createInterview(values)
    if (status == 200) {
      console.log(data)
      resetForm({
        values: {
          batch_id: clients[0]?.id,
          interview_location: '',
          interview_date: '',
        },
      })
      toast.success('Jadwal  Interview berhasil ditambahkan!')
    } else {
      console.log(data)
      toast.error('Jadwal interview gagal ditambahkan')
    }
    setLoading(false)
  }

  return (
    <CardBoxModal
      title="Tambah jadwal interview"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={addModal}
      onConfirm={() => formRef?.current?.handleSubmit()}
      onCancel={handleModalAction}
      loading={loading}
      disabled={loading}
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
          batch_id: clients[0]?.id,
          interview_location: '',
          interview_date: '',
        }}
        onSubmit={handleSubmit}
        // onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FormField label="Pilih Batch" labelFor="batch_id">
              <Field
                name="batch_id"
                id="batch_id"
                component="select"
                className="py-0 rounded-full h-full"
                onChange={(e) => setFieldValue('batch_id', e.target.value)}
              >
                {clients.map((item, index) => (
                  <option key={index} className="capitalize" selected value={item.id}>
                    {item.batch_name}
                  </option>
                ))}
              </Field>
            </FormField>
            <FormField label="Lokasi Interview" labelFor="interview_location">
              <Field name="interview_location" />
            </FormField>
            <FormField label="Tanggal Interview" labelFor="interview_date">
              <Field name="interview_date" type="datetime-local" />
            </FormField>
          </Form>
        )}
      </Formik>
    </CardBoxModal>
  )
}
