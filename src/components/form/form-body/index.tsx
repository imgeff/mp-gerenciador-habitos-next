import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type FormBodyProps = {
  legenda?: string
  styles?: {
    legend?: string
  }
} & HTMLAttributes<HTMLFieldSetElement>

export function FormBody({
  legenda,
  styles,
  className,
  children,
  ...rest
}: FormBodyProps) {
  return (
    <fieldset
      className={twMerge(
        'w-full flex flex-col md:gap-3 xs:gap-1 gap-9',
        className,
      )}
      {...rest}
    >
      {legenda ? <legend className={styles?.legend}>{legenda}</legend> : null}
      {children}
    </fieldset>
  )
}
