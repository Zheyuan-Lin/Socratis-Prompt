import React from "react"
import { Button } from "@/components/ui/button"

interface EditableQuestionProps {
  value: string
  onChange: (value: string) => void
  onSave: () => void
}

export function EditableQuestion({ value, onChange, onSave }: EditableQuestionProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSave()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-md resize-none h-24"
      />
      <Button
        variant="ghost"
        onClick={onSave}
        className="self-end text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      >
        Save
      </Button>
    </div>
  )
}