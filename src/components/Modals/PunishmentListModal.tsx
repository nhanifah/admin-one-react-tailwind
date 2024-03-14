import WideCardBoxModal from '../CardBox/WideModal'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import React from 'react'
import { closePunishmentListModal } from '../../stores/punishmentSlice'
import PunishmentListTable from '../Table/PunishmentListTable'

export default function PunishmentListModal() {
  const student = useAppSelector((state) => state.batch.student)
  const dispatch = useAppDispatch()
  const modal = useAppSelector((state) => state.punishment.punishmentListModal)
  const handleModalAction = () => {
    dispatch(closePunishmentListModal())
  }

  return (
    <WideCardBoxModal
      title={`Daftar Sanksi`}
      buttonColor="info"
      buttonLabel="Done"
      isActive={modal}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
    >
      <PunishmentListTable student={student} />
    </WideCardBoxModal>
  )
}
