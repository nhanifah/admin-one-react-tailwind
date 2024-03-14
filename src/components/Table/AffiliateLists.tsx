import { mdiEye } from '@mdi/js'
import React, { useMemo, useState } from 'react'
import { useAffiliateClients } from '../../hooks/requestData'
import { Affiliates } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import WideCardBoxModal from '../CardBox/WideModal'
import { useAppDispatch } from '../../stores/hooks'
import { setStudentData, showModal } from '../../stores/affiliateSlice'
import { searchFunction } from '../../utils/helpers'
import CardBox from '../CardBox'

const AffiliateLists = () => {
  const dispatch = useAppDispatch()
  const { clients } = useAffiliateClients()
  const [query, setQuery] = useState('')

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
              <th className="w-2">#</th>
              <th>Nama</th>
              <th>Jumlah Calon Siswa</th>
              <th>Jumlah Siswa</th>
              <th>Jumlah Siswa Kaigo</th>
              <th className="w-32" />
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
                  <td data-label="Jumlah Calon Siswa">
                    {client.students.filter((student) => student.progress != 'success').length}{' '}
                    Peserta
                  </td>
                  <td data-label="Jumlah Siswa">
                    {client.students.filter((student) => student.progress === 'success').length}{' '}
                    Peserta
                  </td>
                  <td data-label="Jumlah Siswa Kaigo">
                    {
                      client.students.filter((student) => {
                        return student.progress === 'success' && student.want_to_work === 'nurse'
                      }).length
                    }{' '}
                    Peserta
                  </td>
                  <td data-label="Action">
                    <Buttons>
                      <Button
                        className="w-full"
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
              Halaman {currentPage + 1} dari {numPages}
            </small>
          </div>
        </div>
      </CardBox>
    </>
  )
}

export default AffiliateLists
