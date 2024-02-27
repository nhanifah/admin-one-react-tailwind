import { mdiBallotOutline, mdiPlusBox } from '@mdi/js'
import Head from 'next/head'
import { ReactElement } from 'react'
import CardBox from '../../../components/CardBox'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import Button from '../../../components/Button'
import { useAppDispatch } from '../../../stores/hooks'
import React from 'react'
import InterviewTable from '../../../components/Table/Interview'
import { showAddModal } from '../../../stores/interviewSlice'
import AddInterviewSchedules from '../../../components/Modals/AddInterviewSchedules'
import EditInterviewModal from '../../../components/Modals/EditInterviewModal'

const Interview = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Head>
        <title>{getPageTitle('Jadwal Interview')}</title>
      </Head>

      <AddInterviewSchedules />
      <EditInterviewModal />

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Jadwal Interview" main>
          <Button
            onClick={() => dispatch(showAddModal())}
            target="_blank"
            icon={mdiPlusBox}
            label="Tambahkan Jadwal Interview"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <InterviewTable />
        </CardBox>
      </SectionMain>
    </>
  )
}

Interview.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Interview
