import { mdiBallotOutline } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import AffiliateLists from '../../components/Table/AffiliateLists'
import AffiliateStudentLists from '../../components/Modals/AffiliateStudentLists'

const AffiliateList = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Affiliator')}</title>
      </Head>

      <AffiliateStudentLists />

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Daftar Affiliator"
          main
        ></SectionTitleLineWithButton>

        <AffiliateLists />
      </SectionMain>
    </>
  )
}

AffiliateList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AffiliateList
