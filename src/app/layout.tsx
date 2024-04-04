import "react-toastify/dist/ReactToastify.css";
import './globals.css';

import { Dosis, Inter } from 'next/font/google';

import type { Metadata } from 'next';
import { ToastContainer } from "react-toastify";

const dosis = Dosis({ subsets: ['latin'], variable: '--font-dosis' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Meta Diária Hábitos',
  description: 'Gerenciador de hábitos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${dosis.variable} ${inter.variable} bg-neutral-950 min-h-screen min-w-[100vw] text-neutral-300 font-sans`}>
          {children}
          <ToastContainer />
      </body>
    </html>
  )
}
