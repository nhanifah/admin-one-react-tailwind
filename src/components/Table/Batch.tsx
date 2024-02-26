import { mdiEye } from '@mdi/js'
import React, { useState } from 'react'
import { useBatchClients } from '../../hooks/requestData'
import Button from '../Button'
import Buttons from '../Buttons'
import AnswerModal from '../Modals/AnswerModal'
import { useAppDispatch } from '../../stores/hooks'
import { setIsModalActive } from '../../stores/modalSlice'
import { selectBatch, showModalStudents } from '../../stores/batchSlice'

const TableBatch = () => {
  const { clients } = useBatchClients()
  const dispatch = useAppDispatch()

  const perPage = 50

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

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
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kuota</th>
            <th>Tanggal Ditutup</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clientsPaginated.map((data, index: number) => (
            <tr key={data.id}>
              <td data-label="Name">{data.batch_name}</td>
              <td data-label="Correct">{data.quota}</td>
              <td data-label="CreatedAt" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">
                  {new Date(data.end_date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    small
                    onClick={() => {
                      dispatch(selectBatch(data))
                      dispatch(showModalStudents(null))
                    }}
                  />
                </Buttons>
              </td>
            </tr>
          ))}
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
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableBatch
