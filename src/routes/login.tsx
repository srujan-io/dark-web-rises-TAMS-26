import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav } from "@/components/dwr/TopNav";
import { Panel } from "@/components/dwr/Panel";
import { DwrButton } from "@/components/dwr/DwrButton";
import { DwrInput, Field } from "@/components/dwr/Form";
import { ArrowRight, Users } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: TeamLogin,
});

function TeamLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-12">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <Panel variant="elevated" className="relative p-8" glow="neon">
          <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <Users className="h-3 w-3 text-neon" />
            team access
          </div>
          <h1 className="mb-1 font-mono text-2xl font-black uppercase tracking-tight text-foreground">
            Enter <span className="text-neon">Credentials</span>
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Authenticate your squad to join the grid.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/waiting-room" });
            }}
            className="space-y-4"
          >
            <Field label="Team ID">
              <DwrInput
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="TEAM-042"
                autoComplete="username"
                required
              />
            </Field>
            <Field label="Team Password">
              <DwrInput
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </Field>

            <DwrButton
              type="submit"
              size="lg"
              className="w-full"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Login
            </DwrButton>
          </form>

          <div className="mt-6 border-t border-border pt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            // credentials distributed at check-in
          </div>
        </Panel>
      </main>
    </div>
  );
}
