import { mdiClose } from '@mdi/js'
import { ReactNode } from 'react'
import type { ColorButtonKey } from '../../interfaces'
import Button from '../Button'
import CardBox from '.'
import CardBoxComponentTitle from './Component/Title'
import OverlayLayer from '../OverlayLayer'

type Props = {
  title: string
  buttonColor: ColorButtonKey
  buttonLabel: string
  isActive: boolean
  children: ReactNode
  onConfirm: () => void
  onCancel?: () => void
}

const WideCardBoxModal = ({
  title,
  isActive,
  children,
  onCancel,
}: Props) => {
  if (!isActive) {
    return null
  }

  return (
    <OverlayLayer onClick={onCancel} className={onCancel ? 'cursor-pointer' : ''}>
      <CardBox
        className={`transition-transform shadow-lg max-h-modal overflow-y-scroll no-scrollbar w-11/12 md:w-3/5 lg:w-2/5 xl:w-2/4 z-50`}
        isModal
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

export default WideCardBoxModal
