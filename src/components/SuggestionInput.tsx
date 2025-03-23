import { useCommandState } from "cmdk";
import { useRef, useState } from "react";

import { useReviewStore } from "../stores";

export default function SuggestionInput() {
  const [inputValue, setInputValue] = useState("");
  const commandState = useCommandState((state) => state);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setActiveViolation, replaceText, violations, activeViolation } =
    useReviewStore();

  return (
    <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      ref={inputRef}
      placeholder="Type replacement text and press enter..."
      className="w-full py-3 text-sm px-4 border-y-[1px] border-slate-200 focus:outline-0 placeholder:text-slate-500 placeholder:font-light placeholder:italic"
      id="violation-replacement"
      onKeyDown={(e) => {
        if (e.key === "Enter" && !commandState.selectedItemId) {
          replaceText(violations[activeViolation!].text, inputValue);
          setActiveViolation(null);
          setInputValue("");
        }
      }}
    />
  );
}
