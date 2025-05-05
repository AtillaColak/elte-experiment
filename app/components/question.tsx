"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export type QuestionType = "multiple-choice" | "scale" | "integer"

export interface Choice {
  id: string
  text: string
}

export interface QuestionProps {
  id: string
  type: QuestionType
  title: string
  description?: string
  choices?: Choice[]
  minValue?: number
  maxValue?: number
  minLabel?: string
  maxLabel?: string
  required?: boolean
  onAnswer: (id: string, answer: string | number) => void
  onNext: () => void
  currentAnswer?: string | number
  showNextButton?: boolean
  error?: string
}

export function Question({
  id,
  type,
  title,
  description,
  choices = [],
  minValue = 1,
  maxValue = 7,
  minLabel = "Not at all",
  maxLabel = "Extremely",
  required = true,
  onAnswer,
  onNext,
  currentAnswer,
  showNextButton = true,
  error,
}: QuestionProps) {
  
  const [answer, setAnswer] = useState<string | number>(currentAnswer || "")
  const [localError, setLocalError] = useState<string>("")
  const [clicked, setClicked] = useState(false)           
    
  const handleAnswer = (value: string | number) => {
    setAnswer(value)
    setLocalError("")
    onAnswer(id, value)
  }

  const handleNext = () => {
    if (required && !answer && answer !== 0) {
      setLocalError("This question requires an answer")
      return
    }
    onNext()
  }

  // Use external error if provided, otherwise use local error
  const displayError = error || localError

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {type === "multiple-choice" && (
          <RadioGroup value={answer as string} onValueChange={handleAnswer} className="space-y-3">
            {choices.map((choice) => (
              <div key={choice.id} className="flex items-center space-x-2">
                <RadioGroupItem value={choice.id} id={choice.id} />
                <Label htmlFor={choice.id} className="cursor-pointer">
                  {choice.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {type === "scale" && (
          <div className="space-y-6">
            <Slider
              value={[(answer as number) || minValue]}
              min={minValue}
              max={maxValue}
              step={1}
              onValueChange={(value) => handleAnswer(value[0])}
              className="my-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{minLabel}</span>
              <span>{maxLabel}</span>
            </div>
            <div className="flex justify-between px-1">
              {Array.from({ length: maxValue - minValue + 1 }).map((_, i) => (
                <span key={i} className="text-xs">
                  {minValue + i}
                </span>
              ))}
            </div>
          </div>
        )}

        {type === "integer" && (
          <div className="space-y-2">
            <Input
              type="number"
              min={minValue}
              max={maxValue}
              value={answer as number}
              onChange={(e) => handleAnswer(Number.parseInt(e.target.value) || "")}
              className="w-full"
            />
            {minValue !== undefined && maxValue !== undefined && (
              <p className="text-sm text-muted-foreground">
                Lütfen {minValue} ile {maxValue} arasında bir değer girin.
              </p>
            )}
          </div>
        )}

        {displayError && <p className="text-sm text-red-500 mt-2">{displayError}</p>}
      </CardContent>
      {showNextButton && (
        <CardFooter className="flex justify-end">
          <Button onClick={handleNext}>Next</Button>
        </CardFooter>
      )}
    </Card>
  )
}
