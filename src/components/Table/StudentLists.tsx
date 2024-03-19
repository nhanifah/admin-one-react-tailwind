import {
  mdiEye,
  mdiPoliceBadge,
  mdiWhatsapp,
  mdiPencil,
  mdiDownload,
  mdiMicrosoftExcel,
} from '@mdi/js'
import React, { useMemo, useRef, useState } from 'react'
import { useStudentClients } from '../../hooks/requestData'
import { Students } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import StudentAvatar from '../UserAvatar'
import { useAppDispatch } from '../../stores/hooks'
import { setStudent, showStudentDetailModal } from '../../stores/batchSlice'
import { setTranskripFiles, showTraskripModal } from '../../stores/studentSlice'
import { getTranskripFiles, searchFunction } from '../../utils/helpers'
import { showPunishmentModal } from '../../stores/punishmentSlice'
import toast from 'react-hot-toast'
import CardBox from '../CardBox'

const StudentLists = ({ progress }) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const { postFile } = useStudentClients('success')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const formData = new FormData()
      formData.append('file', file)
      const res = await postFile(formData)
      // console.log(res);

      if (res.status == 'success') {
        toast.success(res.message)
      } else {
        console.log(res)
        toast.error('Gagal mengimpor data')
      }

      // reset the input
      e.target.value = ''
    }
  }

  const [query, setQuery] = useState('')

  const dispatch = useAppDispatch()
  const { clients } = useStudentClients(progress)

  const perPage = 5

  const filteredClients: any = useMemo(() => searchFunction(clients, query), [clients, query])

  const [currentPage, setCurrentPage] = useState(0)

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
      <form className="hidden">
        <input type="file" name="file" ref={fileRef} onChange={handleFileChange} />
      </form>
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
        <div className="custom-lg:col-span-2 col-span-3 ">
          <Buttons className="w-full grid grid-cols-3 custom-lg:flex custom-lg:justify-end">
            <Button
              href="https://lpk-harehare.nos.jkt-1.neo.id/Import%20File%20-%20Siswa%20LPK.xlsx"
              icon={mdiDownload}
              label="Unduh Sampel Excel"
              color="contrast"
              roundedFull
              small
              className="min-w-[180px] sm:col-span-1 col-span-3"
            />
            <Button
              onClick={() => {
                fileRef.current && fileRef.current.click()
              }}
              icon={mdiMicrosoftExcel}
              label="Impor dari Excel"
              color="success"
              roundedFull
              small
              className="min-w-[180px] sm:col-span-1 col-span-3"
            />
            <Button
              target="_blank"
              icon={mdiMicrosoftExcel}
              label="Ekspor ke Excel"
              color="info"
              roundedFull
              small
              className="min-w-[180px] sm:col-span-1 col-span-3"
              disabled
            />
          </Buttons>
        </div>
      </div>

      <CardBox className="mb-6 mt-4" hasTable>
        <table>
          <thead>
            <tr>
              <th />
              <th>Nama</th>
              <th>Batch</th>
              <th>Jenis Pekerjaan</th>
              <th>Asrama</th>
              <th>Asal</th>
              <th>Progress</th>
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
                  <td
                    className="cursor-pointer"
                    data-label="Nama"
                    onClick={() => {
                      dispatch(setStudent(client))
                      dispatch(showStudentDetailModal())
                    }}
                  >
                    {client.full_name}
                  </td>
                  <td data-label="Batch">{client?.batch_registration?.batch_name}</td>
                  <td data-label="Jenis Pekerjaan" className="capitalize">
                    {client.want_to_work}
                  </td>
                  <td data-label="Asrama" className="lg:w-32">
                    {client.dormitory === 'yes' ? 'Iya' : 'Tidak'}
                  </td>
                  <td data-label="Asal">{client.province}</td>
                  <td data-label="Progress">{client.progress}</td>
                  {/* <td data-label="Progress" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{client.created}</small>
              </td> */}
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end" noWrap>
                      {progress != 'registering' && (
                        <Button
                          color="warning"
                          icon={mdiPencil}
                          onClick={() => {}}
                          small
                          disabled
                        />
                      )}

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
                      {progress != 'registering' && (
                        <Button
                          color="danger"
                          icon={mdiPoliceBadge}
                          onClick={() => {
                            dispatch(setStudent(client))
                            dispatch(showPunishmentModal())
                          }}
                          small
                        />
                      )}
                      <Button
                        color="contrast"
                        label="Lihat transkrip"
                        onClick={() => {
                          dispatch(setTranskripFiles(transkripAttachments[0]))
                          dispatch(setStudent(client))
                          dispatch(showTraskripModal())
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
      </CardBox>
    </>
  )
}

export default StudentLists
