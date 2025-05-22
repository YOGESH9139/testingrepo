"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type WalletSimulationContextType = {
  isSimulatingWallet: boolean
  setIsSimulatingWallet: (value: boolean) => void
}

const WalletSimulationContext = createContext<WalletSimulationContextType | undefined>(undefined)

export function WalletSimulationProvider({ children }: { children: ReactNode }) {
  const [isSimulatingWallet, setIsSimulatingWallet] = useState(false)

  return (
    <WalletSimulationContext.Provider value={{ isSimulatingWallet, setIsSimulatingWallet }}>
      {children}
    </WalletSimulationContext.Provider>
  )
}

export function useWalletSimulation() {
  const context = useContext(WalletSimulationContext)
  if (context === undefined) {
    throw new Error("useWalletSimulation must be used within a WalletSimulationProvider")
  }
  return context
}
