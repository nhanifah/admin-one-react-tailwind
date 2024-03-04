import { mdiAccountSupervisor } from '@mdi/js'
import React from 'react'
import { gradientBgDark } from '../../../colors'
import Button from '../../Button'
import SectionBanner from '.'

const SectionBannerStarOnGitHub = () => {
  return (
    <SectionBanner className={gradientBgDark}>
      <h1 className="text-3xl text-white mb-6">
        Selamat datang di Dashboard <b>LPK Harehare Indonesia</b>
      </h1>
      <div>
        <Button
          href="/student/list"
          icon={mdiAccountSupervisor}
          label="Daftar Siswa"
          roundedFull
        />
      </div>
    </SectionBanner>
  )
}

export default SectionBannerStarOnGitHub
