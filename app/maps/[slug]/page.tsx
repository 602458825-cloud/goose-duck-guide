import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { maps } from '@/lib/data';

export async function generateStaticParams() {
  return maps.map((map) => ({ slug: map.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const map = maps.find((item) => item.slug === slug);

  if (!map) {
    return {
      title: '地图不存在',
    };
  }

  return {
    title: `${map.name}地图攻略`,
    description: `${map.name}任务路线、危险刀点、转点思路与适合打法整理。`,
  };
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const map = maps.find((item) => item.slug === slug);

  if (!map) {
    notFound();
  }

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">地图攻略</p>
          <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">{map.name}</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{map.description}</p>
        </div>

        <div className="mb-6 rounded-[1.8rem] border border-cyan-400/15 bg-cyan-400/8 p-6">
          <h2 className="mb-3 text-2xl font-black text-white">这张图适合什么局</h2>
          <p className="text-sm leading-7 text-slate-100">{map.bestFor}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="mb-4 text-2xl font-black text-white">任务路线建议</h2>
            <div className="space-y-3">
              {map.tasks.map((task) => (
                <div key={task} className="rounded-xl border border-white/8 bg-black/20 p-4 text-sm text-slate-200">
                  {task}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="mb-4 text-2xl font-black text-white">危险刀点</h2>
            <div className="space-y-3">
              {map.dangerZones.map((zone) => (
                <div key={zone} className="rounded-xl border border-white/8 bg-black/20 p-4 text-sm text-slate-100">
                  {zone}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-5">
          <h3 className="mb-3 text-lg font-black text-white">阅读建议</h3>
          <p className="text-sm leading-7 text-slate-300">
            真正要读懂一张图，不只是背任务名，还要记转角、视野断层、长走廊、门控和会议前后最容易出锅的位置。
          </p>
        </div>
      </section>
    </main>
  );
}
