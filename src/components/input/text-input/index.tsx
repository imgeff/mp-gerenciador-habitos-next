'use client'

import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type TextInputProps = {
  description?: React.ReactNode
  errors?: string[]
  styles?: {
    root?: string
    label?: string
    input?: string
    error?: string
    description?: string
  }
  label?: string
  name: string
  icon?: React.JSX.Element
} & InputHTMLAttributes<HTMLInputElement>

export function TextInput({
  errors,
  description,
  styles,
  icon,
  name,
  label = '',
  ...rest
}: TextInputProps) {
  const inputID = `text-input-${name?.replace(' ', '-').toLowerCase()}`

  return (
    <div className={twMerge('flex flex-col w-full min-h-[92px]', styles?.root)}>
      <label
        className={twMerge(
          'text-sm font-semibold flex flex-col gap-1 relative',
          styles?.label,
        )}
        htmlFor={inputID}
      >
        {label}
        <input
          className={twMerge(
            'bg-neutral-900 w-full rounded py-3 px-6 text-neutral-500 placeholder:text-neutral-700 autofill:bg-neutral-500',
            styles?.input,
          )}
          id={inputID}
          type="text"
          name={name}
          {...rest}
        />
        <span className="absolute top-[45%] flex items-center justify-center h-8 w-8 right-3 rounded">
          {icon}
        </span>
      </label>
      {errors?.length ? (
        errors.map((error) => (
          <span
            key={error}
            className={twMerge('text-xs text-red-500 mt-1', styles?.error)}
          >
            {error}
          </span>
        ))
      ) : (
        <span
          className={twMerge(
            'text-xs text-neutral-500 mt-1',
            styles?.description,
          )}
        >
          {description}
        </span>
      )}
    </div>
  )
}
