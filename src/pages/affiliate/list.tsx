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

const AffiliateList = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Affiliator')}</title>
      </Head>

      <StudentDetailModal />

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Daftar Affiliator"
          main
        ></SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <StudentLists progress={'success'} />
        </CardBox>
      </SectionMain>
    </>
  )
}

AffiliateList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AffiliateList
