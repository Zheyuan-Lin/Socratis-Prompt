import { type FC } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Question } from "./types"
import { EditableQuestion } from "./EditableQuestion"

export interface QuestionCardProps {
  question: Question
  isEditing: boolean
  isSelected: boolean
  editValue: string
  onEditValueChange: (value: string) => void
  onSave: () => void
  onClick: () => void
}

export function QuestionCard({
  question,
  isEditing,
  isSelected,
  editValue,
  onEditValueChange,
  onSave,
  onClick,
}: QuestionCardProps) {
  return (
    <Card
      className={`
        cursor-pointer transition-all duration-300 overflow-hidden
        ${isEditing ? "ring-2 ring-blue-500 shadow-lg" : ""}
        ${isSelected ? "ring-4 ring-blue-500 shadow-lg" : "hover:shadow-md transition-shadow duration-200"} 
        bg-white/80 backdrop-blur-sm dark:bg-slate-800/80
        border border-slate-200 dark:border-slate-700
      `}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full" />

      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {question.icon}
          <span className="font-semibold text-sm text-slate-600 dark:text-slate-300">{question.category}</span>
        </div>
        
        {isEditing ? (
          <EditableQuestion
            value={editValue}
            onChange={onEditValueChange}
            onSave={onSave}
          />
        ) : (
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-slate-700 dark:text-slate-200 font-medium">{question.question}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}