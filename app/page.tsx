'use client';

import { useMemo, useState } from 'react';
import GuideCard from '@/components/GuideCard';
import Header from '@/components/Header';
import MapCard from '@/components/MapCard';
import RoleCard from '@/components/RoleCard';
import type { GameMap, Guide, Role, Team } from '@/lib/data';
import { guides, maps, roles } from '@/lib/data';

const stats = [
  { label: '职业池', value: '18+' },
  { label: '发言套路', value: '60+' },
  { label: '地图刀点', value: '24+' },
];

const highlights = [
  '搜索职业、地图、攻略关键词',
  '按阵营快速筛职业强度与打法',
  '站内直接预览发言模板与风险点',
];

const tabs = [
  { key: 'roles', label: '职业库' },
  { key: 'guides', label: '攻略库' },
  { key: 'maps', label: '地图库' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

type RolePanelProps = {
  role: Role;
  onClose: () => void;
};

type MapPanelProps = {
  map: GameMap;
  onClose: () => void;
};

type GuidePanelProps = {
  guide: Guide;
  onClose: () => void;
};

function RolePanel({ role, onClose }: RolePanelProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:p-7">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300">
            {role.team}
          </p>
          <h3 className="text-3xl font-black text-white">{role.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{role.badge}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          关闭
        </button>
      </div>

      <p className="mb-6 text-sm leading-7 text-slate-300">{role.description}</p>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-cyan-400/15 bg-cyan-400/8 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">打法定位</div>
          <p className="text-sm leading-7 text-slate-200">{role.playstyle}</p>
        </div>
        <div className="rounded-[1.4rem] border border-rose-400/15 bg-rose-400/8 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-300">克制与风险</div>
          <p className="text-sm leading-7 text-slate-200">{role.counter}</p>
        </div>
      </div>

      <div className="mb-6 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">关键技巧</div>
        <div className="flex flex-wrap gap-2">
          {role.tips.map((tip) => (
            <span
              key={tip}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
            >
              {tip}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[1.4rem] border border-yellow-400/15 bg-yellow-400/8 p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200">会议发言模板</div>
        <p className="text-sm leading-7 text-slate-100">“{role.speech}”</p>
      </div>
    </div>
  );
}

function MapPanel({ map, onClose }: MapPanelProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:p-7">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">地图解析</p>
          <h3 className="text-3xl font-black text-white">{map.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          关闭
        </button>
      </div>

      <p className="mb-6 text-sm leading-7 text-slate-300">{map.description}</p>

      <div className="mb-6 rounded-[1.4rem] border border-cyan-400/15 bg-cyan-400/8 p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">适合什么局</div>
        <p className="text-sm leading-7 text-slate-100">{map.bestFor}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">任务路线</div>
          <div className="space-y-2">
            {map.tasks.map((task) => (
              <div key={task} className="rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-sm text-slate-200">
                {task}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.4rem] border border-rose-400/15 bg-rose-400/8 p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-rose-300">危险刀点</div>
          <div className="space-y-2">
            {map.dangerZones.map((zone) => (
              <div key={zone} className="rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-sm text-slate-100">
                {zone}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidePanel({ guide, onClose }: GuidePanelProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:p-7">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">{guide.category}</p>
          <h3 className="text-3xl font-black text-white">{guide.title}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          关闭
        </button>
      </div>

      <p className="mb-6 text-sm leading-7 text-slate-300">{guide.excerpt}</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {guide.bullets.map((bullet) => (
          <span
            key={bullet}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
          >
            {bullet}
          </span>
        ))}
      </div>

      <article className="whitespace-pre-line rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-8 text-slate-100">
        {guide.content}
      </article>
    </div>
  );
}

export default function HomePage() {
  const [tab, setTab] = useState<TabKey>('roles');
  const [teamFilter, setTeamFilter] = useState<Team | '全部'>('全部');
  const [query, setQuery] = useState('');
  const [activeRole, setActiveRole] = useState<Role | null>(roles[0]);
  const [activeMap, setActiveMap] = useState<GameMap | null>(null);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesTeam = teamFilter === '全部' || role.team === teamFilter;
      const keyword = query.trim().toLowerCase();
      const searchable = [role.name, role.description, role.badge, role.playstyle, role.speech, ...role.tips]
        .join(' ')
        .toLowerCase();
      const matchesQuery = keyword.length === 0 || searchable.includes(keyword);
      return matchesTeam && matchesQuery;
    });
  }, [query, teamFilter]);

  const filteredGuides = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return guides.filter((guide) => {
      const searchable = [guide.title, guide.excerpt, guide.category, ...guide.bullets].join(' ').toLowerCase();
      return keyword.length === 0 || searchable.includes(keyword);
    });
  }, [query]);

  const filteredMaps = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return maps.filter((map) => {
      const searchable = [map.name, map.description, map.bestFor, ...map.tasks, ...map.dangerZones]
        .join(' ')
        .toLowerCase();
      return keyword.length === 0 || searchable.includes(keyword);
    });
  }, [query]);

  return (
    <main className="grid-noise min-h-screen overflow-hidden">
      <Header />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="glow-ring relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.16),transparent_20%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.95))] px-6 py-8 md:px-10 md:py-12">
          <div className="hero-chip mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300">
            Interactive Mobile Guide
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="mb-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                不只是卡片墙，
                <span className="text-yellow-300">直接做成能查、能筛、能预览</span>
                的鹅鸭杀内容站。
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                现在首页就能直接搜索职业、切阵营、看发言模板、展开地图刀点和攻略快读，先把内容产品感做出来。
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

        <section className="mb-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/65 p-5 backdrop-blur-xl">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300">Control Center</p>
                <h2 className="text-2xl font-black text-white md:text-3xl">一页内完成主要交互</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {tabs.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTab(item.key)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      tab === item.key
                        ? 'bg-yellow-300 text-slate-950'
                        : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索职业、地图、发言关键词，比如 忍者 / 甩锅 / 灯房"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-yellow-300/40"
              />

              <div className="flex flex-wrap gap-2">
                {(['全部', '鹅阵营', '鸭阵营', '中立'] as const).map((team) => (
                  <button
                    key={team}
                    type="button"
                    onClick={() => setTeamFilter(team)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      teamFilter === team
                        ? 'bg-cyan-300 text-slate-950'
                        : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>

            {tab === 'roles' && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredRoles.map((role) => (
                  <button
                    key={role.slug}
                    type="button"
                    onClick={() => {
                      setActiveRole(role);
                      setActiveMap(null);
                      setActiveGuide(null);
                    }}
                    className="text-left"
                  >
                    <RoleCard role={role} />
                  </button>
                ))}
              </div>
            )}

            {tab === 'guides' && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredGuides.map((guide) => (
                  <button
                    key={guide.slug}
                    type="button"
                    onClick={() => {
                      setActiveGuide(guide);
                      setActiveRole(null);
                      setActiveMap(null);
                    }}
                    className="text-left"
                  >
                    <GuideCard guide={guide} />
                  </button>
                ))}
              </div>
            )}

            {tab === 'maps' && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredMaps.map((map) => (
                  <button
                    key={map.slug}
                    type="button"
                    onClick={() => {
                      setActiveMap(map);
                      setActiveRole(null);
                      setActiveGuide(null);
                    }}
                    className="text-left"
                  >
                    <MapCard map={map} />
                  </button>
                ))}
              </div>
            )}

            {tab === 'roles' && filteredRoles.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                没搜到匹配职业，试试“警长”、“忍者”或“误刀”。
              </div>
            )}
            {tab === 'guides' && filteredGuides.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                没搜到匹配攻略，试试“发言”、“新手”或“会议”。
              </div>
            )}
            {tab === 'maps' && filteredMaps.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                没搜到匹配地图，试试“反应堆”、“灯房”或“通讯”。
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-rose-400/15 bg-rose-400/8 p-6 backdrop-blur">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-rose-300">核心流量</p>
              <h2 className="mb-3 text-2xl font-black text-white">骗人、演戏、甩锅</h2>
              <p className="text-sm leading-7 text-slate-300">
                社交推理游戏的站点价值，不在百科，而在能不能快速把心理博弈内容做成可消费的结构。
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-amber-400/15 bg-amber-400/8 p-6 backdrop-blur">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-amber-300">内容策略</p>
              <h2 className="mb-3 text-2xl font-black text-white">职业 + 发言 + 刀点</h2>
              <p className="text-sm leading-7 text-slate-300">
                每个角色都不止讲技能；每张地图都不止列任务；每篇攻略都最好能给出一句能直接带进会议的模板。
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Live Preview</p>
            <h2 className="mb-5 text-2xl font-black text-white">当前预览面板</h2>

            {activeRole && <RolePanel role={activeRole} onClose={() => setActiveRole(null)} />}
            {activeGuide && <GuidePanel guide={activeGuide} onClose={() => setActiveGuide(null)} />}
            {activeMap && <MapPanel map={activeMap} onClose={() => setActiveMap(null)} />}

            {!activeRole && !activeGuide && !activeMap && (
              <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-sm leading-7 text-slate-400">
                点左侧任意职业、攻略或地图卡片，这里会直接展开站内详情预览。
              </div>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">为什么像成品</p>
              <h3 className="mb-4 text-2xl font-black text-white">不是静态首页，而是内容控制台</h3>
              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                <li>支持站内搜索，直接搜职业、发言、地图词。</li>
                <li>支持阵营筛选，职业内容不再混在一起。</li>
                <li>支持页内预览，不用每次跳详情页。</li>
                <li>支持不同内容类型切换，产品层次更完整。</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-300">下一步内容扩展</p>
              <h3 className="mb-4 text-2xl font-black text-white">后面接内容会很顺</h3>
              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                <li>职业可继续加强度评级、站位建议、假身份剧本。</li>
                <li>攻略可继续加分类标签、收藏、相关推荐。</li>
                <li>地图可继续加任务线示意和高危刀点热区。</li>
                <li>后续切 MDX 或 CMS 时，当前结构也够用。</li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
