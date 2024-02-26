import { Field, Form, Formik } from 'formik'
import Button from '../../components/Button'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { batchSchema, broadcastSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useBatchClients } from '../../hooks/requestData'
import React from 'react'
import { closeBroadcastModal } from '../../stores/interviewSlice'
import { Students } from '../../interfaces'

export default function BroadcastModal() {
  const dispatch = useAppDispatch()
  const selectedStudents = useAppSelector((state) => state.interview.students)
  const broadcastModal = useAppSelector((state) => state.interview.broadcastModal)
  const formRef = useRef<any>()
  const [validationErrors, setValidationErrors] = useState([])
  const { createData } = useBatchClients()

  const handleModalAction = () => {
    dispatch(closeBroadcastModal())
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
      broadcastSchema.parse({
        students: studentsId,
        ...values,
      })
    } catch (error) {
      console.log(error)
      toast.error(error.errors[0].message)
      return
    }

    toast.success(values.message)
    // toast.success('HELLO')
    return

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
      isActive={broadcastModal}
      onConfirm={() => formRef?.current?.handleSubmit()}
      onCancel={handleModalAction}
    >
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
            <FormField hasTextareaHeight label="Pesan broadcast" labelFor="message">
              <Field name="message" as="textarea" placeholder="Masukan pesan broadcast" autoFocus />
            </FormField>
          </Form>
        )}
      </Formik>
    </CardBoxModal>
  )
}
