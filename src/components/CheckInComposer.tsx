"use client";

import { useEffect, useMemo, useState } from "react";
import { ClientProfile, Domain } from "@/types";
import { formatShortDate } from "@/utils/date";

interface CheckInComposerProps {
  selectedDomain: Domain | "all";
  clients: ClientProfile[];
  onSubmit: (payload: {
    clientId: string;
    highlight: string;
    reflection: string;
    score: number;
    actionItems: string[];
    date: string;
  }) => void;
}

const defaultActionItems = ["Celebrate win", "Address blocker", "Set micro-target"];

export function CheckInComposer({ selectedDomain, clients, onSubmit }: CheckInComposerProps) {
  const [clientId, setClientId] = useState<string>(() => clients[0]?.id ?? "");
  const [highlight, setHighlight] = useState("");
  const [reflection, setReflection] = useState("");
  const [score, setScore] = useState(7);
  const [actionField, setActionField] = useState("");
  const [actions, setActions] = useState<string[]>([...defaultActionItems]);

  const availableClients = useMemo(
    () => (selectedDomain === "all" ? clients : clients.filter((c) => c.domain === selectedDomain)),
    [clients, selectedDomain]
  );

  useEffect(() => {
    if (!availableClients.find((client) => client.id === clientId)) {
      setClientId(availableClients[0]?.id ?? "");
    }
  }, [availableClients, clientId]);

  if (!availableClients.length) {
    return (
      <div className="glass-panel grid-gradient flex w-full flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 p-6 text-center text-slate-200/70">
        <p className="text-xs uppercase tracking-[0.35em]">Rapid check-in</p>
        <p className="text-sm">Add a profile to this domain to start logging new check-ins.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel grid-gradient flex w-full flex-col gap-6 rounded-3xl border border-white/10 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-200/60">Rapid check-in</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Log today&apos;s shift</h3>
          <p className="text-sm text-slate-200/70">Capture a highlight, reflection, and pulse score in under a minute.</p>
        </div>
        <div className="text-right text-xs text-slate-200/70">
          <p>Today</p>
          <p className="font-medium text-slate-100">{formatShortDate(new Date().toISOString())}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Profile</span>
          <select
            value={clientId}
            onChange={(event) => setClientId(event.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
          >
            {availableClients.map((client) => (
              <option key={client.id} value={client.id} className="bg-slate-900 text-white">
                {client.name} · {client.domain}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Pulse score</span>
          <input
            type="range"
            min={1}
            max={10}
            value={score}
            onChange={(event) => setScore(Number(event.target.value))}
            className="accent-emerald-400"
          />
          <span className="text-xs text-slate-200/70">{score}/10 energy + progress confidence</span>
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Highlight</span>
          <textarea
            value={highlight}
            onChange={(event) => setHighlight(event.target.value)}
            rows={3}
            className="min-h-[90px] rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            placeholder="What energized progress today?"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Reflection</span>
          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            rows={3}
            className="min-h-[90px] rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            placeholder="Where are we iterating next?"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Action stack</span>
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <button
              key={action}
              onClick={() => setActions((prev) => prev.filter((item) => item !== action))}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100 transition hover:border-rose-200/60 hover:text-rose-200"
              type="button"
            >
              {action}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={actionField}
            onChange={(event) => setActionField(event.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            placeholder="Add action item"
          />
          <button
            type="button"
            onClick={() => {
              if (actionField.trim()) {
                setActions((prev) => [...prev, actionField.trim()]);
                setActionField("");
              }
            }}
            className="rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400 hover:bg-emerald-500/30"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (!clientId || !highlight.trim() || !reflection.trim()) return;
            onSubmit({
              clientId,
              highlight: highlight.trim(),
              reflection: reflection.trim(),
              score,
              actionItems: actions,
              date: new Date().toISOString()
            });
            setHighlight("");
            setReflection("");
            setScore(7);
            setActions([...defaultActionItems]);
          }}
          disabled={!clientId || !highlight.trim() || !reflection.trim()}
          className="rounded-xl border border-white/20 bg-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-slate-300/60 hover:border-white/40 hover:bg-white/30"
        >
          Log check-in
        </button>
      </div>
    </div>
  );
}
