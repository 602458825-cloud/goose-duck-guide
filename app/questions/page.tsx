import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import { seoQuestions } from '@/lib/data';

export const metadata: Metadata = {
  title: '鹅鸭杀热门问题',
  description: '集中解答鹅鸭杀手游常见问题：警长误刀、变形鸭做局、黑天鹅刀点、会议发言等。',
};

const topicGroups = [
  {
    title: '职业误区',
    description: '适合想快速补强某个身份理解的人。',
    keywords: ['警长', '变形鸭', '忍者', '刺杀者', '渡渡鸟'],
  },
  {
    title: '地图风险',
    description: '适合老是在危险点暴毙、会里又说不清路线的人。',
    keywords: ['黑天鹅', '地下室', '货运飞船', '太空站'],
  },
  {
    title: '会议发言',
    description: '适合想提升开会表达、减少白给的人。',
    keywords: ['发言', '会里', '路线', '问题'],
  },
];

export default function QuestionsPage() {
  return (
    <main>
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-300">热门问题</p>
          <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">用户最常搜的问题，集中做成可直达页面</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            这组页面更适合承接搜索流量和快速解答。你不一定要从首页慢慢翻，直接按问题切进来，就能更快命中真正想看的内容。
          </p>
        </div>

        <section className="mb-10 grid gap-5 md:grid-cols-3">
          {topicGroups.map((group) => (
            <div key={group.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">专题方向</p>
              <h2 className="mb-3 text-2xl font-black text-white">{group.title}</h2>
              <p className="mb-4 text-sm leading-7 text-slate-300">{group.description}</p>
              <div className="flex flex-wrap gap-2">
                {group.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {seoQuestions.map((question) => (
            <div key={question.slug} className="group h-full">
              <QuestionCard question={question} />
            </div>
          ))}
        </div>

        <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">怎么用这组页面</p>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              <li>搜索进站时，先看问题页，再决定要不要深挖职业或地图。</li>
              <li>进房前时间不多时，问题页比完整攻略更适合快速补一刀知识。</li>
              <li>如果你已经知道自己卡在哪个点，问题页通常是最快入口。</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">继续延伸</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                回首页总览
              </Link>
              <Link href="/guides/beginner-guide" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                看新手攻略
              </Link>
              <Link href="/roles/sheriff" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                看职业详情
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
