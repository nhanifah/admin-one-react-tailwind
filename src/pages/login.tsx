import React from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import FormCheckRadio from '../components/Form/CheckRadio'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const router = useRouter()

  const handleSubmit = (formValues: LoginForm) => {
    router.push('/dashboard')
    console.log('Form values', formValues)
  }

  const initialValues: LoginForm = {
    email: 'john.doe',
    password: 'bG1sL9eQ1uD2sK3b',
    remember: true,
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <div className="flex justify-center">
        <div className="w-full sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-4/12 pt-10">
          <div className="">
            <img
              src="https://cdn.lpk-harehare.id/lpk_harehare.png"
              alt="LPK Harehare Indonesia"
              className="w-[225px] h-[225px] mx-auto"
            />
          </div>
          <CardBox className="">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <FormField label="Email  / Username" help="Masukan email atau username">
                  <Field name="email" className="text-2xl" />
                </FormField>

                <FormField label="Password">
                  <Field name="password" type="password" />
                </FormField>

                <Divider />

                <Buttons type="justify-center">
                  <Button
                    type="submit"
                    label="Login"
                    color="void"
                    className="bg-main-500 text-white px-20 py-3 text-xl rounded-lg font-semibold w-full"
                  />
                </Buttons>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </div>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default LoginPage
