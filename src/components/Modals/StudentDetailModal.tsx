import { mdiWhatsapp, mdiMail } from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import WideCardBoxModal from '../CardBox/WideModal'
import Divider from '../Divider'
import FormField from '../Form/Field'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeStudentDetailModal } from '../../stores/batchSlice'
import PunishmentListTable from '../Table/PunishmentListTable'
import Button from '../Button'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import { payment } from '../../interfaces'
import { setInstallmentId, showPaymentModal } from '../../stores/studentSlice'

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
      title="Detail Informasi Siswa"
      buttonColor="info"
      buttonLabel="Done"
      isActive={studentDetailModal}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
      zIndex="z-50"
    >
      <Tabs>
        <TabList>
          <Tab>Biodata</Tab>
          <Tab>Pembayaran</Tab>
          <Tab>Sanksi</Tab>
        </TabList>

        <TabPanel>
          <p>
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
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            { student.payments?.length === 0 ? (
                <div className="text-center text-lg font-semibold">Tempo pembayaran belum dibuat</div>
              ) : (<Formik initialValues={student} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
              <Form className="grid gap-y-4">
                {student.payments?.map((item: payment, index) => (
                  <div key={index} className="grid gap-y-2">
                    <h1 className="font-semibold mb-3">Pembayaran Biaya {item.type}</h1>
                    {item.installments.map((installment, i) => (
                      <div className="grid grid-cols-3 gap-3" key={`installments-${i}`}>
                        <div className="col-span-2">
                          <FormField label="">
                            <Field
                              value={`Pembayaran ke-${i + 1} (${parseInt(
                                String(installment.amount)
                              ).toLocaleString('id-ID')}) `}
                              placeholder="Pembayaran ke-1"
                              id="phone"
                              className="cursor-not-allowed"
                              disabled
                            />
                            <Field
                              value={`${installment.payment_date ? 'Lunas' : 'Belum Lunas'}`}
                              placeholder={`Pembayaran ke-${i + 1}`}
                              id="phone"
                              className="cursor-not-allowed"
                              disabled
                            />
                          </FormField>
                        </div>
                        <Button
                          color="info"
                          label="Lunas"
                          className="text-lg font-semibold"
                          onClick={() => {
                            dispatch(setInstallmentId(installment.id))
                            dispatch(showPaymentModal())
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </Form>
            </Formik>)
            }
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            <PunishmentListTable student={student} />
          </p>
        </TabPanel>
      </Tabs>

    </WideCardBoxModal>
  )
}
