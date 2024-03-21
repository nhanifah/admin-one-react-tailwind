import { mdiScoreboard, mdiCloseBox } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Button from '../../components/Button'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeEditModal } from '../../stores/batchSlice'
import { batchSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useBatchClients } from '../../hooks/requestData'
import React from 'react'

type errors = {
  message: string[]
}

export default function EditBatchModal() {
  const dispatch = useAppDispatch()
  const selectedBatch = useAppSelector((state) => state.batch.batch_selected)
  const editModal = useAppSelector((state) => state.batch.editModal)
  const formRef = useRef<any>()
  const [validationErrors, setValidationErrors] = useState([])
  const { editData } = useBatchClients()
  const [loading, setLoading] = useState(false)

  const handleModalAction = () => {
    dispatch(closeEditModal())
  }

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    try {
      batchSchema.parse(values)
    } catch (error) {
      console.log(error)
      setValidationErrors(error.errors)
setTimeout(() => {
        setValidationErrors([])
      }, 3000)
      setLoading(false)
      return
    }

    const { status, data } = await editData(selectedBatch.id, values)
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

  const endDate = selectedBatch.end_date.split('T')[0]

  return (
    <CardBoxModal
      title="Ubah Batch"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={editModal}
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
          batch_name: selectedBatch.batch_name,
          quota: selectedBatch.quota,
          end_date: endDate,
        }}
        onSubmit={handleSubmit}
        // onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FormField label="Nama batch" labelFor="batch_name">
              <Field name="batch_name" placeholder="Nama batch" autoFocus />
            </FormField>
            <FormField label="Kuota Batch" labelFor="quota" icons={[mdiScoreboard]}>
              <Field name="quota" placeholder="Kuota" type="number" min={0} />
            </FormField>
            <FormField label="Batas Pendaftaran Batch" labelFor="end_date">
              <Field name="end_date" type="date" />
            </FormField>
          </Form>
        )}
      </Formik>
    </CardBoxModal>
  )
}
