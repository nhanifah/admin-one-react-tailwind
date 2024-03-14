import { mdiBallotOutline, mdiPlusBox } from '@mdi/js'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import TablePsikotesQuest from '../../components/Table/PsikotesQuest'
import { setIsModalActive } from '../../stores/modalSlice'
import { useAppDispatch } from '../../stores/hooks'
import AddQuestionModal from '../../components/Modals/AddQuestionModal'
import React from 'react'

const QuestionBank = () => {
  const dispatch = useAppDispatch()

  dispatch(setIsModalActive(false))

  // const [isModalAddActive, setIsModalAddActive] = useState(false)
  const [isMultipleChoice, setIsMultipleChoice] = useState(false)
  const [isQuestTypeSelected, setIsQuestTypeSelected] = useState(false)

  const handleModalAction = () => {
    dispatch(setIsModalActive(false))
    // Reset the form
    setIsMultipleChoice(false)
    setIsQuestTypeSelected(false)
  }

  return (
    <>
      <AddQuestionModal />

      <Head>
        <title>{getPageTitle('Psikotes')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Bank Soal Psikotes" main>
          <Button
            onClick={() => dispatch(setIsModalActive(true))}
            target="_blank"
            icon={mdiPlusBox}
            label="Tambahkan"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <TablePsikotesQuest />
      </SectionMain>
    </>
  )
}

QuestionBank.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default QuestionBank
