'use client'

import Link, { LinkProps } from 'next/link'

import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type NavigateProps = {
  children: ReactNode
  className?: string
} & LinkProps

export function Navigate({
  className,
  children,
  href,
  ...rest
}: NavigateProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        'bg-emerald-primary py-3 px-6 w-full rounded font-display font-normal text-2xl text-neutral-950 text-center transition-colors hover:bg-emerald-third',
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
