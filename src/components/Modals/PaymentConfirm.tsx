import React from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closePaymentModal } from '../../stores/studentSlice'
import CardBoxModal from '../CardBox/Modal'
import { useInstallmentClients } from '../../hooks/requestData'
import toast from 'react-hot-toast'
import { closeStudentDetailModal } from '../../stores/batchSlice'

export default function PaymentConfirm() {
  const dispatch = useAppDispatch()
  //   const student = useAppSelector((state) => state.batch.student)
  const { handlePay } = useInstallmentClients()
  const modal = useAppSelector((state) => state.student.paymentModal)
  const installmentId = useAppSelector((state) => state.student.installmentId)

  const handleModalAction = () => {
    dispatch(closePaymentModal())
    // Reset the form
  }

  const handleSubmit = async () => {
    const { status, data } = await handlePay(installmentId)
    console.log(status)
    if (status == 200) {
      dispatch(closePaymentModal())
      dispatch(closeStudentDetailModal())
      toast.success('Pembayaran berhasil diupdate')
    } else {
      toast.error('Pembayaran gagal diupdate')
    }
  }

  return (
    <CardBoxModal
      title="Konfirmasi Lunas?"
      buttonColor="danger"
      buttonLabel="Konfirmasi"
      onConfirm={handleSubmit}
      onCancel={handleModalAction}
      isActive={modal}
    >
      <p>Apa kamu yakin ingin menandai pembayaran ini menjadi Lunas?</p>
    </CardBoxModal>
  )
}
