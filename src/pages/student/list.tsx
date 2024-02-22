import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import FormCheckRadio from '../../components/Form/CheckRadio'
import FormCheckRadioGroup from '../../components/Form/CheckRadioGroup'
import FormField from '../../components/Form/Field'
import FormFilePicker from '../../components/Form/FilePicker'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitle from '../../components/Section/Title'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import StudentLists from "../../components/Table/StudentLists";

const StudentList = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Daftar Siswa')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiBallotOutline} title="Daftar Siswa" main>
                </SectionTitleLineWithButton>

                <CardBox className="mb-6" hasTable>
                    <StudentLists />
                </CardBox>
            </SectionMain>
        </>
    )
}

StudentList.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default StudentList
