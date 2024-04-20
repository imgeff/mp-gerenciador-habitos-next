'use server'

import bcrypt from 'bcrypt'
import { buscarUsuarioPorEmail } from '@/data/usuario/buscarUsuarioPorEmail'
import { criarSessao } from '@/services/auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Email inválido!'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export type State = {
  errors?: {
    email?: string[]
    senha?: string[]
  }
  message?: string | null
}

export async function login(prevState: State | undefined, formData: FormData) {
  const camposValidados = LoginSchema.safeParse({
    email: formData.get('email'),
    senha: formData.get('senha'),
  })

  if (!camposValidados.success) {
    return {
      message: 'Campos inválidos, falha ao fazer login',
    }
  }

  const { email, senha } = camposValidados.data

  try {
    const usuario = await buscarUsuarioPorEmail(email)
    if (!usuario) {
      throw new Error('Credenciais incorretas!')
    }

    const senhaCompativel = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCompativel) {
      throw new Error('Credenciais incorretas!')
    }

    const { id, nome } = usuario
    await criarSessao({ id, nome, email })
  } catch (error) {
    return {
      message: (error as Error).message,
    }
  }

  redirect('/')
}
