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
            <CardBoxModal
                title="Tambahkan Pertanyaan Baru"
                buttonColor="success"
                buttonLabel="Simpan"
                isActive={isModalAddActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                <Formik
                    initialValues={{
                        question: '',
                        answer: '',
                        category: '',
                        difficulty: '',
                        point: 0,
                        questionType: '',
                    }}
                    onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <FormField label="Tipe Pertanyaan" labelFor="questionType" icons={[mdiWrench]}>
                                <Field
                                    as="select"
                                    name="questionType"
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        setIsMultipleChoice(selectedValue === 'Multiple Choice');
                                        setIsQuestTypeSelected(!!selectedValue);
                                        setFieldValue('questionType', selectedValue);
                                    }}
                                >
                                    <option value="" selected disabled>Pilih Tipe</option>
                                    <option value="Multiple Choice">Pilihan Ganda</option>
                                    <option value="Essay">Esai</option>
                                </Field>
                            </FormField>
                            {isQuestTypeSelected && (
                                <>
                                    <FormField label="Pertanyaan" labelFor="question" icons={[mdiChatQuestion]}>
                                        <Field name="question" placeholder="Pertanyaan" autoFocus />
                                    </FormField>
                                    <FormField label="Point" labelFor="point" icons={[mdiScoreboard]}>
                                        <Field name="point" placeholder="Poin" type="number" />
                                    </FormField>
                                    {isMultipleChoice && (
                                        // Render additional fields for the essay question type if necessary
                                        <>
                                            <FormField label="Tambahkan Jawaban" addJawaban={true} labelFor="addJawaban">
                                                <Field name="addJawaban" placeholder="Tambahkan Jawaban" />
                                                <Button
                                                    type="button"
                                                    className="text-white"
                                                    outline={false}
                                                    icon={mdiPlusCircle}
                                                    label="Tambahkan"
                                                    small
                                                />
                                            </FormField>
                                            <FormOptionSoal/>
                                        </>
                                    )}
                                </>
                            )}
                        </Form>
                    )}
                </Formik>
            </CardBoxModal>

            <Head>
                <title>{getPageTitle('Jawaban Peserta')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiBallotOutline} title="Jawaban Peserta" main>
                </SectionTitleLineWithButton>

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
