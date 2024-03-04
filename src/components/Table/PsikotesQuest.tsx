import {
  mdiChatQuestion,
  mdiPencil,
  mdiPlusCircle,
  mdiScoreboard,
  mdiTrashCan,
  mdiWrench,
  mdiCloseBox,
} from '@mdi/js'
import React, { useRef, useState } from 'react'
import { useBankQuestionClients } from '../../hooks/requestData'
import { Quest } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { Field, Form, Formik } from 'formik'
import FormField from '../Form/Field'
import FormOptionSoal from '../Form/OptionSoal'
import toast from 'react-hot-toast'
import { questionSchema } from '../../utils/validator'
import { addOption, initOption, resetOption } from '../../stores/optionSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'

type errors = {
  message: string[]
}

const TableSampleClients = () => {
  const formEditRef = useRef<any>()
  const dispatch = useAppDispatch()
  const { clients, deleteData, updateData } = useBankQuestionClients()
  const options = useAppSelector((state) => state.option.option)

  const perPage = 50

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  let numPages = clients.length / perPage

  if (numPages % 1 !== 0) {
    numPages = 1
  }

  const pagesList: number[] = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [isQuestTypeSelected, setIsQuestTypeSelected] = useState(false)
  const [isMultipleChoice, setIsMultipleChoice] = useState(false)
  const [itemSelected, setItemSelected] = useState<Quest>({
    id: '',
    type: '',
    exam_id: '',
    weight: 0,
    question_text: '',
    option_text: '',
    answer: '',
    created_at: new Date(),
    updated_at: new Date(),
  })
  const [validationErrors, setValidationErrors] = useState([])

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    dispatch(resetOption())
    setItemSelected({
      id: '',
      type: '',
      exam_id: '',
      weight: 0,
      question_text: '',
      option_text: '',
      answer: '',
      created_at: new Date(),
      updated_at: new Date(),
    })
    console.log(options)
  }

  const handleUpdate = async (values, { resetForm }) => {
    try {
      questionSchema.parse(values)
    } catch (error) {
      console.log(error)
      setValidationErrors(error.errors)
      return
    }

    const { status, data } = await updateData({ id: itemSelected.id, ...values })
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
      setItemSelected({
        id: '',
        type: '',
        exam_id: '',
        weight: 0,
        question_text: '',
        option_text: '',
        answer: '',
        created_at: new Date(),
        updated_at: new Date(),
      })
      setIsModalInfoActive(false)
      dispatch(resetOption())

      toast.success('Pertanyaan berhasil diedit')
    } else {
      console.log(data)
      toast.error('Pertanyaan gagal diedit')
    }
  }

  const handleDelete = async (question: Quest) => {
    const { status, data } = await deleteData(question.id)
    if (status == 200) {
      console.log(data)
      setIsModalTrashActive(false)
      toast.success('Pertanyaan berhasil dihapus')
    } else {
      console.log(data)
      setIsModalTrashActive(false)
      toast.error('Pertanyaan gagal dihapus')
    }
  }

  return (
    <>
      <CardBoxModal
        title="Sunting Pertanyaan"
        buttonColor="success"
        buttonLabel="Simpan"
        isActive={isModalInfoActive}
        onConfirm={() => formEditRef?.current?.handleSubmit()}
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
            {validationErrors.map((item: errors, i) => (
              <li key={`error-${i}`}>{item.message}</li>
            ))}
          </ul>
        </div>
        <Formik
          initialValues={{
            questionType: itemSelected?.type ?? '',
            question: itemSelected.question_text ?? '',
            option: itemSelected?.option_text ? JSON.parse(itemSelected.option_text) : [],
            answer: '',
            point: itemSelected?.weight ?? 0,
            answerSelected: itemSelected?.answer ?? '',
          }}
          innerRef={formEditRef}
          onSubmit={handleUpdate}
        >
          {({ values, setFieldValue }) => (
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
                          onClick={() => {
                            dispatch(addOption(values.answer))
                            values.option.push(values.answer)
                            setFieldValue('answer', '')
                          }}
                        />
                      </FormField>
                      {itemSelected.type == 'essay' ? (
                        ''
                      ) : (
                        <FormOptionSoal selectedOption={itemSelected.answer} />
                      )}
                    </>
                  )}
                </>
              )}
            </Form>
          )}
        </Formik>
      </CardBoxModal>

      <CardBoxModal
        title="Mau menghapus soal?"
        buttonColor="danger"
        buttonLabel="Konfirmasi"
        isActive={isModalTrashActive}
        onConfirm={() => handleDelete(itemSelected)}
        onCancel={handleModalAction}
      >
        <p>Apa kamu yakin ingin menghapus soal ini?</p>
        <p>Ketika soal terhapus, soal sudah tidak dapat dipulihkan kembali</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>
              <center>#</center>
            </th>
            <th>Pertanyaan</th>
            <th>Jawaban</th>
            <th>Tipe Soal</th>
            <th>Dibuat</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                <p className="text-gray-500 dark:text-slate-400">Tidak ada data</p>
              </td>
            </tr>
          )}
          {clientsPaginated.map((quest: Quest, index: number) => (
            <tr key={quest.id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <td data-label="Number">{index + 1}</td>
              </td>
              <td data-label="Question">{quest.question_text}</td>
              <td data-label="Correct">{quest.answer != null ? quest.answer : '-'}</td>
              <td data-label="Type">{quest.type}</td>
              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">
                  {new Date(quest.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiPencil}
                    onClick={() => {
                      setItemSelected(quest)
                      setIsMultipleChoice(quest.type == 'multipleChoice')
                      setIsQuestTypeSelected(true)
                      dispatch(initOption(JSON.parse(quest.option_text)))
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setItemSelected(quest)
                      setIsModalTrashActive(true)
                    }}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={String(page + 1)}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Halaman {currentPage + 1} dari {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSampleClients
