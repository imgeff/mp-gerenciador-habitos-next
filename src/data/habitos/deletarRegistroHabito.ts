import { database } from '..'

type Data = {
  idHabito: number
  data: string
}

export async function deletarRegistroHabito({ idHabito, data }: Data) {
  const dataFormatada = new Date(data).toISOString()
  const registroHabito = await database.registroHabito.findFirst({
    select: {
      id: true,
    },
    where: {
      id_habito: idHabito,
      data: dataFormatada,
    },
  })

  if (registroHabito) {
    return await database.registroHabito.delete({
      where: {
        id: registroHabito.id,
      },
    })
  }
}
