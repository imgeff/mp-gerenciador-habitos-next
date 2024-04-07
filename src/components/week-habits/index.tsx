'use client'

import { Habito } from '@/data/habitos/buscarHabitos'
import { IndicatorHabit } from '../indicator-habit'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { weekDays } from '@/utils/date'

type WeekHabitsProps = {
  habito: Habito
}

export function WeekHabits({ habito }: WeekHabitsProps) {
  const router = useRouter()
  const today = new Date()
  const indexToday = today.getDay()

  const sortedWeekDays = weekDays
    .slice(indexToday + 1)
    .concat(weekDays.slice(0, indexToday + 1))
  const week = sortedWeekDays.map((day, index) => {
    const date = dayjs(today)
      .subtract(6 - index, 'day')
      .format('YYYY-MM-DD')
    return [day, date]
  })

  const navToDetails = () => {
    router.push(`/habitos/${habito.id}`)
  }

  return (
    <section className="flex flex-col gap-1 w-full mt-40 md:w-3/5 lg:w-2/5">
      <p onClick={navToDetails}>{habito.nome}</p>
      <div>
        <div className="bg-neutral-800 rounded-xl py-3 px-8 grid grid-cols-7 font-display">
          {week.map(([day, date]) => (
            <div
              key={day}
              className="flex flex-col items-center justify-start last:font-bold"
            >
              <span>{day}</span>
              <IndicatorHabit
                date={date}
                idHabito={habito.id}
                registros={habito.datas}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
