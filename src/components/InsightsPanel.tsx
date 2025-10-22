import { SnapshotInsight } from "@/types";

interface InsightsPanelProps {
  insights: SnapshotInsight[];
}

const impactTone = {
  positive: "border-emerald-500/40 text-emerald-200",
  neutral: "border-sky-500/40 text-sky-200",
  negative: "border-rose-500/40 text-rose-200"
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <div className="glass-panel grid-gradient w-full rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-200/60">Signal radar</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Notable shifts</h3>
          <p className="text-sm text-slate-200/70">Surface leading indicators before they escalate into blockers.</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-100">
          {insights.length} insights
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-white/30 hover:bg-slate-900/70"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">{insight.metric}</p>
                <h4 className="mt-1 text-lg font-semibold text-white">{insight.title}</h4>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] ${impactTone[insight.impact]}`}>
                {insight.impact}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-200/75">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
