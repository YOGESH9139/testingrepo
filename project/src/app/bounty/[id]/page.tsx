import Link from "next/link"

// Define the correct type for params in Next.js 15
interface PageParams {
  params: Promise<{ id: string }>
}

export default async function BountyPage({ params }: PageParams) {
  // Get the bounty ID from the route params
  const { id } = await params

  // Mock bounty data for UI demonstration
  const bounty = {
    id,
    title: "Build a DeFi Dashboard",
    description:
      "Create a dashboard to track DeFi investments across multiple protocols on Algorand. The dashboard should include portfolio tracking, yield farming analytics, and liquidity pool monitoring.",
    organization: "AlgoFinance",
    reward: 500,
    duein: "7d",
    duedate: "2024-06-01",
    participants: 3,
    featured: true,
    status: "active",
    category: "Development",
    requirements:
      "Experience with React, data visualization, and Algorand SDK. Must have completed at least one DeFi project previously.",
    creatoraddress: "ALGO123456789",
    created_at: "2024-05-01T12:00:00Z",
  }

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/bounties" className="inline-flex items-center text-indigo-300 hover:text-indigo-200 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Bounties
          </Link>

          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{bounty.title}</h1>
                <p className="text-indigo-300">{bounty.organization}</p>
              </div>
              <div className="bg-indigo-600/20 px-4 py-2 rounded-lg">
                <p className="text-2xl font-bold text-white">{bounty.reward} ALGO</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/30 p-4 rounded-lg border border-indigo-400/10">
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <p className="text-white font-medium">
                  {bounty.status.charAt(0).toUpperCase() + bounty.status.slice(1)}
                </p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg border border-indigo-400/10">
                <p className="text-gray-400 text-sm mb-1">Due Date</p>
                <p className="text-white font-medium">
                  In {bounty.duein} ({bounty.duedate})
                </p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg border border-indigo-400/10">
                <p className="text-gray-400 text-sm mb-1">Participants</p>
                <p className="text-white font-medium">{bounty.participants} Developers</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
              <p className="text-gray-300 mb-6">{bounty.description}</p>

              <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
              <p className="text-gray-300">{bounty.requirements}</p>
            </div>

            <div className="flex justify-end">
              <Link href={`/bounty/${id}/apply`}>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium">
                  Apply for this Bounty
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
