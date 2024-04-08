'use client'

import { useEffect, useState } from 'react'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Calendar } from '@/components/calendar'
import { Habito } from '@/data/habitos/buscarHabitos'
import Link from 'next/link'
import { Metadata } from 'next'
import { buscarRegistrosHabitoDoMes } from '@/services/registros-habito-mes'
import { toast } from 'react-toastify'

type HabitDetailsProps = {
  params: {
    idHabito: string
  }
}

export const metadata: Metadata = {
  title: 'Meta Diária Hábitos | Detalhes do Hábito',
  description: 'Gerenciador de hábitos',
}

export default function HabitDetails({
  params: { idHabito },
}: HabitDetailsProps) {
  const currentDate = new Date()
  const [habito, setHabito] = useState<Habito>()
  const [loading, setLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

  const dataInicio = new Date(currentYear, currentMonth, 1)
  const dataFim = new Date(currentYear, currentMonth + 1, 0)

  const buscarRegistrosDoMes = async () => {
    try {
      setLoading(true)
      const { data } = await buscarRegistrosHabitoDoMes({
        idHabito,
        dataInicio,
        dataFim,
      })
      setLoading(false)
      setHabito(data)
    } catch (error: any) {
      setLoading(false)
      console.log(error?.message)
      toast.error(error?.message)
    }
  }

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prevState) => prevState - 1)
      setCurrentMonth(11)
    } else {
      setCurrentMonth((prevState) => prevState - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prevState) => prevState + 1)
      setCurrentMonth(0)
    } else {
      setCurrentMonth((prevState) => prevState + 1)
    }
  }

  useEffect(() => {
    buscarRegistrosDoMes()
  }, [idHabito, currentMonth, currentYear])

  return (
    <main className="min-w-[100vw] min-h-screen px-5 py-20 flex flex-col justify-center items-center">
      {!habito ? (
        <HabitNameSkeleton />
      ) : (
        <h1 className="text-2xl font-display mb-5">{habito.nome}</h1>
      )}

      <div className="w-full md:w-3/5 lg:w-2/5">
        <Link
          href="/"
          className="flex items-center gap-1 text-xs self-start mb-3"
        >
          <ArrowLeftIcon className="h-3 w-3" />
          Voltar
        </Link>
        <Calendar
          loading={loading || !habito}
          habit={habito}
          currentMonth={currentMonth}
          currentYear={currentYear}
          goToNextMonth={goToNextMonth}
          goToPrevMonth={goToPrevMonth}
        />
      </div>
    </main>
  )
}

function HabitNameSkeleton() {
  return (
    <span className="bg-neutral-700 h-8 w-72 animate-pulse-fast mb-5 rounded-md" />
  )
}
