import { NextRequest, NextResponse } from 'next/server'
import { ZodError, z } from 'zod'

import { registrarHabito } from '@/data/habitos/registrarHabito'

const RegistrarHabitoSchema = z.object({
  idHabito: z.number(),
  data: z.string().length(10, 'Data inválida'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const camposValidados = RegistrarHabitoSchema.parse(body)

    const result = await registrarHabito(camposValidados)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    const cause = (error as Error)?.cause
    const message = (error as Error).message

    if (error instanceof ZodError) {
      return NextResponse.json({ message: 'Dados inválidos!' }, { status: 400 })
    } else if (cause === 'NotFoundError') {
      return NextResponse.json({ message }, { status: 404 })
    }

    return NextResponse.json({ message: 'Erro interno!' }, { status: 500 })
  }
}
