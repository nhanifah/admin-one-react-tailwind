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
import { z, ZodError } from 'zod'; // Import Zod

// Define Zod schema for form validation
const LoginFormSchema = z.object({
  email: z.string().min(1, 'Masukan nama pengguna atau surel yang valid'),
  password: z.string().min(1, 'Katasandi tidak boleh kosong'),
});

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoaderCredentials, setShowLoaderCredentials] = useState(false);
  const [showLoaderGoogle, setShowLoaderGoogle] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoaderCredentials(true);

    try {
      // Validate form data using Zod schema
      LoginFormSchema.parse(userInfo);

      // If validation succeeds, attempt sign-in
      const result = await signIn('credentials', {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.errors.map((err) => err.message);
        toast.error(fieldErrors.join(' dan '));
      } else {
        console.error('Sign-in error:', error);
        toast.error('An error occurred while signing in');
      }
    } finally {
      setShowLoaderCredentials(false);
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setShowLoaderGoogle(true);
    console.log(userInfo);
    setTimeout(() => {
      setShowLoaderGoogle(false);
    }, 3000);
  }

  const handleChangeEmail = (event) => {
    setUserInfo({ ...userInfo, email: event.target.value });
  };

  const handleChangePassword = (event) => {
    setUserInfo({ ...userInfo, password: event.target.value });
  };

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
            <Formik initialValues={userInfo} onSubmit={handleSubmit}>
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
