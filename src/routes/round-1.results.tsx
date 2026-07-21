import { createFileRoute, Link } from "@tanstack/react-router";
import { TopNav } from "@/components/dwr/TopNav";
import { Panel } from "@/components/dwr/Panel";
import { ScoreCard } from "@/components/dwr/ScoreCard";
import { DwrButton } from "@/components/dwr/DwrButton";
import { currentTeam, round1Results } from "@/lib/dwr-data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/round-1/results")({
  component: Round1Results,
});

function Round1Results() {
  const qualified = round1Results.status === "qualified";
  return (
    <div className="min-h-screen">
      <TopNav teamName={currentTeam.name} teamId={currentTeam.id} status="ended" />
      <main className="relative mx-auto max-w-5xl px-6 py-10">
        <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />

        <div className="relative">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            // round 01 · complete
          </div>
          <h1 className="mb-2 font-mono text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
  Round 1 <span className="text-neon">Complete</span>
</h1>

<p className="max-w-2xl text-muted-foreground">
  Congratulations! Your team has completed all five image sets.
  Below is your overall performance for Round 1.
</p>

          <div className="grid gap-4 md:grid-cols-3">
            <ScoreCard label="Total Score" value={round1Results.score.toLocaleString()} />
            <ScoreCard
              label="Current Rank"
              value={`#${String(round1Results.rank).padStart(2, "0")}`}
              hint={`of ${round1Results.totalTeams} teams`}
              variant="magenta"
            />
            <Panel className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Status
              </div>
              <div
                className={`mt-2 flex items-center gap-2 font-mono text-2xl font-bold uppercase ${
                  qualified ? "text-success" : "text-destructive"
                }`}
              >
                <CheckCircle2 className="h-6 w-6" />
                {qualified ? "Qualified" : "Eliminated"}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {qualified ? "Proceed to Round 2" : "Better luck next cycle"}
              </div>
            </Panel>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">

  <ScoreCard
    label="Best Similarity"
    value="94%"
    variant="neon"
  />

  <ScoreCard
    label="Average Similarity"
    value="87%"
  />

  <ScoreCard
    label="Best Set"
    value="SET 04"
    variant="magenta"
  />

</div>

          <Panel className="mt-6 overflow-hidden">
            <div className="border-b border-border px-5 py-3">
              <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-neon">
                Set Breakdown
              </h3>
            </div>
            <div className="divide-y divide-border">
              {round1Results.breakdown.map((b) => (
                <div
                  key={b.set}
                  className="grid grid-cols-[4rem_1fr_6rem_6rem] items-center gap-4 px-5 py-3 font-mono"
                >
                  <div className="text-sm font-bold text-muted-foreground">
                    SET {String(b.set).padStart(2, "0")}
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
                    <div
                      className="h-full bg-neon"
                      style={{
                        width: `${b.similarity * 100}%`,
                        boxShadow: "0 0 10px color-mix(in oklab, var(--neon) 60%, transparent)",
                      }}
                    />
                  </div>
                  <div className="text-right text-sm tabular-nums text-foreground">
                    {Math.round(b.similarity * 100)}%
                  </div>
                  <div className="text-right text-sm font-bold tabular-nums text-neon">
                    +{b.points}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="mt-8 flex justify-end">
            <Link to="/round-2">
              <DwrButton size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Continue
              </DwrButton>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
