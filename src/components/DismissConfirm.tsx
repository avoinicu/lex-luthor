import { Popover } from "radix-ui";
import { useState } from "react";
import { useReviewStore } from "../stores";

export default function DismissConfirm({
  open,
  onOpenChange,
  violationId,
}: {
  violationId: string;
  open: boolean;
  onOpenChange: (shouldShow: boolean) => void;
}) {
  const [dismissReason, setDismissReason] = useState("");
  const { dismissViolation } = useReviewStore();

  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>
        <div className="-mt-4 border-t-[1px] border-slate-300 px-4 py-2 text-xs text-slate-500 font-mono">
          <button
            onClick={() => onOpenChange(true)}
            className="group cursor-pointer flex items-center gap-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-0 focus:text-slate-700 focus:bg-slate-100 px-3 py-2 rounded-lg ml-auto"
          >
            Dismiss violation
            <kbd className="text-slate-500 font-mono flex gap-1">
              <div className="rounded-sm bg-slate-100 group-hover:bg-white group-focus:bg-white size-6 text-center text-xs/[24px]">
                ⌘
              </div>
              <div className="rounded-sm bg-slate-100 group-hover:bg-white group-focus:bg-white size-6 text-center text-xs/[24px]">
                D
              </div>
            </kbd>
          </button>
        </div>
      </Popover.Trigger>
      <Popover.Content
        sideOffset={8}
        side="top"
        align="end"
        alignOffset={8}
      >
        <div className="w-xl rounded-lg shadow-lg bg-white border-[1px] border-slate-200 flex gap-3 items-center px-4">
          <input
            autoFocus
            type="text"
            value={dismissReason}
            onChange={(e) => setDismissReason(e.target.value)}
            placeholder="Why are you dismissing this violation?"
            className="text-sm text-slate-500 font-light rounded-lg w-full p-2 focus:outline-0 focus:border-slate-400"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                setDismissReason("");
                onOpenChange(false);
              }
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                if (dismissReason.trim().length > 3) {
                  dismissViolation(violationId, dismissReason);
                  setDismissReason("");
                }
                onOpenChange(false);
              }
            }}
          />
          <kbd className="text-slate-500 font-mono flex gap-1">
            <div className="rounded-sm bg-slate-100 group-hover:bg-white group-[[data-selected='true']]:bg-white size-6 text-center text-xs/[24px]">
              ↵
            </div>
            /
            <div className="rounded-sm bg-slate-100 group-hover:bg-white group-[[data-selected='true']]:bg-white px-2  text-center text-xs/[24px]">
              esc
            </div>
          </kbd>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
