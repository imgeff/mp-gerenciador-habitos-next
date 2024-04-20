import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type FormRootProps = {
  action?: (payload: FormData) => void
} & HTMLAttributes<HTMLFormElement>

export function FormRoot({
  action,
  className,
  children,
  ...rest
}: FormRootProps) {
  return (
    <form
      action={action}
      className={twMerge(
        '2xl:w-2/6 2xl:py-10 2xl:px-10 xl:w-2/5 lg:w-1/2 lg:px-8 lg:py-9 md:w-3/5 md:gap-3 md:py-5 xs:py-3 xs:gap-1 md:mt-0 xs:-mt-52 w-[90%] rounded-lg px-5 py-10 border-2 border-neutral-800 flex flex-col items-center justify-center gap-9',
        className,
      )}
      {...rest}
    >
      {children}
    </form>
  )
}
