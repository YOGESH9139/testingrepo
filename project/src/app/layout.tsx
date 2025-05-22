import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WalletProviderWrapper } from "@/components/wallet-provider"
import { WalletSimulationProvider } from "@/context/wallet-simulation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlgoDevs",
  description: "A platform for Algorand developers",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <WalletSimulationProvider>
          <WalletProviderWrapper>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </WalletProviderWrapper>
        </WalletSimulationProvider>
      </body>
    </html>
  )
}
