import { mdiEye, mdiTrashCan, mdiWhatsapp, mdiCurrencyUsd, mdiMail } from '@mdi/js'
import React, { useState } from 'react'
import { useStudentClients } from '../../hooks/requestData'
import { Students } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import WideCardBoxModal from '../CardBox/WideModal'
import StudentAvatar from '../UserAvatar'
import FormField from '../Form/Field'
import { Field, Form, Formik } from 'formik'
import Divider from '../../components/Divider'

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
      <WideCardBoxModal
        title="Biodata Siswa"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <Formik
          initialValues={{
            full_name: 'John Doe',
            email: 'john.doe@example.com',
            whatsapp: '083116448996',
            color: 'green',
            textarea: '',
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <Form>
            <FormField label="Nama Lengkap" labelFor="full_name">
              <Field name="full_name" placeholder="Nama Lengkap" id="full_name" />
            </FormField>

            <FormField label="Kontak" icons={[mdiWhatsapp, mdiMail]}>
              <Field name="whatsapp" placeholder="Whatsapp" disabled />
              <Field type="email" name="email" placeholder="Email" disabled />
            </FormField>

            <Divider />

            <FormField label="Alamat" labelFor="address">
              <Field name="phone" placeholder="Provinsi" id="phone" />
              <Field name="phone" placeholder="Kota / Kabupaten" id="phone" />
              <Field name="phone" placeholder="Kecamatan" id="phone" />
            </FormField>

            <FormField label="" help="Help line comes here">
              <Field name="phone" placeholder="Kelurahan / Desa" id="phone" />
            </FormField>

            <FormField label="" hasTextareaHeight>
              <Field name="textarea" as="textarea" placeholder="Alamat Lengkap" />
            </FormField>

            <Divider />

            <FormField label="Biodata Orangtua" icons={[mdiWhatsapp, mdiMail]}>
              <Field name="guardian_name" placeholder="Nama Orangtua" disabled />
              <Field name="guardian_phone" placeholder="Whatsapp Orangtua" disabled />
            </FormField>

            <Divider />
          </Form>
        </Formik>
      </WideCardBoxModal>

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
            <th />
            <th>Nama</th>
            <th>Batch</th>
            <th>Asrama</th>
            <th>Asal</th>
            <th />
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
          {clientsPaginated.map((client: Students) => {
            let fotoAttachments = []
            fotoAttachments = client.student_attachments.filter((attachment) =>
              attachment.file_name.includes('foto_')
            )

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
                      color="warning"
                      icon={mdiCurrencyUsd}
                      onClick={() => setIsModalInfoActive(true)}
                      small
                    />
                    <Button
                      color="success"
                      icon={mdiWhatsapp}
                      onClick={() => {
                        // sanitize phone number
                        let whatsapp = client.guardian_phone
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
