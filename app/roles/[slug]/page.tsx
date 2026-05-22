import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { roles } from '@/lib/data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);

  if (!role) {
    return {
      title: '职业不存在',
    };
  }

  return {
    title: `${role.name}攻略`,
    description: `${role.name}玩法思路、发言模板、克制关系与实战技巧。`,
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);

  if (!role) {
    notFound();
  }

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        {/* Public launch version: richer role detail layout for live site content. */}
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">{role.team}</p>
          <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">{role.name}</h1>
          <p className="mb-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{role.description}</p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.4rem] border border-cyan-400/15 bg-cyan-400/8 p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.22em] text-cyan-300">定位</div>
              <p className="text-sm leading-7 text-slate-100">{role.playstyle}</p>
            </div>
            <div className="rounded-[1.4rem] border border-rose-400/15 bg-rose-400/8 p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.22em] text-rose-300">克制点</div>
              <p className="text-sm leading-7 text-slate-100">{role.counter}</p>
            </div>
            <div className="rounded-[1.4rem] border border-yellow-400/15 bg-yellow-400/8 p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.22em] text-yellow-200">角色标签</div>
              <p className="text-sm leading-7 text-slate-100">{role.badge}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="mb-4 text-2xl font-black text-white">高端技巧</h2>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {role.tips.map((tip) => (
                <li key={tip} className="rounded-xl border border-white/8 bg-black/20 p-4">
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="mb-4 text-2xl font-black text-white">发言模板</h2>
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5 text-base leading-8 text-slate-200">
              “{role.speech}”
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-white/8 bg-black/20 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">实战建议</h3>
              <p className="text-sm leading-7 text-slate-300">
                真正强势的 {role.name} 不只是会按技能，而是知道什么时候该藏、什么时候该跳、什么时候该把别人带进自己的节奏。
              </p>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-5">
            <h3 className="mb-3 text-lg font-black text-white">阅读提示</h3>
            <p className="text-sm leading-7 text-slate-300">
              本页内容以公开玩法理解和实战经验整理为主，适合入门、复盘和内容扩写，不视作官方机制原文。
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-5">
            <h3 className="mb-3 text-lg font-black text-white">推荐继续看</h3>
            <p className="text-sm leading-7 text-slate-300">
              建议结合地图路线、会议发言节奏和对应克制身份一起看，职业理解会更完整。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
