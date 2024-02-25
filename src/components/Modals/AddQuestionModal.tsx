import { mdiChatQuestion, mdiScoreboard, mdiWrench, mdiPlusCircle, mdiCloseBox } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Button from '../../components/Button'
import CardBoxModal from '../../components/CardBox/Modal'
import FormField from '../../components/Form/Field'
import FormOptionSoal from '../../components/Form/OptionSoal'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { setIsModalActive } from '../../stores/modalSlice'
import { questionSchema } from '../../utils/validator'
import { addOption, resetOption } from '../../stores/optionSlice'
import toast from 'react-hot-toast'
import { useBankQuestionClients } from '../../hooks/requestData'
import React from 'react'

export default function AddQuestionModal() {
  const dispatch = useAppDispatch()
  const isModalActive = useAppSelector((state) => state.modal.isModalActive)
  const option = useAppSelector((state) => state.option.option)
  const { createData } = useBankQuestionClients()

  const formRef = useRef()

  const [isMultipleChoice, setIsMultipleChoice] = useState(false)
  const [isQuestTypeSelected, setIsQuestTypeSelected] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])

  const handleModalAction = () => {
    dispatch(setIsModalActive(false))
    // Reset the form
    setIsMultipleChoice(false)
    setIsQuestTypeSelected(false)
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      questionSchema.parse(values)
    } catch (error) {
      console.log(error)
      setValidationErrors(error.errors)
      return
    }

    const { status, data } = await createData(values)
    if (status == 200) {
      console.log(data)
      resetForm({
        values: {
          questionType: '',
          question: '',
          option: [],
          answer: '',
          point: 0,
          answerSelected: '',
        },
      })
      dispatch(resetOption())
      toast.success('Soal berhasil ditambahkan!')
    } else {
      console.log(data)
      toast.error('Soal gagal ditambahkan')
    }
  }

  return (
    <CardBoxModal
      title="Tambahkan Pertanyaan Baru"
      buttonColor="success"
      buttonLabel="Simpan"
      isActive={isModalActive}
      onConfirm={() => formRef?.current?.handleSubmit()}
      onCancel={handleModalAction}
    >
      <div
        className={`${
          validationErrors.length == 0 ? 'hidden' : ''
        } bg-red-100 p-2.5 text-red-800 rounded-lg relative`}
      >
        <Button
          icon={mdiCloseBox}
          iconSize={20}
          color="danger"
          className="p-0 absolute right-4 top-2.5 bg-main-200"
          onClick={() => setValidationErrors([])}
        />
        <ul>
          {validationErrors.map((item, i) => (
            <li key={`error-${i}`}>{item.message}</li>
          ))}
        </ul>
      </div>
      <Formik
        initialValues={{
          questionType: '',
          question: '',
          option: [],
          answer: '',
          point: 0,
          answerSelected: '',
        }}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FormField label="Tipe Pertanyaan" labelFor="questionType" icons={[mdiWrench]}>
              <Field
                as="select"
                name="questionType"
                onChange={(e) => {
                  const selectedValue = e.target.value
                  setIsMultipleChoice(selectedValue === 'multipleChoice')
                  setIsQuestTypeSelected(!!selectedValue)
                  setFieldValue('questionType', selectedValue)
                }}
              >
                <option value="" selected disabled>
                  Pilih Tipe
                </option>
                <option value="multipleChoice">Pilihan Ganda</option>
                <option value="essay">Esai</option>
              </Field>
            </FormField>
            {isQuestTypeSelected && (
              <>
                <FormField label="Pertanyaan" labelFor="question" icons={[mdiChatQuestion]}>
                  <Field
                    name="question"
                    placeholder="Pertanyaan"
                    autoFocus
                    onChange={(e) => setFieldValue('question', e.target.value)}
                    value={values.question}
                  />
                </FormField>
                <FormField label="Point" labelFor="point" icons={[mdiScoreboard]}>
                  <Field
                    name="point"
                    placeholder="Poin"
                    type="number"
                    value={values.point}
                    onChange={(e) => setFieldValue('point', e.target.value)}
                  />
                </FormField>
                {isMultipleChoice && (
                  // Render additional fields for the essay question type if necessary
                  <>
                    <FormField label="Tambahkan Jawaban" addJawaban={true} labelFor="addJawaban">
                      <Field
                        name="addJawaban"
                        placeholder="Tambahkan Jawaban"
                        value={values.answer}
                        onChange={(e) => setFieldValue('answer', e.target.value)}
                      />
                      <Button
                        type="button"
                        className="text-white"
                        outline={false}
                        icon={mdiPlusCircle}
                        label="Tambahkan"
                        small
                        onClick={() => {
                          dispatch(addOption(values.answer))
                          values.option.push(values.answer)
                          setFieldValue('answer', '')
                        }}
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
