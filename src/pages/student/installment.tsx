import { mdiBallotOutline, mdiDownload, mdiMicrosoftExcel } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useRef } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import StudentLists from '../../components/Table/StudentLists'
import StudentDetailModal from '../../components/Modals/StudentDetailModal'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import { toast } from 'react-hot-toast'
import { useStudentClients } from '../../hooks/requestData'
import StudentInstallmentTable from '../../components/Table/StudentInstallment'
import StudentPayment from '../../components/Modals/StudentPayment'
import PaymentConfirm from '../../components/Modals/PaymentConfirm'

const StudentList = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Siswa')}</title>
      </Head>

      <StudentPayment />
      <PaymentConfirm />

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Daftar Siswa"
          main
        ></SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <StudentInstallmentTable progress={'dataSiswa'} />
        </CardBox>
      </SectionMain>
    </>
  )
}

StudentList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default StudentList
