"use client";

import { ClientProfile } from "@/types";
import { formatDate } from "@/utils/date";
import clsx from "clsx";
import { Fragment } from "react";

interface CheckInTimelineProps {
  client: ClientProfile | null;
}

export function CheckInTimeline({ client }: CheckInTimelineProps) {
  if (!client) {
    return (
      <div className="glass-panel flex h-full min-h-[320px] w-full flex-col items-center justify-center text-slate-200/60">
        <p className="text-sm uppercase tracking-[0.4em]">Timeline</p>
        <p className="mt-3 max-w-sm text-center text-base text-slate-200/70">
          Select a profile to review milestone check-ins, reflections, and action items.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel grid-gradient relative max-h-[540px] w-full overflow-hidden">
      <div className="max-h-[540px] overflow-y-auto scroll-shadow px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-200/60">Check-in timeline</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{client.name}</h3>
            <p className="text-sm text-slate-200/70">Spot patterns and energy shifts across milestones.</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-100">
            {client.checkIns.length} entries
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-white/60 via-white/10 to-transparent" />
          <div className="space-y-6">
            {client.checkIns.map((entry, index) => (
              <Fragment key={entry.id}>
                <div className="relative ml-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="absolute -left-4 top-5 h-2 w-8 rounded-full bg-white/40" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">{entry.domain}</p>
                      <p className="text-sm text-slate-200/70">{formatDate(entry.date)}</p>
                    </div>
                    <span
                      className={clsx(
                        "inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm",
                        entry.score >= 7 ? "text-emerald-200" : entry.score >= 5 ? "text-amber-200" : "text-rose-200"
                      )}
                    >
                      Pulse {entry.score}/10
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-slate-200/80">
                    <div>
                      <p className="font-semibold text-white">Highlight</p>
                      <p>{entry.highlight}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Reflection</p>
                      <p>{entry.reflection}</p>
                    </div>
                    {entry.goalUpdates.length > 0 && (
                      <div>
                        <p className="font-semibold text-white">Goals shifted</p>
                        <ul className="mt-2 space-y-2">
                          {entry.goalUpdates.map((update) => (
                            <li
                              key={update.goalId}
                              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs"
                            >
                              <span className="font-medium text-white">{update.note}</span>
                              <span className="text-slate-200/70">
                                {update.progressDelta >= 0 ? "+" : ""}
                                {(update.progressDelta * 100).toFixed(0)}%
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {entry.actionItems.length > 0 && (
                      <div>
                        <p className="font-semibold text-white">Next actions</p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {entry.actionItems.map((action) => (
                            <li
                              key={action}
                              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100"
                            >
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {index !== client.checkIns.length - 1 && (
                  <div className="ml-12 h-6 border-l border-dashed border-white/20" aria-hidden />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
