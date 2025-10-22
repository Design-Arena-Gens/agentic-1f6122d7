"use client";

import { Tab } from "@headlessui/react";
import { domains } from "@/data/sampleData";
import { Domain } from "@/types";
import clsx from "clsx";

interface DomainSwitcherProps {
  value: Domain | "all";
  onChange: (domain: Domain | "all") => void;
}

const domainOption = {
  all: {
    id: "all" as const,
    label: "Unified View",
    accent: "from-slate-200/10 to-slate-200/40",
    description: "Blend insights across teams to spot cross-domain wins and risks early."
  }
};

export function DomainSwitcher({ value, onChange }: DomainSwitcherProps) {
  return (
    <div className="glass-panel grid-gradient relative w-full overflow-hidden border border-white/10 p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-300/70">Domains</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Progress Universe</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-slate-200">
          Adaptive coaching
        </div>
      </div>
      <Tab.Group
        selectedIndex={[domainOption.all, ...domains].findIndex((d) => d.id === value)}
        onChange={(index) => {
          const options = [domainOption.all, ...domains];
          onChange(options[index]!.id as Domain | "all");
        }}
      >
        <Tab.List className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[domainOption.all, ...domains].map((domainTile) => (
            <Tab key={domainTile.id} className="focus-visible:outline-none">
              {({ selected }) => (
                <div
                  className={clsx(
                    "relative min-h-[150px] cursor-pointer rounded-2xl border border-white/5 p-[1px] transition-all duration-300",
                    selected ? "border-white/40" : "hover:border-white/20"
                  )}
                >
                  <div
                    className={clsx(
                      "flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5",
                      selected && "shadow-lg shadow-black/30"
                    )}
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300/70">
                        {domainTile.id === "all" ? "Meta" : "Domain"}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{domainTile.label}</h3>
                    </div>
                    <p className="text-sm text-slate-200/80">{domainTile.description}</p>
                    {selected && (
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-slate-200/10 to-transparent" />
                    )}
                  </div>
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
