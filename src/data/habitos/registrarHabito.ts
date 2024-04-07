import { database } from '..'

type Data = {
  idHabito: number
  data: string
}

export async function registrarHabito({ idHabito, data }: Data) {
  const dataFormatada = new Date(data).toISOString()
  const habito = await database.habito.findFirst({
    select: {
      id: true,
    },
    where: {
      id: idHabito,
    },
  })

  if (!habito) {
    throw new Error('O hábito não foi encontrado!', { cause: 'NotFoundError' })
  }

  return await database.registroHabito.create({
    data: {
      id_habito: idHabito,
      data: dataFormatada,
    },
  })
}
