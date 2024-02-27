import { mdiTrashCan } from '@mdi/js'
import { FormikProps, FormikValues, useFormikContext } from 'formik'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { popOption } from '../../stores/optionSlice'
import React from 'react'

const OptionSoal = ({ selectedOption = '' }) => {
  const dispatch = useAppDispatch()
  const option = useAppSelector((state) => state.option.option)
  const { values, setFieldValue } = useFormikContext<any>()
  const [optionSelected, setOptionSelected] = useState(
    option.indexOf(selectedOption) == -1 ? null : option.indexOf(selectedOption)
  )
  return (
    <>
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Pilihan Jawaban</h3>
      <ul className="grid w-full gap-6 md:grid-cols-1">
        {option.length == 0 ? (
          <li className="text-center ">Pilihan jawaban belum ditambahkan</li>
        ) : (
          option.map((item, i) => (
            <li
              key={`option-${i}`}
              className="bg-[#96cabe] rounded overflow-hidden"
              onClick={() => {
                console.log('clicked')
                setOptionSelected(i)
                setFieldValue('answerSelected', option[i])
              }}
            >
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="hosting-small"
                className="hidden peer"
                required
              />
              <label
                className={`inline-flex items-center justify-between w-full p-5 text-gray-500  border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600  dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                  optionSelected == i
                    ? 'bg-[#CDFAD5] hover:bg-[#e1fce6]'
                    : 'bg-white border hover:bg-gray-100'
                }`}
              >
                <div className="block">
                  <div className="w-full">Pilihan {i + 1}</div>
                  <div className="w-full text-lg font-semibold">{item}</div>
                </div>
                <div
                  className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (i == optionSelected) {
                      setOptionSelected(null)
                      setFieldValue('answerSelected', '')
                    }
                    dispatch(popOption(i))
                    values?.option?.splice(i, 1)
                  }}
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
                    <path fill="currentColor" d={mdiTrashCan} />
                  </svg>
                </div>
              </label>
            </li>
          ))
        )}
      </ul>
    </>
  )
}

export default OptionSoal
