import { database } from '..'

export type Habito = {
  id: number
  nome: string
  datas: string[]
}

export async function buscarHabitos(idUsuario: number) {
  const habitos: Habito[] = await database.$queryRaw`
    SELECT habitos.id, habitos.nome, JSON_AGG(registros_habito.data) AS datas
    FROM habitos as habitos
    LEFT JOIN registros_habito as registros_habito
    ON habitos.id = registros_habito.id_habito
    WHERE habitos.id_usuario = ${idUsuario}
    GROUP BY habitos.id;
  `

  return habitos
}
