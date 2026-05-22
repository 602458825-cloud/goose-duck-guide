import Link from 'next/link';
import type { Role } from '@/lib/data';

export default function RoleCard({ role }: { role: Role }) {
  return (
    <Link href={`/roles/${role.slug}`}>
      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-zinc-800">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-yellow-400">{role.name}</h2>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
            难度 {role.difficulty}
          </span>
        </div>

        <p className="mb-3 text-sm text-zinc-400">{role.team}</p>
        <p className="text-sm text-zinc-300">{role.description}</p>
      </article>
    </Link>
  );
}
