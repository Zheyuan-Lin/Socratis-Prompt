import { ReactNode } from "react"

export interface Question {
  question: string;
  category: string;
  icon?: ReactNode;
}