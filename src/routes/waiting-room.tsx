import { createFileRoute, Link } from "@tanstack/react-router";
import { TopNav } from "@/components/dwr/TopNav";
import { Panel } from "@/components/dwr/Panel";
import { StatusPill } from "@/components/dwr/StatusPill";
import { CountdownTimer } from "@/components/dwr/CountdownTimer";
import { DwrButton } from "@/components/dwr/DwrButton";
import { currentTeam } from "@/lib/dwr-data";
import { Wifi, User } from "lucide-react";

export const Route = createFileRoute("/waiting-room")({
  component: WaitingRoom,
});

function WaitingRoom() {
  return (
    <div className="min-h-screen">
      <TopNav teamName={currentTeam.name} teamId={currentTeam.id} status="waiting" />
      <main className="relative mx-auto max-w-5xl px-6 py-10">
        <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />

        <div className="relative">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            // stage · pre-launch
          </div>
          <h1 className="mb-8 font-mono text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            Waiting <span className="text-neon">Room</span>
          </h1>

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <Panel className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    team
                  </div>
                  <div className="font-mono text-2xl font-bold text-neon">{currentTeam.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{currentTeam.id}</div>
                </div>
                <StatusPill status="waiting" label="Standby" />
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {currentTeam.members.map((m) => (
                  <div
                    key={m.id}
                    className="rounded border border-border bg-surface/60 p-3 text-center"
                  >
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-neon/40 bg-background">
                      <User className="h-4 w-4 text-neon" />
                    </div>
                    <div className="truncate font-mono text-xs font-semibold text-foreground">
                      {m.name}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {m.role}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded border border-neon/20 bg-neon/5 p-4">
                <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
                  system message
                </div>
                <p className="font-mono text-sm text-foreground animate-flicker">
                  {"> "}Waiting for the administrator to start Round 1_
                </p>
              </div>
            </Panel>

            <div className="flex flex-col gap-4">
              <Panel className="flex flex-col items-center justify-center p-6">
                <CountdownTimer initialSeconds={180} label="Launch In" size="lg" />
              </Panel>
              <Panel className="p-5">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  system
                </div>
                <ul className="space-y-2 text-sm">
                  <Row label="Connection" value={<StatusPill status="online" />} />
                  <Row label="Event Status" value={<span className="font-mono text-warning">Awaiting Start</span>} />
                  <Row label="Round" value={<span className="font-mono text-foreground">01 · Prep</span>} />
                  <Row label="Latency" value={<span className="font-mono text-neon">24 ms</span>} />
                </ul>
              </Panel>
              {/* Placeholder — real transition is admin-triggered */}
              <Link to="/round-1">
                <DwrButton variant="ghost" className="w-full" icon={<Wifi className="h-4 w-4" />}>
                  Simulate Round Start
                </DwrButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between">
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {value}
    </li>
  );
}
