import { Viewer, Worker } from '@react-pdf-viewer/core'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/zoom/lib/styles/index.css'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { closeTraskripModal, showUploadModal } from '../../stores/studentSlice'
import CardBoxModal from '../CardBox/Modal'
import { getExtFile } from '../../utils/helpers'

export default function FileViewer() {
  const dispatch = useAppDispatch()
  const zoomPluginInstance = zoomPlugin({
    enableShortcuts: true,
  })
  //   const student = useAppSelector((state) => state.batch.student)
  const transkripFiles = useAppSelector((state) => state.student.transkripFiles)
  const ext = getExtFile(transkripFiles?.file_url ? transkripFiles?.file_url : '')
  console.log(ext)
  const modal = useAppSelector((state) => state.student.transkripModal)
  const handleModalAction = () => {
    dispatch(closeTraskripModal())
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
      {transkripFiles?.file_url ? (
        ext == 'pdf' ? (
          // <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
          //   <Viewer fileUrl={transkripFiles.file_url} plugins={[zoomPluginInstance]} />
          // </Worker>
          <iframe src={`${transkripFiles.file_url}`} width="100%" height="500px"></iframe>
        ) : (
          <div>
            <img className="mx-auto" src={transkripFiles.file_url} alt="Contract" />
          </div>
        )
      ) : (
        ''
      )}
    </CardBoxModal>
  )
}
