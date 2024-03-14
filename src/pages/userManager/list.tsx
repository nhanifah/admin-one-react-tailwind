// import toast from 'react-hot-toast'
import { mdiAccountGroupOutline, mdiPlusBox } from '@mdi/js'
// import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../../components/Button'
// import Buttons from '../../components/Buttons'
// import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
// import FormField from '../../components/Form/Field'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import React from 'react'
import UserLists from '../../components/Table/UserLists'
import UserDetailModal from '../../components/Modals/UserDetailModal'
import { useAppDispatch } from '../../stores/hooks'
import { setUser, showUserDetailModal } from '../../stores/batchSlice'


const FormsPage = () => {
  const dispatch = useAppDispatch()

  const handleModalAction = () => {
    // reset the form
    dispatch(setUser({
      id: '',
      name: '',
      username: '',
      email: '',
      password: '',
      role: '',
      created_at: new Date(),
      updated_at: new Date(),
      master_roles: {
        id: '',
        name: '',
        access: [],
        created_at: new Date(),
        updated_at: new Date()
      }
    }))
    // show the modal
    dispatch(showUserDetailModal())
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('User Manager')}</title>
      </Head>

      <UserDetailModal />

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccountGroupOutline} title="User Manager" main>
        <Button
            onClick={() => handleModalAction()}
            target="_blank"
            icon={mdiPlusBox}
            label="Tambahkan"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <UserLists />
        </CardBox>
      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
