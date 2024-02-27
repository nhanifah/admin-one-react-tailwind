import { mdiBallotOutline, mdiPlusBox } from '@mdi/js'
import Head from 'next/head'
import { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import TableBatch from '../../components/Table/Batch'
import Button from '../../components/Button'
import { useAppDispatch } from '../../stores/hooks'
import { showModal } from '../../stores/batchSlice'
import AddBatchModal from '../../components/Modals/AddBatchModal'
import BatchStudentsModal from '../../components/Modals/BatchStudentsModal'
import React from 'react'
import StudentDetailModal from '../../components/Modals/StudentDetailModal'
import EditBatchModal from '../../components/Modals/EditBatchModal'

const BatchList = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Batch')}</title>
      </Head>
      <AddBatchModal />
      <BatchStudentsModal />
      <StudentDetailModal />
      <EditBatchModal />

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Daftar Batch" main>
          <Button
            onClick={() => dispatch(showModal(null))}
            target="_blank"
            icon={mdiPlusBox}
            label="Tambahkan"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableBatch />
        </CardBox>
      </SectionMain>
    </>
  )
}

BatchList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default BatchList
