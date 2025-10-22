"use client";

import { ClientProfile, Goal } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ClientCardProps {
  client: ClientProfile;
  isActive: boolean;
  onSelect: (clientId: string) => void;
}

const statusLabel: Record<Goal["status"], { label: string; tone: string; icon: React.ReactNode }> = {
  on_track: {
    label: "On track",
    tone: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
    icon: <CheckCircleIcon className="h-4 w-4" />
  },
  at_risk: {
    label: "At risk",
    tone: "bg-amber-500/15 text-amber-200 border-amber-500/30",
    icon: <ExclamationTriangleIcon className="h-4 w-4" />
  },
  off_track: {
    label: "Off track",
    tone: "bg-rose-500/15 text-rose-200 border-rose-500/30",
    icon: <ExclamationTriangleIcon className="h-4 w-4" />
  },
  completed: {
    label: "Completed",
    tone: "bg-sky-500/15 text-sky-200 border-sky-500/30",
    icon: <CheckCircleIcon className="h-4 w-4" />
  }
};

function GoalProgressBar({ goal }: { goal: Goal }) {
  return (
    <div className="space-y-2 rounded-xl border border-white/10 bg-slate-900/50 p-3">
      <div className="flex items-center justify-between text-sm text-slate-200/80">
        <span className="font-medium text-white/90">{goal.title}</span>
        <span className="text-xs text-slate-300/70">{Math.round(goal.progress * 100)}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={clsx("h-full rounded-full bg-gradient-to-r from-white/60 to-white/10")}
          style={{ width: `${Math.min(goal.progress * 100, 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-slate-300/60">
        <span className={clsx("flex items-center gap-1 rounded-full border px-2 py-0.5", statusLabel[goal.status].tone)}>
          {statusLabel[goal.status].icon}
          {statusLabel[goal.status].label}
        </span>
        <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export function ClientCard({ client, isActive, onSelect }: ClientCardProps) {
  return (
    <motion.button
      onClick={() => onSelect(client.id)}
      layout
      whileHover={{ scale: 1.01 }}
      className={clsx(
        "w-full rounded-3xl border border-white/5 bg-white/5 p-[1px] text-left transition-all",
        isActive ? "border-white/50 shadow-lg shadow-slate-900/50" : "hover:border-white/20"
      )}
    >
      <div className="rounded-3xl bg-slate-900/80 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={clsx("flex h-12 w-12 items-center justify-center rounded-2xl text-white", client.avatarColor)}>
              <span className="text-lg font-semibold">{client.name.split(" ").map((n) => n[0]).join("")}</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400/80">Stage</p>
              <p className="text-sm font-medium text-white">{client.stage}</p>
              <p className="text-xs text-slate-300/70">Focus: {client.focusArea}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-100">
              {client.domain}
            </span>
            <div className="flex items-center gap-2 text-sm text-slate-200/80">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400/90">Momentum</span>
              <span className="text-lg font-semibold text-white">{client.momentumScore}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {client.goals.map((goal) => (
            <GoalProgressBar key={goal.id} goal={goal} />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between text-sm text-slate-200/80">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400/60">Celebrating</p>
            <p>{client.celebrating}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200/70">
            <ArrowRightIcon className="h-4 w-4" />
            Expand timeline
          </span>
        </div>
      </div>
    </motion.button>
  );
}
