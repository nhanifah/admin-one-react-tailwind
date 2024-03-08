import { mdiBallotOutline } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import StudentDetailModal from '../../components/Modals/StudentDetailModal'
import StudentAgreementTable from '../../components/Table/StudentAgreementTable'
import UploadModal from '../../components/Modals/UploadModal'
import FileViewer from '../../components/Modals/FileViewer'

const StudentAgreement = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Siswa')}</title>
      </Head>

      <StudentDetailModal />
      <FileViewer />
      <UploadModal />

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Daftar Siswa"
          main
        ></SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <StudentAgreementTable />
        </CardBox>
      </SectionMain>
    </>
  )
}

StudentAgreement.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default StudentAgreement
