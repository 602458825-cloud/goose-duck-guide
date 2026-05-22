import Link from 'next/link';
import type { Guide } from '@/lib/data';

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guides/${guide.slug}`}>
      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition hover:-translate-y-1 hover:border-green-400/40 hover:bg-zinc-800">
        <h2 className="mb-2 text-lg font-bold">{guide.title}</h2>
        <p className="text-sm text-zinc-400">{guide.excerpt}</p>
      </article>
    </Link>
  );
}
