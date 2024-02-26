import { mdiBallotOutline, mdiClockOutline, mdiBullhornVariant } from '@mdi/js'
import Head from 'next/head'
import { ReactElement } from 'react'
import CardBox from '../../../components/CardBox'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import Button from '../../../components/Button'
import { useAppDispatch, useAppSelector } from '../../../stores/hooks'
import { showModal } from '../../../stores/batchSlice'
import React from 'react'
import InterviewTable from '../../../components/Table/Interview'
import InterviewStudents from '../../../components/Table/InterviewStudents'
import { showBroadcastModal } from '../../../stores/interviewSlice'
import BroadcastModal from '../../../components/Modals/BroadcastModal'

const Interview = () => {
  const interviewSchedule = useAppSelector((state) => state.interview.interviewSchedules)
  const dispatch = useAppDispatch()

  return (
    <>
      <Head>
        <title>{getPageTitle('Jadwal Interview | Siswa')}</title>
      </Head>

      <BroadcastModal />

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Daftar Siswa" main>
          <div className="flex gap-3">
            <Button
              onClick={() => dispatch(showBroadcastModal())}
              target="_blank"
              icon={mdiBullhornVariant}
              label="Kirim Pesan Broadcast"
              color="warning"
              roundedFull
              small
            />
            <Button
              onClick={() => dispatch(showModal(null))}
              target="_blank"
              icon={mdiClockOutline}
              label="Ubah Jadwal Interview"
              color="contrast"
              roundedFull
              small
            />
          </div>
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <h3 className="text-base font-bold mb-4">
            <span>Jadwal Interview : </span>
            <span className="block custom-sm:inline">
              {new Date(interviewSchedule.interview_date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </h3>
          <InterviewStudents />
        </CardBox>
      </SectionMain>
    </>
  )
}

Interview.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Interview
