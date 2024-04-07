import { database } from '..'

export async function criarHabito(data: { habito: string; idUsuario: number }) {
  const habito = await database.habito.create({
    data: {
      nome: data.habito,
      id_usuario: data.idUsuario,
    },
  })

  return habito
}
