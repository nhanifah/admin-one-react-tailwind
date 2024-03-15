import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiMail,
  mdiUpload,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import type { ReactElement } from 'react'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import CardBoxComponentBody from '../../components/CardBox/Component/Body'
import CardBoxComponentFooter from '../../components/CardBox/Component/Footer'
import FormField from '../../components/Form/Field'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import CardBoxUser from '../../components/CardBox/User'
import type { UserForm } from '../../interfaces'
import { getPageTitle } from '../../config'
import React from 'react'
import { useSession } from 'next-auth/react'
import { updateProfileSchema, passwordSchema } from '../../utils/validator'
import toast from 'react-hot-toast'
import { useAdminClients } from '../../hooks/requestData'

const ProfilePage = () => {
  const { data: session, update } = useSession()
  const { updateData, updatePassword } = useAdminClients()

  const userForm: UserForm = {
    name: session?.user?.name,
    email: session?.user?.email,
  }

  const handleSubmit = async (values) => {
    try {
      updateProfileSchema.parse(values)
    } catch (error) {
      console.log(error)
      toast.error(error.errors[0].message)
      return
    }

    const formData = {
      ...values,
      oldEmail: session?.user?.email,
    }

    const { status, data } = await updateData(formData)
    if (status == 200) {
      console.log(data)
      update({
        name: values.name,
        email: values.email,
      })
      toast.success('Berhasil edit data')
    } else {
      console.log(data.error.meta.target)
      if (data.error.code == 'P2002' && data.error.meta.target == 'email') {
        toast.error('Email sudah terdaftar')
        return
      }
      toast.error('Gagal edit data')
    }
  }

  const handlePasswordChange = async (values: any, { resetForm }) => {
    try {
      passwordSchema.parse(values)
    } catch (error) {
      console.log(error)
      toast.error(error.errors[0].message)
      return
    }

    const payload = {
      ...values,
      email: session?.user?.email,
    }

    const { status, data } = await updatePassword(payload)
    if (status == 200) {
      console.log(data)
      resetForm({
        values: {
          currentPassword: '',
          newPassword: '',
          newPasswordConfirmation: '',
        },
      })
      toast.success('Password berhasil diubah')
    } else {
      console.log(data)
      if (data.msg == 'Password salah!') {
        toast.error(data.msg)
        return
      }
      toast.error('Password gagal diubah')
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiAccount}
          title="Profile"
          main
        ></SectionTitleLineWithButton>

        <CardBoxUser className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <CardBox className="flex-1" hasComponentLayout>
              {session?.user ? (
                <Formik initialValues={userForm} onSubmit={handleSubmit}>
                  <Form className="flex flex-col flex-1">
                    <CardBoxComponentBody>
                      <FormField
                        label="Name"
                        help="Required. Your name"
                        labelFor="name"
                        icons={[mdiAccount]}
                      >
                        <Field name="name" id="name" placeholder="Name" />
                      </FormField>
                      <FormField
                        label="E-mail"
                        help="Required. Your e-mail"
                        labelFor="email"
                        icons={[mdiMail]}
                      >
                        <Field name="email" id="email" placeholder="E-mail" />
                      </FormField>
                    </CardBoxComponentBody>
                    <CardBoxComponentFooter>
                      <Buttons>
                        <Button color="info" type="submit" label="Submit" />
                      </Buttons>
                    </CardBoxComponentFooter>
                  </Form>
                </Formik>
              ) : (
                ''
              )}
            </CardBox>
          </div>

          <CardBox hasComponentLayout>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
              }}
              onSubmit={handlePasswordChange}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField
                    label="Current password"
                    help="Required. Your current password"
                    labelFor="currentPassword"
                    icons={[mdiAsterisk]}
                  >
                    <Field
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormField>

                  <Divider />

                  <FormField
                    label="New password"
                    help="Required. New password"
                    labelFor="newPassword"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>

                  <FormField
                    label="Confirm password"
                    help="Required. New password one more time"
                    labelFor="newPasswordConfirmation"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPasswordConfirmation"
                      id="newPasswordConfirmation"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  <Buttons>
                    <Button color="info" type="submit" label="Submit" />
                  </Buttons>
                </CardBoxComponentFooter>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </SectionMain>
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage
