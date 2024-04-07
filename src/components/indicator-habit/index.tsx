'use client'

import {
  criarRegistroHabito,
  deletarRegistroHabito,
} from '@/services/registros-habito'
import { useRef, useState } from 'react'

import { AxiosError } from 'axios'
import CheckIcon from '../../../public/icons/Check.svg'
import CircleIcon from '../../../public/icons/Circle.svg'
import Image from 'next/image'
import { Spinner } from '../spinner'
import XIcon from '../../../public/icons/X.svg'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

type IndicatorHabitProps = {
  idHabito: number
  registros: string[]
  date: string
}

export function IndicatorHabit({
  idHabito,
  registros,
  date,
}: IndicatorHabitProps) {
  const done = registros.includes(date)
  const notDone = dayjs().isAfter(date, 'day')
  const isToday = dayjs().isSame(date, 'day')
  let defaultStatus = (
    <Image
      src={CircleIcon}
      width={16}
      className="mt-0.5"
      height={16}
      alt="Ícone de pendente"
    />
  )

  if (done) {
    defaultStatus = (
      <Image
        src={CheckIcon}
        width={20}
        height={20}
        className="mt-0.5"
        alt="Ícone de feito"
      />
    )
  } else if (notDone) {
    defaultStatus = (
      <Image src={XIcon} width={20} height={20} alt="Ícone de não feito" />
    )
  }

  const [loading, setLoading] = useState(false)
  const [statusElement, setStatusElement] = useState(defaultStatus)
  const drawerStatusElement = useRef<HTMLDivElement>(null)

  const registrarHabito = async () => {
    if (!done) {
      setLoading(true)
      await criarRegistroHabito({ idHabito, data: date })
      setLoading(false)
    }
  }

  const deletarRegistro = async () => {
    setLoading(true)
    await deletarRegistroHabito({ idHabito, data: date })
    setLoading(false)
  }

  const handleSelectStatus = async (
    statusSelected: 'done' | 'pending' | 'not done',
  ) => {
    if (statusSelected === 'done') {
      try {
        await registrarHabito()
        setStatusElement(
          <Image
            src={CheckIcon}
            width={20}
            height={20}
            className="mt-0.5"
            alt="Ícone de feito"
          />,
        )
      } catch (error: any) {
        setLoading(false)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message)
        } else {
          toast.error(
            'Não foi possível fazer o registro. Por favor tente novamente.',
          )
        }
      }
    } else if (statusSelected === 'not done') {
      try {
        await deletarRegistro()
        setStatusElement(
          <Image src={XIcon} width={20} height={20} alt="Ícone de não feito" />,
        )
      } catch (error: any) {
        setLoading(false)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message)
        } else {
          toast.error(
            'Não foi possível fazer o registro. Por favor tente novamente.',
          )
        }
      }
    } else {
      try {
        await deletarRegistro()
        setStatusElement(
          <Image
            src={CircleIcon}
            width={16}
            height={16}
            alt="Ícone de pendente"
          />,
        )
      } catch (error: any) {
        setLoading(false)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message)
        } else {
          toast.error(
            'Não foi possível fazer o registro. Por favor tente novamente.',
          )
        }
      }
    }
  }

  const showDrawerStatus = () => {
    if (done || notDone || isToday) {
      if (drawerStatusElement.current?.classList?.contains('flex')) {
        drawerStatusElement.current?.classList.remove('flex')
        drawerStatusElement.current?.classList.add('hidden')
      } else {
        drawerStatusElement.current?.classList.remove('hidden')
        drawerStatusElement.current?.classList.add('flex')
      }
    }
  }

  return (
    <div>
      <div className="relative" onClick={showDrawerStatus}>
        {loading ? <Spinner /> : statusElement}
        <div
          className="absolute z-10 -top-[6px] -left-[8px] hidden w-max py-1 px-2 bg-neutral-700 rounded-md gap-2"
          ref={drawerStatusElement}
        >
          <button type="button" onClick={() => handleSelectStatus('done')}>
            <Image
              src={CheckIcon}
              width={20}
              height={20}
              className="mt-0.5"
              alt="Ícone de feito"
            />
          </button>
          <hr className="rotate-180 bg-neutral-600 w-px h-5 border-0" />
          {isToday ? (
            <button type="button" onClick={() => handleSelectStatus('pending')}>
              <Image
                src={CircleIcon}
                width={16}
                height={16}
                alt="Ícone de pendente"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSelectStatus('not done')}
            >
              <Image
                src={XIcon}
                width={20}
                height={20}
                alt="Ícone de não feito"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
