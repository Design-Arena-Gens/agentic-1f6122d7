import { StrategyTemplate, Domain } from "@/types";

interface StrategyTemplatesProps {
  templates: StrategyTemplate[];
  selectedDomain: Domain | "all";
}

export function StrategyTemplates({ templates, selectedDomain }: StrategyTemplatesProps) {
  const visibleTemplates = selectedDomain === "all" ? templates : templates.filter((template) => template.domain === selectedDomain);

  return (
    <div className="glass-panel grid-gradient w-full rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-200/60">Template library</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Adaptive support stacks</h3>
          <p className="text-sm text-slate-200/70">Deploy ready-to-run rhythms tailored for each growth lane.</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-100">
          {visibleTemplates.length} available
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {visibleTemplates.map((template) => (
          <div key={template.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">{template.domain}</p>
                <h4 className="mt-1 text-lg font-semibold text-white">{template.label}</h4>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-100">
                {template.cadence}
              </span>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-slate-200/75">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Touchpoints</p>
                <ul className="mt-2 grid gap-2">
                  {template.touchpoints.map((item) => (
                    <li key={item} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Check-in prompts</p>
                <ul className="mt-2 space-y-2">
                  {template.checkInPrompts.map((prompt) => (
                    <li key={prompt} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 italic text-slate-100/90">
                      “{prompt}”
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Measure what matters</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {template.measurementIdeas.map((idea) => (
                    <span key={idea} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100">
                      {idea}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
