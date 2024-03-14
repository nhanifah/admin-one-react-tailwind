import { mdiEye, mdiUpload, mdiWhatsapp } from '@mdi/js'
import React, { ReactNode, useEffect, useState } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { setStudent, setStudentsSelected, showStudentDetailModal } from '../../stores/batchSlice'
import { BatchStudents, StudentPunishment, Students } from '../../interfaces'
import { getPunishmentFiles } from '../../utils/helpers'
import Tooltip from '../Tooltip'
import {
  setPunishmentAttachment,
  setType,
  showUploadModal,
  showViewerModal,
} from '../../stores/punishmentSlice'

type Props = {
  student: Students
  children?: ReactNode
}

const TableBatchStudents = ({ student }: Props) => {
  const selectedStudents = useAppSelector((state) => state.batch.students_selected)
  // const { clients } = useBatchStudentsClients(selectedBatch.id)
  const [clients, setCLients] = useState<StudentPunishment[]>(student.student_punishments)

  const dispatch = useAppDispatch()

  const perPage = 50

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients?.slice(perPage * currentPage, perPage * (currentPage + 1))

  let numPages = clients.length / perPage

  if (numPages % 1 !== 0) {
    numPages = 1
  }

  const pagesList: number[] = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-[10%]">Tipe Sanksi</th>
            <th className="w-auto">Deskripsi</th>
            <th className="w-[25%]">Tanggal sanksi dimulai</th>
            <th className="w-[25%]">Tanggal sanksi selesai</th>
            <th className="w-[5%]" />
          </tr>
        </thead>
        <tbody>
          {clients?.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-6">
                <p className="text-gray-500 dark:text-slate-400">Data tidak ditemukan</p>
              </td>
            </tr>
          )}
          {clientsPaginated?.map((client: StudentPunishment, index: number) => {
            const punishmentAttachments = getPunishmentFiles(student.student_attachments)
            console.log(punishmentAttachments)
            return (
              <tr key={client.id}>
                <td data-label="Tipe Sanksi">{client.punishment_type}</td>
                <td data-label="Deskripsi" className="lg:w-32">
                  {client.description}
                </td>
                <td data-label="Tanggal sanksi dimulai">
                  {new Date(client.start_date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'UTC',
                  })}
                </td>
                <td data-label="Tanggal sanksi selesai">
                  {new Date(client.end_date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'UTC',
                  })}
                </td>
                <td className="before:hidden lg:w-1 whitespace-nowrap">
                  <Buttons type="justify-start lg:justify-end" noWrap>
                    <Button
                      color="info"
                      icon={mdiEye}
                      disabled={punishmentAttachments.length == 0}
                      onClick={() => {
                        dispatch(setStudent(student))
                        dispatch(setPunishmentAttachment(punishmentAttachments[0]))
                        dispatch(showViewerModal())
                      }}
                      small
                    />
                    <Tooltip element={'Upload File'} position="-left-7 -top-8">
                      <Button
                        color="contrast"
                        icon={mdiUpload}
                        disabled={punishmentAttachments.length != 0}
                        onClick={() => {
                          dispatch(setStudent(student))
                          dispatch(setType(client.punishment_type))
                          dispatch(showUploadModal())
                        }}
                        small
                      />
                    </Tooltip>
                  </Buttons>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={String(page + 1)}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Halaman {currentPage + 1} dari {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableBatchStudents
