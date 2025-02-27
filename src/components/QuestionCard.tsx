import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import { Question } from "@/components/questions/types"
import { EditableQuestion } from "@/components/questions/EditableQuestion"

interface QuestionCardProps {
  question: Question
  isEditing: boolean
  editValue: string
  onEditValueChange: (value: string) => void
  onSave: () => void
  onClick: () => void
}

export function QuestionCard({
  question,
  isEditing,
  editValue,
  onEditValueChange,
  onSave,
  onClick,
}: QuestionCardProps) {
  return (
    <Card
      className={`
        cursor-pointer transition-all duration-300 overflow-hidden
        ${isEditing ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"}
        bg-white/80 backdrop-blur-sm dark:bg-slate-800/80
        border border-slate-200 dark:border-slate-700
      `}
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
          <div className="flex items-start gap-3" onClick={onClick}>
            <div className="flex-1">
              <p className="text-slate-700 dark:text-slate-200 font-medium">{question.question}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Click to edit this question</p>
            </div>
            <Pencil className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-1 flex-shrink-0" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}