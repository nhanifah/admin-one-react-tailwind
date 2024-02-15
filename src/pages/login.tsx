import React from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import { mdiGoogle, mdiLogin } from '@mdi/js'
import {signIn, useSession} from "next-auth/react";
import { toast } from "react-hot-toast";
import { useState } from "react";

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [showLoaderCredentials, setShowLoaderCredentials] = useState(false);
  const [showLoaderGoogle, setShowLoaderGoogle] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    // router.push('/dashboard')
    e.preventDefault();
    setShowLoaderCredentials(true);
    console.log(userInfo);
    setTimeout(() => {
      setShowLoaderCredentials(false);
    }, 1000);

    // validate user credentials
    // if valid, redirect to dashboard
    // else, show error message
    signIn('credentials', {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
    }).then(({ok, error}) => {
        if (ok) {
            router.push('/dashboard');
        } else {
            console.log(error);
            toast.error(error);
        }
    })
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setShowLoaderGoogle(true);
    console.log(userInfo);
    setTimeout(() => {
      setShowLoaderGoogle(false);
    }, 3000);
  }

  if (session) {
    router.push('/dashboard')
  }

  const handleChangeEmail = (event) => {
    setUserInfo({ email: event.target.value, password: userInfo.password });
  }

    const handleChangePassword = (event) => {
        setUserInfo({ email: userInfo.email, password: event.target.value });
    }

  const initialValues: LoginForm = {
    email: null,
    password: null,
    remember: true,
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Masuk')}</title>
      </Head>

      <div className="flex min-h-screen justify-center">
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
                <FormField label="Surel  / Nama pengguna" help="Masukan surel atau nama pengguna">
                  <Field
                    name="email"
                    className="text-2xl"
                    placeholder="Surat Elektronik / Nama Pengguna"
                    onChange={handleChangeEmail}
                    value={userInfo.email}
                  />
                </FormField>

                <FormField label="Katasandi">
                  <Field
                      name="password"
                      type="password"
                      placeholder="Katasandi"
                      onChange={handleChangePassword}
                      value={userInfo.password}
                  />
                </FormField>

                <Divider />

                <Buttons type="justify-center">
                  <Button
                    type="submit"
                    label="Masuk"
                    icon={mdiLogin}
                    iconSize={24}
                    loading={showLoaderCredentials}
                    color="void"
                    className="bg-main-500 text-white px-20 py-3 text-xl rounded-lg font-semibold w-full"
                    onClick={handleSubmit}
                    disabled={showLoaderCredentials}
                  />
                </Buttons>
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-gray-400">or with</span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <Buttons type="justify-center">
                  <Button
                    type="submit"
                    icon={mdiGoogle}
                    label="Google"
                    loading={showLoaderGoogle}
                    onClick={handleGoogleLogin}
                    disabled={showLoaderGoogle}
                    color="void"
                    iconSize={24}
                    className=" border border-main-500 text-main-500 px-20 py-3 text-xl rounded-lg font-semibold w-full"
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
