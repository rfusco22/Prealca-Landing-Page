import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Prealca.C.A - Concreto de Calidad | Líderes en Concreto Premezclado",
  description:
    "Prealca.C.A es líder en producción y suministro de concreto premezclado en Venezuela. +25 años de experiencia, calidad garantizada y entrega puntual.",
  keywords: "concreto premezclado, construcción, Venezuela, concreto de calidad, Prealca",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
