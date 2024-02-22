import { mdiChatQuestion, mdiScoreboard, mdiWrench, mdiPlusCircle, mdiCloseBox } from '@mdi/js'
import { Field, Form, Formik, FormikFormProps } from 'formik'
import Button from '../../components/Button'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeModalStudents } from '../../stores/batchSlice'
import { batchSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useBatchClients } from '../../hooks/requestData'
import TableBatchStudents from '../Table/BatchStudents'

export default function BatchStudentsModal() {
  const dispatch = useAppDispatch()
  const modalStudents = useAppSelector((state) => state.batch.modalStudents)

  const handleModalAction = () => {
    dispatch(closeModalStudents())
    // Reset the form
  }

  return (
    <CardBoxModal
      title="Tambahkan Batch Baru"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={modalStudents}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
    >
      <TableBatchStudents />
    </CardBoxModal>
  )
}
