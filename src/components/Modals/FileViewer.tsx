import { Viewer, Worker } from '@react-pdf-viewer/core'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/zoom/lib/styles/index.css'
import React from 'react'
import { useStudentClients } from '../../hooks/requestData'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeUploadModal } from '../../stores/studentSlice'
import CardBoxModal from '../CardBox/Modal'
import { closeContractModal } from '../../stores/studentSlice'
import { getExtFile } from '../../utils/helpers'

export default function FileViewer() {
  const dispatch = useAppDispatch()
  const zoomPluginInstance = zoomPlugin({
    enableShortcuts: true,
  })
  //   const student = useAppSelector((state) => state.batch.student)
  const contractFiles = useAppSelector((state) => state.student.contractFiles)
  const ext = getExtFile(contractFiles?.file_url ? contractFiles?.file_url : '')
  console.log(ext)
  const modal = useAppSelector((state) => state.student.contractModal)
  const handleModalAction = () => {
    dispatch(closeContractModal())
  }
  return (
    <CardBoxModal
      title="Dokumen Kontrak"
      buttonColor="info"
      buttonLabel="Tutup"
      isActive={modal}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
    >
      {contractFiles?.file_url ? (
        ext == 'pdf' ? (
          // <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
          //   <Viewer fileUrl={contractFiles.file_url} plugins={[zoomPluginInstance]} />
          // </Worker>
          <iframe src={`${contractFiles.file_url}`} width="100%" height="500px"></iframe>
        ) : (
          <div>
            <img className="mx-auto" src={contractFiles.file_url} alt="Contract" />
          </div>
        )
      ) : (
        ''
      )}
    </CardBoxModal>
  )
}
