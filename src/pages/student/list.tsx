import { mdiBallotOutline, mdiDownload, mdiMicrosoftExcel } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useRef } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import StudentLists from '../../components/Table/StudentLists'
import StudentDetailModal from '../../components/Modals/StudentDetailModal'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import { toast } from 'react-hot-toast'
import { useStudentClients } from '../../hooks/requestData'
import TranskripViewer from '../../components/Modals/TranskripViewer'

const StudentList = () => {
  const fileRef = useRef<HTMLInputElement>(null)

  const { postFile } = useStudentClients('success')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const formData = new FormData()
      formData.append('file', file)
      const res = await postFile(formData)
      // console.log(res);

      if (res.status == 'success') {
        toast.success(res.message)
      } else {
        console.log(res)
        toast.error('Gagal mengimpor data')
      }

      // reset the input
      e.target.value = ''
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Daftar Siswa')}</title>
      </Head>

      <StudentDetailModal />
      <TranskripViewer />

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Daftar Siswa" main>
          <form className="hidden">
            <input type="file" name="file" ref={fileRef} onChange={handleFileChange} />
          </form>
          <Buttons>
            <Button
              href="https://lpk-harehare.nos.jkt-1.neo.id/Import%20File%20-%20Siswa%20LPK.xlsx"
              icon={mdiDownload}
              label="Unduh Sampel Excel"
              color="contrast"
              roundedFull
              small
            />
            <Button
              onClick={() => {
                fileRef.current && fileRef.current.click()
              }}
              icon={mdiMicrosoftExcel}
              label="Impor dari Excel"
              color="success"
              roundedFull
              small
            />
            <Button
              target="_blank"
              icon={mdiMicrosoftExcel}
              label="Ekspor ke Excel"
              color="info"
              roundedFull
              small
              disabled
            />
          </Buttons>
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <StudentLists progress={'dataSiswa'} />
        </CardBox>
      </SectionMain>
    </>
  )
}

StudentList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default StudentList
