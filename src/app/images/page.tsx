import { ImageGallery } from "@/components/image-gallery"

export default function ImagesPage() {
  return (
    <main className="bg-[#0c0909] min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter pt-8">
            Image{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6104d7] to-[#ec0033]">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Browse all the images and assets available in the AlgoDevs project.
          </p>
        </div>

        <ImageGallery />
      </div>
    </main>
  )
}
