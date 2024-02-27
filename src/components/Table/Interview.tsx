import { mdiEye, mdiPencil } from '@mdi/js'
import React, { useState } from 'react'
import { useBatchInterviewClients } from '../../hooks/requestData'
import Button from '../Button'
import Buttons from '../Buttons'
import { useAppDispatch } from '../../stores/hooks'
import { showEditModal } from '../../stores/interviewSlice'
import { setInterviewSchedules, setStudents } from '../../stores/interviewSlice'
import { useRouter } from 'next/navigation'
import { InterviewSchedules } from '../../interfaces'

const InterviewTable = () => {
  const { clients } = useBatchInterviewClients()
  const dispatch = useAppDispatch()

  const router = useRouter()

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
            <th>Waktu Interview</th>
            <th>Tempat Interview</th>
            <th>Batch</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clientsPaginated.map((data: InterviewSchedules, index: number) => (
            <tr key={data.id}>
              <td data-label="CreatedAt">
                <small className="text-gray-500 dark:text-slate-400">
                  {new Date(data.interview_date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
              </td>
              <td data-label="Correct">{data.interview_location}</td>
              <td data-label="Correct">{data?.batch_registration?.batch_name}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="warning"
                    icon={mdiPencil}
                    small
                    onClick={() => {
                      dispatch(setInterviewSchedules(data))
                      dispatch(showEditModal())
                    }}
                  />
                  <Button
                    color="info"
                    icon={mdiEye}
                    small
                    label={'Daftar Siswa'}
                    onClick={() => {
                      dispatch(setInterviewSchedules(data))
                      dispatch(setStudents(data.students))
                      router.push('/batch/interview/students')
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

export default InterviewTable
