import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav } from "@/components/dwr/TopNav";
import { Panel } from "@/components/dwr/Panel";
import { DwrButton } from "@/components/dwr/DwrButton";
import { DwrTextarea, Field } from "@/components/dwr/Form";
import { CountdownTimer } from "@/components/dwr/CountdownTimer";
import { ImageViewer } from "@/components/dwr/ImageViewer";
import { ScoreCard } from "@/components/dwr/ScoreCard";
import { StepProgress } from "@/components/dwr/ProgressBar";
import { currentTeam, round1State } from "@/lib/dwr-data";
import { Send, ArrowRight, Loader2, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/round-1")({
  component: Round1,
});

type Phase = "prompt" | "loading" | "result";

function Round1() {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<Phase>("prompt");
  const currentPlayer = currentTeam.members[round1State.currentPlayerIndex];
  const nextPlayer =
    currentTeam.members[(round1State.currentPlayerIndex + 1) % currentTeam.members.length];

  return (
    <div className="min-h-screen">
      <TopNav teamName={currentTeam.name} teamId={currentTeam.id} status="live" />
      <main className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />

        <div className="relative">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                // round 01
              </div>
              <h1 className="font-mono text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
                Lost In <span className="text-neon">Translation</span>
              </h1>
            </div>
            <CountdownTimer initialSeconds={90} label="Turn Timer" size="md" />
          </div>

          {/* Progress row */}
          <Panel className="mb-6 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <StepProgress
                total={round1State.totalImageSets}
                current={round1State.currentImageSet}
                label="Image Set"
              />
              <StepProgress
                total={round1State.totalPlayers}
                current={round1State.currentPlayerIndex + 1}
                label="Player Pass"
              />
            </div>
          </Panel>

          {/* Main split */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            {/* Left — image */}
            <div className="flex flex-col gap-4">
              <ImageViewer
                label="Current Image · Reference"
                placeholder="// awaiting generation"
                aspect="square"
              />
              <div className="grid grid-cols-2 gap-3">
                <ScoreCard label="Round Score" value={round1State.score.toLocaleString()} />
                <ScoreCard
                  label="Set"
                  value={`${round1State.currentImageSet}/${round1State.totalImageSets}`}
                  variant="magenta"
                />
              </div>
            </div>

            {/* Right — action */}
            <div className="flex flex-col gap-4">
              {/* Current player card */}
              <Panel className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      current player
                    </div>
                    <div className="mt-1 font-mono text-xl font-bold text-neon">
                      {currentPlayer.name}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {currentPlayer.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        pass to
                      </div>
                      <div className="font-mono text-sm text-foreground">{nextPlayer.name}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-neon" />
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </Panel>

              {/* Prompt / loading / result — same slot */}
              {phase === "prompt" && (
                <Panel variant="elevated" className="p-5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPhase("loading");
                      // simulated UI transition
                      setTimeout(() => setPhase("result"), 1600);
                    }}
                  >
                    <Field label="Your Prompt" hint="Describe what you see. Precision wins signal.">
                      <DwrTextarea
                        rows={6}
                        placeholder={"> a neon-lit alley in tokyo, rain..."}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                      />
                    </Field>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {prompt.length} chars
                      </div>
                      <DwrButton
                        type="submit"
                        icon={<Send className="h-4 w-4" />}
                        disabled={!prompt.trim()}
                      >
                        Submit Prompt
                      </DwrButton>
                    </div>
                  </form>
                </Panel>
              )}

              {phase === "loading" && (
                <Panel variant="elevated" className="flex flex-col items-center justify-center gap-4 p-10">
                  <Loader2 className="h-10 w-10 animate-spin text-neon" />
                  <div className="font-mono text-sm uppercase tracking-[0.3em] text-neon animate-pulse">
                    generating signal_
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    prompt streamed · model warming
                  </div>
                </Panel>
              )}

              {phase === "result" && (
                <Panel variant="elevated" className="p-5" glow="magenta">
                  <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-magenta">
                    <Sparkles className="h-3 w-3" /> generation complete
                  </div>
                  <ImageViewer
                    label="Generated · Pass to next player"
                    placeholder="// output ready"
                    aspect="square"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-mono text-xs text-muted-foreground">
                      Hand the laptop to <span className="text-neon">{nextPlayer.name}</span>
                    </div>
                    <DwrButton
                      variant="magenta"
                      icon={<ArrowRight className="h-4 w-4" />}
                      onClick={() => {
                        setPrompt("");
                        setPhase("prompt");
                      }}
                    >
                      Continue
                    </DwrButton>
                  </div>
                </Panel>
              )}

              {/* Round complete comparison — visual only */}
              <Panel className="p-5">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  set summary · appears after final pass
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <ImageViewer
                    label="Original"
                    placeholder="// original"
                    aspect="square"
                  />
                  <ImageViewer
                    label="Final Output"
                    placeholder="// final"
                    aspect="square"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded border border-border bg-surface/60 p-3">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Similarity
                    </div>
                    <div className="font-mono text-2xl font-bold text-neon tabular-nums">
                      {Math.round(round1State.lastSimilarity * 100)}%
                    </div>
                  </div>
                  <div className="rounded border border-border bg-surface/60 p-3">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Points Earned
                    </div>
                    <div className="font-mono text-2xl font-bold text-magenta tabular-nums">
                      +{round1State.lastPointsAwarded}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link to="/round-1/results">
                    <DwrButton variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
                      View Round Results
                    </DwrButton>
                  </Link>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
