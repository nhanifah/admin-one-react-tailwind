import React from 'react'
import CardBoxModal from '../CardBox/Modal'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeContractModal, setStudents } from '../../stores/interviewSlice'
import { studentProgressSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { Students } from '../../interfaces'
import axios from 'axios'
import { useStudentClients } from '../../hooks/requestData'

export default function ContractModal() {
  const dispatch = useAppDispatch()
  const contractModal = useAppSelector((state) => state.interview.contractModal)
  const selectedStudents = useAppSelector((state) => state.interview.students)
  const interviewSchedule = useAppSelector((state) => state.interview.interviewSchedules)
  const { updateProgress } = useStudentClients('')

  const handleModalAction = () => {
    dispatch(closeContractModal())
  }

  const handleSubmit = async () => {
    const checkedStudent: Students[] = []
    const studentsId: string[] = []
    selectedStudents.map((item, index) => {
      if (item.checked) {
        checkedStudent.push(item)
        studentsId.push(item.id)
      }
    })

    try {
      studentProgressSchema.parse({
        selectedStudentsId: studentsId,
        progress: 'payment',
      })
    } catch (error) {
      console.log(error)
      toast.error(error.errors[0].message)
      return
    }

    const { status, data } = await updateProgress({
      selectedStudentsId: studentsId,
      progress: 'payment',
    })
    if (status == 200) {
      console.log(data)
      const students = await axios.get(`/api/batch/interview/students/${interviewSchedule.id}`)
      dispatch(setStudents(students.data))
      dispatch(closeContractModal())
      toast.success(`Berhasil membuat kontrak dan pembayaran siswa!`)
    } else {
      console.log(data)
      toast.error('Gagal membuat kontrak!')
    }
  }

  return (
    <CardBoxModal
      title="Mau membuat kontrak?"
      buttonColor="info"
      buttonLabel="Konfirmasi"
      isActive={contractModal}
      onConfirm={() => handleSubmit()}
      onCancel={handleModalAction}
    >
      <div className="grid justify-center text-center">
        <p className="text-lg font-bold mb-5">Apa kamu yakin ingin membuat kontrak untuk siswa?</p>
        <p className="text-sm font-semibold text-red-500">
          *Membuat kontrak akan otomatis membuat pembayaran untuk siswa
        </p>
      </div>
    </CardBoxModal>
  )
}
