"use client"

import { useState, useEffect } from "react"
import { Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BannerProps {
  imageUrl: string
  altText?: string
  height?: string
  className?: string
  infoUrl?: string
  fit?: "cover" | "contain" | "fill"
}

export function Banner({
  imageUrl,
  altText = "Advertisement",
  height = "h-24",
  className = "",
  infoUrl,
  fit = "contain",
}: BannerProps) {
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(imageUrl)
  const [previousImage, setPreviousImage] = useState("")
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    if (imageUrl !== currentImage) {
      setPreviousImage(currentImage)
      setCurrentImage(imageUrl)
      setLoading(true)
      setTransitioning(true)
    }
  }, [imageUrl, currentImage])

  const handleImageLoad = () => {
    setLoading(false)
    // After a short delay, complete the transition
    setTimeout(() => {
      setTransitioning(false)
    }, 300)
  }

  const handleInfoClick = () => {
    if (infoUrl) {
      window.open(infoUrl, "_blank", "noopener,noreferrer")
    }
  }

  // Determine object-fit style based on the fit prop
  const objectFitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
  }[fit]

  return (
    <div className={`relative overflow-hidden ${height} w-full ${className}`}>
      {/* Previous image (fading out) */}
      {transitioning && previousImage && (
        <div className="absolute inset-0 transition-opacity duration-1000 opacity-0 bg-white">
          <img src={previousImage || "/placeholder.svg"} alt={altText} className={`w-full h-full md:object-cover lg:${objectFitClass}`} />
        </div>
      )}

      {/* Current image (fading in) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"} bg-white`}
      >
        <img
          src={currentImage || "/placeholder.svg?height=200&width=1200"}
          alt={altText}
          className={`w-full h-full md:object-cover lg:${objectFitClass}`}
          onLoad={handleImageLoad}
        />
      </div>

      {/* Info button */}
      {infoUrl && (
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
            onClick={handleInfoClick}
          >
            <Info className="h-4 w-4 text-white" />
          </Button>
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      )}
    </div>
  )
}
