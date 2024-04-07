import { Habito } from './buscarHabitos'
import { database } from '..'

export async function buscarHabitoComRegistrosDoMes(
  idHabito: string | number,
  dataInicio: string | Date,
  dataFinal: string | Date,
) {
  idHabito = Number(idHabito)
  dataInicio = new Date(dataInicio)
  dataFinal = new Date(dataFinal)

  const habitos: Habito[] = await database.$queryRaw`
  SELECT habitos.id, habitos.nome, JSON_AGG(registros_habito.data) AS datas
  FROM habitos as habitos
  LEFT JOIN registros_habito as registros_habito
  ON habitos.id = registros_habito.id_habito
  AND registros_habito.data >= ${dataInicio}
  AND registros_habito.data < ${dataFinal}
  WHERE habitos.id = ${idHabito}
  GROUP BY habitos.id;
  `

  return habitos[0]
}
