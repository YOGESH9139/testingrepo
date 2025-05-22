"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { motion } from "framer-motion"

interface ImageItem {
  name: string
  path: string
  description: string
  type: "logo" | "icon" | "other"
}

const images: ImageItem[] = [
  {
    name: "LlamaCoder Logo",
    path: "/images/logo.png",
    description: "The main LlamaCoder logo with together.ai branding",
    type: "logo",
  },
  {
    name: "New Logo",
    path: "/images/new_logo.png",
    description: "Updated LlamaCoder logo with together.ai branding",
    type: "logo",
  },
  {
    name: "Globe Icon",
    path: "/images/globe.svg",
    description: "A minimalist globe icon",
    type: "icon",
  },
  {
    name: "File Icon",
    path: "/images/file.svg",
    description: "A document/file icon",
    type: "icon",
  },
  {
    name: "Halo Effect",
    path: "/images/halo.png",
    description: "A circular black image with a glowing white ring",
    type: "other",
  },
  {
    name: "Together Computer",
    path: "/images/togethercomputer.png",
    description: "Together AI logo icon",
    type: "logo",
  },
  {
    name: "Vercel Logo",
    path: "/images/vercel.svg",
    description: "The Vercel platform logo",
    type: "logo",
  },
  {
    name: "Next.js Logo",
    path: "/images/next.svg",
    description: "The Next.js framework logo",
    type: "logo",
  },
  {
    name: "Window Icon",
    path: "/images/window.svg",
    description: "A browser/window icon",
    type: "icon",
  },
  {
    name: "OG Image",
    path: "/images/og-image.png",
    description: "LlamaCoder marketing image showing 'Turn your idea into an app'",
    type: "other",
  },
]

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Image Gallery</h2>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="all">All Images</TabsTrigger>
          <TabsTrigger value="logos">Logos</TabsTrigger>
          <TabsTrigger value="icons">Icons</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        {["all", "logos", "icons", "other"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images
                .filter(
                  (img) =>
                    tab === "all" ||
                    (tab === "logos" && img.type === "logo") ||
                    (tab === "icons" && img.type === "icon") ||
                    (tab === "other" && img.type === "other"),
                )
                .map((image, index) => (
                  <motion.div
                    key={image.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      className="overflow-hidden cursor-pointer border-white/10 hover:border-[#6104d7]/50 transition-all duration-300"
                      onClick={() => setSelectedImage(image)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square relative bg-black/40 rounded-md mb-3 flex items-center justify-center p-4">
                          <Image
                            src={image.path || "/placeholder.svg"}
                            alt={image.name}
                            width={150}
                            height={150}
                            className="object-contain max-h-full"
                          />
                        </div>
                        <h3 className="font-medium text-sm truncate">{image.name}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0c0909] p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedImage.name}</h3>
              <button onClick={() => setSelectedImage(null)} className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="bg-black/40 rounded-md p-8 mb-4 flex items-center justify-center">
              <Image
                src={selectedImage.path || "/placeholder.svg"}
                alt={selectedImage.name}
                width={400}
                height={400}
                className="object-contain max-h-[50vh]"
              />
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">{selectedImage.description}</p>
              <div className="bg-black/40 p-3 rounded-md">
                <p className="font-mono text-sm text-gray-400">Path: {selectedImage.path}</p>
                <p className="font-mono text-sm text-gray-400">Type: {selectedImage.type}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
