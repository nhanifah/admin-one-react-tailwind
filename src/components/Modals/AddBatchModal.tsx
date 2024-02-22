import { mdiChatQuestion, mdiScoreboard, mdiWrench, mdiPlusCircle, mdiCloseBox } from '@mdi/js'
import { Field, Form, Formik, FormikFormProps } from 'formik'
import Button from '../../components/Button'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeModal } from '../../stores/batchSlice'
import { batchSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useBatchClients } from '../../hooks/requestData'

export default function AddBatchModal() {
  const dispatch = useAppDispatch()
  const modal = useAppSelector((state) => state.batch.modal)
  const formRef = useRef<HTMLFormElement>()
  const [validationErrors, setValidationErrors] = useState([])
  const { createData } = useBatchClients()

  const handleModalAction = () => {
    dispatch(closeModal())
    // Reset the form
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      batchSchema.parse(values)
    } catch (error) {
      console.log(error)
      setValidationErrors(error.errors)
      return
    }

    const { status, data } = await createData(values)
    if (status == 200) {
      console.log(data)
      resetForm({
        values: {
          batch_name: '',
          quota: 0,
          end_date: '',
        },
      })
      toast.success('Soal berhasil ditambahkan!')
    } else {
      console.log(data)
      toast.error('Soal gagal ditambahkan')
    }
  }

  return (
    <CardBoxModal
      title="Tambahkan Batch Baru"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={modal}
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
          {validationErrors.map((item, i) => (
            <li key={`error-${i}`}>{item.message}</li>
          ))}
        </ul>
      </div>
      <Formik
        initialValues={{
          batch_name: '',
          quota: 0,
          end_date: '',
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
