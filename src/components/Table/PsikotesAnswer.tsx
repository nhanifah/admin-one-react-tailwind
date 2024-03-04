import { mdiEye } from '@mdi/js'
import React, { useState } from 'react'
import { useStudentPhyscotestAnswerClients } from '../../hooks/requestData'
import { StudentSikotes } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import AnswerModal from '../Modals/AnswerModal'
import { useAppDispatch } from '../../stores/hooks'
import { setIsModalActive } from '../../stores/modalSlice'
import { setAnswer, setStudentName, setStudentId } from '../../stores/answerSlice'

const TableSampleClients = ({ checked = 'no' }) => {
  const { clients, getAnswerByStudent } = useStudentPhyscotestAnswerClients(checked)
  const dispatch = useAppDispatch()

  const perPage = 50

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
      <AnswerModal />

      <table>
        <thead>
          <tr>
            <th>
              <center>#</center>
            </th>
            <th>Nama</th>
            <th>Nilai</th>
            <th>Dibuat</th>
            <th>Dikerjakan</th>
            {checked == 'yes' ? '' : <th />}
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 && (
            <tr>
              <td colSpan={6}>
                <center>Data tidak ditemukan</center>
              </td>
            </tr>
          )}
          {clientsPaginated.map((data: StudentSikotes, index: number) => (
            <tr key={data.id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <td data-label="Number">{index + 1}</td>
              </td>
              <td data-label="Name">{data.students.full_name}</td>
              <td data-label="Correct">
                {data.checked != 'no' ? data.total_points : 'Belum Diperiksa'}
              </td>
              <td data-label="CreatedAt" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">
                  {new Date(data.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </small>
              </td>
              <td data-label="UpdatedAt" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">
                  {new Date(data.updated_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </small>
              </td>
              {checked == 'yes' ? (
                ''
              ) : (
                <td className="before:hidden lg:w-1 whitespace-nowrap">
                  <Buttons type="justify-start lg:justify-end" noWrap>
                    <Button
                      color="info"
                      icon={mdiEye}
                      onClick={async () => {
                        const response = await getAnswerByStudent(data.student_id)
                        dispatch(setAnswer(response.data))
                        dispatch(setStudentName(data.students.full_name))
                        dispatch(setStudentId(data.students.id))
                        console.log(response)
                        dispatch(setIsModalActive(true))
                      }}
                      small
                    />
                  </Buttons>
                </td>
              )}
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
            Halaman {currentPage + 1} dari {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSampleClients
