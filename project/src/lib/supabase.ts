// This file is kept as a placeholder to prevent import errors
// but all functionality has been removed

// Mock data for UI demonstration
const mockData: Record<string, any[]> = {
  bounties: [
    {
      id: "1",
      title: "Build a DeFi Dashboard",
      description: "Create a dashboard to track DeFi investments across multiple protocols",
      organization: "AlgoFinance",
      reward: 500,
      duein: "7d",
      duedate: "2024-06-01",
      participants: 3,
      featured: true,
      status: "active",
      category: "Development",
      requirements: "Experience with React and data visualization",
      creatoraddress: "ALGO123456789",
      created_at: "2024-05-01T12:00:00Z",
    },
    {
      id: "2",
      title: "Design NFT Marketplace UI",
      description: "Design a modern UI for an NFT marketplace on Algorand",
      organization: "AlgoNFT",
      reward: 300,
      duein: "5d",
      duedate: "2024-05-28",
      participants: 5,
      featured: false,
      status: "active",
      category: "Design",
      requirements: "Figma skills and NFT marketplace knowledge",
      creatoraddress: "ALGO987654321",
      created_at: "2024-05-03T14:30:00Z",
    },
  ],
  projects: [
    {
      id: "1",
      name: "AlgoSwap",
      description: "A decentralized exchange for Algorand assets",
      stage: "Building MVP",
      category: "DeFi",
      teamsize: 3,
      roles: ["Frontend Developer", "Smart Contract Engineer", "UI/UX Designer"],
      createdby: "AlgoTeam",
      creatoraddress: "ALGO123456789",
      created_at: "2024-04-15T10:00:00Z",
    },
    {
      id: "2",
      name: "AlgoNFT Gallery",
      description: "A platform to showcase and trade Algorand NFTs",
      stage: "Beta Testing",
      category: "NFT",
      teamsize: 4,
      roles: ["Backend Developer", "Frontend Developer", "Marketing Specialist"],
      createdby: "NFTCreators",
      creatoraddress: "ALGO987654321",
      created_at: "2024-04-20T15:45:00Z",
    },
  ],
}

// Export a dummy function to prevent import errors
export const getMockData = (table: string) => mockData[table] || []
