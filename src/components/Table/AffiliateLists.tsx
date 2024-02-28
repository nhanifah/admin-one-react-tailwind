import { mdiEye } from '@mdi/js'
import React, { useState } from 'react'
import { useAffiliateClients } from '../../hooks/requestData'
import { Affiliates } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import WideCardBoxModal from '../CardBox/WideModal'
import { useAppDispatch } from '../../stores/hooks'
import { setStudentData, showModal } from '../../stores/affiliateSlice'

const AffiliateLists = () => {
  const dispatch = useAppDispatch()
  const { clients } = useAffiliateClients()

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

  const [isModalTrashActive, setIsModalTrashActive] = useState(false)


  const handleModalAction = () => {
    setIsModalTrashActive(false)
  }

  return (
    <>
      <WideCardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </WideCardBoxModal>

      <table>
        <thead>
          <tr>
            <th className='w-2'>#</th>
            <th>Nama</th>
            <th>Jumlah Calon Siswa</th>
            <th>Jumlah Siswa</th>
            <th>Jumlah Siswa Kaigo</th>
            <th className='w-32' />
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6">
                <p className="text-gray-500 dark:text-slate-400">Data tidak ditemukan</p>
              </td>
            </tr>
          )}
          {clientsPaginated.map((client: Affiliates, index: number) => {

            return (
              <tr key={client.id}>
                <td data-label="#">{index + 1}</td>
                <td data-label="Nama">{client.name}</td>
                <td data-label="Jumlah Calon Siswa">{client.students.length} Peserta</td>
                <td data-label="Jumlah Siswa">{client.students.filter((student) => student.progress === 'success').length} Peserta</td>
                <td data-label="Jumlah Siswa Kaigo">{
                  client.students.filter((student) => {
                    return student.progress === 'success' && student.want_to_work === 'nurse'
                  }).length} Peserta
                </td>
                <td data-label="Action">
                  <Buttons>
                    <Button
                      className='w-full'
                      label="Lihat"
                      icon={mdiEye}
                      color="contrast"
                      small
                      onClick={() => {
                        dispatch(setStudentData(client.students))
                        dispatch(showModal(true))
                      }}
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
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default AffiliateLists
