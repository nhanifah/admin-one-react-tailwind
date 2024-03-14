import React from 'react'
import Link from 'next/link'
import { getButtonColor } from '../colors'
import Icon from './Icon'
import type { ColorButtonKey } from '../interfaces'

type Props = {
  label?: string
  loading?: boolean
  icon?: string
  iconSize?: string | number
  href?: string
  target?: string
  type?: string
  color?: ColorButtonKey
  className?: string
  asAnchor?: boolean
  small?: boolean
  outline?: boolean
  active?: boolean
  disabled?: boolean
  roundedFull?: boolean
  full?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default function Button({
  label,
  loading,
  icon,
  iconSize,
  href,
  target,
  type,
  color = 'white',
  className = '',
  asAnchor = false,
  small = false,
  outline = false,
  active = false,
  disabled = false,
  roundedFull = false,
  full = false,
  onClick,
}: Props) {
  const Spinner = ({ size, white }) => {
    // set the size of the spinner
    const spinnerSize = size === 'sm' ? 'h-5 w-5' : 'h-16 w-16'
    // set the color of the spinner
    const spinnerColor = white ? 'white' : 'main-500'
    return (
      <div className="px-8 py-0.5">
        <div
          className={`animate-spin rounded-full ${spinnerSize} border-t-2 border-b-2 border-${spinnerColor}`}
        ></div>
      </div>
    )
  }

  const componentClass = [
    'inline-flex',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
    'focus:outline-none',
    'transition-colors',
    'focus:ring',
    'duration-150',
    'border',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    roundedFull ? 'rounded-full' : 'rounded',
    getButtonColor(color, outline, !disabled, active),
    className,
  ]

  if (full) {
    componentClass.push('w-full')
  }

  if (!label && icon) {
    componentClass.push('p-1')
  } else if (small) {
    componentClass.push('text-sm', roundedFull ? 'px-3 py-1' : 'p-1')
  } else {
    componentClass.push('py-2', roundedFull ? 'px-6' : 'px-3')
  }

  if (disabled) {
    componentClass.push(outline ? 'opacity-50' : 'opacity-70')
  }

  const componentClassString = componentClass.join(' ')

  const componentChildren = (
    <>
      {icon && <Icon path={icon} size={iconSize} />}
      {label && <span className={small && icon ? 'px-1' : 'px-2'}>{label}</span>}
    </>
  )

  if (href && !disabled) {
    return (
      <Link href={href} target={target} className={`${componentClassString}`}>
        {componentChildren}
      </Link>
    )
  }

  // if loading is true, show the spinner
  if (loading) {
    // if componenClassString is red, set the spinner color to white
    return (
      <button className={componentClassString} onClick={onClick} disabled={disabled}>
        <Spinner size="sm" white />
      </button>
    )
  }

  return React.createElement(
    asAnchor ? 'a' : 'button',
    { className: componentClassString, type: type ?? 'button', target, disabled, onClick },
    componentChildren
  )
}
