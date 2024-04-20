'use client'

import { PasswordInput, TextInput } from '@/components/input'

import Button from '@/components/button'
import { Form } from '@/components/form'
import Image from 'next/image'
import Link from 'next/link'
import { login } from '../../actions/auth/login'
import logoMetaDiaria from '../../../public/images/logo.svg'
import { useFormState } from 'react-dom'

export default function Login() {
  const initialState = { message: '' }
  const [state, dispatch] = useFormState(login, initialState)

  return (
    <main className="flex w-full min-h-screen px-5 flex-col items-center justify-center">
      <Form.Root action={dispatch}>
        <Form.Header
          text="Bem-vindo de volta ao seu portal de realizações diárias!"
          logo={
            <Image
              src={logoMetaDiaria}
              height={887}
              width={182}
              alt="Logotipo Meta Diária"
            />
          }
        />
        <Form.Body>
          <TextInput
            label="Email"
            placeholder="Digite seu email"
            styles={{
              label: 'xs:text-xs lg:text-sm text-emerald-primary',
            }}
            name="email"
            spellCheck="false"
          />
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            styles={{
              label: 'xs:text-xs lg:text-sm text-emerald-primary',
              icon: {
                box: 'xs:h-7 xs:w-7 lg:h-8 lg:w-8',
                root: 'xs:h-5 xs:w-5 lg:h-6 lg:w-6',
              },
            }}
            name="senha"
          />
        </Form.Body>
        <Form.Footer error={state?.message}>
          <Button className="xs:text-xs lg:text-base">Entrar</Button>
          <div className="text-sm text-neutral-500 font-semibold text-center lg:text-sm xs:text-xs xs:mt-1">
            Não tem conta? Acesse a página de{' '}
            <Link
              className="text-emerald-primary underline underline-offset-2 hover:text-emerald-third"
              href="/cadastro"
            >
              Cadastro
            </Link>
          </div>
        </Form.Footer>
      </Form.Root>
    </main>
  )
}
