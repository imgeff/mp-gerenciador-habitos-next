import { HTMLAttributes, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

type FormHeaderProps = {
  text: string
  logo: ReactNode
  styles?: {
    text?: string
  }
} & HTMLAttributes<HTMLElement>
export function FormHeader({
  text,
  logo,
  className,
  styles,
  ...rest
}: FormHeaderProps) {
  return (
    <header
      className={twMerge('flex flex-col gap-2 items-center', className)}
      {...rest}
    >
      {logo}
      <p
        className={twMerge(
          'text-sm text-neutral-500 font-semibold text-center lg:text-sm xs:text-xs xs:mb-5',
          styles?.text,
        )}
      >
        {text}
      </p>
    </header>
  )
}
