import Link from 'next/link';
import type { SeoQuestion } from '@/lib/data';

export default function QuestionCard({ question }: { question: SeoQuestion }) {
  return (
    <article className="glow-ring h-full rounded-[1.75rem] border border-fuchsia-400/15 bg-slate-950/70 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-fuchsia-300/40 hover:bg-slate-900/95 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-fuchsia-200">
          问题页
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Search Intent</span>
      </div>

      <h2 className="mb-3 text-xl font-black text-white transition group-hover:text-fuchsia-200 md:text-2xl">
        {question.title}
      </h2>
      <p className="mb-4 text-sm leading-7 text-slate-300">{question.summary}</p>

      <div className="mb-5 flex flex-wrap gap-2">
        {question.bullets.slice(0, 2).map((bullet) => (
          <span
            key={bullet}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
          >
            {bullet}
          </span>
        ))}
      </div>

      <Link
        href={`/questions/${question.slug}`}
        className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
      >
        查看完整解答
      </Link>
    </article>
  );
}
