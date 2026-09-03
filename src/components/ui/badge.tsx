import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tones = {
  paper: "bg-accent text-accent-fg",
  muted: "bg-elevated text-muted",
  up: "bg-up/15 text-up",
  down: "bg-down/15 text-down",
  live: "shadow-border text-fg",
};

export function Badge({
  className,
  tone = "muted",
  ...props
}: ComponentProps<"span"> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
