import { mdiChatQuestion, mdiScoreboard, mdiWrench, mdiPlusCircle } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Button from '../../components/Button'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import FormOptionSoal from '../../components/Form/OptionSoal'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { setIsModalActive } from '../../stores/modalSlice'

export default function AddQuestionModal() {
  const dispatch = useAppDispatch()
  const isModalActive = useAppSelector((state) => state.modal.isModalActive)

  const [isMultipleChoice, setIsMultipleChoice] = useState(false)
  const [isQuestTypeSelected, setIsQuestTypeSelected] = useState(false)

  const handleModalAction = () => {
    dispatch(setIsModalActive(false))
    // Reset the form
    setIsMultipleChoice(false)
    setIsQuestTypeSelected(false)
  }

  return (
    <CardBoxModal
      title="Tambahkan Pertanyaan Baru"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={isModalActive}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
    >
      <Formik
        initialValues={{
          questionType: '',
          question: '',
          option: '',
          answer: '',
          point: 0,
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
                  const selectedValue = e.target.value
                  setIsMultipleChoice(selectedValue === 'Multiple Choice')
                  setIsQuestTypeSelected(!!selectedValue)
                  setFieldValue('questionType', selectedValue)
                }}
              >
                <option value="" selected disabled>
                  Pilih Tipe
                </option>
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
                    <FormOptionSoal />
                  </>
                )}
              </>
            )}
          </Form>
        )}
      </Formik>
    </CardBoxModal>
  )
}
