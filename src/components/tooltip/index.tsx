'use client'

import { ReactNode } from 'react'

type TooltipProps = {
  text: string
  children: ReactNode
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute -left-[390%] bottom-[120%] w-max mb-2 bg-neutral-800 text-white text-center text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
        {text}
      </div>
    </div>
  )
}
