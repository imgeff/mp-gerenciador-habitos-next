import { NextRequest, NextResponse } from 'next/server'

import { ZodError } from 'zod'
import { deletarRegistroHabito } from '@/data/habitos/deletarRegistroHabito'

type ParamsRoute = {
  params: {
    idHabito: string
    data: string
  }
}

export async function DELETE(_request: NextRequest, { params }: ParamsRoute) {
  try {
    const { idHabito, data } = params

    await deletarRegistroHabito({ idHabito: Number(idHabito), data })
    return NextResponse.json(
      { message: 'Registro deletado com sucesso!' },
      { status: 200 },
    )
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
