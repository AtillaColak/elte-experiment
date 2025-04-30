"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface InformationModalProps {
  title: string
  description?: string
  content: string | React.ReactNode
  onNext: () => void
  nextButtonText?: string
  headerBannerUrl?: string
  footerBannerUrl?: string
  showNextButton?: boolean
}

export function InformationModal({
  title,
  description,
  content,
  onNext,
  nextButtonText = "Sonraki",
  headerBannerUrl,
  footerBannerUrl,
  showNextButton = true,
}: InformationModalProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {typeof content === "string" ? (
          <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          content
        )}
      </CardContent>
      {showNextButton && (
        <CardFooter className="flex justify-end">
          <Button onClick={onNext}>{nextButtonText}</Button>
        </CardFooter>
      )}
    </Card>
  )
}
