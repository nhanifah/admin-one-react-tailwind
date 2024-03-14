import { mdiBallotOutline } from '@mdi/js'
import Head from 'next/head'
import { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import TablePsikotesAnswer from '../../components/Table/PsikotesAnswer'
import React from 'react'
import Divider from '../../components/Divider'

const UserAnswers = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Jawaban Peserta')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Jawaban Peserta Belum Dinilai"
          main
        ></SectionTitleLineWithButton>

        <TablePsikotesAnswer checked="no" />
        <Divider />
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Jawaban Peserta Sudah Dinilai"
          main
        ></SectionTitleLineWithButton>
        <TablePsikotesAnswer checked="yes" />
      </SectionMain>
    </>
  )
}

UserAnswers.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default UserAnswers
