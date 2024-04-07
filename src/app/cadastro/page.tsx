'use client';

import { PasswordInput, TextInput } from "@/components/input";

import Button from "@/components/button";
import { Form } from "@/components/form";
import Image from "next/image";
import Link from "next/link";
import criarConta from "@/actions/auth/criarConta";
import logoMetaDiaria from "../../../public/images/logo.svg";
import { useFormState } from "react-dom";

export default function Cadastro() {
  const initialState = { message: '', errors: { nome: undefined, email: undefined, senha: undefined} };
  const [state, dispatch] = useFormState(criarConta, initialState);

  return (
    <main className="flex w-full min-h-screen px-5 flex-col items-center justify-center">
      <Form.Root action={dispatch}>
        <Form.Header
          text="Faça parte do nosso portal de realizações diárias!"
          logo={<Image src={logoMetaDiaria} height={887} width={182} alt="Logotipo Meta Diária" />}
        />
        <Form.Body>
          <TextInput
            label="Nome"
            name="nome"
            placeholder="Digite seu nome"
            errors={state.errors?.nome}
            styles={{
              label: "xs:text-xs lg:text-sm text-emerald-primary",
              input: "autofill:bg-gray-800"
            }}
            spellCheck="false"
          />
          <TextInput
          label="Email"
          name="email"
          placeholder="Digite seu email"
          type="email"
          errors={state.errors?.email}
          styles={{
            label: "xs:text-xs lg:text-sm text-emerald-primary",
          }}
          spellCheck="false"
        />
        <PasswordInput
        label="Senha"
        placeholder="Digite sua senha"
        description="A senha deve ter no mínimo 6 caracteres"
        errors={state?.errors?.senha}
        styles={{
          label: "xs:text-xs lg:text-sm text-emerald-primary",
          icon: {
            box: "xs:h-7 xs:w-7 lg:h-8 lg:w-8",
            root: "xs:h-5 xs:w-5 lg:h-6 lg:w-6"
          }
        }}
        name="senha"
      />
        </Form.Body>
        <Form.Footer error={state?.message}>
          <Button className="xs:text-xs lg:text-base">Criar Conta</Button>
          <div className="text-sm text-neutral-500 font-semibold text-center lg:text-sm xs:text-xs xs:mt-1">
            Já tem conta? Acesse a página de <Link className="text-emerald-primary underline underline-offset-2 hover:text-emerald-third" href="/login">Login</Link>
          </div>
        </Form.Footer>
      </Form.Root>
    </main>
  )
}