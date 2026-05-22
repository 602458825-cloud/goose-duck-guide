import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { maps } from '@/lib/data';

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
    description: `${map.name}任务路线、危险刀点与适合打法。`,
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
          <h2 className="mb-3 text-2xl font-black text-white">适合什么局</h2>
          <p className="text-sm leading-7 text-slate-100">{map.bestFor}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="mb-4 text-2xl font-black text-white">任务路线</h2>
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
      </section>
    </main>
  );
}
