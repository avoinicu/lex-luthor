import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeSuggestions(suggestion: string, violationText: string) {
  const suggestionFirstChar = suggestion.charAt(0);
  const violationFirstChar = violationText.charAt(0);
  const isViolationFirstCharUppercase = violationFirstChar === violationFirstChar.toUpperCase();
  const isSuggestionFirstCharUppercase = suggestionFirstChar === suggestionFirstChar.toUpperCase();

  if (isViolationFirstCharUppercase !== isSuggestionFirstCharUppercase) {
    suggestion = isViolationFirstCharUppercase ? suggestionFirstChar.toUpperCase() + suggestion.slice(1) : suggestionFirstChar.toLowerCase() + suggestion.slice(1);
  }

  const isViolationEndingWithPunctuation = /[.!?]$/.test(violationText);
  const isSuggestionEndingWithPunctuation = /[.!?]$/.test(suggestion);

  if (!isViolationEndingWithPunctuation && isSuggestionEndingWithPunctuation) {
    suggestion = suggestion.slice(0,-1);
  }

  return suggestion
  
}
