import { mdiBallotOutline } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import StudentLists from '../../components/Table/StudentLists'
import StudentDetailModal from '../../components/Modals/StudentDetailModal'
import TranskripViewer from '../../components/Modals/TranskripViewer'
import UploadTranskripModal from '../../components/Modals/UploadTranskripModal'
import PunishmentModal from '../../components/Modals/PunishmentModal'
import UpdateStudentModal from '../../components/Modals/UpdateStudentModal'

const StudentList = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Siswa')}</title>
      </Head>

      <UpdateStudentModal />
      <StudentDetailModal />
      <TranskripViewer />
      <UploadTranskripModal />
      <PunishmentModal />

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Daftar Siswa"
          main
        ></SectionTitleLineWithButton>

        <StudentLists progress={'dataSiswa'} />
      </SectionMain>
    </>
  )
}

StudentList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default StudentList
