import { cn } from "@/lib/utils";
import { Panel } from "./Panel";

export interface LeaderboardEntry {
  rank: number;
  teamId: string;
  teamName: string;
  score: number;
  round1?: number;
  round2?: number;
  status?: "qualified" | "eliminated" | "active";
}

export function Leaderboard({
  entries,
  title = "Leaderboard",
  highlightTeamId,
  showBreakdown = false,
  className,
}: {
  entries: LeaderboardEntry[];
  title?: string;
  highlightTeamId?: string;
  showBreakdown?: boolean;
  className?: string;
}) {
  return (
    <Panel className={cn("overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-neon">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {entries.length} teams
        </span>
      </div>
      <div className="divide-y divide-border">
        {entries.map((e) => {
          const isMe = e.teamId === highlightTeamId;
          const podium = e.rank <= 3;
          return (
            <div
              key={e.teamId}
              className={cn(
                "grid items-center gap-3 px-5 py-3 font-mono transition-colors",
                showBreakdown ? "grid-cols-[3rem_1fr_5rem_5rem_5rem]" : "grid-cols-[3rem_1fr_6rem]",
                isMe && "bg-neon/5",
              )}
            >
              <div
                className={cn(
                  "text-lg font-bold tabular-nums",
                  podium ? "text-neon" : "text-muted-foreground",
                )}
              >
                #{String(e.rank).padStart(2, "0")}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {e.teamName}
                  </span>
                  {isMe && (
                    <span className="rounded bg-neon/20 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-neon">
                      you
                    </span>
                  )}
                  {e.status === "qualified" && (
                    <span className="rounded bg-success/20 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-success">
                      qual
                    </span>
                  )}
                  {e.status === "eliminated" && (
                    <span className="rounded bg-destructive/20 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-destructive">
                      out
                    </span>
                  )}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {e.teamId}
                </div>
              </div>
              {showBreakdown && (
                <>
                  <div className="text-right text-xs tabular-nums text-muted-foreground">
                    {e.round1 ?? "—"}
                  </div>
                  <div className="text-right text-xs tabular-nums text-muted-foreground">
                    {e.round2 ?? "—"}
                  </div>
                </>
              )}
              <div className="text-right text-lg font-bold tabular-nums text-neon">
                {e.score.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
