import {
  mdiChartTimelineVariant,
  mdiLink,
} from '@mdi/js'
import Head from 'next/head'
import React from 'react'
import type { ReactElement } from 'react'
import Button from '../components/Button'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import SectionBannerStarOnGitHub from '../components/Section/Banner/StarOnGitHub'
import { getPageTitle } from '../config'

const DashboardPage = () => {


  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Dashboard" main>
          <Button
            href="https://lpk-harehare.id"
            target="_blank"
            icon={mdiLink}
            label="LPK Harehare"
            color="danger"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <div className="my-6">
          <SectionBannerStarOnGitHub />
        </div>
        
      </SectionMain>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
