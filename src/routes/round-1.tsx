import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav } from "@/components/dwr/TopNav";
import { Panel } from "@/components/dwr/Panel";
import { DwrButton } from "@/components/dwr/DwrButton";
import { DwrTextarea, Field } from "@/components/dwr/Form";
import { CountdownTimer } from "@/components/dwr/CountdownTimer";
import { ImageViewer } from "@/components/dwr/ImageViewer";
import { ScoreCard } from "@/components/dwr/ScoreCard";
import { currentTeam, round1State } from "@/lib/dwr-data";
import { Send, ArrowRight, Loader2, Sparkles, Users } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/round-1")({
  component: Round1,
});

type Phase = "prompt" | "loading" | "result";

function Round1() {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<Phase>("prompt");
  const [confirmed, setConfirmed] = useState(false);
  const currentPlayer = currentTeam.members[round1State.currentPlayerIndex];
  const nextPlayer =
    currentTeam.members[(round1State.currentPlayerIndex + 1) % currentTeam.members.length];
  const navigate = useNavigate();

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
          <Panel className="mb-6 p-4">

  <div className="grid gap-4 md:grid-cols-4">

    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        EVENT STATUS
      </div>

      <div className="mt-1 font-mono text-lg font-bold text-neon animate-pulse">
        ● LIVE
      </div>
    </div>

    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        IMAGE SET
      </div>

      <div className="mt-1 font-mono text-lg font-bold text-foreground">
        {round1State.currentImageSet} / {round1State.totalImageSets}
      </div>
    </div>

    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        PLAYER
      </div>

      <div className="mt-1 font-mono text-lg font-bold text-foreground">
        {round1State.currentPlayerIndex + 1} / {round1State.totalPlayers}
      </div>
    </div>

    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        TEAM SCORE
      </div>

      <div className="mt-1 font-mono text-lg font-bold text-magenta">
        {round1State.score}
      </div>  
    </div>

  </div>

</Panel>



          {/* Main split */}
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Left — image */}
            <div className="flex flex-col gap-4">
              <ImageViewer
                label="Current Image · Reference"
                placeholder="// awaiting generation"
                aspect="square"
              />
              
            </div>

            {/* Right — action */}
            <div className="flex flex-col gap-4">
              <Panel glow="neon" className="p-5">

  {/* Header */}

  <div className="flex items-center justify-between">

    <div>

      <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        Active Player
      </div>

      <div className="mt-1 font-mono text-2xl font-bold text-neon">
        {currentPlayer.name}
      </div>

      <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Player {round1State.currentPlayerIndex + 1}
      </div>

    </div>

    <div className="rounded border border-neon/30 bg-neon/10 px-4 py-2 text-center">

      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        PLAYER
      </div>

      <div className="mt-1 font-mono text-xl font-bold text-neon">
        {round1State.currentPlayerIndex + 1}
        <span className="text-muted-foreground">
          /{round1State.totalPlayers}
        </span>
      </div>

    </div>

  </div>

  {/* Rules */}

  <div className="mt-4 rounded border border-magenta/30 bg-magenta/5 p-4">

    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-magenta">
      Turn Rules
    </div>

    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">

      <li>• You may submit only one prompt.</li>

      <li>• Carefully review before confirming.</li>

      <li>• Prompt cannot be edited after confirmation.</li>

      <li>• Timer continues while you are thinking.</li>

    </ul>

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
                    <Field label="Your Prompt"hint="Only ONE prompt submission is allowed for this turn.">
                      <DwrTextarea
    rows={14}
    placeholder="Describe the image as accurately as possible..."
    value={prompt}
    disabled={confirmed}
    onChange={(e) => setPrompt(e.target.value)}
    required
/>
                    </Field>
                    <div className="mt-5 space-y-4">

  {/* Character Count + Review Button */}

  <div className="flex items-center justify-between">

    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      {prompt.length} Characters
    </div>

    {!confirmed ? (

      <DwrButton
        type="button"
        variant="secondary"
        disabled={!prompt.trim()}
        onClick={() => setConfirmed(true)}
      >
        Review Prompt
      </DwrButton>

    ) : (

      <span className="font-mono text-xs text-neon">
        ✓ Prompt Locked
      </span>

    )}

  </div>

  {/* Confirmation Card */}

  {confirmed && (

    <Panel
      glow="magenta"
      className="border-magenta/40 p-5"
    >

      <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-magenta">
        Final Confirmation
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        You only get <span className="text-neon font-semibold">ONE</span> prompt submission.
        Please verify your prompt before continuing.
      </p>

      {/* Prompt Preview */}

      <div className="mt-4 rounded border border-border bg-background/50 p-4">

        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Prompt Preview
        </div>

        <p className="whitespace-pre-wrap text-sm text-foreground">
          {prompt}
        </p>

      </div>

      <div className="mt-5 flex justify-end gap-3">

        <DwrButton
          type="button"
          variant="ghost"
          onClick={() => setConfirmed(false)}
        >
          Edit Prompt
        </DwrButton>

        <DwrButton
          type="submit"
          icon={<Send className="h-4 w-4" />}
        >
          Confirm & Generate
        </DwrButton>

      </div>

    </Panel>

  )}

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
  const isLastPlayer =
    round1State.currentPlayerIndex === round1State.totalPlayers - 1;

  const isLastSet =
    round1State.currentImageSet === round1State.totalImageSets;

  if (isLastPlayer && isLastSet) {
    navigate({ to: "/round-1/results" });
    return;
  }

  // Temporary reset until backend logic is added
  setPrompt("");
  setConfirmed(false);
  setPhase("prompt");
}}
                    >
                      Continue
                    </DwrButton>
                  </div>
                </Panel>
              )}

              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
