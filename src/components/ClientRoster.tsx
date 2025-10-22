"use client";

import { ClientProfile, Domain } from "@/types";
import { ClientCard } from "./ClientCard";

interface ClientRosterProps {
  clients: ClientProfile[];
  selectedDomain: Domain | "all";
  activeClientId: string | null;
  onSelect: (clientId: string) => void;
}

export function ClientRoster({ clients, selectedDomain, activeClientId, onSelect }: ClientRosterProps) {
  const filtered = selectedDomain === "all" ? clients : clients.filter((client) => client.domain === selectedDomain);

  return (
    <div className="glass-panel grid-gradient w-full rounded-3xl border border-white/10 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-200/60">Progress roster</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Active programs</h3>
          <p className="text-sm text-slate-200/70">Click into any profile to explore timelines and intervention notes.</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-100">
          {filtered.length} profiles
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            isActive={client.id === activeClientId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
