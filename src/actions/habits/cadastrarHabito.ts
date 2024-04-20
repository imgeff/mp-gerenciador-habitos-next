'use server'

import { criarHabito } from '@/data/habitos/criarHabito'
import { redirect } from 'next/navigation'
import { usePayload } from '@/services/auth'
import { z } from 'zod'

const CadastrarHabitoSchema = z.object({
  habito: z.string().trim().min(1, 'Não é possível criar um hábito vazio'),
})

export type CadastrarHabitoState = {
  errors?: {
    habito?: string[]
  }
  message?: string | null
}

export async function cadastrarHabito(
  prevState: CadastrarHabitoState | undefined,
  formData: FormData,
) {
  const camposValidados = CadastrarHabitoSchema.safeParse({
    habito: formData.get('habito'),
  })

  if (!camposValidados.success) {
    return {
      errors: camposValidados.error.flatten().fieldErrors,
      message: 'Campos inválidos, falha ao cadastrar hábito',
    }
  }

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const payload = await usePayload()
    const habito = {
      habito: camposValidados.data.habito,
      idUsuario: payload.id as number,
    }
    await criarHabito(habito)
  } catch (error) {
    console.error(error)
    return {
      message: (error as Error).message,
    }
  }

  redirect('/')
}
