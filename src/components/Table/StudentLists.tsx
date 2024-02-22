import { mdiEye, mdiTrashCan, mdiWhatsapp } from '@mdi/js'
import React, { useState } from 'react'
import { useStudentClients } from '../../hooks/requestData'
import { Students } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import StudentAvatar from '../UserAvatar'

const StudentLists = () => {
  const { clients } = useStudentClients()

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  let numPages = clients.length / perPage

  if (numPages % 1 !== 0) {
    numPages = Math.floor(numPages) + 1
  }

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
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
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th />
            <th>Nama</th>
            <th>Batch</th>
            <th>Asrama</th>
            <th>Asal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            clients.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  <p className="text-gray-500 dark:text-slate-400">Data tidak ditemukan</p>
                </td>
              </tr>
            )
          }
          {clientsPaginated.map((client: Students) => (
            <tr key={client.id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <StudentAvatar imgUrl="https://lpk-harehare.nos.jkt-1.neo.id/foto_190224_3578281009000002.png" alt={client.full_name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td>
              <td data-label="Nama">{client.full_name}</td>
              <td data-label="Batch">{client.batch_registration.batch_name}</td>
              <td data-label="Asrama" className="lg:w-32">
                {client.dormitory === 'yes' ? 'Iya' : 'Tidak'}
              </td>
              <td data-label="Asal">{client.province}</td>
              {/* <td data-label="Progress" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{client.created}</small>
              </td> */}
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="success"
                    icon={mdiWhatsapp}
                    onClick={() => {
                      // sanitize phone number
                      let whatsapp = client.guardian_phone
                      if (whatsapp.charAt(0) === '+') {
                        whatsapp = whatsapp.substring(1);
                      }
                      whatsapp = whatsapp.replace(/[\s\-_.,]/g, '');
                      if (whatsapp.startsWith('08')) {
                        whatsapp = '62' + whatsapp.substring(1);
                      }

                      window.open(`https://wa.me/${whatsapp}`)
                    }}
                    small
                  />
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
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
                label={page + 1}
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

export default StudentLists
