import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import { StatusPill } from "./StatusPill";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded border border-neon bg-background">
        <Terminal className="h-4 w-4 text-neon" />
        <div className="absolute inset-0 rounded bg-neon/20 blur-md group-hover:bg-neon/40 transition-colors" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          // event
        </span>
        <span className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
          Dark_Web<span className="text-neon">.Rises</span>
        </span>
      </div>
    </Link>
  );
}

/**
 * Top nav for player-facing pages. Admin uses its own shell.
 * Placeholder team info — replace with authenticated context.
 */
export function TopNav({
  teamName,
  teamId,
  status = "online",
  className,
}: {
  teamName?: string;
  teamId?: string;
  status?: "online" | "offline" | "waiting" | "live" | "paused" | "ended";
  className?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuthPage = pathname === "/" || pathname === "/login" || pathname.startsWith("/admin");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-lg sm:px-8",
        className,
      )}
    >
      <BrandMark />
      <div className="flex items-center gap-3">
        {!isAuthPage && teamName && (
          <div className="hidden text-right sm:block">
            <div className="font-mono text-xs font-semibold text-foreground">{teamName}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {teamId}
            </div>
          </div>
        )}
        <StatusPill status={status} />
      </div>
    </header>
  );
}
