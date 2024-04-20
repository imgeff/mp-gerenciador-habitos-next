import { database } from '..'

export async function buscarUsuarioPorEmail(email: string) {
  const usuario = await database.usuario.findFirst({
    where: { email },
    select: {
      id: true,
      nome: true,
      email: true,
      senha: true,
    },
  })

  return usuario
}
