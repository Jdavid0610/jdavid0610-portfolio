import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

const base =
  'w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm transition placeholder:text-muted ' +
  'focus:border-brand aria-[invalid=true]:border-danger disabled:opacity-60'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(base, 'h-10', className)} />
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(base, 'min-h-32 resize-y', className)} />
}
