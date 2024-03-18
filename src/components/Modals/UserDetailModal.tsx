import { mdiAccount, mdiBadgeAccount, mdiMail, mdiSecurity } from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import WideCardBoxModal from '../CardBox/WideModal'
import Divider from '../Divider'
import FormField from '../Form/Field'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeUserDetailModal } from '../../stores/batchSlice'
import Button from '../Button'
import { useMasterRoleClients, useUserManagerClients } from '../../hooks/requestData'
import { toast } from 'react-hot-toast'

export default function UserDetailModal() {
  const { clients } = useMasterRoleClients()
  const { updateUserManager, createUserManager } = useUserManagerClients()
  const userDetailModal = useAppSelector((state) => state.batch.userDetailModal)
  const user = useAppSelector((state) => state.batch.user)
  const dispatch = useAppDispatch()

  const handleModalAction = () => {
    dispatch(closeUserDetailModal())
    // Reset the form
  }

  const handleFormSubmit = async (values) => {
    // alert(values)
    const { status, data } =
      user.id.length > 0
        ? await updateUserManager({ id: user.id, ...values, password: null })
        : await createUserManager(values)

    console.log(status, data)
    if (status === 200) {
      dispatch(closeUserDetailModal())
      // toast
      toast.success('Berhasil memperbarui data')
      // Reset the form
    } else {
      // toast
      toast.error(data.message)
      console.log('error:', status, 'detail', data)
    }
  }

  const handleResetPassword = async (values) => {
    const { status, data } = await updateUserManager({ password: 'password', ...values })
    if (status === 200) {
      dispatch(closeUserDetailModal())
      // toast
      toast.success('Berhasil mereset password menjadi default yaitu "password"')
      // Reset the form
    } else {
      // toast
      toast.error(data.message)
      console.log('error:', status, 'detail', data)
    }
  }

  return (
    <WideCardBoxModal
      title="Biodata User"
      buttonColor="info"
      buttonLabel="Done"
      isActive={userDetailModal}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
      zIndex="z-50"
    >
      <Formik initialValues={user} onSubmit={(values) => handleFormSubmit(values)}>
        {({ setFieldValue, values }) => (
          <Form>
            <FormField label="Nama Lengkap" labelFor="name" icons={[mdiAccount]}>
              <Field name="name" placeholder="Nama Lengkap" id="name" />
            </FormField>

            <FormField label="Username" icons={[mdiBadgeAccount, mdiMail]}>
              <Field name="username" placeholder="Username" />
              <Field type="email" name="email" placeholder="Email" />
            </FormField>

            <FormField label="Hak Akses" labelFor="access" icons={[mdiSecurity]}>
              <Field name="master_roles.id" as="select" disabled={clients.length < 0}>
                <option value="" disabled>
                  Pilih Hak Akses
                </option>
                {clients.length > 0 ? (
                  clients.map((client) => {
                    return (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    )
                  })
                ) : (
                  <option value="" hidden>
                    Tidak ada opsi yang bisa dipilih
                  </option>
                )}
              </Field>
            </FormField>

            <Divider />

            <div className="grid gap-y-3">
              <Button type="submit" label="Simpan" color="info" full />
              {user.id.length > 0 ? (
                <Button
                  label="Reset Password"
                  color="danger"
                  full
                  onClick={() => handleResetPassword(user)}
                />
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </WideCardBoxModal>
  )
}
