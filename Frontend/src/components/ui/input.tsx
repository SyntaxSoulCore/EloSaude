import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-lg border border-border bg-surface px-4 py-3 text-base text-body shadow-sm outline-none transition placeholder:text-body-muted focus-visible:border-primary-400 focus-visible:ring-4 focus-visible:ring-primary-100/70 dark:bg-surface dark:focus-visible:ring-primary-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
