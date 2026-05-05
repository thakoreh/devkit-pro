import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevKit Pro — Developer Utilities Suite',
  description: '10+ essential developer tools in one place. JSON formatter, JWT decoder, Base64 encoder, hash generator, regex tester, and more. Free to use, no signup required.',
  keywords: 'developer tools, JSON formatter, JWT decoder, Base64 encoder, hash generator, regex tester, URL encoder, timestamp converter, UUID generator',
  openGraph: {
    title: 'DevKit Pro — Developer Utilities Suite',
    description: '10+ essential developer tools in one place. Free, fast, no signup.',
    type: 'website',
    siteName: 'DevKit Pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevKit Pro — Developer Utilities Suite',
    description: '10+ essential developer tools in one place. Free, fast, no signup.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
