import { Domain, MetricTile } from "@/types";
import clsx from "clsx";

interface MetricGridProps {
  metrics: MetricTile[];
}

const domainTone: Record<Domain | "all", string> = {
  fitness: "bg-gradient-to-br from-fitness-500/10 via-fitness-500/5 to-slate-900/60",
  therapy: "bg-gradient-to-br from-therapy-500/10 via-therapy-500/5 to-slate-900/60",
  education: "bg-gradient-to-br from-education-500/10 via-education-500/5 to-slate-900/60",
  all: "bg-gradient-to-br from-slate-200/10 via-white/5 to-slate-900/60"
};

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={clsx(
            "glass-panel relative overflow-hidden rounded-3xl border border-white/10 p-5",
            domainTone[metric.domain]
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Signal</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{metric.title}</h3>
            </div>
            <span
              className={clsx(
                "rounded-full px-3 py-1 text-sm font-semibold",
                metric.change >= 0 ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200"
              )}
            >
              {metric.change >= 0 ? "+" : ""}
              {(metric.change * 100).toFixed(0)}%
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-200/80">{metric.description}</p>
          <div className="mt-6 h-16 w-full overflow-hidden rounded-xl bg-slate-900/30">
            <svg viewBox="0 0 120 40" className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id={`gradient-${metric.id}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke={`url(#gradient-${metric.id})`}
                strokeWidth="2"
                points={metric.sparkline
                  .map((value, index) => `${(index / (metric.sparkline.length - 1)) * 120},${40 - value * 38}`)
                  .join(" ")}
              />
              <polygon
                fill={`url(#gradient-${metric.id})`}
                points={`0,40 ${metric.sparkline
                  .map((value, index) => `${(index / (metric.sparkline.length - 1)) * 120},${40 - value * 38}`)
                  .join(" ")} 120,40`}
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
