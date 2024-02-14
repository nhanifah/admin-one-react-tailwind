import {mdiChatQuestion, mdiEye, mdiPlusCircle, mdiScoreboard, mdiTrashCan, mdiWrench} from '@mdi/js'
import React, { useState } from 'react'
import { useStudentPhyscotestAnswerClients } from '../../hooks/sampleData'
import {Quest, StudentSikotes} from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import {Field, Form, Formik} from "formik";
import FormField from "../Form/Field";
import FormOptionSoal from "../Form/OptionSoal";

const TableSampleClients = () => {
    const { clients } = useStudentPhyscotestAnswerClients()

    const perPage = 50

    const [currentPage, setCurrentPage] = useState(0)

    const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

    let numPages = clients.length / perPage

    if (numPages % 1 !== 0) {
        numPages = 1
    }

    const pagesList = []

    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [isQuestTypeSelected, setIsQuestTypeSelected] = useState(false)
    const [isMultipleChoice, setIsMultipleChoice] = useState(false)

    const handleModalAction = () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)
    }

    return (
        <>
            <CardBoxModal
                title="Sunting Pertanyaan"
                buttonColor="success"
                buttonLabel="Simpan"
                isActive={isModalInfoActive}
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

            <CardBoxModal
                title="Mau menghapus soal?"
                buttonColor="danger"
                buttonLabel="Konfirmasi"
                isActive={isModalTrashActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                <p>
                    Apa kamu yakin ingin menghapus soal ini?
                </p>
                <p>Ketika soal terhapus, soal sudah tidak dapat dipulihkan kembali</p>
            </CardBoxModal>

            <table>
                <thead>
                <tr>
                    <th><center>#</center></th>
                    <th>Nama</th>
                    <th>Nilai</th>
                    <th>Dibuat</th>
                    <th>Dikerjakan</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {clientsPaginated.map((data: StudentSikotes, index: number) => (
                    <tr key={data.id}>
                        <td className="border-b-0 lg:w-6 before:hidden">
                            <td data-label="Number">{index+1}</td>
                        </td>
                        <td data-label="Name">{data.name}</td>
                        <td data-label="Correct">
                            {data.result != 0 ? data.result : "Belum Diperiksa"}
                        </td>
                        <td data-label="CreatedAt" className="lg:w-1 whitespace-nowrap">
                            <small className="text-gray-500 dark:text-slate-400">
                                {new Date(data.createdAt * 1000).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </small>
                        </td>
                        <td data-label="UpdatedAt" className="lg:w-1 whitespace-nowrap">
                            <small className="text-gray-500 dark:text-slate-400">
                                {new Date(data.updatedAt * 1000).toLocaleDateString('id-ID', {
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
                                    icon={mdiEye}
                                    onClick={() => setIsModalInfoActive(true)}
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
                                label={page + 1}
                                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                                small
                                onClick={() => setCurrentPage(page)}
                            />
                        ))}
                    </Buttons>
                    <small className="mt-6 md:mt-0">
                        Page {currentPage + 1} of {numPages}
                    </small>
                </div>
            </div>
        </>
    )
}

export default TableSampleClients
