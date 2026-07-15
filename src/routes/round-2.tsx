import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav } from "@/components/dwr/TopNav";
import { Panel } from "@/components/dwr/Panel";
import { ChallengeCard, type Challenge } from "@/components/dwr/ChallengeCard";
import { DwrButton } from "@/components/dwr/DwrButton";
import { DwrInput, DwrTextarea, Field } from "@/components/dwr/Form";
import { CountdownTimer } from "@/components/dwr/CountdownTimer";
import { Modal } from "@/components/dwr/Modal";
import { ImageViewer } from "@/components/dwr/ImageViewer";
import { ScoreCard } from "@/components/dwr/ScoreCard";
import { currentTeam, round2Challenges } from "@/lib/dwr-data";
import { Send, ArrowRight, FileDown, Volume2 } from "lucide-react";

export const Route = createFileRoute("/round-2")({
  component: Round2,
});

function Round2() {
  const [active, setActive] = useState<Challenge | null>(null);
  const [answer, setAnswer] = useState("");

  const solved = round2Challenges.filter((c) => c.status === "solved").length;
  const totalPts = round2Challenges
    .filter((c) => c.status === "solved")
    .reduce((s, c) => s + c.points, 0);

  return (
    <div className="min-h-screen">
      <TopNav teamName={currentTeam.name} teamId={currentTeam.id} status="live" />
      <main className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />

        <div className="relative">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                // round 02
              </div>
              <h1 className="font-mono text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
                Capture <span className="text-magenta">The Flag</span>
              </h1>
            </div>
            <CountdownTimer initialSeconds={2700} label="Round Ends In" />
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <ScoreCard
              label="Solved"
              value={`${solved} / ${round2Challenges.length}`}
              variant="neon"
            />
            <ScoreCard label="Round 2 Points" value={totalPts.toLocaleString()} variant="magenta" />
            <Panel className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                view final leaderboard
              </div>
              <Link to="/results" className="mt-3 inline-block">
                <DwrButton variant="secondary" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
                  Leaderboard
                </DwrButton>
              </Link>
            </Panel>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {round2Challenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} onOpen={setActive} />
            ))}
          </div>
        </div>
      </main>

      {/* Challenge detail modal */}
      <Modal
        open={!!active}
        onClose={() => {
          setActive(null);
          setAnswer("");
        }}
        title={active?.title}
        size="lg"
      >
        {active && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
              {active.category && (
                <span className="rounded border border-border bg-surface px-2 py-1 text-muted-foreground">
                  {active.category}
                </span>
              )}
              <span className="rounded border border-magenta/40 bg-magenta/10 px-2 py-1 text-magenta">
                {active.difficulty}
              </span>
              <span className="rounded border border-neon/40 bg-neon/10 px-2 py-1 text-neon">
                {active.points} pts
              </span>
            </div>

            <p className="text-sm text-foreground/90 leading-relaxed">
              Placeholder challenge description. The backend will supply the full brief, hints,
              and any relevant context. Submit the flag in the standard format below.
            </p>

            {/* Optional asset slots — render only when data present */}
            <div className="grid gap-3 sm:grid-cols-2">
              <ImageViewer aspect="video" label="Attached Image" placeholder="// optional image" />
              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-3 rounded border border-border bg-surface/60 p-3 text-left hover:border-neon transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-neon/10 text-neon">
                    <Volume2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-mono text-xs text-foreground">signal.wav</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      audio · 00:42
                    </div>
                  </div>
                </button>
                <button className="flex items-center gap-3 rounded border border-border bg-surface/60 p-3 text-left hover:border-neon transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-neon/10 text-neon">
                    <FileDown className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-mono text-xs text-foreground">payload.bin</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      download · 12 kb
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActive(null);
                setAnswer("");
              }}
              className="space-y-3"
            >
              <Field label="Submit Flag">
                <DwrInput
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="DWR{...}"
                  required
                />
              </Field>
              <div className="flex justify-end">
                <DwrButton type="submit" icon={<Send className="h-4 w-4" />} disabled={!answer.trim()}>
                  Submit
                </DwrButton>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
