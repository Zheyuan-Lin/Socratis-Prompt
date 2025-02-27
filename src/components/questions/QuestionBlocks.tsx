"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "../QuestionCard"
import { BackgroundDecoration } from "./BackgroundDecoration"
import { defaultQuestions } from "@/lib/constants/defaultQuestions"
import { Question } from "./types"

export default function QuestionBlocks() {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleBlockClick = (index: number) => {
    setEditingIndex(index)
    setEditValue(questions[index].question)
  }

  const handleSave = () => {
    if (editingIndex !== null) {
      const newQuestions = [...questions]
      newQuestions[editingIndex] = { ...newQuestions[editingIndex], question: editValue }
      setQuestions(newQuestions)
      setEditingIndex(null)
    }
  }

  const handleSend = () => {
    const validQuestions = questions.filter((q) => q.question.trim() !== "")

    if (validQuestions.length > 0) {
      console.log("Sending questions:", validQuestions)
      alert("Questions sent: " + validQuestions.map((q) => q.question).join(", "))
    }
  }

  const hasQuestions = questions.some((q) => q.question.trim() !== "")

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <BackgroundDecoration />

      <div className="max-w-7xl mx-auto relative z-10 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Socratis Prompts
          </h1>
          <p className="text-slate-600 mt-4 text-lg">
            please choose one of the following category
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {questions.map((item, index) => (
            <QuestionCard
              key={index}
              question={item}
              isEditing={editingIndex === index}
              editValue={editValue}
              onEditValueChange={setEditValue}
              onSave={handleSave}
              onClick={() => handleBlockClick(index)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            onClick={handleSend}
            disabled={!hasQuestions}
            className="px-8 py-6 text-lg font-medium bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl text-white"
          >
            Send Prompts
          </Button>
        </div>
      </div>
    </div>
  )
}