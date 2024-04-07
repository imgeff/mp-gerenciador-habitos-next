import { NextRequest, NextResponse } from 'next/server'

import { buscarHabitoComRegistrosDoMes } from '@/data/habitos/buscarHabitoComRegistrosDoMes'
import { z } from 'zod'

type ParamsRoute = {
  params: {
    idHabito: string
  }
}

const BuscarHabitoComRegistroDoMes = z.object({
  idHabito: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
})

export async function GET(request: NextRequest, { params }: ParamsRoute) {
  const { idHabito } = params
  const { searchParams } = new URL(request.url)
  const dataInicio = searchParams.get('data-inicio')
  const dataFim = searchParams.get('data-fim')

  const camposValidados = BuscarHabitoComRegistroDoMes.parse({
    idHabito,
    dataInicio,
    dataFim,
  })

  const result = await buscarHabitoComRegistrosDoMes(
    camposValidados.idHabito,
    camposValidados.dataInicio,
    camposValidados.dataFim,
  )

  return NextResponse.json(result, { status: 200 })
}
