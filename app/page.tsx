import GuideCard from '@/components/GuideCard';
import Header from '@/components/Header';
import MapCard from '@/components/MapCard';
import RoleCard from '@/components/RoleCard';
import { guides, maps, roles } from '@/lib/data';

const stats = [
  { label: '热门职业', value: '12+' },
  { label: '发言套路', value: '30+' },
  { label: '地图任务线', value: '8+' },
];

const highlights = [
  '职业强度与上手难度一眼看懂',
  '发言模板直接给到对局场景',
  '地图任务、刀点、视野博弈逐步扩展',
];

export default function HomePage() {
  return (
    <main className="grid-noise min-h-screen overflow-hidden">
      <Header />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="glow-ring relative mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.16),transparent_20%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.95))] px-6 py-8 md:px-10 md:py-12">
          <div className="hero-chip mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300">
            Mobile Guide MVP
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h1 className="mb-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                鹅鸭杀手游攻略站，
                <span className="text-yellow-300">先打内容效率</span>
                ，再卷流量增长。
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                不做空洞展示页，先把职业攻略、发言心理、地图任务和高端局套路做成可批量扩写的内容框架。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="hero-chip rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5"
                >
                  <div className="mb-2 text-3xl font-black text-white md:text-4xl">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mb-16 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-rose-400/15 bg-rose-400/8 p-6 backdrop-blur">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-rose-300">
              核心流量
            </p>
            <h2 className="mb-3 text-2xl font-black text-white">骗人、演戏、甩锅</h2>
            <p className="text-sm leading-7 text-slate-300">
              社交推理游戏的流量永远不是参数表，而是心理博弈和名场面复盘。
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-amber-400/15 bg-amber-400/8 p-6 backdrop-blur">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-amber-300">
              内容打法
            </p>
            <h2 className="mb-3 text-2xl font-black text-white">职业 + 发言模板</h2>
            <p className="text-sm leading-7 text-slate-300">
              一篇职业攻略，不只讲技能，还要给出会议发言、反打逻辑和甩锅角度。
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-cyan-400/15 bg-cyan-400/8 p-6 backdrop-blur">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">
              站点定位
            </p>
            <h2 className="mb-3 text-2xl font-black text-white">先可扩展，再精修</h2>
            <p className="text-sm leading-7 text-slate-300">
              这是一个为快速铺内容设计的攻略站骨架，适合后面接 MDX、搜索和 SEO 扩展。
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300">
                Roles
              </p>
              <h2 className="text-3xl font-black text-white">热门职业</h2>
            </div>
            <p className="hidden text-sm text-slate-500 md:block">优先做最容易出高讨论度的身份</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {roles.map((role) => (
              <RoleCard key={role.slug} role={role} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
                Guides
              </p>
              <h2 className="text-3xl font-black text-white">新手攻略</h2>
            </div>
            <p className="hidden text-sm text-slate-500 md:block">让新玩家先能活下来，再学会带节奏</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Maps
              </p>
              <h2 className="text-3xl font-black text-white">地图攻略</h2>
            </div>
            <p className="hidden text-sm text-slate-500 md:block">后续可扩展任务路径、刀点热区与视野点位</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {maps.map((map) => (
              <MapCard key={map.slug} map={map} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
