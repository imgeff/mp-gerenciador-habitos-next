import { TUsuario } from '@/types/TUsuario';
import bcrypt from 'bcrypt';
import { database } from '..';

export async function cadastrarUsuario(usuario: Pick<TUsuario, 'nome' | 'email' | 'senha'>) {
  const senhaEncriptada = await bcrypt.hash(usuario.senha, 10);

  return await database.usuario.create({
    data: {...usuario, senha: senhaEncriptada},
    select: {
      id: true,
      email: true,
      nome: true,
    },
  });
}