// app/(main)/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | TodoList'
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
