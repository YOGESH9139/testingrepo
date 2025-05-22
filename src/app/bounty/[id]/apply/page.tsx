"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWallet } from "@txnlab/use-wallet-react"
import { toast } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"

// Define the correct type for params in Next.js 15
interface PageProps {
  params: { id: string }
}

export default function ApplyToBountyPage({ params }: PageProps) {
  // Get the bounty ID from the route params
  const { id } = params
  const router = useRouter()
  const { activeAccount } = useWallet()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    proposal: "",
    timeline: "",
    compensation: "",
    experience: "",
  })

  // Mock bounty data for UI demonstration
  const bounty = {
    id,
    title: "Build a DeFi Dashboard",
    description: "Create a dashboard to track DeFi investments across multiple protocols on Algorand.",
    organization: "AlgoFinance",
    reward: 500,
    category: "Development",
    requirements: "Experience with React, data visualization, and Algorand SDK.",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!activeAccount) {
      toast.error("Please connect your wallet to apply")
      return
    }

    if (!formData.proposal.trim() || !formData.timeline.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    setSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      toast.success("Application submitted successfully")
      router.push("/bounties")
      setSubmitting(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href={`/bounty/${id}`} className="inline-flex items-center text-indigo-300 hover:text-indigo-200 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bounty
          </Link>

          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
            <h1 className="text-3xl font-bold text-white mb-6">Apply for Bounty</h1>

            <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-400/20 mb-8">
              <h2 className="text-xl font-semibold text-white mb-2">{bounty.title}</h2>
              <p className="text-gray-300 mb-4">{bounty.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-indigo-300">{bounty.organization}</span>
                <span className="font-bold text-white">{bounty.reward} ALGO</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="proposal" className="text-white">
                  Your Proposal <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="proposal"
                  value={formData.proposal}
                  onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                  placeholder="Describe how you would approach this bounty..."
                  className="min-h-[120px] bg-black/30 border-indigo-400/20 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="timeline" className="text-white">
                  Estimated Timeline <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g., 2 weeks"
                  className="bg-black/30 border-indigo-400/20 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="compensation" className="text-white">
                  Requested Compensation
                </Label>
                <Input
                  id="compensation"
                  value={formData.compensation}
                  onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                  placeholder="e.g., 500 ALGO (leave empty to accept listed amount)"
                  className="bg-black/30 border-indigo-400/20 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="experience" className="text-white">
                  Relevant Experience
                </Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Describe your relevant experience and past projects..."
                  className="min-h-[100px] bg-black/30 border-indigo-400/20 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Link href={`/bounty/${id}`}>
                  <Button variant="outline" className="border-indigo-400/20 text-white">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={submitting || !activeAccount}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
