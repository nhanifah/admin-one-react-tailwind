import { mdiClose } from '@mdi/js'
import { ReactNode } from 'react'
import type { ColorButtonKey } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
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
  onCancel?: () => any
  loading?: boolean
  disabled?: boolean
  cancelLabel?: string
  onUpdate?: () => void
  zIndex?: string
  withCancel?: boolean
}

const CardBoxModal = ({
  title,
  buttonColor,
  buttonLabel,
  isActive,
  children,
  onConfirm,
  onCancel,
  loading = false,
  disabled = false,
  cancelLabel = 'Gagalkan',
  onUpdate,
  zIndex = 'z-40',
  withCancel = true,
}: Props) => {
  if (!isActive) {
    return null
  }

  const footer = (
    <Buttons>
      <Button
        label={buttonLabel}
        color={buttonColor}
        onClick={onConfirm}
        loading={loading}
        disabled={loading}
      />
      {!!onCancel && withCancel && (
        <Button label={cancelLabel} color={buttonColor} outline onClick={onUpdate ?? onCancel} />
      )}
    </Buttons>
  )

  return (
    <OverlayLayer onClick={onCancel} className={onCancel ? 'cursor-pointer' : ''}>
      <CardBox
        className={`transition-transform shadow-lg max-h-modal overflow-y-scroll no-scrollbar w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 ${zIndex}`}
        isModal
        footer={footer}
      >
        <CardBoxComponentTitle title={title}>
          {!!onCancel && (
            <Button icon={mdiClose} color="whiteDark" onClick={onCancel} small roundedFull />
          )}
        </CardBoxComponentTitle>

        <div className="space-y-3">{children}</div>
      </CardBox>
    </OverlayLayer>
  )
}

export default CardBoxModal
