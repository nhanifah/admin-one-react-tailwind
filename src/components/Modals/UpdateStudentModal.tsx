'use client'

import { Field, Form, Formik } from 'formik'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import React, { useRef } from 'react'
import { closeStudentEditModal } from '../../stores/batchSlice'
import Divider from '../Divider'
import { mdiBookEducation, mdiIdCard, mdiMail, mdiBriefcase, mdiWhatsapp, mdiAccount } from '@mdi/js'
import { useStudentClients } from '../../hooks/requestData'
import toast from 'react-hot-toast'
import { studentSchema } from '../../utils/validator'

export default function UpdateInterviewScheduleModal() {
    const { updateData } = useStudentClients('dataSiswa')
    const studentEditModal = useAppSelector((state) => state.batch.studentEditModal)
    const student = useAppSelector((state) => state.batch.student)
    const dispatch = useAppDispatch()
    const formRef = useRef<any>()

  const handleModalAction = async (values) => {
    // console.log(values)
    const payload = {
        id: values.id,
        full_name: values.full_name,
        birthdate: values.birthdate,
        nik: values.nik,
        whatsapp_number: values.whatsapp_number,
        email: values.email,
        last_education: values.last_education,
        work_now: values.work_now,
        province: values.province,
        city: values.city,
        subdistrict: values.subdistrict,
        village: values.village,
        address_detail: values.address_detail,
        guardian_name: values.guardian_name,
        guardian_phone: values.guardian_phone,
        }

        // validate payload
        try {
            studentSchema.parse(payload)
        } catch (error) {
            toast.error(error.errors[0].message)
            return
        }
        

        try {
            const { status, data } = await updateData(payload)
            data
            if (status === 200) {
                toast.success('Data siswa berhasil diubah')
                dispatch(closeStudentEditModal())
            } else {
                toast.error('Data siswa gagal diubah')
            }
        } catch (error) {
            toast.error('Data siswa gagal diubah')
            console.log(error)
        }
    // dispatch(closeStudentEditModal())
  }

  const closeModalAction = () => {
    dispatch(closeStudentEditModal())
  }

  const birthDate = student.birthdate != undefined ? student.birthdate.split('T')[0] : ''

  return (
    <CardBoxModal
      title="Ubah Biodata Siswa"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={studentEditModal}
      onConfirm={() => formRef.current?.submitForm()}
      onCancel={closeModalAction}
    >
      <Formik
              initialValues={{
                ...student,
                birthdate: birthDate,
                master_referral: {
                  ...student.master_referral,
                  name: student.master_referral
                    ? student.master_referral.name
                    : 'Tidak ada referral',
                },
                referral_source: student.master_referral
                  ? student.referral_source
                  : 'Tidak ada referral',
                dormitory: student.dormitory == 'yes' ? 'ya' : 'tidak',
                installment: student.installment == 'yes' ? 'ya' : 'tidak',
                interview_schedule: {
                  ...student.interview_schedule,
                  interview_date: new Date(
                    student.interview_schedule?.interview_date
                  ).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'UTC',
                  }),
                },
              }}
              innerRef={formRef}
              onSubmit={handleModalAction}
            >
              <Form>
                <FormField label="Nama Lengkap" labelFor="full_name" icons={[mdiAccount]}>
                  <Field name="full_name" placeholder="Nama Lengkap" id="full_name" autoFocus />
                </FormField>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Tanggal Lahir">
                    <Field name="birthdate" type="date" />
                  </FormField>
                  <FormField label="NIK" icons={[mdiIdCard]}>
                    <Field name="nik" placeholder="nik" type="number" />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Kontak" icons={[mdiWhatsapp]}>
                    <Field name="whatsapp_number" placeholder="Whatsapp" />
                  </FormField>
                  <FormField label="Email" icons={[mdiMail]}>
                    <Field type="email" name="email" placeholder="Email" />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Pendidikan Terakhir" icons={[mdiBookEducation]}>
                    <Field name="last_education" />
                  </FormField>
                  <FormField label="Pekerjaan Sekarang" icons={[mdiBriefcase]}>
                    <Field name="work_now" />
                  </FormField>
                </div>

                <Divider />

                <FormField label="Domisili" labelFor="address">
                  <Field name="province" placeholder="Provinsi" id="province" />
                  <Field name="city" placeholder="Kota / Kabupaten" id="city" />
                  <Field name="subdistrict" placeholder="Kecamatan" id="subdistrict" />
                </FormField>

                <FormField label="Kelurahan / Desa">
                  <Field name="village" placeholder="Kelurahan / Desa" id="village" />
                </FormField>

                <FormField label="Alamat" hasTextareaHeight>
                  <Field
                    name="address_detail"
                    as="textarea"
                    placeholder="Alamat Lengkap"
                
                  />
                </FormField>
                <Divider />

                <FormField label="Biodata Orangtua" icons={[mdiMail, mdiWhatsapp]}>
                  <Field name="guardian_name" placeholder="Nama Orangtua" />
                  <Field name="guardian_phone" placeholder="Whatsapp Orangtua" />
                </FormField>
              </Form>
            </Formik>
    </CardBoxModal>
  )
}
