'use client'

import Button from '@/components/button'
import { Form } from '@/components/form'
import { Navigate } from '@/components/navigate'
import { TextInput } from '@/components/input'
import { cadastrarHabito } from '@/actions/habits/cadastrarHabito'
import { useFormState } from 'react-dom'

export default function NewHabit() {
  const initialState = { message: '', errors: { habito: undefined } }
  const [state, dispatch] = useFormState(cadastrarHabito, initialState)

  return (
    <main className="min-w-[100vw] min-h-screen px-5 py-20 flex flex-wrap items-center justify-center">
      <Form.Root action={dispatch} className="border-0 xs:m-0">
        <Form.Body>
          <h2 className="font-display font-normal text-center text-5xl mb-14">
            novo hábito
          </h2>
          <TextInput
            styles={{
              input: 'py-[14px]',
            }}
            placeholder="Ex: Ir para a academia..."
            name="habito"
            errors={state.errors?.habito}
          />
        </Form.Body>
        <Form.Footer error={state.message}>
          <Button className="font-display font-normal text-2xl py-2">
            cadastrar
          </Button>
          <Navigate
            href="/"
            className="bg-neutral-800 text-red-primary hover:bg-neutral-900 mt-4 py-2"
          >
            cancelar
          </Navigate>
        </Form.Footer>
      </Form.Root>
    </main>
  )
}
