import type { GameMap } from '@/lib/data';

export default function MapCard({ map }: { map: GameMap }) {
  return (
    <article className="glow-ring h-full rounded-[1.75rem] border border-cyan-400/15 bg-slate-950/70 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/40 hover:bg-slate-900/95 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-cyan-300">
          MAP
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Task Route</span>
      </div>

      <h2 className="mb-3 text-xl font-black text-cyan-300 transition group-hover:text-cyan-200 md:text-2xl">
        {map.name}
      </h2>
      <p className="mb-4 text-sm leading-7 text-slate-300">{map.description}</p>

      <div className="flex flex-wrap gap-2">
        {map.dangerZones.slice(0, 2).map((zone) => (
          <span
            key={zone}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
          >
            {zone}
          </span>
        ))}
      </div>
    </article>
  );
}
