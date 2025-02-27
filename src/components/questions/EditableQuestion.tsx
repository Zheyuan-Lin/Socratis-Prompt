import React from "react"
import PropTypes from "prop-types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface EditableQuestionProps {
  value: string
  onChange: (value: string) => void
  onSave: () => void
}

export function EditableQuestion({ value, onChange, onSave }: EditableQuestionProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSave()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className="flex-1 border-slate-300 dark:border-slate-600"
      />
      <Button
        size="icon"
        variant="ghost"
        onClick={onSave}
        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      >
        <Check className="h-4 w-4" />
      </Button>
    </div>
  )
}

EditableQuestion.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}