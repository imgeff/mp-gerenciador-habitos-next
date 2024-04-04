import * as jose from 'jose';

import { TUsuario } from "@/types/TUsuario";
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function abrirSessao(token: string) {
  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
}

export async function criarSessao(payload: Omit<TUsuario, 'senha' | 'criado_em' | 'alterado_em'>) {
  const sessao = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256'
    })
    .setExpirationTime('24h')
    .sign(secret);

  const { exp } = await abrirSessao(sessao);

  cookies().set('sessao', sessao, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  });
}

export async function sessaoEValida() {
  const sessao = cookies().get('sessao');
  if (!sessao) {
    return false;
  }

  const { value: token } = sessao;
  const { exp } = await abrirSessao(token);
  const dataExpiracaoToken = (exp as number) * 1000;
  const dataAtual = new Date().getTime();

  return dataAtual < dataExpiracaoToken;
}

export function destruirSessao() {
  cookies().delete('sessao');
}

export async function usePayload() {
  const token = cookies().get('sessao');

  return await abrirSessao((token?.value as string));
}