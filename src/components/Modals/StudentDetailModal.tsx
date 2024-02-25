import { mdiWhatsapp, mdiMail } from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import WideCardBoxModal from '../CardBox/WideModal'
import Divider from '../Divider'
import FormField from '../Form/Field'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeStudentDetailModal } from '../../stores/batchSlice'

export default function StudentDetailModal() {
  const studentDetailModal = useAppSelector((state) => state.batch.studentDetailModal)
  const student = useAppSelector((state) => state.batch.student)
  const dispatch = useAppDispatch()

  const handleModalAction = () => {
    dispatch(closeStudentDetailModal())
    // Reset the form
  }

  return (
    <WideCardBoxModal
      title="Biodata Siswa"
      buttonColor="info"
      buttonLabel="Done"
      isActive={studentDetailModal}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
      zIndex="z-50"
    >
      <Formik initialValues={student} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
        <Form>
          <FormField label="Nama Lengkap" labelFor="full_name">
            <Field name="full_name" placeholder="Nama Lengkap" id="full_name" disabled />
          </FormField>

          <FormField label="Kontak" icons={[mdiWhatsapp, mdiMail]}>
            <Field name="whatsapp_number" placeholder="Whatsapp" disabled />
            <Field type="email" name="email" placeholder="Email" disabled />
          </FormField>

          <Divider />

          <FormField label="Alamat" labelFor="address">
            <Field name="province" placeholder="Provinsi" id="province" disabled />
            <Field name="city" placeholder="Kota / Kabupaten" id="city" disabled />
            <Field name="subdistrict" placeholder="Kecamatan" id="subdistrict" disabled />
          </FormField>

          <FormField label="Kelurahan / Desa" help="Help line comes here">
            <Field name="village" placeholder="Kelurahan / Desa" id="village" disabled />
          </FormField>

          <FormField label="Alamat" hasTextareaHeight>
            <Field name="address_detail" as="textarea" placeholder="Alamat Lengkap" disabled />
          </FormField>

          <Divider />

          <FormField label="Biodata Orangtua" icons={[mdiWhatsapp, mdiMail]}>
            <Field name="guardian_name" placeholder="Nama Orangtua" disabled />
            <Field name="guardian_phone" placeholder="Whatsapp Orangtua" disabled />
          </FormField>

          <Divider />
        </Form>
      </Formik>
    </WideCardBoxModal>
  )
}
