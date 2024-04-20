'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { InputHTMLAttributes, ReactElement, useState } from 'react'

import Tooltip from '@/components/tooltip'
import { randomUUID } from 'crypto'
import { twMerge } from 'tailwind-merge'

type PasswordInputProps = {
  description?: React.ReactNode
  errors?: string[]
  styles?: {
    root?: string
    label?: string
    input?: string
    error?: string
    icon?: {
      box?: string
      root?: string
    }
    description?: string
  }
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export function PasswordInput({
  errors,
  description,
  styles,
  label = '',
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputID = `password-input-${
    label?.replace(' ', '-').toLowerCase() || randomUUID()
  }`

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
            'bg-neutral-900 w-full rounded py-3 px-6 text-neutral-500 placeholder:text-neutral-700',
            styles?.input,
          )}
          id={inputID}
          type={showPassword ? 'text' : 'password'}
          {...rest}
        />
        {showPassword ? (
          <span
            className={twMerge(
              'absolute top-[45%] right-3 rounded hover:bg-neutral-800 transition-colors h-8 w-8 flex items-center justify-center cursor-pointer',
              styles?.icon?.box,
            )}
          >
            <Tooltip text="Esconder senha">
              <EyeSlashIcon
                onClick={() => setShowPassword((prevState) => !prevState)}
                className={twMerge(
                  'h-6 w-6 text-neutral-500',
                  styles?.icon?.root,
                )}
              />
            </Tooltip>
          </span>
        ) : (
          <span
            className={twMerge(
              'absolute top-[45%] right-3 rounded hover:bg-neutral-800 transition-colors h-8 w-8 flex items-center justify-center cursor-pointer',
              styles?.icon?.box,
            )}
          >
            <Tooltip text="Mostrar senha">
              <EyeIcon
                onClick={() => setShowPassword((prevState) => !prevState)}
                className={twMerge(
                  'h-6 w-6 text-neutral-500',
                  styles?.icon?.root,
                )}
              />
            </Tooltip>
          </span>
        )}
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
