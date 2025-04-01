"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "./QuestionCard"
import { BackgroundDecoration } from "./BackgroundDecoration"
import { defaultQuestions } from "@/lib/constants/defaultQuestions"
import { Question } from "./types"
import { Pencil, Check, AlertCircle } from "lucide-react"
import { useExternalSocket } from "@/hooks/useSocket"

export default function QuestionBlocks() {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<string>("")
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState<boolean>(false)
  
  // Use our external socket hook
  const { isConnected, sendExternalMessage } = useExternalSocket()

  // Handle block selection
  const handleBlockClick = (index: number) => {
    setSelectedIndex(index)
    setShouldAnimate(true)
    setErrorMessage(null)
  }

  // Handle edit button click
  const handleEdit = () => {
    if (selectedIndex !== null) {
      setEditingIndex(selectedIndex)
      setEditValue(questions[selectedIndex].question)
    }
  }

  // Handle save button click
  const handleSave = () => {
    if (editingIndex !== null) {
      const newQuestions = [...questions]
      newQuestions[editingIndex] = { ...newQuestions[editingIndex], question: editValue }
      setQuestions(newQuestions)
      setEditingIndex(null)
    }
  }

  // Handle send button click
  const handleSend = async () => {
    if (selectedIndex !== null) {
      if (!isConnected) {
        setErrorMessage("Cannot send: Socket not connected. Please refresh the page.")
        return
      }
      
      setIsSending(true)
      const questionToSend = questions[selectedIndex].question
      await sendExternalMessage(questionToSend)
      setIsSending(false)
      alert("Sent question:" + questionToSend)
    } else {
      setErrorMessage('Please select a question first')
    }
  }

  // Clear error after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <BackgroundDecoration />

      <div className="max-w-7xl mx-auto relative z-10 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-800">
            Socratis Prompts
          </h1>
          <p className="text-slate-600 mt-4 text-lg">
            Please choose from the following category
          </p>
          {isConnected ? (
            <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
              Server Connected
            </span>
          ) : (
            <span className="inline-block mt-2 px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
              Server Disconnected
            </span>
          )}
        </div>

        {errorMessage && (
          <div className="max-w-md mx-auto mb-6 p-3 bg-red-100 text-red-800 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {questions.map((item, index) => (
            <div
              key={index}
              className={`relative transition-all duration-300 ${
                selectedIndex === index ? "border-2 border-blue-500 rounded-lg" : ""
              }`}
              onClick={() => handleBlockClick(index)}
            >
              <QuestionCard
                question={item}
                isEditing={editingIndex === index}
                isSelected={selectedIndex === index}
                editValue={editValue}
                onEditValueChange={setEditValue}
                onSave={handleSave}
                onClick={() => handleBlockClick(index)}
              />
              {selectedIndex === index && editingIndex !== index && (
                <div
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit()
                  }}
                >
                  <Pencil className="h-4 w-4 text-blue-500" />
                </div>
              )}
              {editingIndex === index && (
                <div
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSave()
                  }}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            onClick={handleSend}
            disabled={selectedIndex === null || editingIndex !== null || !isConnected || isSending}
            className={`text-lg font-medium from-blue-400 to-indigo-400 shadow-md hover:shadow-lg transition-all duration-300 text-white
              ${isSending ? 'animate-pulse' : ''}`}
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Sending...
              </span>
            ) : (
              'Send Prompts'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}