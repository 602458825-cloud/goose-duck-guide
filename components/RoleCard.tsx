import Link from 'next/link';
import type { Role } from '@/lib/data';

export default function RoleCard({ role }: { role: Role }) {
  return (
    <Link href={`/roles/${role.slug}`} className="group block h-full">
      <article className="glow-ring h-full rounded-[1.75rem] border border-yellow-400/15 bg-slate-950/70 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-yellow-300/40 hover:bg-slate-900/95">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-yellow-300">
            ROLE
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
            难度 {role.difficulty}
          </span>
        </div>

        <h2 className="mb-2 text-2xl font-black text-yellow-300 transition group-hover:text-yellow-200">
          {role.name}
        </h2>
        <p className="mb-4 text-sm text-slate-400">{role.team}</p>
        <p className="text-sm leading-7 text-slate-300">{role.description}</p>
      </article>
    </Link>
  );
}
