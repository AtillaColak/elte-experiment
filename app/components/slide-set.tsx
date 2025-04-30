"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { InformationModal } from "./information-modal"
import { Question, type QuestionType, type Choice } from "./question"
import { Popup } from "./popup"
import { Button } from "@/components/ui/button"


const CONSENT_ID = "q2";
const DECLINE_VALUE = "Hayır";

type SlideType = "information" | "question" | "popup"

interface BaseSlide {
  id: string
  type: SlideType
}

interface InformationSlide extends BaseSlide {
  type: "information"
  title: string
  description?: string
  content: string | React.ReactNode
  nextButtonText?: string
  headerBannerUrl?: string
  footerBannerUrl?: string
}

interface QuestionSlide extends BaseSlide {
  type: "question"
  questionType: QuestionType
  title: string
  description?: string
  choices?: Choice[]
  minValue?: number
  maxValue?: number
  minLabel?: string
  maxLabel?: string
  required?: boolean
  entry?: string
}

interface PopupSlide extends BaseSlide {
  type: "popup"
  imageUrl: string
  infoUrl: string
  skipTime?: number
  altText?: string
}

export type Slide = InformationSlide | QuestionSlide | PopupSlide

interface SlideSetProps {
  slides: Slide[]
  onComplete: (answers: Record<string, [string, string | number]>) => boolean | Promise<boolean>
  onBannerChange?: (headerBannerUrl?: string, footerBannerUrl?: string) => void
}

export function SlideSet({ slides, onComplete, onBannerChange }: SlideSetProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, [string, string | number]>>({})
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
  const [showThankYouModal, setShowThankYouModal] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentError, setCurrentError] = useState<string>("")
  const [canProceed, setCanProceed] = useState(false)
  const [popupTimerComplete, setPopupTimerComplete] = useState(false)
  const [optedOut, setOptedOut] = useState(false);   
  const containerRef = useRef<HTMLDivElement>(null)

  const currentSlide = slides[currentSlideIndex]
  const isLastSlide = currentSlideIndex === slides.length - 1

  // Update banners when the current slide changes
  useEffect(() => {
    if (currentSlide.type === "information" && onBannerChange) {
      const infoSlide = currentSlide as InformationSlide
      onBannerChange(infoSlide.headerBannerUrl, infoSlide.footerBannerUrl)
    }
  }, [currentSlide, onBannerChange])

  // Reset state when slide changes
  useEffect(() => {
    setCurrentError("")

    // For information slides, we can always proceed
    if (currentSlide.type === "information") {
      setCanProceed(true)
    }
    // For popup slides, we need to wait for the timer
    else if (currentSlide.type === "popup") {
      setPopupTimerComplete(false)
      setCanProceed(false)
    }
    // For question slides, check if there's already an answer
    else if (currentSlide.type === "question") {
      const questionSlide = currentSlide as QuestionSlide
      const hasAnswer = answers[questionSlide.id]?.[1] !== undefined && answers[questionSlide.id]?.[1] !== ""
      setCanProceed(hasAnswer || !questionSlide.required)
    }
  }, [currentSlideIndex, currentSlide, answers])

  const validateCurrentSlide = (): boolean => {
    // For question slides, check if an answer is required but not provided
    if (currentSlide.type === "question") {
      const questionSlide = currentSlide as QuestionSlide
      const currentAnswer = answers[questionSlide.id]?.[1]

      if (questionSlide.required && (currentAnswer === undefined || currentAnswer === "")) {
        setCurrentError("This question requires an answer")
        return false
      }
    }

    // For popup slides, check if the timer has completed
    if (currentSlide.type === "popup" && !popupTimerComplete) {
      return false
    }

    setCurrentError("")
    return true
  }

  const handleNext = async () => {
    if (optedOut){ 
      setShowThankYouModal(optedOut); 
      setCanProceed(!optedOut);
      return;
    }

    if (!canProceed) {

      if (currentSlide.type === "question") {
        validateCurrentSlide()
      }
      return
    }


    if (!validateCurrentSlide()) {
      return
    }

    if (isLastSlide) {
      const result = await onComplete(answers)
      setIsSuccess(result)
      setShowThankYouModal(true)
    } else {
      setDirection(1)
      setCurrentSlideIndex((prev) => prev + 1)
      if (containerRef.current) {
        containerRef.current.scrollTop = 0
      }
    }
  }

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setDirection(-1)
      setCurrentSlideIndex((prev) => prev - 1)
      if (containerRef.current) {
        containerRef.current.scrollTop = 0
      }
    }
  }


const handleAnswer = (id: string, answer: string | number) => {
    setCurrentError("")
  
    console.log("Answering question:", id, answer)
    
    const slide = slides.find((s) => s.id === id) as QuestionSlide | undefined
    setAnswers((prev) => ({
      ...prev,
      [id]: [slide?.entry ?? "", answer],
    }))

    if (id === CONSENT_ID) {
      const declined = answer === DECLINE_VALUE;
  
      setOptedOut(declined);      
      return;
    }
    const isValid =
      answer !== undefined &&
      answer !== "" &&
      !(typeof answer === "number" && isNaN(answer))
  
    const isRequired = slide?.required !== false
  
    setCanProceed(isRequired ? isValid : true)
  }
  
  const handlePopupTimerComplete = () => {
    setPopupTimerComplete(true)
    setCanProceed(true)
  }

  const closeThankYouModal = () => {
    window.location.href = "/"
    setShowThankYouModal(false)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col" ref={containerRef}>
      <div className="flex-1 overflow-auto relative">
        <div className="flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSlideIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 }, // Slower transition
                opacity: { duration: 0.5 }, // Longer fade duration
              }}
              className="w-full p-4 inset-0 overflow-auto"
            >
              {currentSlide.type === "information" && (
                <InformationModal
                  title={currentSlide.title}
                  description={currentSlide.description}
                  content={currentSlide.content}
                  onNext={handleNext}
                  nextButtonText={currentSlide.nextButtonText}
                  headerBannerUrl={(currentSlide as InformationSlide).headerBannerUrl}
                  footerBannerUrl={(currentSlide as InformationSlide).footerBannerUrl}
                  showNextButton={false}
                />
              )}

              {currentSlide.type === "question" && (
                <Question
                  id={currentSlide.id}
                  type={currentSlide.questionType}
                  title={currentSlide.title}
                  description={currentSlide.description}
                  choices={currentSlide.choices}
                  minValue={currentSlide.minValue}
                  maxValue={currentSlide.maxValue}
                  minLabel={currentSlide.minLabel}
                  maxLabel={currentSlide.maxLabel}
                  required={currentSlide.required}
                  onAnswer={handleAnswer}
                  onNext={() => {}}
                  currentAnswer={answers[currentSlide.id]?.[1]}
                  showNextButton={false}
                  error={currentError}
                />
              )}

              {currentSlide.type === "popup" && (
                <Popup
                  imageUrl={currentSlide.imageUrl}
                  infoUrl={currentSlide.infoUrl}
                  skipTime={(currentSlide as PopupSlide).skipTime}
                  onNext={handleNext}
                  altText={(currentSlide as PopupSlide).altText}
                  showNextButton={false}
                  onTimerComplete={handlePopupTimerComplete}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed navigation bar at the bottom */}
      <div className="p-4 flex justify-between items-center border-t bg-white">
        <Button variant="outline" onClick={handlePrevious} disabled={currentSlideIndex === 0}>
          Önceki
        </Button>

        <div className="text-sm text-muted-foreground">
          {currentSlideIndex + 1} of {slides.length}
        </div>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className={!canProceed ? "opacity-50 cursor-not-allowed" : ""}
        >
          {isLastSlide ? "Tamamla" : "Sonraki"}
        </Button>
      </div>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
              {optedOut
                ? "Katıldığınız için teşekkürler!"
                : isSuccess
                  ? "Teşekkür Ederiz!"
                  : "Hata Oluştu"}
            </h2>

            <p className="mb-6">
              {optedOut
                ? "Vaktinizi ayırdığınız için teşekkür ederiz."
                : isSuccess
                  ? "Anketinizi başarıyla gönderdiniz. Katılımınız için teşekkür ederiz."
                  : "Anketinizi gönderirken bir hata oluştu. Lütfen tekrar deneyin."}
            </p>
            <div className="flex justify-end">
              <Button onClick={closeThankYouModal}>Kapat</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
