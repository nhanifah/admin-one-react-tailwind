import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import CardBoxModal from '../CardBox/Modal'
import { closeTraskripModal } from '../../stores/studentSlice'
import { getExtFile } from '../../utils/helpers'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

export default function TranskripViewer() {
  const dispatch = useAppDispatch()
  //   const student = useAppSelector((state) => state.batch.student)
  const contractFiles = useAppSelector((state) => state.student.contractFiles)
  const ext = getExtFile(contractFiles?.file_url ? contractFiles?.file_url : '')
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
      <div className="p-2.5 shadow-lg">
        <Document
          className={'w-full '}
          file={'https://lpk-harehare.nos.jkt-1.neo.id/contract_010324_3213213213213212.pdf'}
        >
          <Page pageNumber={1} />
        </Document>
      </div>
    </CardBoxModal>
  )
}
