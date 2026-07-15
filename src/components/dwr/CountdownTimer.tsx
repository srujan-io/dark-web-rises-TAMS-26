import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Placeholder countdown — decrements from `initialSeconds` for visual demo only.
 *  Real timer is driven by backend WebSocket signals. */
export function CountdownTimer({
  initialSeconds = 120,
  label = "Time Remaining",
  className,
  size = "md",
}: {
  initialSeconds?: number;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [s, setS] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setS((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  const critical = s <= 10;

  const sizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl md:text-7xl",
  };

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
      <div
        className={cn(
          "font-mono font-bold tabular-nums",
          sizes[size],
          critical ? "text-destructive animate-pulse" : "text-neon",
        )}
        style={{
          textShadow: critical
            ? "0 0 20px color-mix(in oklab, var(--destructive) 60%, transparent)"
            : "0 0 20px color-mix(in oklab, var(--neon) 60%, transparent)",
        }}
      >
        {mm}:{ss}
      </div>
    </div>
  );
}
