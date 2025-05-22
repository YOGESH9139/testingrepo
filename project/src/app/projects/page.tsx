"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Loader2 } from "lucide-react"
import { useWallet } from "@txnlab/use-wallet-react"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"
import Link from "next/link"

// Initialize Supabase client
const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    : null

// Define Project interface
interface Project {
  id: string
  name: string
  description: string
  stage: string
  category: string
  teamsize: number
  roles: string[]
  createdby: string
  creatoraddress: string
  created_at: string
}

// Project stages
const projectStages = ["Idea Stage", "Proof of Concept", "Building MVP", "Beta Testing", "Launched"]

// Project categories
const projectCategories = [
  "DeFi",
  "NFT",
  "Gaming",
  "DAO",
  "Infrastructure",
  "Social",
  "Marketplace",
  "Tooling",
  "Analytics",
  "E-Commerce",
  "Creativity",
  "Education",
  "Other",
]

export default function ProjectsPage() {
  const { activeAccount } = useWallet()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTeamSize, setSelectedTeamSize] = useState("")
  const [showMyProjects, setShowMyProjects] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [showMyProjects, selectedCategory, selectedTeamSize])

  async function fetchProjects() {
    setLoading(true)
    try {
      // Use mock data instead of actual Supabase fetch
      setTimeout(() => {
        // This simulates the data that would come from Supabase
        const mockProjects = [
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
          {
            id: "3",
            name: "AlgoVote",
            description: "A decentralized voting platform built on Algorand",
            stage: "Idea Stage",
            category: "DAO",
            teamsize: 1,
            roles: ["Full Stack Developer", "Blockchain Engineer", "UI Designer"],
            createdby: "VoteDAO",
            creatoraddress: "ALGO555555555",
            created_at: "2024-05-01T09:20:00Z",
          },
        ]

        // Filter for my projects if selected
        let filteredProjects = mockProjects
        if (showMyProjects && activeAccount) {
          filteredProjects = mockProjects.filter((project) => project.creatoraddress === activeAccount.address)
        }

        // Filter by search term if provided
        if (searchTerm) {
          filteredProjects = filteredProjects.filter(
            (project) =>
              project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              project.description.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        }

        // Filter by category if selected
        if (selectedCategory && selectedCategory !== "all") {
          filteredProjects = filteredProjects.filter((project) => project.category === selectedCategory)
        }

        // Filter by team size if selected
        if (selectedTeamSize) {
          if (selectedTeamSize === "1") {
            filteredProjects = filteredProjects.filter((project) => project.teamsize === 1)
          } else if (selectedTeamSize === "2-5") {
            filteredProjects = filteredProjects.filter((project) => project.teamsize >= 2 && project.teamsize <= 5)
          } else if (selectedTeamSize === "5+") {
            filteredProjects = filteredProjects.filter((project) => project.teamsize > 5)
          }
        }

        setProjects(filteredProjects)
        setLoading(false)
      }, 1000) // Simulate network delay
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast.error("Failed to fetch projects")
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchProjects()
  }

  const toggleMyProjects = () => {
    setShowMyProjects(!showMyProjects)
  }

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
              <Input
                placeholder="Search for a specific project..."
                className="pl-10 bg-black/30 border-indigo-400/20 text-white h-12 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            {activeAccount && (
              <Link href="/projects/create">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-12 px-6 font-medium rounded-lg w-full md:w-auto">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Project
                </Button>
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              variant={showMyProjects ? "default" : "outline"}
              onClick={toggleMyProjects}
              className={`${showMyProjects ? "bg-[#1e1033] text-white" : "bg-white text-black"} border-0 font-medium`}
              disabled={!activeAccount}
            >
              MY PROJECTS
            </Button>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-white text-black border-0 h-11 rounded-lg">
                <SelectValue placeholder="CATEGORY" />
              </SelectTrigger>
              <SelectContent className="bg-white border-0">
                <SelectItem value="all">All Categories</SelectItem>
                {projectCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTeamSize} onValueChange={setSelectedTeamSize}>
              <SelectTrigger className="w-[180px] bg-white text-black border-0 h-11 rounded-lg">
                <SelectValue placeholder="TEAM SIZE" />
              </SelectTrigger>
              <SelectContent className="bg-white border-0">
                <SelectItem value="any">Any Size</SelectItem>
                <SelectItem value="1">1 Member</SelectItem>
                <SelectItem value="2-5">2-5 Members</SelectItem>
                <SelectItem value="5+">5+ Members</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={handleSearch} className="bg-white text-black border-0">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-black/40 border-indigo-400/20 overflow-hidden group hover:border-indigo-400/50 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none py-1 px-3">
                      {project.stage}
                    </Badge>
                    <span className="text-indigo-300 text-sm">{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-indigo-300">Category:</span>
                      <span className="text-white">{project.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-indigo-300">Team Size:</span>
                      <span className="text-white">{project.teamsize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-indigo-300">Created By:</span>
                      <span className="text-white">{project.createdby}</span>
                    </div>
                  </div>

                  {project.roles && project.roles.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h4 className="text-sm font-medium text-indigo-300 mb-2">Open Roles:</h4>
                      {project.roles.map((role: string) => (
                        <Button
                          key={role}
                          onClick={() => {
                            if (activeAccount) {
                              toast.success(`Applied for ${role} role`)
                            } else {
                              toast.error("Please connect your wallet to apply")
                            }
                          }}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                          disabled={!activeAccount}
                        >
                          Apply for {role} role
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-black/30 rounded-xl border border-indigo-400/20 p-10 text-center">
            <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            {activeAccount && (
              <Link href="/projects/create">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create a New Project
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
