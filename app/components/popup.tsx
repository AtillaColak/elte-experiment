"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

interface PopupProps {
  imageUrl: string
  infoUrl: string
  skipTime?: number // Time in seconds before skip button appears
  onNext: () => void
  altText?: string
  showNextButton?: boolean
  onTimerComplete?: () => void
}

export function Popup({
  imageUrl,
  infoUrl,
  skipTime = 5,
  onNext,
  altText = "Advertisement",
  showNextButton = true,
  onTimerComplete,
}: PopupProps) {
  const [timeLeft, setTimeLeft] = useState(skipTime)
  const [canSkip, setCanSkip] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanSkip(true)
      if (onTimerComplete) {
        onTimerComplete()
      }
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, onTimerComplete])

  const handleInfoClick = () => {
    window.open(infoUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto relative">
      <CardHeader className="p-0">
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
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <img src={imageUrl || "/placeholder.svg"} alt={altText} className="w-full h-auto object-cover" />
        </div>
      </CardContent>
      {showNextButton && (
        <CardFooter className="flex justify-end p-4">
          {canSkip ? <Button onClick={onNext}>Skip Ad</Button> : <Button disabled>Skip in {timeLeft}s</Button>}
        </CardFooter>
      )}
      {!showNextButton && (
        <CardFooter className="flex justify-center p-4">
          <div className="text-sm text-muted-foreground">
            {canSkip ? "You can continue now" : `Please wait ${timeLeft}s before continuing`}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
