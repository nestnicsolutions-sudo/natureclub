import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nature Club - Explore & Learn',
  description: 'A magical nature exploration app for kids ages 3-10',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="no-select">{children}</body>
    </html>
  )
}
