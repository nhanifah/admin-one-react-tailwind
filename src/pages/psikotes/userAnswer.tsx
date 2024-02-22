import { mdiBallotOutline } from '@mdi/js'
import Head from 'next/head'
import { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import TablePsikotesAnswer from '../../components/Table/PsikotesAnswer'

const UserAnswers = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Jawaban Peserta')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBallotOutline}
          title="Jawaban Peserta"
          main
        ></SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TablePsikotesAnswer />
        </CardBox>
      </SectionMain>
    </>
  )
}

UserAnswers.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default UserAnswers
