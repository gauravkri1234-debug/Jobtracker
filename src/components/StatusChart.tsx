import { STATUS_COLORS, STATUSES, type StatusValue } from "@/lib/constants";

export function StatusChart({ counts }: { counts: Record<StatusValue, number> }) {
  const max = Math.max(...STATUSES.map((status) => counts[status]), 1);

  return (
    <section className="brutal-card bg-white p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Analytics</p>
          <h2 className="font-display text-3xl uppercase">Pipeline mix</h2>
        </div>
        <span className="border-[3px] border-ink bg-brutal-lime px-2 py-1 text-xs font-black uppercase">
          Live
        </span>
      </div>
      <div className="mt-6 space-y-3">
        {STATUSES.map((status, index) => {
          const value = counts[status];
          const width = `${Math.max((value / max) * 100, value > 0 ? 8 : 0)}%`;
          return (
            <div key={status} className="grid grid-cols-[110px_1fr_40px] items-center gap-3">
              <span className="font-mono text-[11px] font-bold uppercase">{status}</span>
              <div className="h-7 border-[3px] border-ink bg-paper">
                <div
                  className={`h-full ${STATUS_COLORS[status]} animate-bar`}
                  style={{ width, animationDelay: `${index * 70}ms` }}
                />
              </div>
              <span className="text-right font-black">{value}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
