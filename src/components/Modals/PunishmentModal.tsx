import { Field, Form, Formik } from 'formik'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { punishmentSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { usePunishmentClients } from '../../hooks/requestData'
import React from 'react'
import { closePunishmentModal } from '../../stores/punishmentSlice'

const punishmentType = ['suspension', 'warning', 'expulsion', 'other']

export default function PunishmentModal() {
  const dispatch = useAppDispatch()
  const selectedStudents = useAppSelector((state) => state.batch.student)
  const punishmentModal = useAppSelector((state) => state.punishment.modal)
  const formRef = useRef<any>()
  const { addPunishment } = usePunishmentClients()

  const handleModalAction = () => {
    dispatch(closePunishmentModal())
    // Reset the form
  }

  const handleSubmit = async (values, { resetForm }) => {
    console.log(typeof values.start_date)
    try {
      punishmentSchema.parse(values)
    } catch (error) {
      toast.error(error.errors[0].message)
      return
    }

    const payload = {
      ...values,
      student_id: selectedStudents.id,
    }

    const { status, data } = await addPunishment(payload)
    if (status == 200) {
      console.log(data)
      resetForm({
        values: {
          type: 'suspension',
          description: '',
          start_date: '',
          end_date: '',
        },
      })
      toast.success('Berhasil memberi sanksi!')
      dispatch(closePunishmentModal())
    } else {
      console.log(data)
      toast.error('Gagal memberi sanksi!')
    }
  }

  return (
    <CardBoxModal
      title="Beri Punishment Kepada Siswa"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={punishmentModal}
      onConfirm={() => formRef?.current?.handleSubmit()}
      onCancel={handleModalAction}
    >
      <Formik
        initialValues={{
          type: 'suspension',
          description: '',
          start_date: '',
          end_date: '',
        }}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FormField label="Pilih tipe sanksi" labelFor="type">
              <Field
                name="type"
                id="type"
                component="select"
                className="py-0 rounded-full h-full"
                onChange={(e) => setFieldValue('type', e.target.value)}
              >
                {punishmentType.map((item, index) => (
                  <option key={index} className="capitalize" value={item}>
                    {item}
                  </option>
                ))}
              </Field>
            </FormField>
            <FormField hasTextareaHeight label="Deksripsi Sanksi" labelFor="description">
              <Field name="description" as="textarea" placeholder="Deskripsi sanksi" autoFocus />
            </FormField>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <FormField label="Tanggal mulai">
                <Field name="start_date" type="datetime-local" />
              </FormField>
              <FormField label="Tanggal selesai">
                <Field name="end_date" type="datetime-local" />
              </FormField>
            </div>
          </Form>
        )}
      </Formik>
    </CardBoxModal>
  )
}
