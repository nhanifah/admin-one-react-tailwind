import { useAppSelector } from '../../stores/hooks'
import CardBox from '.'
import FormCheckRadio from '../Form/CheckRadio'
import React from 'react'
import { useSession } from 'next-auth/react'

type Props = {
  className?: string
}

const CardBoxUser = ({ className }: Props) => {
  const userName = useAppSelector((state) => state.main.userName)
  const { data: session } = useSession()

  return (
    <CardBox className={className}>
      <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
        <div className="space-y-3 md:text-left lg:mx-12">
          <h1 className="text-2xl capitalize text-center">
            <b>{session?.user?.name}</b>
          </h1>
          <p className="text-center">Super Admin</p>
        </div>
      </div>
    </CardBox>
  )
}

export default CardBoxUser
