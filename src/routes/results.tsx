import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/dwr/TopNav";
import { Panel } from "@/components/dwr/Panel";
import { ScoreCard } from "@/components/dwr/ScoreCard";
import { Leaderboard } from "@/components/dwr/Leaderboard";
import { currentTeam, leaderboard } from "@/lib/dwr-data";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/results")({
  component: FinalResults,
});

function FinalResults() {
  const me = leaderboard.find((e) => e.teamId === currentTeam.id);
  const podium = leaderboard.slice(0, 3);

  return (
    <div className="min-h-screen">
      <TopNav teamName={currentTeam.name} teamId={currentTeam.id} status="ended" />
      <main className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />

        <div className="relative">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            // event · terminated
          </div>
          <h1 className="mb-8 font-mono text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            Final <span className="text-neon">Standings</span>
          </h1>

          {/* Podium */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {podium.map((t, i) => {
              const heights = ["sm:mt-0", "sm:mt-6", "sm:mt-12"];
              const glow = i === 0 ? "neon" : i === 1 ? undefined : "magenta";
              return (
                <Panel
                  key={t.teamId}
                  className={`p-6 text-center ${heights[i]}`}
                  glow={glow as "neon" | "magenta" | undefined}
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neon/40 bg-neon/5">
                    <Trophy
                      className={`h-5 w-5 ${
                        i === 0 ? "text-neon" : i === 1 ? "text-foreground" : "text-magenta"
                      }`}
                    />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Rank #{i + 1}
                  </div>
                  <div className="mt-2 font-mono text-xl font-bold text-foreground">
                    {t.teamName}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">{t.teamId}</div>
                  <div className="mt-3 font-mono text-3xl font-black tabular-nums text-neon">
                    {t.score.toLocaleString()}
                  </div>
                </Panel>
              );
            })}
          </div>

          {/* Your line */}
          {me && (
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <ScoreCard label="Your Final Score" value={me.score.toLocaleString()} />
              <ScoreCard
                label="Your Final Rank"
                value={`#${String(me.rank).padStart(2, "0")}`}
                variant="magenta"
                hint={`of ${leaderboard.length}`}
              />
              <ScoreCard
                label="R1 + R2 Split"
                value={`${me.round1?.toLocaleString()} + ${me.round2?.toLocaleString()}`}
                variant="muted"
              />
            </div>
          )}

          <Leaderboard
            entries={leaderboard}
            title="Top Teams"
            highlightTeamId={currentTeam.id}
            showBreakdown
          />
        </div>
      </main>
    </div>
  );
}
