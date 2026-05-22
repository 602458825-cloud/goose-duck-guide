import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { guides } from '@/lib/data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    return {
      title: '攻略不存在',
    };
  }

  return {
    title: guide.title,
    description: guide.excerpt,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">{guide.category}</p>
          <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">{guide.title}</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{guide.excerpt}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="mb-4 text-2xl font-black text-white">要点速记</h2>
            <div className="flex flex-wrap gap-2">
              {guide.bullets.map((bullet) => (
                <span
                  key={bullet}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
                >
                  {bullet}
                </span>
              ))}
            </div>
          </aside>

          <article className="whitespace-pre-line rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-8 text-sm leading-8 text-slate-200">
            {guide.content}
          </article>
        </div>

        <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-5">
          <h3 className="mb-3 text-lg font-black text-white">使用建议</h3>
          <p className="text-sm leading-7 text-slate-300">
            攻略页更适合配合具体职业和地图一起读。只看技巧不看场景，往往会在真实对局里出现节奏错位。
          </p>
        </div>
      </section>
    </main>
  );
}
