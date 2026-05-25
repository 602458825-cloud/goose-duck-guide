import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import { guides, maps, roles, seoQuestions } from '@/lib/data';

export async function generateStaticParams() {
  return seoQuestions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const question = seoQuestions.find((item) => item.slug === slug);

  if (!question) {
    return {
      title: '问题不存在',
    };
  }

  return {
    title: question.title,
    description: question.summary,
  };
}

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = seoQuestions.find((item) => item.slug === slug);

  if (!question) {
    notFound();
  }

  const relatedRole = question.relatedRole ? roles.find((item) => item.slug === question.relatedRole) : null;
  const relatedGuide = question.relatedGuide ? guides.find((item) => item.slug === question.relatedGuide) : null;
  const relatedMap = question.relatedMap ? maps.find((item) => item.slug === question.relatedMap) : null;
  const relatedQuestions = seoQuestions.filter((item) => item.slug !== question.slug).slice(0, 6);

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-300">问题解答</p>
          <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">{question.title}</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{question.summary}</p>
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="mb-4 text-2xl font-black text-white">快速结论</h2>
            <div className="flex flex-wrap gap-2">
              {question.bullets.map((bullet) => (
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
            {question.answer}
          </article>
        </div>

        <section className="mb-10 grid gap-5 md:grid-cols-3">
          {relatedRole && (
            <Link href={`/roles/${relatedRole.slug}`} className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 transition hover:bg-slate-900/80">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">相关职业</p>
              <h3 className="mb-3 text-xl font-black text-white">{relatedRole.name}</h3>
              <p className="text-sm leading-7 text-slate-300">{relatedRole.description}</p>
            </Link>
          )}

          {relatedGuide && (
            <Link href={`/guides/${relatedGuide.slug}`} className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 transition hover:bg-slate-900/80">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">相关攻略</p>
              <h3 className="mb-3 text-xl font-black text-white">{relatedGuide.title}</h3>
              <p className="text-sm leading-7 text-slate-300">{relatedGuide.excerpt}</p>
            </Link>
          )}

          {relatedMap && (
            <Link href={`/maps/${relatedMap.slug}`} className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 transition hover:bg-slate-900/80">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">相关地图</p>
              <h3 className="mb-3 text-xl font-black text-white">{relatedMap.name}</h3>
              <p className="text-sm leading-7 text-slate-300">{relatedMap.description}</p>
            </Link>
          )}
        </section>

        <section className="mb-10 rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">继续延伸</p>
              <h2 className="text-3xl font-black text-white">相关问题推荐矩阵</h2>
            </div>
            <p className="text-sm text-slate-500">从同类问题继续往下读，能更快补齐一整组对局理解。</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedQuestions.map((item) => (
              <div key={item.slug} className="group h-full">
                <QuestionCard question={item} />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">适合什么时候看</p>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              <li>搜索进站后想立刻解决一个具体问题时。</li>
              <li>进房前没时间读长文，只想抓核心结论时。</li>
              <li>会后复盘卡在某个节点，不知道自己错在哪时。</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">再往下看</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/questions" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                看全部问题页
              </Link>
              <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                回首页总览
              </Link>
              <Link href="/guides/beginner-guide" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                看新手攻略
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
