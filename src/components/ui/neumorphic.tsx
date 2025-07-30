
"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

const ScrollPaperTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="p-4 bg-[#fdfbf3] rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.1),_0_6px_6px_rgba(0,0,0,0.1)] h-full">
      <div className="bg-[#fdfbf3] border-t-2 border-b-2 border-[#d2b48c] h-full overflow-hidden">
        <textarea
          ref={ref}
          className={cn(
            "w-full h-full px-6 py-4 border-none outline-none text-[#5a4e3a] placeholder:text-muted-foreground",
            "bg-transparent bg-paper-pattern bg-paper-pattern-size",
            "scrollbar-hide",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
});
ScrollPaperTextarea.displayName = "ScrollPaperTextarea";


export { ScrollPaperTextarea };
