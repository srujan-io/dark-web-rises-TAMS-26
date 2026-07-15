import { cn } from "@/lib/utils";
import { Panel } from "./Panel";
import { Lock, CheckCircle2, Trophy } from "lucide-react";

export type ChallengeStatus = "locked" | "open" | "solved" | "disabled";
export type ChallengeDifficulty = "easy" | "medium" | "hard" | "insane";

export interface Challenge {
  id: string;
  title: string;
  difficulty: ChallengeDifficulty;
  status: ChallengeStatus;
  points: number;
  category?: string;
  solves?: number;
}

const difficultyColor: Record<ChallengeDifficulty, string> = {
  easy: "text-success border-success/40",
  medium: "text-warning border-warning/40",
  hard: "text-magenta border-magenta/40",
  insane: "text-destructive border-destructive/40",
};

export function ChallengeCard({
  challenge,
  onOpen,
  className,
}: {
  challenge: Challenge;
  onOpen?: (c: Challenge) => void;
  className?: string;
}) {
  const disabled = challenge.status === "locked" || challenge.status === "disabled";
  return (
    <button
      onClick={() => !disabled && onOpen?.(challenge)}
      disabled={disabled}
      className={cn(
        "group text-left transition-all",
        !disabled && "hover:scale-[1.02]",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <Panel
        className={cn(
          "p-5 h-full flex flex-col gap-3 transition-shadow",
          !disabled && "group-hover:glow-neon",
          challenge.status === "solved" && "border-neon/60",
        )}
      >
        <div className="flex items-center justify-between">
          {challenge.category && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {challenge.category}
            </span>
          )}
          <span
            className={cn(
              "rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest",
              difficultyColor[challenge.difficulty],
            )}
          >
            {challenge.difficulty}
          </span>
        </div>
        <h3 className="font-mono text-lg font-bold text-foreground group-hover:text-neon transition-colors">
          {challenge.title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Trophy className="h-3.5 w-3.5 text-neon" />
            <span className="tabular-nums text-neon font-semibold">{challenge.points} pts</span>
          </div>
          <div className="flex items-center gap-2">
            {challenge.status === "solved" && (
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-neon">
                <CheckCircle2 className="h-3 w-3" /> solved
              </span>
            )}
            {challenge.status === "locked" && (
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <Lock className="h-3 w-3" /> locked
              </span>
            )}
            {challenge.solves !== undefined && (
              <span className="font-mono text-[10px] text-muted-foreground">
                {challenge.solves} solves
              </span>
            )}
          </div>
        </div>
      </Panel>
    </button>
  );
}
