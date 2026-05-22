import type { Guide } from '@/lib/data';

const categoryStyles = {
  新手: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-200',
  进阶: 'border-yellow-300/25 bg-yellow-400/10 text-yellow-200',
  发言: 'border-fuchsia-300/25 bg-fuchsia-400/10 text-fuchsia-200',
};

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="glow-ring h-full rounded-[1.75rem] border border-emerald-400/15 bg-slate-950/70 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300/40 hover:bg-slate-900/95 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.16em] ${categoryStyles[guide.category]}`}
        >
          {guide.category}
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Speak Smart</span>
      </div>

      <h2 className="mb-3 text-xl font-black text-white transition group-hover:text-emerald-200 md:text-2xl">
        {guide.title}
      </h2>
      <p className="mb-4 text-sm leading-7 text-slate-300">{guide.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {guide.bullets.slice(0, 2).map((bullet) => (
          <span
            key={bullet}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
          >
            {bullet}
          </span>
        ))}
      </div>
    </article>
  );
}
