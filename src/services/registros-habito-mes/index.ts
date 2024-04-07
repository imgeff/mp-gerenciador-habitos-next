import { api } from '@/app/api'

type Data = {
  idHabito: string
  dataInicio: Date
  dataFim: Date
}

export async function buscarRegistrosHabitoDoMes({
  idHabito,
  dataInicio,
  dataFim,
}: Data) {
  return await api.get(
    `/habito/${idHabito}?data-inicio=${dataInicio
      .toISOString()
      .slice(0, 10)}&data-fim=${dataFim.toISOString().slice(0, 10)}`,
  )
}
