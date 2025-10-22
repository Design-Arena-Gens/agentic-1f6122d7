import { ClientProfile } from "@/types";

interface FocusBoardProps {
  clients: ClientProfile[];
}

const labelMap: Record<ClientProfile["supportNeed"], string> = {
  light: "Maintenance",
  moderate: "Guided",
  intensive: "Deep support"
};

export function FocusBoard({ clients }: FocusBoardProps) {
  const prioritized = [...clients]
    .sort((a, b) => b.momentumScore - a.momentumScore)
    .map((client) => {
      const nextMilestone = client.goals.length
        ? client.goals.reduce((soonest, goal) => {
            const goalDate = new Date(goal.targetDate).getTime();
            if (!soonest) return goal;
            return goalDate < new Date(soonest.targetDate).getTime() ? goal : soonest;
          }, client.goals[0])
        : null;

      return {
        id: client.id,
        name: client.name,
        focusArea: client.focusArea,
        celebrating: client.celebrating,
        supportNeed: client.supportNeed,
        nextMilestone
      };
    });

  return (
    <div className="glass-panel w-full rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-200/60">Focus board</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Next human moves</h3>
          <p className="text-sm text-slate-200/70">Anchor live priorities and celebrate traction moments.</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-100">
          {prioritized.length} profiles
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {prioritized.map((client) => (
          <div key={client.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 text-white">
              <div>
                <p className="text-sm font-semibold">{client.name}</p>
                <p className="text-xs text-slate-300/70">Focus: {client.focusArea}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200/70">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.3em]">
                  {labelMap[client.supportNeed]}
                </span>
                {client.nextMilestone ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.3em]">
                    {new Date(client.nextMilestone.targetDate).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.3em] text-slate-300/60">
                    No milestone set
                  </span>
                )}
              </div>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-slate-200/80">
              <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-100">
                Celebrating · {client.celebrating}
              </div>
              {client.nextMilestone && (
                <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-100">
                  Next milestone · {client.nextMilestone.title}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
