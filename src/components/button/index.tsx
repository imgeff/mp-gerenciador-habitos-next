'use client';

import { ButtonHTMLAttributes, ReactNode } from "react";

import { BeatLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";
import { useFormStatus } from "react-dom";

type ButtonProps = {
  children: ReactNode;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ loading = false, className, children }: ButtonProps) {
  const { pending } = useFormStatus();
  loading = loading || pending;

  return (
    <button disabled={loading} className={twMerge('bg-emerald-primary py-3 px-6 w-full rounded text-neutral-950 font-semibold transition-colors hover:bg-emerald-third disabled:opacity-50 disabled:hover:bg-emerald-primary disabled:cursor-not-allowed', className)}>
      {loading ? <BeatLoader size={10} color="#09090b" /> : children}
    </button>
  )
}