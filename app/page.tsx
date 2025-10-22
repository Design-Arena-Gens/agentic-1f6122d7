"use client";

import { useEffect, useMemo, useState } from "react";
import { Domain, MetricTile } from "@/types";
import { clients as seedClients, insights, strategyTemplates } from "@/data/sampleData";
import { DomainSwitcher } from "@/components/DomainSwitcher";
import { MetricGrid } from "@/components/MetricGrid";
import { ClientRoster } from "@/components/ClientRoster";
import { MomentumPulse } from "@/components/MomentumPulse";
import { FocusBoard } from "@/components/FocusBoard";
import { CheckInTimeline } from "@/components/CheckInTimeline";
import { CheckInComposer } from "@/components/CheckInComposer";
import { InsightsPanel } from "@/components/InsightsPanel";
import { StrategyTemplates } from "@/components/StrategyTemplates";

export default function Home() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | "all">("all");
  const [clientState, setClientState] = useState(seedClients);
  const [activeClientId, setActiveClientId] = useState<string | null>(seedClients[0]?.id ?? null);

  useEffect(() => {
    if (!activeClientId) return;
    const pool = selectedDomain === "all" ? clientState : clientState.filter((client) => client.domain === selectedDomain);
    if (!pool.find((client) => client.id === activeClientId)) {
      setActiveClientId(pool[0]?.id ?? clientState[0]?.id ?? null);
    }
  }, [activeClientId, clientState, selectedDomain]);

  const activeClient = useMemo(
    () => clientState.find((client) => client.id === activeClientId) ?? null,
    [clientState, activeClientId]
  );

  const filteredClients = useMemo(
    () => (selectedDomain === "all" ? clientState : clientState.filter((client) => client.domain === selectedDomain)),
    [clientState, selectedDomain]
  );

  const metricTiles = useMemo<MetricTile[]>(() => {
    const byDomain = clientState.reduce(
      (acc, client) => {
        if (!acc[client.domain]) {
          acc[client.domain] = { momentum: 0, goals: 0, goalProgress: 0, count: 0 };
        }
        const domainBucket = acc[client.domain];
        domainBucket.momentum += client.momentumScore;
        domainBucket.goals += client.goals.length;
        domainBucket.goalProgress += client.goals.reduce((total, goal) => total + goal.progress, 0);
        domainBucket.count += 1;
        return acc;
      },
      {} as Record<Domain, { momentum: number; goals: number; goalProgress: number; count: number }>
    );

    const aggregateMomentum = clientState.reduce((total, client) => total + client.momentumScore, 0);
    const aggregateGoals = clientState.reduce((total, client) => total + client.goals.length, 0);
    const aggregateProgress = clientState.reduce(
      (total, client) => total + client.goals.reduce((sum, goal) => sum + goal.progress, 0),
      0
    );

    return [
      {
        id: "momentum",
        title: selectedDomain === "all" ? "Average momentum" : `${selectedDomain} momentum`,
        change: 0.12,
        sparkline: [0.2, 0.35, 0.32, 0.5, 0.68, 0.7, 0.82, 0.78],
        domain: selectedDomain === "all" ? "all" : selectedDomain,
        description: `${Math.round(
          selectedDomain === "all"
            ? aggregateMomentum / Math.max(clientState.length, 1)
            : byDomain[selectedDomain]?.momentum / Math.max(byDomain[selectedDomain]?.count ?? 1, 1)
        )}/100 vitality score`
      },
      {
        id: "goals",
        title: selectedDomain === "all" ? "Goals on track" : `${selectedDomain} goals on track`,
        change: 0.08,
        sparkline: [0.15, 0.22, 0.28, 0.35, 0.46, 0.54, 0.61, 0.68],
        domain: selectedDomain === "all" ? "all" : selectedDomain,
        description: `${Math.round(
          selectedDomain === "all"
            ? (aggregateProgress / Math.max(aggregateGoals, 1)) * 100
            : ((byDomain[selectedDomain]?.goalProgress ?? 0) /
                Math.max(byDomain[selectedDomain]?.goals ?? 1, 1)) *
              100
        )}% trajectory confidence`
      },
      {
        id: "cadence",
        title: "Support cadence",
        change: 0.05,
        sparkline: [0.4, 0.45, 0.42, 0.5, 0.58, 0.6, 0.66, 0.7],
        domain: selectedDomain === "all" ? "all" : selectedDomain,
        description: `${filteredClients.reduce((total, client) => total + client.checkIns.length, 0)} check-ins last 30d`
      },
      {
        id: "action-density",
        title: "Action density",
        change: -0.03,
        sparkline: [0.65, 0.58, 0.62, 0.56, 0.6, 0.55, 0.5, 0.52],
        domain: selectedDomain === "all" ? "all" : selectedDomain,
        description: `${Math.round(
          filteredClients.reduce((total, client) => total + client.checkIns.reduce((sum, entry) => sum + entry.actionItems.length, 0), 0) /
            Math.max(filteredClients.length, 1)
        )} actions per check-in`
      }
    ];
  }, [clientState, filteredClients, selectedDomain]);

  return (
    <section className="flex w-full max-w-7xl flex-col gap-8 pb-10">
      <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 text-white">
        <div className="absolute -top-10 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
        <div className="flex flex-wrap justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-200/60">HoloTrack</p>
            <h1 className="text-4xl font-semibold leading-tight">
              One command center for coaches, therapists, and educators to accelerate human progress.
            </h1>
            <p className="text-base text-slate-100/80">
              Blend qualitative reflections with quantitative signals, surface risks early, and celebrate wins in real-time.
            </p>
          </div>
          <div className="flex flex-col justify-between text-right text-xs text-slate-200/70">
            <p>Live monitoring</p>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-left text-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Today&apos;s summary</p>
              <p className="mt-2 text-lg font-semibold text-white">{filteredClients.length} active programs</p>
              <p className="text-sm text-slate-100/80">
                {filteredClients.reduce((total, client) => total + client.checkIns.length, 0)} touchpoints logged this month.
              </p>
            </div>
          </div>
        </div>
      </header>

      <DomainSwitcher value={selectedDomain} onChange={setSelectedDomain} />
      <MetricGrid metrics={metricTiles} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ClientRoster
            clients={clientState}
            selectedDomain={selectedDomain}
            activeClientId={activeClientId}
            onSelect={(clientId) => setActiveClientId(clientId)}
          />
          <CheckInComposer
            selectedDomain={selectedDomain}
            clients={clientState}
            onSubmit={({ clientId, highlight, reflection, score, actionItems, date }) => {
              setActiveClientId(clientId);
              setClientState((previous) =>
                previous.map((client) => {
                  if (client.id !== clientId) return client;
                  const newEntry = {
                    id: `ci-${Date.now()}`,
                    date,
                    domain: client.domain,
                    highlight,
                    reflection,
                    score,
                    actionItems,
                    goalUpdates: []
                  };
                  return {
                    ...client,
                    momentumScore: Math.min(100, Math.round((client.momentumScore + score) / 2)),
                    checkIns: [newEntry, ...client.checkIns]
                  };
                })
              );
            }}
          />
        </div>
        <div className="space-y-6">
          <MomentumPulse clients={filteredClients} />
          <FocusBoard clients={filteredClients} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CheckInTimeline client={activeClient} />
        <InsightsPanel insights={insights.filter((insight) => selectedDomain === "all" || insight.domain === selectedDomain)} />
      </div>

      <StrategyTemplates templates={strategyTemplates} selectedDomain={selectedDomain} />
    </section>
  );
}
