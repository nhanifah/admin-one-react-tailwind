import { mdiEye, mdiUpload, mdiWhatsapp, mdiCurrencyUsd } from '@mdi/js'
import React, { useMemo, useState } from 'react'
import { useStudentClients } from '../../hooks/requestData'
import { Students } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import WideCardBoxModal from '../CardBox/WideModal'
import StudentAvatar from '../UserAvatar'
import { useAppDispatch } from '../../stores/hooks'
import { setStudent, showStudentDetailModal } from '../../stores/batchSlice'
import { setContractFiles, showContractModal, showUploadModal } from '../../stores/studentSlice'
import Tooltip from '../Tooltip'
import { getContractFiles, searchFunction } from '../../utils/helpers'
import CardBox from '../CardBox'

const StudentAgreementList = ({ progress = 'contract' }) => {
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState('')
  const { clients } = useStudentClients(progress)

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const filteredClients: any = useMemo(() => searchFunction(clients, query), [clients, query])
  const clientsPaginated = filteredClients.slice(perPage * currentPage, perPage * (currentPage + 1))

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
      <div className="grid grid-cols-3 gap-4 items-start">
        <form className="custom-lg:col-span-1 col-span-3 ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari . . ."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
      <CardBox className="mb-6 mt-4" hasTable>
        <table>
          <thead>
            <tr>
              <th />
              <th>Nama</th>
              <th>Batch</th>
              <th>Asrama</th>
              <th>Asal</th>
              <th>Progress</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  <p className="text-gray-500 dark:text-slate-400">Data tidak ditemukan</p>
                </td>
              </tr>
            )}
            {clientsPaginated.map((client: Students) => {
              let fotoAttachments: any[] = []
              fotoAttachments = client?.student_attachments?.filter((attachment) =>
                attachment.file_name.includes('foto_')
              )

              const contractAttachments = getContractFiles(client.student_attachments)

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
                  <td data-label="Asrama" className="lg:w-32">
                    {client.dormitory === 'yes' ? 'Iya' : 'Tidak'}
                  </td>
                  <td data-label="Asal">{client.province}</td>
                  <td data-label="Asal">{client.progress}</td>
                  {/* <td data-label="Progress" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{client.created}</small>
              </td> */}
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end" noWrap>
                      <Tooltip element={'whatsapp'} position="-top-8 -left-5">
                        <Button
                          color="success"
                          icon={mdiWhatsapp}
                          onClick={() => {
                            // sanitize phone number
                            let whatsapp = client.whatsapp_number
                            if (whatsapp.charAt(0) === '+') {
                              whatsapp = whatsapp.substring(1)
                            }
                            whatsapp = whatsapp.replace(/[\s\-_.,]/g, '')
                            if (whatsapp.startsWith('08')) {
                              whatsapp = '62' + whatsapp.substring(1)
                            }

                            window.open(`https://wa.me/${whatsapp}`)
                          }}
                          small
                        />
                      </Tooltip>

                      <Tooltip element={'Lihat'} position="-top-8 -left-2">
                        <Button
                          disabled={contractAttachments.length == 0}
                          color="info"
                          icon={mdiEye}
                          onClick={() => {
                            dispatch(setStudent(client))
                            dispatch(setContractFiles(contractAttachments[0]))
                            dispatch(showContractModal())
                          }}
                          small
                        />
                      </Tooltip>
                      <Tooltip element={'Upload'}>
                        <Button
                          color="contrast"
                          icon={mdiUpload}
                          disabled={contractAttachments.length != 0}
                          onClick={() => {
                            dispatch(setStudent(client))
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
      </CardBox>
    </>
  )
}

export default StudentAgreementList
