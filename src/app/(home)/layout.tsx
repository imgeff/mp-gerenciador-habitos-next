import '../globals.css'

import Image from 'next/image'
import type { Metadata } from 'next'
import logoMetaDiaria from '../../../public/images/logo.svg'

export const metadata: Metadata = {
  title: 'Meta Diária Hábitos | Home',
  description: 'Gerenciador de hábitos',
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="py-5 fixed w-full">
        <Image
          className="mx-auto"
          src={logoMetaDiaria}
          height={887}
          width={182}
          alt="Logotipo Meta Diária"
        />
      </header>
      {children}
    </>
  )
}
