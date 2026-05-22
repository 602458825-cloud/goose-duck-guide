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
    title: `${map.name}攻略 - 鹅鸭杀手游攻略站`,
    description: map.description,
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

      <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        <h1 className="mb-6 text-4xl font-black md:text-5xl">{map.name}</h1>
        <p className="mb-10 text-lg text-zinc-400">{map.description}</p>

        <section>
          <h2 className="mb-5 text-2xl font-bold">地图任务</h2>
          <div className="space-y-4">
            {map.tasks.map((task) => (
              <div key={task} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                {task}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
