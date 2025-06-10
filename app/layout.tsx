import type { Metadata } from 'next'
import './globals.css'
import { SectionProvider } from '@/contexts/section-context'
import { OverlayProvider } from '@/contexts/overlay-context'
import LoadingScreen from '@/components/loading-screen'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'VHALÓR - Pack Less, Save More',
  description: 'The innovative hoodie that lets you carry more without paying for carry-on luggage',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Aptos:wght@500;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aptos:wght@500;700&display=swap" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300&display=swap" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" />
      </head>
      <body>
        <SectionProvider>
          <OverlayProvider>
            <LoadingScreen />
            {children}
          </OverlayProvider>
        </SectionProvider>
      </body>
    </html>
  )
}
