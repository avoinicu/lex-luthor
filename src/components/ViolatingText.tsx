import { Command, CommandGroup } from "cmdk";
import { Popover } from "radix-ui";
import { useEffect, useState } from "react";

import { cn } from "../utils";
import { useReviewStore } from "../stores";
import { TViolationUI } from "../types";
import { SuggestionInput } from ".";
import DismissConfirm from "./DismissConfirm";

export default function ViolatingText({
  violationId,
}: {
  violationId: TViolationUI["id"];
}) {
  const {
    violations,
    setActiveViolation,
    activeViolation,
    suggestions,
    replaceText,
  } = useReviewStore();
  const [showDismissConfirm, setShowDismissConfirm] = useState(false);

  const violation = violations[violationId];

  const handleViolationSelect = () => {
    setActiveViolation(violationId);
  };

  useEffect(() => {
    function keyboardListener(e: KeyboardEvent) {
      if (activeViolation === violationId && e.metaKey) {
        switch (e.key) {
          case "a":
            e.preventDefault();
            e.stopPropagation();
            replaceText(violation.text, suggestions[violationId][0]);
            setActiveViolation(null);
            break;
          case "b":
            e.preventDefault();
            e.stopPropagation();
            replaceText(violation.text, suggestions[violationId][1]);
            setActiveViolation(null);
            break;
          case "c":
            e.preventDefault();
            e.stopPropagation();
            replaceText(violation.text, suggestions[violationId][2]);
            setActiveViolation(null);
            break;
          case "d":
            e.preventDefault();
            e.stopPropagation();
            setShowDismissConfirm(true);
            break;
        }
      }
    }

    document.addEventListener("keydown", keyboardListener);
    return () => {
      document.removeEventListener("keydown", keyboardListener);
    };
  }, [
    violationId,
    activeViolation,
    replaceText,
    suggestions,
    violation.text,
    setActiveViolation,
  ]);

  return (
    <Popover.Root open={activeViolation === violationId}>
      <Popover.Trigger asChild>
        <span
          autoFocus
          tabIndex={1}
          role="button"
          onClick={handleViolationSelect}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleViolationSelect();
            }
          }}
          className={cn(
            `px-1 cursor-pointer rounded-lg focus:outline-0 focus:ring-1   `,
            {
              [`focus:ring-${violation.severity}`]: true,
              [`text-${violation.severity}`]: true,
              [`bg-${violation.severity}`]: true,
              "ring-2": violationId === activeViolation,
            }
          )}
        >
          {violation.text}
        </span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          tabIndex={-1}
          onEscapeKeyDown={() => setActiveViolation(null)}
          onPointerDownOutside={() => setActiveViolation(null)}
          side="bottom"
          align="start"
          sideOffset={8}
          className="max-w-2xl rounded-lg shadow-lg bg-white border-[1px] border-slate-200"
        >
          <Command
            defaultValue="-"
            loop
            shouldFilter={false}
            className="flex flex-col gap-4 text-slate-700"
          >
            <div className="p-4 pb-0 flex flex-col gap-2">
              <div className="w-fit text-xs font-light text-slate-900 text-mono uppercase tracking-widest rounded-sm bg-slate-100 p-1">
                {violation.type} - {violation.severity}
              </div>
              <div className="text-sm text-slate-500 font-light">
                {violation.message}
              </div>
            </div>

            <SuggestionInput />

            <Command.List>
              <CommandGroup heading="Suggestions">
                {violationId &&
                  suggestions[violationId].map((suggestion, index) => (
                    <Command.Item
                      value={suggestion}
                      key={index}
                      onSelect={() => {
                        replaceText(violation.text, suggestion);
                        setActiveViolation(null);
                      }}
                      className={cn(
                        "p-4 pr-8 text-sm flex items-center gap-20 cursor-pointer group justify-between"
                      )}
                    >
                      {suggestion}
                      <kbd className="text-slate-500 font-mono flex gap-1">
                        <div className="rounded-sm bg-slate-100 group-hover:bg-white group-[[data-selected='true']]:bg-white size-6 text-center text-xs/[24px]">
                          ⌘
                        </div>
                        <div className="rounded-sm bg-slate-100 group-hover:bg-white group-[[data-selected='true']]:bg-white size-6 text-center text-xs/[24px]">
                          {String.fromCharCode(97 + index).toUpperCase()}
                        </div>
                      </kbd>
                    </Command.Item>
                  ))}
              </CommandGroup>
            </Command.List>

            <DismissConfirm
              violationId={violation.id}
              open={showDismissConfirm}
              onOpenChange={setShowDismissConfirm}
            />
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
