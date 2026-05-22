import Link from 'next/link';
import type { GameMap } from '@/lib/data';

export default function MapCard({ map }: { map: GameMap }) {
  return (
    <Link href={`/maps/${map.slug}`}>
      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-zinc-800">
        <h2 className="mb-2 text-lg font-bold text-cyan-400">{map.name}</h2>
        <p className="text-sm text-zinc-400">{map.description}</p>
      </article>
    </Link>
  );
}
