import { mdiAccount, mdiBadgeAccount, mdiMail, mdiSecurity } from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import WideCardBoxModal from '../CardBox/WideModal'
import Divider from '../Divider'
import FormField from '../Form/Field'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import Button from '../Button'
import { useMasterRoleClients, useUserManagerClients } from '../../hooks/requestData'
import { toast } from 'react-hot-toast'
import { closeModal } from '../../stores/RoleSlice'
import Select from 'react-select'
import { closeUpdateModal } from '../../stores/RoleSlice'

const role: any[] = [
  { label: 'All', value: 'all' },
  { label: 'Home', value: 'home' },
  { label: 'Upload', value: 'upload' },
  { label: 'Bank Soal', value: 'bankSoal' },
  { label: 'User Answer', value: 'userAnswer' },
  { label: 'Batch List', value: 'batchList' },
  { label: 'Interview', value: 'interview' },
  { label: 'Student Registration', value: 'studentRegistration' },
  { label: 'Student List', value: 'studentList' },
  { label: 'Student Contract', value: 'studentContract' },
  { label: 'Student Installment', value: 'studentInstallment' },
  { label: 'Student Punishment', value: 'studentPunishment' },
  { label: 'User Manager', value: 'userManager' },
  { label: 'Affiliate', value: 'affiliate' },
]

export default function UpdateRoleModal() {
  const { clients, updateRole } = useMasterRoleClients()
  const modal = useAppSelector((state) => state.role.updateModal)
  const [access, setAccess] = useState<any>([])
  const selectedRoleId = useAppSelector((state) => state.role.selectedRoleId)
  const dispatch = useAppDispatch()
  const selectedRole = clients.find((item) => item.id == selectedRoleId)
  console.log(selectedRole)
  const handleModalAction = () => {
    dispatch(closeUpdateModal())
    // Reset the form
  }

  const handleFormSubmit = async (values) => {
    const accessList = access.map((item) => item.value)
    const { status, data } = await updateRole({
      ...values,
      accessList,
      id: selectedRoleId,
    })

    if (status === 200) {
      handleModalAction()
      // toast
      toast.success('Role Berhasil Di tambahkan')
      // Reset the form
    } else {
      // toast
      toast.error(data.message)
      console.log('error:', status, 'detail', data)
    }
  }

  return (
    <WideCardBoxModal
      title="Biodata User"
      buttonColor="info"
      buttonLabel="Done"
      isActive={modal}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
      zIndex="z-50"
      overflow={false}
    >
      <Formik
        initialValues={{
          name: selectedRole?.name,
        }}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        <Form>
          <FormField label="Nama Role" labelFor="name" icons={[mdiAccount]}>
            <Field name="name" placeholder="Nama Role" id="name" />
          </FormField>
          <div className="">
            <label htmlFor="Izin" className="block font-bold mb-2 cursor-pointer">
              Izin
            </label>
            <Select
              defaultValue={role.filter((item) => selectedRole?.access.includes(item.value))}
              isMulti
              name="accessList"
              options={role}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Pilih Izin"
              onChange={(e) => setAccess(e)}
            />
          </div>

          <Divider />

          <div className="grid gap-y-3">
            <Button type="submit" label="Simpan" color="info" full />
          </div>
        </Form>
      </Formik>
    </WideCardBoxModal>
  )
}
