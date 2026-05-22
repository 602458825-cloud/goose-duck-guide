import GuideCard from '@/components/GuideCard';
import Header from '@/components/Header';
import MapCard from '@/components/MapCard';
import RoleCard from '@/components/RoleCard';
import { guides, maps, roles } from '@/lib/data';

export default function HomePage() {
  return (
    <main>
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-16 rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-8 shadow-2xl shadow-yellow-950/10 md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400/80">
            Goose Goose Duck Mobile
          </p>
          <h1 className="mb-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            鹅鸭杀手游攻略站
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            最全职业攻略、发言技巧、地图任务与高端局套路，先做出能持续产内容的 MVP。
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-yellow-400">热门职业</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {roles.map((role) => (
              <RoleCard key={role.slug} role={role} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-green-400">新手攻略</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-3xl font-bold text-cyan-400">地图攻略</h2>
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
