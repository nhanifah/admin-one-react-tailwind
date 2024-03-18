import { mdiEye, mdiWhatsapp } from '@mdi/js'
import React, { useEffect, useMemo, useState } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import {
  addStudentId,
  popStudentId,
  resetStudentId,
  setStudent,
  setStudentsSelected,
  showStudentDetailModal,
} from '../../stores/batchSlice'
import { BatchStudents, Students } from '../../interfaces'
import StudentAvatar from '../UserAvatar'
import axios from 'axios'
import { searchFunction } from '../../utils/helpers'
import { useBatchClientsById } from '../../hooks/requestData'

const TableBatchStudents = () => {
  const selectedBatch = useAppSelector((state) => state.batch.batch_selected)
  const { clients, isLoading } = useBatchClientsById(selectedBatch.id)
  const [showAll, setShowAll] = useState(true)
  const [query, setQuery] = useState('')
  const selectedStudentsId = useAppSelector((state) => state.batch.selectedStudentsId)

  // const { clients } = useBatchStudentsClients(selectedBatch.id)
  const [checkAll, setCheckAll] = useState(false)

  const dispatch = useAppDispatch()

  const perPage = 50

  const [currentPage, setCurrentPage] = useState(0)

  const filteredByProgress = useMemo(() => {
    if (showAll) {
      return clients
    }
    return clients.filter((student) => student.progress === 'success')
  }, [showAll])

  const filteredClients: any = useMemo(
    () => searchFunction(filteredByProgress, query),
    [filteredByProgress, query]
  )

  const clientsPaginated = filteredClients?.slice(
    perPage * currentPage,
    perPage * (currentPage + 1)
  )

  let numPages = filteredByProgress.length / perPage

  if (numPages % 1 !== 0) {
    numPages = 1
  }

  const pagesList: number[] = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  useEffect(() => {
    setCheckAll(selectedStudentsId.length >= filteredClients.length)
  }, [filteredClients, selectedStudentsId])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    if (selectedStudentsId.includes(id)) {
      dispatch(popStudentId(id))
    } else {
      dispatch(addStudentId(id))
      console.log('add')
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 items-center ">
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
        <div className="col-end-5">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Tampilkan semua siswa
            </span>
          </label>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  setCheckAll(e.target.checked)
                  if (e.target.checked) dispatch(resetStudentId())
                  filteredClients.map((item) => {
                    if (e.target.checked) {
                      dispatch(addStudentId(item.id))
                    } else {
                      dispatch(resetStudentId())
                    }
                  })
                }}
                checked={checkAll}
              />
            </th>
            <th />
            <th>Nama</th>
            <th>Asrama</th>
            <th>Asal</th>
            <th>Progress</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredByProgress?.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-6">
                <p className="text-gray-500 dark:text-slate-400">Data tidak ditemukan</p>
              </td>
            </tr>
          )}
          {clientsPaginated?.map((client: Students, index: number) => {
            let fotoAttachments: any[] = []
            fotoAttachments = client?.student_attachments?.filter((attachment) =>
              attachment.file_name.includes('foto_')
            )
            return (
              <tr key={client.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudentsId.includes(client.id)}
                    onChange={(e) => handleCheck(e, client.id)}
                  />
                </td>
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
                <td data-label="Asrama" className="lg:w-32">
                  {client.dormitory === 'yes' ? 'Iya' : 'Tidak'}
                </td>
                <td data-label="Asal">{client.province}</td>
                <td data-label="Asal">{client.progress}</td>
                <td className="before:hidden lg:w-1 whitespace-nowrap">
                  <Buttons type="justify-start lg:justify-end" noWrap>
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
                    <Button
                      color="info"
                      icon={mdiEye}
                      onClick={() => {
                        dispatch(setStudent(client))
                        dispatch(showStudentDetailModal())
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

export default TableBatchStudents
