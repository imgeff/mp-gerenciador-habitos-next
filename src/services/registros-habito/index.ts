import { api } from '@/app/api'

type Data = {
  idHabito: number
  data: string
}

export async function criarRegistroHabito(data: Data) {
  return await api.post('/registros-habito', data)
}

export async function deletarRegistroHabito(data: Data) {
  return await api.delete(`/registros-habito/${data.idHabito}/${data.data}`)
}
