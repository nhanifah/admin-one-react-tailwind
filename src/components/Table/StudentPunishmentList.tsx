import { mdiEye } from '@mdi/js'
import React, { useState } from 'react'
import { useStudentClients } from '../../hooks/requestData'
import { Students } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import StudentAvatar from '../UserAvatar'
import { useAppDispatch } from '../../stores/hooks'
import { setStudent, showStudentDetailModal } from '../../stores/batchSlice'
import { setTranskripFiles, showTraskripModal } from '../../stores/studentSlice'
import { getTranskripFiles } from '../../utils/helpers'
import { showPunishmentListModal } from '../../stores/punishmentSlice'

const StudentPunishmentList = ({ progress }) => {
  const dispatch = useAppDispatch()
  const { clients } = useStudentClients(progress)

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  let numPages = clients.length / perPage

  if (numPages % 1 !== 0) {
    numPages = Math.floor(numPages) + 1
  }

  const pagesList: number[] = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th />
            <th>Nama</th>
            <th>Batch</th>
            <th>Jenis Pekerjaan</th>
            <th>Asrama</th>
            <th>Asal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-6">
                <p className="text-gray-500 dark:text-slate-400">Data tidak ditemukan</p>
              </td>
            </tr>
          )}
          {clientsPaginated.map((client: Students) => {
            let fotoAttachments: any[] = []
            fotoAttachments = client?.student_attachments?.filter((attachment) =>
              attachment.file_name.includes('foto_')
            )

            const transkripAttachments = getTranskripFiles(client.student_attachments)

            return (
              <tr key={client.id}>
                <td className="border-b-0 lg:w-6 before:hidden">
                  <StudentAvatar
                    imgUrl={
                      fotoAttachments.length != 0
                        ? fotoAttachments[0]['file_url']
                        : 'https://lpk-harehare.nos.jkt-1.neo.id/avatar.jpg'
                    }
                    alt={client.full_name}
                    className="w-24 h-24 mx-auto lg:w-6 lg:h-6"
                  />
                </td>
                <td data-label="Nama">{client.full_name}</td>
                <td data-label="Batch">{client?.batch_registration?.batch_name}</td>
                <td data-label="Jenis Pekerjaan" className="capitalize">
                  {client.want_to_work}
                </td>
                <td data-label="Asrama" className="lg:w-32">
                  {client.dormitory === 'yes' ? 'Iya' : 'Tidak'}
                </td>
                <td data-label="Asal">{client.province}</td>

                <td className="before:hidden lg:w-1 whitespace-nowrap">
                  <Buttons type="justify-start lg:justify-end" noWrap>
                    <Button
                      color="contrast"
                      label="Lihat Daftar Sanksi"
                      onClick={() => {
                        dispatch(setStudent(client))
                        dispatch(showPunishmentListModal())
                      }}
                      small
                    />
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

export default StudentPunishmentList
