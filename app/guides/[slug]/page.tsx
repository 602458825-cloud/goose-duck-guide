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
    title: `${guide.title} - 鹅鸭杀手游攻略站`,
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

      <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        <h1 className="mb-8 text-4xl font-black md:text-5xl">{guide.title}</h1>
        <article className="whitespace-pre-line rounded-2xl border border-zinc-800 bg-zinc-900 p-8 leading-8 text-zinc-300">
          {guide.content}
        </article>
      </div>
    </main>
  );
}
