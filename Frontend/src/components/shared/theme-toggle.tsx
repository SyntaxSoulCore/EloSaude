"use client";

import { MoonStar, SunMedium } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type Variant = "icon" | "outline" | "solid";

type ThemeToggleProps = {
  className?: string;
  variant?: Variant;
};

const variantConfig: Record<
  Variant,
  {
    buttonVariant: "default" | "outline" | "ghost";
    size: "sm" | "lg";
    className?: string;
    showLabel: boolean;
  }
> = {
  icon: {
    buttonVariant: "ghost",
    size: "sm",
    className:
      "size-10 rounded-lg border border-border/70 bg-surface p-0 hover:bg-muted dark:bg-surface dark:hover:bg-muted/80",
    showLabel: false,
  },
  outline: {
    buttonVariant: "outline",
    size: "lg",
    showLabel: true,
  },
  solid: {
    buttonVariant: "default",
    size: "lg",
    className:
      "shadow-[0_14px_34px_rgb(17_108_93_/_0.18)] dark:shadow-[0_14px_34px_rgb(31_168_146_/_0.16)]",
    showLabel: true,
  },
};

export function ThemeToggle({ className, variant = "outline" }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  const config = variantConfig[variant];
  const label = isDark ? "Tema claro" : "Tema escuro";

  return (
    <Button
      type="button"
      variant={config.buttonVariant}
      size={config.size}
      onClick={toggleTheme}
      className={cn(config.className, className)}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={label}
    >
      {isDark ? <SunMedium data-icon="inline-start" /> : <MoonStar data-icon="inline-start" />}
      {config.showLabel ? label : <span className="sr-only">{label}</span>}
    </Button>
  );
}
