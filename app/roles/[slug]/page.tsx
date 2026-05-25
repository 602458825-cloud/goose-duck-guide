import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { roles } from '@/lib/data';

export async function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

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
    title: `${role.name}怎么玩`,
    description: `${role.name}定位、会里发言模板、核心打法、常见误区与克制关系整理。`,
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
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">{role.team}</p>
          <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">{role.name}怎么玩</h1>
          <p className="mb-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{role.description}</p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.4rem] border border-cyan-400/15 bg-cyan-400/8 p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.22em] text-cyan-300">定位</div>
              <p className="text-sm leading-7 text-slate-100">{role.playstyle}</p>
            </div>
            <div className="rounded-[1.4rem] border border-rose-400/15 bg-rose-400/8 p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.22em] text-rose-300">最怕什么</div>
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
            <h2 className="mb-4 text-2xl font-black text-white">实战重点</h2>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {role.tips.map((tip) => (
                <li key={tip} className="rounded-xl border border-white/8 bg-black/20 p-4">
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="mb-4 text-2xl font-black text-white">会议发言模板</h2>
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5 text-base leading-8 text-slate-200">
              “{role.speech}”
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-white/8 bg-black/20 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">阅读建议</h3>
              <p className="text-sm leading-7 text-slate-300">
                真正强势的 {role.name}，不是只会按技能，而是知道什么时候该藏、什么时候该跳、什么时候该把别人拉进自己的节奏。
              </p>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-5">
            <h3 className="mb-3 text-lg font-black text-white">适合谁先看</h3>
            <p className="text-sm leading-7 text-slate-300">
              适合想快速理解 {role.name} 的核心价值、容易犯的错，以及会里该怎么把身份节奏讲顺的玩家。
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-5">
            <h3 className="mb-3 text-lg font-black text-white">建议搭配阅读</h3>
            <p className="text-sm leading-7 text-slate-300">
              建议结合地图路线、会议节奏和对应克制身份一起看，职业理解会更完整，也更容易转成实战收益。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
