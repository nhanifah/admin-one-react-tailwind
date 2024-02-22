/* eslint-disable @next/next/no-img-element */
// Why disabled:
// avatars.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import path from 'path'
import React, { ReactNode, useState } from 'react'

type Props = {
  username: string
  api?: string
  className?: string
  children?: ReactNode
}

type StudentAvatarProps = {
  imgUrl: string
  alt: string
  className?: string
  children?: ReactNode
}

export function UserAvatar({
  username,
  api = 'avataaars',
  className = '',
  children,
}: Props) {
  const avatarImage = `https://api.dicebear.com/7.x/${api}/svg?seed=${username.replace(
    /[^a-z0-9]+/gi,
    '-'
  )}`

  return (
    <div className={className}>
      <img
        src={avatarImage}
        alt={username}
        className="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
      />
      {children}
    </div>
  )
}

export default function StudentAvatar({
  imgUrl,
  alt,
  className = '',
  children,
}: StudentAvatarProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <div className={className}>
      <img
        src={imgUrl}
        alt={alt}
        className="object-cover object-top rounded-full block h-full w-full max-w-full bg-gray-100 dark:bg-slate-800"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && (
        <div className="hidden sm:inline-block absolute z-10 px-1 py-2 -top-24 -left-8 text-sm font-medium text-white transition-opacity duration-300 bg-white rounded-lg shadow-sm opacity-100 dark:bg-gray-700">
          <img
          src={imgUrl}
          alt={alt}
          className="object-cover object-top rounded-md block h-24 w-24 max-w-full bg-gray-100 dark:bg-slate-800"
          />
        </div>
      )}
      {children}
    </div>
  )
}