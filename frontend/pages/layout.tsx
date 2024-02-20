'use client'
import { FormProvider, useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  message: string
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormValues>({
    mode: 'onChange',
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}