import { mdiPencil, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useUserManagerClients } from '../../hooks/requestData'
import { User } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import { useAppDispatch } from '../../stores/hooks'
import { setUser, showUserDetailModal } from '../../stores/batchSlice'
import { toast } from 'react-hot-toast'

const UserLists = () => {
  const dispatch = useAppDispatch()
  const { clients, deleteUserManager } = useUserManagerClients()

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

  const handleDelete = async (user: User) => {
    const { status, data } = await deleteUserManager(user.id)
    data
    if (status == 200) {
      toast.success('User berhasil dihapus')
    } else {
      toast.error('User gagal dihapus')
    }
  }

  return (
    <>
      <table className="">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Username</th>
            <th>Email</th>
            <th>Hak Akses</th>
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
          {clientsPaginated.map((client: User) => {
            return (
              <tr key={client.id}>
                <td data-label="Nama">{client.name}</td>
                <td data-label="Username">{client.username}</td>
                <td data-label="Email" className="">
                  {client.email}
                </td>
                <td data-label="Hak Akses">{client.master_roles.name}</td>
                {/* <td data-label="Progress" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{client.created}</small>
              </td> */}
                <td className="before:hidden lg:w-1 whitespace-nowrap">
                  <Buttons type="justify-start lg:justify-end" noWrap>
                    <Button
                      color="info"
                      icon={mdiPencil}
                      onClick={() => {
                        dispatch(setUser(client))
                        dispatch(showUserDetailModal())
                      }}
                      small
                    />
                    <Button
                      color="danger"
                      icon={mdiTrashCan}
                      onClick={(e: React.MouseEvent) => {
                        switch (e.detail) {
                          case 1:
                            toast('Double klik untuk menghapus user', {
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
                            handleDelete(client)
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

export default UserLists
