import { ClientProfile } from "@/types";

interface MomentumPulseProps {
  clients: ClientProfile[];
}

export function MomentumPulse({ clients }: MomentumPulseProps) {
  const averageMomentum = Math.round(
    clients.reduce((total, client) => total + client.momentumScore, 0) / Math.max(clients.length, 1)
  );
  const supportiveNeeds = clients.reduce<Record<ClientProfile["supportNeed"], number>>(
    (acc, client) => {
      acc[client.supportNeed] += 1;
      return acc;
    },
    { light: 0, moderate: 0, intensive: 0 }
  );

  return (
    <div className="glass-panel relative flex h-full w-full flex-col gap-6 rounded-3xl border border-white/10 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-200/60">Momentum pulse</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Cohort vitality</h3>
        <p className="text-sm text-slate-200/70">Snapshot of energy and support balance across your roster.</p>
      </div>

      <div className="mt-2 grid gap-4 md:grid-cols-2">
        <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-0 animate-pulse-slow rounded-full border border-emerald-300/10" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <span className="text-4xl font-bold text-white">{averageMomentum}</span>
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-200/60">Avg momentum</p>
        </div>

        <div className="space-y-4">
          {(
            [
              { id: "light", label: "Light touch", accent: "bg-emerald-500/20" },
              { id: "moderate", label: "Moderate", accent: "bg-amber-500/20" },
              { id: "intensive", label: "Intensive", accent: "bg-rose-500/20" }
            ] as const
          ).map((bucket) => (
            <div key={bucket.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between text-sm text-white">
                <span>{bucket.label}</span>
                <span className="text-slate-200/70">{supportiveNeeds[bucket.id]} clients</span>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className={`${bucket.accent} h-full rounded-full`}
                  style={{ width: `${(supportiveNeeds[bucket.id] / Math.max(1, clients.length)) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
