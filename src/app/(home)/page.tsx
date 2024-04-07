import { Navigate } from '@/components/navigate'
import { WeekHabits } from '@/components/week-habits'
import { buscarHabitos } from '@/data/habitos/buscarHabitos'
import { usePayload } from '@/services/auth'

export default async function Home() {
  const payload = await usePayload()
  const habitos = await buscarHabitos(payload.id as number)

  return (
    <main className="min-w-[100vw] min-h-screen px-5 py-20 flex flex-col items-center justify-center">
      {habitos.length === 0 ? (
        <p className="font-display text-center text-4xl w-full mt-auto">
          você não tem hábitos cadastrados
        </p>
      ) : (
        habitos.map((habito) => <WeekHabits key={habito.id} habito={habito} />)
      )}
      <Navigate href="/new-habit" className="md:w-3/5 lg:w-2/5 mt-auto">
        novo hábito
      </Navigate>
    </main>
  )
}
