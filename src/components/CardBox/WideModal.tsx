import { mdiClose, mdiUpdate } from '@mdi/js'
import { ReactNode } from 'react'
import type { ColorButtonKey } from '../../interfaces'
import Button from '../Button'
import CardBox from '.'
import CardBoxComponentTitle from './Component/Title'
import OverlayLayer from '../OverlayLayer'
import React from 'react'

type Props = {
  title: string
  buttonColor: ColorButtonKey
  buttonLabel: string
  isActive: boolean
  children: ReactNode
  onConfirm: () => void
  onCancel?: () => void
  customEl?: ReactNode | string
  withButton?: ReactNode | string
  zIndex?: string
}

const WideCardBoxModal = ({
  title,
  isActive,
  children,
  onCancel,
  customEl,
  withButton,
  zIndex = 'z-40',
}: Props) => {
  if (!isActive) {
    return null
  }

  return (
    <OverlayLayer onClick={onCancel} className={onCancel ? 'cursor-pointer' : ''}>
      <CardBox
        className={`transition-transform shadow-lg max-h-modal overflow-y-scroll no-scrollbar w-11/12 md:w-4/5 lg:w-4/5 xl:w-2/4 ${zIndex}`}
        isModal
      >
        <CardBoxComponentTitle title={title}>
          <div className="flex gap-3">
            {customEl ? customEl : ''}
            {withButton ? withButton : ''}
            {!!onCancel && (
              <Button icon={mdiClose} color="whiteDark" onClick={onCancel} small roundedFull />
            )}
          </div>
        </CardBoxComponentTitle>

        <div className="space-y-3">{children}</div>
      </CardBox>
    </OverlayLayer>
  )
}

export default WideCardBoxModal
