"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useWallet } from "@txnlab/use-wallet-react"
import { useWalletModal } from "./wallet-modal-provider"
import { useWalletSimulation } from "@/context/wallet-simulation-context"

export function ConnectWalletButton({
  className,
  variant = "default",
  size = "default",
  fullWidth = false,
  showIcon = true,
}: {
  className?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  fullWidth?: boolean
  showIcon?: boolean
}) {
  const { activeAccount } = useWallet()
  const { openWalletModal } = useWalletModal()
  const { isSimulatingWallet } = useWalletSimulation()

  // If we're simulating a wallet connection, use a simulated address
  const simulatedAddress = "SIMULATED7WALLET7ADDRESS7FOR7TESTING7PURPOSES7ONLY7XXXXXXXXXXXXXXX"
  const displayAddress = isSimulatingWallet ? simulatedAddress : activeAccount?.address

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  // Update the default button style for navbar
  let buttonStyle = "border-white/20 text-white hover:bg-white/10"

  // Override with custom className if provided
  if (className) {
    buttonStyle = className
  }

  // If simulating, show a special indicator
  const simulationIndicator = isSimulatingWallet ? " [SIMULATED]" : ""

  return (
    <Button
      onClick={openWalletModal}
      className={buttonStyle}
      variant={variant}
      size={size}
      style={fullWidth ? { width: "100%" } : undefined}
    >
      {showIcon && <Wallet className="mr-2 h-4 w-4" />}
      {displayAddress ? truncateAddress(displayAddress) + simulationIndicator : "Connect Wallet"}
    </Button>
  )
}
