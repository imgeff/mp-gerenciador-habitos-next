'use server'

import { cadastrarUsuario } from "@/data/usuario/cadastrarUsuario";
import { criarSessao } from "@/services/auth";
import { redirect } from "next/navigation";
import { z } from "zod"

const CriarContaSchema = z.object({
  nome: z.string().trim().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido!'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export type State = {
  errors?: {
    nome?: string[];
    email?: string[];
    senha?: string[];
  };
  message?: string | null;
};

export default async function criarConta(prevState: State | undefined, formData: FormData) {
  const camposValidados = CriarContaSchema.safeParse({
    nome: formData.get('nome'),
    email: formData.get('email'),
    senha: formData.get('senha'),
  });

  if (!camposValidados.success) {
    return {
      errors: camposValidados.error.flatten().fieldErrors,
      message: 'Campos inválidos, falha ao criar conta',
    }
  }

  try {
    const usuarioCadastrado = await cadastrarUsuario(camposValidados.data);
    await criarSessao(usuarioCadastrado);
  } catch (error) {
    console.error(error);
    return {
      message: (error as Error).message,
    };
  }
  
  redirect('/');
}