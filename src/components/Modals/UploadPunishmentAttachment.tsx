import React, { useState } from 'react'
import CardBoxModal from '../CardBox/Modal'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginPdfPreview from 'filepond-plugin-pdf-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { usePunishmentClients } from '../../hooks/requestData'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond-plugin-pdf-preview/dist/filepond-plugin-pdf-preview.min.css'
import { closeUploadModal, closePunishmentListModal } from '../../stores/punishmentSlice'

registerPlugin(FilePondPluginImagePreview)
registerPlugin(FilePondPluginPdfPreview)
registerPlugin(FilePondPluginFileValidateType)

const schema = z.object({
  id: z
    .string({
      required_error: 'Pilih siswa!',
    })
    .refine((value) => value.length > 0, { message: 'Pilih siswa!' }),
  files: z.array(z.object({})).nonempty({ message: 'Upload File!' }),
})

export default function UploadPunishmentAttachment() {
  const dispatch = useAppDispatch()
  const type = useAppSelector((state) => state.punishment.type)
  const student = useAppSelector((state) => state.batch.student)
  const uploadModal = useAppSelector((state) => state.punishment.uploadModal)
  const { uploadPunishmentAttachment } = usePunishmentClients()
  const [files, setFiles] = useState<any>()
  const handleModalAction = () => {
    dispatch(closeUploadModal())

    setFiles([])
  }
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      schema.parse({
        id: student.id,
        files,
      })
    } catch (error) {
      console.log(error)
      toast.error(error.errors[0].message)
      setLoading(false)
      return
    }
    const formData = new FormData()
    formData.append('id', student.id)
    formData.append('files', files[0].file)
    formData.append('type', type)

    const { status, data } = await uploadPunishmentAttachment(formData)
    if (status == 200) {
      console.log(data)
      toast.success('Dokumen berhasil diupload!')
      dispatch(closePunishmentListModal())
      handleModalAction()
    } else {
      console.log(data)
      toast.error('Dokumen gagal diupload')
    }

    setLoading(false)
  }

  return (
    <CardBoxModal
      title="Upload Dokumen Sanksi"
      buttonColor="info"
      buttonLabel="Konfirmasi"
      isActive={uploadModal}
      onConfirm={handleSubmit}
      onCancel={handleModalAction}
      loading={loading}
      disabled={loading}
      zIndex="z-50"
    >
      <FilePond
        instantUpload={false}
        credits={false}
        acceptedFileTypes={['application/pdf', 'image/*']}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={1}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </CardBoxModal>
  )
}
