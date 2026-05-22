import Link from 'next/link';
import type { Guide } from '@/lib/data';

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="group block h-full">
      <article className="glow-ring h-full rounded-[1.75rem] border border-emerald-400/15 bg-slate-950/70 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300/40 hover:bg-slate-900/95">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-emerald-300">
            GUIDE
          </span>
          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Speak Smart</span>
        </div>

        <h2 className="mb-3 text-2xl font-black text-white transition group-hover:text-emerald-200">
          {guide.title}
        </h2>
        <p className="text-sm leading-7 text-slate-300">{guide.excerpt}</p>
      </article>
    </Link>
  );
}
