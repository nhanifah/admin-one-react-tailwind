import React from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { showUploadModal } from '../../stores/studentSlice'
import CardBoxModal from '../CardBox/Modal'
import { closeContractModal } from '../../stores/studentSlice'
import { getExtFile } from '../../utils/helpers'
import { closeViewerModal } from '../../stores/punishmentSlice'

export default function FileViewer() {
  const dispatch = useAppDispatch()
  //   const student = useAppSelector((state) => state.batch.student)
  const punishmentAttachments = useAppSelector((state) => state.punishment.punishmentAttachment)
  const ext = getExtFile(punishmentAttachments?.file_url ? punishmentAttachments?.file_url : '')
  console.log(ext)
  const modal = useAppSelector((state) => state.punishment.viewerModal)
  const handleModalAction = () => {
    dispatch(closeViewerModal())
  }
  return (
    <CardBoxModal
      title="Dokumen Sanksi"
      buttonColor="info"
      buttonLabel="Tutup"
      isActive={modal}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
      withCancel={false}
    >
      {punishmentAttachments?.file_url ? (
        ext == 'pdf' ? (
          // <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
          //   <Viewer fileUrl={punishmentAttachments.file_url} plugins={[zoomPluginInstance]} />
          // </Worker>
          <iframe src={`${punishmentAttachments.file_url}`} width="100%" height="500px"></iframe>
        ) : (
          <div>
            <img className="mx-auto" src={punishmentAttachments.file_url} alt="Contract" />
          </div>
        )
      ) : (
        ''
      )}
    </CardBoxModal>
  )
}
