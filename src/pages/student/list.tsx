import { mdiBallotOutline, mdiPlusBox } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import StudentLists from '../../components/Table/StudentLists'
import StudentDetailModal from '../../components/Modals/StudentDetailModal'
import TranskripViewer from '../../components/Modals/TranskripViewer'
import UploadTranskripModal from '../../components/Modals/UploadTranskripModal'
import PunishmentModal from '../../components/Modals/PunishmentModal'
import AddNewStudentModal from '../../components/Modals/AddNewStudentModal'
import UpdateStudentModal from '../../components/Modals/UpdateStudentModal'
import Button from '../../components/Button'
import { useAppDispatch } from '../../stores/hooks'
import { showStudentAddModal } from '../../stores/batchSlice'

const StudentList = () => {
  const dispatch = useAppDispatch()
  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Siswa')}</title>
      </Head>

      <AddNewStudentModal />
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
        >
          <Button
          onClick={() => dispatch(showStudentAddModal())}
          target="_blank"
          icon={mdiPlusBox}
          label="Tambahkan Siswa"
          color="success"
          roundedFull
          small
        />
        </SectionTitleLineWithButton>

        <StudentLists progress={'dataSiswa'} />
      </SectionMain>
    </>
  )
}

StudentList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default StudentList
