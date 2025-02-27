import { Question } from "@/components/questions/types";
import { Search, Crosshair, CheckCircle, Target, Layers, Compass } from "lucide-react";
import React from "react";

export const defaultQuestions: Question[] = [
  {
    category: "Clarity",
    question: "What do you mean by this insight? Can you clarify your interpretation?",
    icon: React.createElement(Search, { className: "h-5 w-5 text-blue-500" }),
  },
  {
    category: "Precision",
    question: "What exact values or ranges are you referring to in this visualization?",
    icon: React.createElement(Crosshair, { className: "h-5 w-5 text-green-500" }),
  },
  {
    category: "Accuracy",
    question: "What evidence from the visualization supports your claim?",
    icon: React.createElement(CheckCircle, { className: "h-5 w-5 text-red-500" }),
  },
  {
    category: "Relevance",
    question: "What is the most important insight you've gained from this dataset?",
    icon: React.createElement(Target, { className: "h-5 w-5 text-purple-500" }),
  },
  {
    category: "Depth",
    question: "What might be the underlying causes of this trend or pattern?",
    icon: React.createElement(Layers, { className: "h-5 w-5 text-orange-500" }),
  },
  {
    category: "Breadth",
    question: "What other perspectives or interpretations could explain this trend?",
    icon: React.createElement(Compass, { className: "h-5 w-5 text-teal-500" }),
  }
]; 