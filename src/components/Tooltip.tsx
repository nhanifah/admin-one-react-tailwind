import React, { ReactNode, useEffect, useRef, useState } from 'react'

type TooltipProps = {
  children: ReactNode
  element: ReactNode
  className?: string
  position?: string
}

export default function Tooltip({
  children,
  element,
  className,
  position = '-left-4 -top-8',
}: TooltipProps) {
  const tooltipRef = useRef<any>()

  const handleEnter = () => {
    tooltipRef.current.classList.remove('hidden')
    setTimeout(() => {
      tooltipRef.current.classList.add('opacity-100')
    }, 300)
  }

  const handleLeave = () => {
    tooltipRef.current.classList.add('opacity-0')
    tooltipRef.current.classList.remove('opacity-100')
    setTimeout(() => {
      tooltipRef.current.classList.add('hidden')
    }, 300)
  }

  return (
    <div className={`${className} relative `} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      <div
        ref={tooltipRef}
        className={`${position} hidden  absolute z-10 text-sm font-medium text-white transition-opacity duration-500 rounded shadow-sm  bg-gray-700 w-fit px-2 py-0.5`}
      >
        {element}
      </div>
    </div>
  )
}
