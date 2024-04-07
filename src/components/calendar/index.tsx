'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'

import { Habito } from '@/data/habitos/buscarHabitos'
import { IndicatorHabit } from '../indicator-habit'
import { weekDays } from '@/utils/date'

type CalendarProps = {
  loading: boolean
  currentYear: number
  currentMonth: number
  habit: Habito | undefined
  goToPrevMonth: () => void
  goToNextMonth: () => void
}

export function Calendar({
  loading,
  habit,
  currentYear,
  currentMonth,
  goToPrevMonth,
  goToNextMonth,
}: CalendarProps) {
  const [days, setDays] = useState<Date[]>([])
  const month = new Date(currentYear, currentMonth).toLocaleDateString(
    'pt-br',
    {
      month: 'long',
    },
  )

  /**
   * https://stackoverflow.com/questions/13146418/find-all-the-days-in-a-month-with-date-object
   * @return {Date[]} List with date objects for each day of the month
   */
  const getDaysInMonth = () => {
    const date = new Date(currentYear, currentMonth, 1)
    const daysOfMonth = []

    while (date.getMonth() === currentMonth) {
      daysOfMonth.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    setDays(daysOfMonth)
  }

  useEffect(() => {
    getDaysInMonth()
  }, [currentMonth, currentYear])

  if (loading) {
    return <CalendarSkeleton />
  }

  return (
    <div className="bg-neutral-800 rounded-md pt-3 pb-6 px-3 w-full">
      <header className="flex justify-between items-center w-full mb-5 text-neutral-500">
        <button onClick={goToPrevMonth}>
          <ArrowLeftIcon className="w-[18px] h-[18px]" />
        </button>
        <span>
          <span className="capitalize">{month}</span> de {currentYear}
        </span>
        <button onClick={goToNextMonth}>
          <ArrowRightIcon className="w-[18px] h-[18px]" />
        </button>
      </header>
      <div className="grid grid-cols-7">
        {weekDays.map((weekDay) => (
          <span key={weekDay} className="text-center font-display">
            {weekDay}
          </span>
        ))}
        {days.map((day, index) => {
          const date = day.toISOString().slice(0, 10)

          if (index === 0) {
            return (
              <Fragment key={day.toDateString()}>
                <span className={`span-${day.getDay()}`} />
                <div className="flex flex-col items-center justify-center">
                  <span className="text-center text-neutral-500">
                    {day.getDate()}
                  </span>
                  <IndicatorHabit
                    date={date}
                    idHabito={(habit as Habito).id}
                    registros={(habit as Habito).datas}
                  />
                </div>
              </Fragment>
            )
          }

          return (
            <div
              key={day.toDateString()}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-center text-neutral-500">
                {day.getDate()}
              </span>
              <IndicatorHabit
                date={date}
                idHabito={(habit as Habito).id}
                registros={(habit as Habito).datas}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CalendarSkeleton() {
  const days = new Array(30)
  days.fill(null)
  return (
    <div
      className={`relative overflow-hidden bg-neutral-800 rounded-md pt-3 pb-6 px-3 w-full shadow-sm`}
    >
      <header className="flex justify-between items-center w-full mb-5 text-neutral-500 rounded-md animate-pulse-fast">
        <button className="bg-neutral-700 w-6 h-[18px] rounded-md animate-pulse-fast" />
        <span className="bg-neutral-700 w-28 h-[18px] rounded-md animate-pulse-fast" />
        <button className="bg-neutral-700 w-6 h-[18px] rounded-md animate-pulse-fast" />
      </header>
      <div className="grid grid-cols-7 justify-items-center gap-2 animate-pulse-fast">
        <span className="bg-neutral-700 w-9 h-6 rounded-md animate-pulse-fast" />
        <span className="bg-neutral-700 w-9 h-6 rounded-md animate-pulse-fast" />
        <span className="bg-neutral-700 w-9 h-6 rounded-md animate-pulse-fast" />
        <span className="bg-neutral-700 w-9 h-6 rounded-md animate-pulse-fast" />
        <span className="bg-neutral-700 w-9 h-6 rounded-md animate-pulse-fast" />
        <span className="bg-neutral-700 w-9 h-6 rounded-md animate-pulse-fast" />
        <span className="bg-neutral-700 w-9 h-6 rounded-md animate-pulse-fast" />

        {days.map((_content, index) => (
          <div
            key={index}
            className="bg-neutral-700 w-7 h-9 rounded-md animate-pulse-fast"
          />
        ))}
      </div>
    </div>
  )
}
