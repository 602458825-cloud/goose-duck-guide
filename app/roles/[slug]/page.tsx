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
    title: `${role.name}攻略 - 鹅鸭杀手游攻略站`,
    description: role.description,
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

      <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        <div className="mb-8">
          <p className="mb-3 text-yellow-400">{role.team}</p>
          <h1 className="mb-5 text-4xl font-black md:text-5xl">{role.name}</h1>
          <p className="text-lg text-zinc-300">{role.description}</p>
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">高端技巧</h2>
          <ul className="space-y-3">
            {role.tips.map((tip) => (
              <li key={tip} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">发言模板</h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-lg text-zinc-300">
            {role.speech}
          </div>
        </section>
      </div>
    </main>
  );
}
