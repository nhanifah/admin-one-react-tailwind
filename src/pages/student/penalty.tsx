import { mdiBallotOutline, mdiDownload, mdiMicrosoftExcel } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useRef } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import StudentPunishmentList from '../../components/Table/StudentPunishmentList'
import PunishmentListModal from '../../components/Modals/PunishmentListModal'
import UploadPunishmentAttachment from '../../components/Modals/UploadPunishmentAttachment'
import PunishmentAttachmentViewer from '../../components/Modals/PunishmentAttachmentViewer'

const StudentPenalty = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Siswa Terkena Sanksi')}</title>
      </Head>

      <PunishmentListModal />
      <UploadPunishmentAttachment />
      <PunishmentAttachmentViewer />

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Daftar Siswa Terkena Sanksi"
          main
        ></SectionTitleLineWithButton>

        <StudentPunishmentList progress={'punishments'} />
      </SectionMain>
    </>
  )
}

StudentPenalty.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default StudentPenalty
