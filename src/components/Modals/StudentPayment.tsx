import { Formik, Form, Field } from 'formik'
import React from 'react'
import WideCardBoxModal from '../CardBox/WideModal'
import FormField from '../Form/Field'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeStudentDetailModal } from '../../stores/batchSlice'
import Button from '../Button'
import { payment } from '../../interfaces'
import { setInstallmentId, showPaymentModal } from '../../stores/studentSlice'

export default function StudentPayment() {
  const studentDetailModal = useAppSelector((state) => state.batch.studentDetailModal)
  const student = useAppSelector((state) => state.batch.student)
  const dispatch = useAppDispatch()
  console.log(student)

  const handleModalAction = () => {
    dispatch(closeStudentDetailModal())
    // Reset the form
  }

  return (
    <WideCardBoxModal
      title="Informasi Pembayaran"
      buttonColor="info"
      buttonLabel="Done"
      isActive={studentDetailModal}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
      zIndex="z-50"
    >
      <Formik initialValues={student} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
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
      </Formik>
    </WideCardBoxModal>
  )
}
