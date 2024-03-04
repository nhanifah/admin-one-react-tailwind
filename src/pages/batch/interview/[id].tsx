import {
  mdiBallotOutline,
  mdiClockOutline,
  mdiBullhornVariant,
  mdiUpdate,
  mdiFileSign,
} from '@mdi/js'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import CardBox from '../../../components/CardBox'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import Button from '../../../components/Button'
import { useAppDispatch, useAppSelector } from '../../../stores/hooks'
import React from 'react'
import InterviewStudents from '../../../components/Table/InterviewStudents'
import {
  showBroadcastModal,
  showContractModal,
  showProgressModal,
  showUpdateModal,
} from '../../../stores/interviewSlice'
import BroadcastModal from '../../../components/Modals/BroadcastModal'
import UpdateInterviewScheduleModal from '../../../components/Modals/UpdateInterviewSchedule'
import UpdateProgress from '../../../components/Modals/UpdateProgress'
import StudentDetailModal from '../../../components/Modals/StudentDetailModal'
import ContractModal from '../../../components/Modals/ContractModal'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import {
  useInterviewScheduleByIdClients,
  useInterviewScheduleClients,
} from '../../../hooks/requestData'

const Interview = () => {
  const router = useRouter()
  const { id } = router.query
  const { interviewSchedule } = useInterviewScheduleByIdClients(id)
  // const interviewSchedule = useAppSelector((state) => state.interview.interviewSchedules)
  const dispatch = useAppDispatch()

  return (
    <>
      <Head>
        <title>{getPageTitle('Jadwal Interview | Siswa')}</title>
      </Head>

      <BroadcastModal />
      <UpdateInterviewScheduleModal />
      <UpdateProgress />
      <StudentDetailModal />
      <ContractModal />

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Daftar Siswa" main>
          <div className="grid grid-cols-1 custom-sm:grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-4">
            <Button
              onClick={() => dispatch(showContractModal())}
              target="_blank"
              icon={mdiFileSign}
              label="Buat Kontrak"
              color="success"
              roundedFull
              small
            />
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
              onClick={() => dispatch(showUpdateModal())}
              target="_blank"
              icon={mdiClockOutline}
              label="Ubah Jadwal Interview"
              color="contrast"
              roundedFull
              small
            />
            <Button
              onClick={() => dispatch(showProgressModal())}
              target="_blank"
              icon={mdiUpdate}
              label="Ubah Progress Siswa"
              color="info"
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
                timeZone: 'UTC',
              })}
            </span>
          </h3>
          <InterviewStudents selectedStudents={interviewSchedule.students} />
        </CardBox>
      </SectionMain>
    </>
  )
}

Interview.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Interview
