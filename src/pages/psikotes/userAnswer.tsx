import { mdiBallotOutline, mdiChatQuestion, mdiScoreboard, mdiWrench, mdiPlusCircle } from '@mdi/js'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import TablePsikotesAnswer from '../../components/Table/PsikotesAnswer'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import FormOptionSoal from '../../components/Form/OptionSoal'

const UserAnswers = () => {
  const [isModalAddActive, setIsModalAddActive] = useState(false)
  const [isMultipleChoice, setIsMultipleChoice] = useState(false)
  const [isQuestTypeSelected, setIsQuestTypeSelected] = useState(false)

  const handleModalAction = () => {
    setIsModalAddActive(false)
    // Reset the form
    setIsMultipleChoice(false)
    setIsQuestTypeSelected(false)
  }

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
