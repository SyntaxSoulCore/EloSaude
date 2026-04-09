import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-[0_14px_34px_rgb(17_108_93_/_0.26)] hover:bg-primary-700 dark:bg-primary-500 dark:text-[#04172B] dark:hover:bg-primary-400",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
        outline:
          "border border-border bg-surface text-body hover:bg-muted dark:bg-surface dark:hover:bg-muted/80",
        ghost: "text-body hover:bg-muted dark:hover:bg-muted/80",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
