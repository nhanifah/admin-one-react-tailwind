import { mdiPencil, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useMasterRoleClients } from '../../hooks/requestData'
import Button from '../Button'
import Buttons from '../Buttons'
import { useAppDispatch } from '../../stores/hooks'
import { setUser, showUserDetailModal } from '../../stores/batchSlice'
import { toast } from 'react-hot-toast'
import { setSelectedRoleId } from '../../stores/RoleSlice'
import { showUpdateModal } from '../../stores/RoleSlice'

const RoleTable = () => {
  const dispatch = useAppDispatch()
  const { clients, deleteRole } = useMasterRoleClients()

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

  const handleDelete = async (id: string) => {
    const { status } = await deleteRole({ id })
    if (status == 200) {
      toast.success('Role berhasil dihapus')
    } else {
      toast.error('Role gagal dihapus')
    }
  }

  return (
    <>
      <div className="w-full overflow-scroll no-scrollbar ">
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Nama Role</th>
              <th>Izin</th>
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
            {clientsPaginated.map((client) => {
              return (
                <tr key={client.id}>
                  <td data-label="Nama Role">{client.name}</td>
                  <td data-label="Izin" className="flex flex-wrap gap-4 justify-start ">
                    {client.access.map((access) => {
                      return (
                        <span
                          key={access}
                          className="text-xs text-black dark:text-slate-400 bg-yellow-300 p-2 rounded-lg mx-1"
                        >
                          {access}
                        </span>
                      )
                    })}
                  </td>

                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end" noWrap>
                      <Button
                        color="info"
                        icon={mdiPencil}
                        onClick={() => {
                          dispatch(setSelectedRoleId(client.id))
                          dispatch(showUpdateModal())
                        }}
                        small
                      />
                      <Button
                        color="danger"
                        icon={mdiTrashCan}
                        onClick={(e: React.MouseEvent) => {
                          switch (e.detail) {
                            case 1:
                              toast('Double klik untuk menghapus Role', {
                                icon: '⚠️',
                                style: {
                                  borderRadius: '10px',
                                  background: '#DC2626',
                                  color: '#fff',
                                },
                              })
                              break
                            case 2:
                              toast.dismiss()
                              handleDelete(client.id)
                              break
                          }
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
      </div>
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

export default RoleTable
