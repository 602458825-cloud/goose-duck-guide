import type { Role, Team } from '@/lib/data';

const teamStyles: Record<
  Team,
  {
    chip: string;
    glow: string;
    frame: string;
    accent: string;
    label: string;
    icon: string;
  }
> = {
  鹅阵营: {
    chip: 'border-cyan-300/30 bg-cyan-400/12 text-cyan-200',
    glow: 'from-cyan-400/18 via-sky-400/10 to-transparent',
    frame: 'hover:border-cyan-300/45',
    accent: 'bg-cyan-300',
    label: 'text-cyan-200',
    icon: '鹅',
  },
  鸭阵营: {
    chip: 'border-rose-300/30 bg-rose-400/12 text-rose-200',
    glow: 'from-rose-400/18 via-orange-400/10 to-transparent',
    frame: 'hover:border-rose-300/45',
    accent: 'bg-rose-300',
    label: 'text-rose-200',
    icon: '鸭',
  },
  中立: {
    chip: 'border-amber-300/30 bg-amber-400/12 text-amber-100',
    glow: 'from-amber-300/20 via-yellow-300/10 to-transparent',
    frame: 'hover:border-amber-300/45',
    accent: 'bg-amber-200',
    label: 'text-amber-100',
    icon: '中',
  },
};

export default function RoleCard({ role }: { role: Role }) {
  const style = teamStyles[role.team];
  const difficultyBars = Array.from({ length: 5 }, (_, index) => index < role.difficulty);

  return (
    <article
      className={`glow-ring relative h-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-slate-950/80 p-5 transition duration-300 hover:-translate-y-1.5 ${style.frame} md:p-6`}
    >
      <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${style.glow}`} />
      <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-base font-black text-white/85 shadow-lg shadow-slate-950/30 md:right-5 md:top-5 md:h-14 md:w-14 md:text-lg">
        {style.icon}
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between gap-3 pr-12 md:pr-16">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.16em] ${style.chip}`}
          >
            {role.team}
          </span>
          <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Role Card</span>
        </div>

        <h2 className={`mb-2 text-2xl font-black leading-tight md:text-3xl ${style.label}`}>{role.name}</h2>
        <p className="mb-5 min-h-[4rem] text-sm leading-7 text-slate-300">{role.description}</p>

        <div className="mb-5 rounded-[1.25rem] border border-white/8 bg-black/20 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
            <span>上手难度</span>
            <span>{role.difficulty}/5</span>
          </div>
          <div className="flex gap-2">
            {difficultyBars.map((active, index) => (
              <span
                key={`${role.slug}-difficulty-${index + 1}`}
                className={`h-2 flex-1 rounded-full ${active ? style.accent : 'bg-white/8'}`}
              />
            ))}
          </div>
        </div>

        <div className="mb-5 rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            对局关键词
          </div>
          <div className="flex flex-wrap gap-2">
            {role.tips.slice(0, 2).map((tip) => (
              <span
                key={tip}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
              >
                {tip}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-white/8 bg-slate-900/70 p-4 shadow-inner shadow-black/10">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            发言模板
          </div>
          <p className="text-sm leading-6 text-slate-200">“{role.speech}”</p>
        </div>
      </div>
    </article>
  );
}
