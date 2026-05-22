'use client';

import { useMemo, useState } from 'react';
import GuideCard from '@/components/GuideCard';
import Header from '@/components/Header';
import MapCard from '@/components/MapCard';
import RoleCard from '@/components/RoleCard';
import type { GameMap, Guide, Role, Team } from '@/lib/data';
import { guides, maps, roles } from '@/lib/data';

const stats = [
  { label: '职业池', value: '30+' },
  { label: '发言套路', value: '120+' },
  { label: '地图刀点', value: '48+' },
];

const highlights = [
  '快速查职业思路和上手难度',
  '会议发言模板一眼就能带进对局',
  '地图任务路线和危险刀点直接看',
];

const trendingKeywords = [
  '忍者怎么玩',
  '警长误刀',
  '黑天鹅刀点',
  '变形鸭发言',
  '加拿大鹅诱刀',
  '鹈鹕怎么控节奏',
  '刺客会里怎么点身份',
  '渡渡鸟怎么骗票',
];

const tabs = [
  { key: 'roles', label: '职业库' },
  { key: 'guides', label: '攻略库' },
  { key: 'maps', label: '地图库' },
] as const;

const faqItems = [
  {
    question: '新手最应该先看什么？',
    answer: '建议先看新手入门、常见地图路线，再去熟悉几个高出场职业，先把生存率和会议表达练起来。',
  },
  {
    question: '发言模板真的有用吗？',
    answer: '有用，但不能死背。模板的作用是帮你先把信息说完整，再根据当局节奏调整怀疑和带票方式。',
  },
  {
    question: '地图攻略重点该怎么看？',
    answer: '不要只记任务点，更要记转角、长走廊、视野断层和会议前后最容易出锅的位置。',
  },
];

const releaseNotes = [
  '热门职业补充了定位、节奏点和常见误区。',
  '地图页现在能直接看任务路线和高风险区域。',
  '攻略页加入速记重点，适合赛前快速扫一遍。',
  '首页整理了常见问题，方便第一次玩的玩家上手。',
];

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
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-yellow-300">
            {role.team}
          </p>
          <h3 className="text-2xl font-black text-white md:text-3xl">{role.name}</h3>
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
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">打法定位</div>
          <p className="text-sm leading-7 text-slate-200">{role.playstyle}</p>
        </div>
        <div className="rounded-[1.4rem] border border-rose-400/15 bg-rose-400/8 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">克制与风险</div>
          <p className="text-sm leading-7 text-slate-200">{role.counter}</p>
        </div>
      </div>

      <div className="mb-6 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">关键技巧</div>
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
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200">会议发言模板</div>
        <p className="text-sm leading-7 text-slate-100">“{role.speech}”</p>
      </div>
    </div>
  );
}

function MapPanel({ map, onClose }: MapPanelProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">地图解析</p>
          <h3 className="text-2xl font-black text-white md:text-3xl">{map.name}</h3>
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
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">适合什么局</div>
        <p className="text-sm leading-7 text-slate-100">{map.bestFor}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">任务路线</div>
          <div className="space-y-2">
            {map.tasks.map((task) => (
              <div key={task} className="rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-sm text-slate-200">
                {task}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.4rem] border border-rose-400/15 bg-rose-400/8 p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">危险刀点</div>
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
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">{guide.category}</p>
          <h3 className="text-2xl font-black text-white md:text-3xl">{guide.title}</h3>
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

  const featuredRole = roles[3];
  const featuredGuide = guides[0];
  const featuredMap = maps[1];

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
        <div className="glow-ring relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.16),transparent_20%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.95))] px-5 py-9 md:px-10 md:py-14">
          <div className="hero-chip section-kicker mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase text-yellow-300">
            鹅鸭杀手游攻略站
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="mb-5 max-w-4xl text-3xl font-black leading-[1.08] tracking-tight text-white md:text-6xl">
                职业怎么打、地图哪里危险、
                <span className="text-yellow-300">会议里该怎么说</span>
                ，这里一次看明白。
              </h1>
              <p className="max-w-2xl text-sm leading-8 text-slate-300 md:text-lg">
                从新手入门到高压对局，这里整理了常见职业思路、地图任务路线、危险刀点和会议发言参考，方便你开局前快速补课。
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

        <section className="mb-10 grid gap-5 xl:grid-cols-[1fr_0.72fr]">
          <div className="rounded-[1.8rem] border border-yellow-300/15 bg-yellow-400/[0.06] p-5 backdrop-blur-xl md:p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">今日推荐职业</p>
                <h2 className="text-2xl font-black text-white md:text-3xl">{featuredRole.name}：{featuredRole.badge}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTab('roles');
                  setActiveRole(featuredRole);
                  setActiveGuide(null);
                  setActiveMap(null);
                }}
                className="rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-yellow-200"
              >
                立即查看
              </button>
            </div>
            <p className="mb-5 max-w-3xl text-sm leading-7 text-slate-200">{featuredRole.playstyle}</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">发言亮点</div>
                <p className="text-sm text-slate-100">“{featuredRole.speech}”</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">风险提醒</div>
                <p className="text-sm text-slate-100">{featuredRole.counter}</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">适合人群</div>
                <p className="text-sm text-slate-100">想带节奏、敢拍板、能承压的玩家。</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[1.8rem] border border-cyan-400/15 bg-cyan-400/[0.06] p-5 backdrop-blur-xl md:p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">热门搜索</p>
              <div className="flex flex-wrap gap-2">
                {trendingKeywords.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => setQuery(keyword)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-fuchsia-400/15 bg-fuchsia-400/[0.06] p-5 backdrop-blur-xl md:p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">内容热榜</p>
              <div className="space-y-3">
                {[
                  {
                    label: 'TOP 1',
                    title: featuredGuide.title,
                    action: () => {
                      setTab('guides');
                      setActiveGuide(featuredGuide);
                      setActiveRole(null);
                      setActiveMap(null);
                    },
                  },
                  {
                    label: 'TOP 2',
                    title: featuredMap.name,
                    action: () => {
                      setTab('maps');
                      setActiveMap(featuredMap);
                      setActiveRole(null);
                      setActiveGuide(null);
                    },
                  },
                  { label: 'TOP 3', title: '警长误刀为什么最伤节奏', action: () => setQuery('警长') },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="flex w-full flex-col items-start gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left transition hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">{item.label}</span>
                    <span className="text-sm text-slate-100">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="soft-panel rounded-[1.75rem] border border-white/10 p-5 backdrop-blur-xl">
            <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">快速查找</p>
                <h2 className="text-2xl font-black text-white md:text-3xl">按你这一局最需要的内容去看</h2>
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

            <div className="mb-5 grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
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
                    className="group block h-full text-left"
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
                    className="group block h-full text-left"
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
                    className="group block h-full text-left"
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-rose-300">高讨论内容</p>
              <h2 className="mb-3 text-2xl font-black text-white">骗人、演戏、甩锅</h2>
              <p className="text-sm leading-7 text-slate-300">
                最容易打出节目效果的，往往不是任务本身，而是会议里的心理博弈、甩锅节奏和临场反打。
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-amber-400/15 bg-amber-400/8 p-6 backdrop-blur">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">读站建议</p>
              <h2 className="mb-3 text-2xl font-black text-white">职业 + 发言 + 地图一起看</h2>
              <p className="text-sm leading-7 text-slate-300">
                只看技能很难真正上分。更有效的方式，是把职业思路、会议发言和地图风险点放在一起理解。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-5 md:grid-cols-3">
          <button
            type="button"
            onClick={() => {
              setTab('guides');
              setActiveGuide(featuredGuide);
              setActiveRole(null);
              setActiveMap(null);
            }}
            className="rounded-[1.75rem] border border-emerald-400/15 bg-emerald-400/[0.07] p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-emerald-400/[0.11]"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">推荐阅读</p>
            <h3 className="mb-3 text-2xl font-black text-white">{featuredGuide.title}</h3>
            <p className="text-sm leading-7 text-slate-300">{featuredGuide.excerpt}</p>
          </button>

          <button
            type="button"
            onClick={() => {
              setTab('maps');
              setActiveMap(featuredMap);
              setActiveRole(null);
              setActiveGuide(null);
            }}
            className="rounded-[1.75rem] border border-cyan-400/15 bg-cyan-400/[0.07] p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-cyan-400/[0.11]"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">推荐地图路线</p>
            <h3 className="mb-3 text-2xl font-black text-white">{featuredMap.name}</h3>
            <p className="text-sm leading-7 text-slate-300">{featuredMap.bestFor}</p>
          </button>

          <button
            type="button"
            onClick={() => {
              setTab('roles');
              setTeamFilter('鸭阵营');
              setQuery('变形');
            }}
            className="rounded-[1.75rem] border border-fuchsia-400/15 bg-fuchsia-400/[0.07] p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-fuchsia-400/[0.11]"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">热门话题</p>
            <h3 className="mb-3 text-2xl font-black text-white">变形鸭为什么总能做假时间线？</h3>
            <p className="text-sm leading-7 text-slate-300">点开直接切到鸭阵营筛选，并把关键词聚焦到变形鸭。</p>
          </button>
        </section>

        <section className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">站点介绍</p>
            <h3 className="mb-4 text-2xl font-black text-white">先把常见问题看明白</h3>
            <p className="text-sm leading-7 text-slate-300">
              不管你是刚入门，还是已经开始打高压局，这里都优先整理玩家最常遇到的职业理解、发言误区和地图风险点。
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">本期整理重点</p>
            <h3 className="mb-4 text-2xl font-black text-white">这次先把高频内容补齐</h3>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {releaseNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">阅读提醒</p>
            <h3 className="mb-4 text-2xl font-black text-white">攻略是帮你少走弯路</h3>
            <p className="text-sm leading-7 text-slate-300">
              这里更偏实战理解和对局经验整理，适合上手、复盘和赛前速看；具体机制和平衡细节，仍以游戏当前版本表现为准。
            </p>
          </div>
        </section>

        <section className="mb-10 rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">FAQ</p>
              <h2 className="text-3xl font-black text-white">常见问题</h2>
            </div>
            <p className="text-sm text-slate-500">第一次看攻略站时最常见的几个疑问，这里先替你答了。</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                <h3 className="mb-3 text-lg font-black text-white">{item.question}</h3>
                <p className="text-sm leading-7 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">内容预览</p>
            <h2 className="mb-5 text-2xl font-black text-white">点开就能直接看重点</h2>

            {activeRole && <RolePanel role={activeRole} onClose={() => setActiveRole(null)} />}
            {activeGuide && <GuidePanel guide={activeGuide} onClose={() => setActiveGuide(null)} />}
            {activeMap && <MapPanel map={activeMap} onClose={() => setActiveMap(null)} />}

            {!activeRole && !activeGuide && !activeMap && (
              <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-sm leading-7 text-slate-400">
                点左侧任意职业、攻略或地图卡片，这里会直接展开重点内容，适合开局前快速扫一遍。
              </div>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">怎么用更高效</p>
              <h3 className="mb-4 text-2xl font-black text-white">先定位问题，再看对应内容</h3>
              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                <li>想查身份打法，先看职业库。</li>
                <li>想提升会议表现，先看发言和进阶攻略。</li>
                <li>想减少暴毙，优先补地图路线和危险区域。</li>
                <li>开局前时间不多，就先看右侧内容预览。</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">后续会补</p>
              <h3 className="mb-4 text-2xl font-black text-white">还值得继续看的方向</h3>
              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                <li>更多高出场职业的进阶打法和误区。</li>
                <li>更多地图的路线拆解与常见甩锅点。</li>
                <li>更多会议发言模板和残局投票思路。</li>
                <li>更多适合新手快速理解的实战例子。</li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
