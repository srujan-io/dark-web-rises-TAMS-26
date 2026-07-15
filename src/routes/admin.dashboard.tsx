import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav } from "@/components/dwr/TopNav";
import { Panel } from "@/components/dwr/Panel";
import { DwrButton } from "@/components/dwr/DwrButton";
import { StatusPill } from "@/components/dwr/StatusPill";
import { Leaderboard } from "@/components/dwr/Leaderboard";
import { Modal } from "@/components/dwr/Modal";
import { DwrInput, DwrTextarea, Field } from "@/components/dwr/Form";
import { adminTeams, leaderboard, round2Challenges } from "@/lib/dwr-data";
import {
  Play,
  Pause,
  Square,
  RefreshCw,
  Upload,
  Plus,
  Pencil,
  Trash2,
  Radio,
  Image as ImageIcon,
  Volume2,
  FileDown,
} from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

type Section = "overview" | "teams" | "rounds" | "challenges" | "leaderboard";

function AdminDashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [challengeModal, setChallengeModal] = useState<{ mode: "new" | "edit"; id?: string } | null>(
    null,
  );

  const nav: { key: Section; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "teams", label: "Teams" },
    { key: "rounds", label: "Rounds" },
    { key: "challenges", label: "Challenges" },
    { key: "leaderboard", label: "Leaderboard" },
  ];

  return (
    <div className="min-h-screen">
      <TopNav status="live" />
      <main className="relative mx-auto max-w-[1400px] px-6 py-8">
        <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />

        <div className="relative">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                // ops console
              </div>
              <h1 className="font-mono text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
                Admin <span className="text-magenta">Dashboard</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <Radio className="h-3 w-3 text-neon animate-pulse" />
              broadcasting · 32 teams connected
            </div>
          </div>

          {/* Tab strip */}
          <div className="mb-6 flex flex-wrap gap-1 border-b border-border">
            {nav.map((n) => (
              <button
                key={n.key}
                onClick={() => setSection(n.key)}
                className={`relative px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  section === n.key
                    ? "text-neon"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                {section === n.key && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-px bg-neon shadow-[0_0_12px_var(--neon)]" />
                )}
              </button>
            ))}
          </div>

          {section === "overview" && <OverviewSection />}
          {section === "teams" && <TeamsSection />}
          {section === "rounds" && <RoundsSection />}
          {section === "challenges" && (
            <ChallengesSection onNew={() => setChallengeModal({ mode: "new" })} onEdit={(id) => setChallengeModal({ mode: "edit", id })} />
          )}
          {section === "leaderboard" && (
            <Leaderboard entries={leaderboard} title="Live Standings" showBreakdown />
          )}
        </div>
      </main>

      <Modal
        open={!!challengeModal}
        onClose={() => setChallengeModal(null)}
        title={challengeModal?.mode === "new" ? "New Challenge" : "Edit Challenge"}
        size="xl"
      >
        <ChallengeForm onClose={() => setChallengeModal(null)} />
      </Modal>
    </div>
  );
}

/* --------------------------------- Sections -------------------------------- */

function OverviewSection() {
  const stats = [
    { label: "Total Teams", value: "32" },
    { label: "Active", value: "28", accent: "text-neon" },
    { label: "Offline", value: "4", accent: "text-destructive" },
    { label: "Round", value: "02", accent: "text-magenta" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Panel key={s.label} className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {s.label}
            </div>
            <div className={`mt-2 font-mono text-3xl font-bold tabular-nums ${s.accent ?? "text-foreground"}`}>
              {s.value}
            </div>
          </Panel>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <TeamsSection compact />
        <div className="space-y-4">
          <RoundsSection compact />
        </div>
      </div>
    </div>
  );
}

function TeamsSection({ compact }: { compact?: boolean }) {
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-neon">
          {compact ? "Live Team Progress" : "Team Management"}
        </h3>
        {!compact && (
          <DwrButton size="sm" variant="secondary" icon={<Plus className="h-3 w-3" />}>
            Add Team
          </DwrButton>
        )}
      </div>
      <div className="divide-y divide-border">
        {adminTeams.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-[1fr_9rem_8rem_auto] items-center gap-4 px-5 py-3 font-mono"
          >
            <div>
              <div className="text-sm font-semibold text-foreground">{t.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {t.id}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{t.progress}</div>
            <div className="text-right text-lg font-bold tabular-nums text-neon">
              {t.score.toLocaleString()}
            </div>
            <StatusPill status={t.status} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function RoundsSection({ compact }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel className="p-5">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Round 01 · Lost In Translation
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-mono text-xl font-bold text-foreground">Complete</div>
          <StatusPill status="ended" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <DwrButton size="sm" icon={<Play className="h-3 w-3" />}>Start R1</DwrButton>
          <DwrButton size="sm" variant="secondary" icon={<Pause className="h-3 w-3" />}>Pause</DwrButton>
          <DwrButton size="sm" variant="secondary" icon={<RefreshCw className="h-3 w-3" />}>Resume</DwrButton>
          <DwrButton size="sm" variant="danger" icon={<Square className="h-3 w-3" />}>End R1</DwrButton>
          <DwrButton size="sm" variant="magenta" className="col-span-2" icon={<Upload className="h-3 w-3" />}>
            Publish R1 Results
          </DwrButton>
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Round 02 · Capture The Flag
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-mono text-xl font-bold text-foreground">Live</div>
          <StatusPill status="live" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <DwrButton size="sm" icon={<Play className="h-3 w-3" />}>Start R2</DwrButton>
          <DwrButton size="sm" variant="danger" icon={<Square className="h-3 w-3" />}>End R2</DwrButton>
        </div>
        {!compact && (
          <div className="mt-4 rounded border border-border bg-surface/60 p-3 font-mono text-[11px] text-muted-foreground">
            {"> "}All timer, scoring and gate-unlock logic is handled by the backend.
          </div>
        )}
      </Panel>
    </div>
  );
}

function ChallengesSection({
  onNew,
  onEdit,
}: {
  onNew: () => void;
  onEdit: (id: string) => void;
}) {
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-neon">
          Round 2 · Challenge Management
        </h3>
        <DwrButton size="sm" onClick={onNew} icon={<Plus className="h-3 w-3" />}>
          New Challenge
        </DwrButton>
      </div>
      <div className="divide-y divide-border">
        {round2Challenges.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-[1fr_8rem_6rem_6rem_auto] items-center gap-4 px-5 py-3 font-mono"
          >
            <div>
              <div className="text-sm font-semibold text-foreground">{c.title}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.category}
              </div>
            </div>
            <span className="rounded border border-magenta/40 bg-magenta/10 px-2 py-0.5 text-center text-[10px] uppercase tracking-widest text-magenta">
              {c.difficulty}
            </span>
            <div className="text-right text-sm tabular-nums text-neon">{c.points} pts</div>
            <StatusPill status={c.status === "solved" ? "ended" : c.status === "locked" ? "offline" : "live"} label={c.status} />
            <div className="flex justify-end gap-1">
              <button
                onClick={() => onEdit(c.id)}
                className="rounded p-2 text-muted-foreground hover:bg-surface hover:text-neon"
                aria-label="Edit"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                className="rounded p-2 text-muted-foreground hover:bg-surface hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ChallengeForm({ onClose }: { onClose: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <DwrInput placeholder="The Broken Cipher" />
        </Field>
        <Field label="Category">
          <DwrInput placeholder="Crypto" />
        </Field>
        <Field label="Difficulty">
          <select className="flex h-11 w-full rounded border border-border bg-input px-3 font-mono text-sm text-foreground focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon">
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
            <option>insane</option>
          </select>
        </Field>
        <Field label="Points">
          <DwrInput type="number" placeholder="300" />
        </Field>
      </div>
      <Field label="Description">
        <DwrTextarea rows={5} placeholder="Full challenge brief..." />
      </Field>
      <Field label="Correct Answer / Flag">
        <DwrInput placeholder="DWR{...}" />
      </Field>

      <div className="grid gap-3 sm:grid-cols-3">
        <UploadSlot icon={<ImageIcon className="h-4 w-4" />} label="Upload Image" />
        <UploadSlot icon={<Volume2 className="h-4 w-4" />} label="Upload Audio" />
        <UploadSlot icon={<FileDown className="h-4 w-4" />} label="Upload File" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <input type="checkbox" className="accent-[color:var(--neon)]" defaultChecked />
          Enabled (visible to teams)
        </label>
        <div className="flex gap-2">
          <DwrButton type="button" variant="ghost" onClick={onClose}>
            Cancel
          </DwrButton>
          <DwrButton type="submit">Save Challenge</DwrButton>
        </div>
      </div>
    </form>
  );
}

function UploadSlot({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center gap-2 rounded border border-dashed border-border bg-surface/40 p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-neon hover:text-neon"
    >
      <span className="text-neon">{icon}</span>
      {label}
    </button>
  );
}
