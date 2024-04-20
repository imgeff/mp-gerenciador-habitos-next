import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type FormFooterProps = {
  error?: string
  styles?: {
    error?: {
      root?: string
      message?: string
    }
  }
} & HTMLAttributes<HTMLElement>

export function FormFooter({
  error,
  styles,
  children,
  className,
  ...rest
}: FormFooterProps) {
  return (
    <footer
      className={twMerge(
        'w-full flex flex-col md:gap-3 xs:gap-1 gap-9',
        className,
      )}
      {...rest}
    >
      {children}
      <div
        className={twMerge(
          'flex h-fit min-h-5 items-end space-x-1',
          styles?.error?.root,
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {error && (
          <p
            className={twMerge('text-sm text-red-500', styles?.error?.message)}
          >
            {error}
          </p>
        )}
      </div>
    </footer>
  )
}
