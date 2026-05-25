'use client';

import { useMemo, useState } from 'react';
import GuideCard from '@/components/GuideCard';
import Header from '@/components/Header';
import MapCard from '@/components/MapCard';
import QuestionCard from '@/components/QuestionCard';
import RoleCard from '@/components/RoleCard';
import type { GameMap, Guide, Role, SeoQuestion, Team } from '@/lib/data';
import { guides, maps, roles, seoQuestions } from '@/lib/data';

const stats = [
  { label: '热门职业解析', value: `${roles.length}+` },
  { label: '实战攻略主题', value: `${guides.length}+` },
  { label: '搜索问题页', value: `${seoQuestions.length}+` },
];

const highlights = [
  '30 秒速查职业打法与误区',
  '会议发言模板直接带进对局',
  '地图危险刀点和任务路线一起看',
];

const trendingKeywords = [
  '忍者怎么玩',
  '警长为什么总误刀',
  '黑天鹅刀点',
  '变形鸭做局',
  '加拿大鹅钓刀',
  '鹈鹕吞人节奏',
  '刺客会里怎么点身份',
  '渡渡鸟怎么骗票',
];

const tabs = [
  { key: 'roles', label: '职业库' },
  { key: 'guides', label: '攻略库' },
  { key: 'maps', label: '地图库' },
  { key: 'questions', label: '问题页' },
] as const;

const faqItems = [
  {
    question: '第一次玩最该先补什么？',
    answer: '先补地图路线和基础发言。只知道身份技能但说不清路线，新手最容易在会里白给。',
  },
  {
    question: '发言模板是不是背了就能赢？',
    answer: '不能死背。模板的价值是帮你先把信息讲完整，再根据这局节奏调整怀疑、反打和带票。',
  },
  {
    question: '地图攻略到底该怎么看？',
    answer: '重点不是背任务名，而是记长走廊、拐角、门控、视野断层和会议前后最容易出事的位置。',
  },
];

const releaseNotes = [
  '补了一组可单独承接搜索流量的热门问题页。',
  '首页增加问题页入口，降低用户搜索进站后的跳出。',
  '问题页与职业、攻略、地图页互相跳转，更利于连续阅读。',
  '继续维持赛前速看和会后复盘两种核心使用场景。',
];

const quickPaths = [
  {
    title: '我是新手，怕一开会就不会说',
    description: '先看新手入门、会议节奏，再补一张常玩地图。',
    actionLabel: '先看发言思路',
    onSelect: 'guides' as const,
    query: '会议',
  },
  {
    title: '我老是暴毙，不知道哪儿危险',
    description: '优先看地图路线、刀点和转角断视野位置。',
    actionLabel: '先看地图风险',
    onSelect: 'maps' as const,
    query: '通讯',
  },
  {
    title: '我想练能带节奏的身份',
    description: '从警长、变形鸭、刺杀者这类高影响身份开始理解。',
    actionLabel: '先看核心职业',
    onSelect: 'roles' as const,
    query: '警长',
  },
];

const useCases = [
  '开局前 30 秒：点开内容预览，先扫关键打法和发言模板。',
  '进房前补课：按职业、地图、攻略、问题页四条线快速查缺补漏。',
  '会后复盘：回看当局身份和路线问题，知道自己哪一步出了锅。',
  '搜索直达：从搜索结果进来，也能快速落到对应问题页。',
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

type QuestionPanelProps = {
  question: SeoQuestion;
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

function QuestionPanel({ question, onClose }: QuestionPanelProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-300">问题速解</p>
          <h3 className="text-2xl font-black text-white md:text-3xl">{question.title}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          关闭
        </button>
      </div>

      <p className="mb-6 text-sm leading-7 text-slate-300">{question.summary}</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {question.bullets.map((bullet) => (
          <span
            key={bullet}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
          >
            {bullet}
          </span>
        ))}
      </div>

      <article className="whitespace-pre-line rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-8 text-slate-100">
        {question.answer}
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
  const [activeQuestion, setActiveQuestion] = useState<SeoQuestion | null>(null);

  const featuredRole = roles.find((role) => role.slug === 'sheriff') ?? roles[0];
  const featuredGuide = guides.find((guide) => guide.slug === 'meeting-rhythm') ?? guides[0];
  const featuredMap = maps.find((map) => map.slug === 'black-swan') ?? maps[0];
  const featuredQuestion = seoQuestions.find((question) => question.slug === 'sheriff-why-always-misfire') ?? seoQuestions[0];

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
      const searchable = [guide.title, guide.excerpt, guide.category, guide.content, ...guide.bullets]
        .join(' ')
        .toLowerCase();
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

  const filteredQuestions = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return seoQuestions.filter((question) => {
      const searchable = [question.title, question.question, question.summary, question.answer, ...question.bullets]
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
            Goose Duck Detectbook
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
            <div>
              <h1 className="mb-5 max-w-4xl text-3xl font-black leading-[1.08] tracking-tight text-white md:text-6xl">
                鹅鸭杀手游职业攻略、
                <span className="text-yellow-300">地图刀点与会议发言</span>
                ，一站快速看懂。
              </h1>
              <p className="max-w-2xl text-sm leading-8 text-slate-300 md:text-lg">
                这里不是单纯堆角色介绍，而是把职业打法、地图路线、危险刀点和会议节奏放到一块整理，帮你在开局前、会后复盘或搜索进站时，迅速抓到真正有用的内容。
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">先看这个最值</p>
                <h2 className="text-2xl font-black text-white md:text-3xl">{featuredRole.name}：{featuredRole.badge}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTab('roles');
                  setActiveRole(featuredRole);
                  setActiveGuide(null);
                  setActiveMap(null);
                  setActiveQuestion(null);
                }}
                className="rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-yellow-200"
              >
                立即查看
              </button>
            </div>
            <p className="mb-5 max-w-3xl text-sm leading-7 text-slate-200">{featuredRole.playstyle}</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">会里亮点</div>
                <p className="text-sm text-slate-100">“{featuredRole.speech}”</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">风险提醒</div>
                <p className="text-sm text-slate-100">{featuredRole.counter}</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">适合谁看</div>
                <p className="text-sm text-slate-100">想练高影响身份、又不想只会背技能说明的玩家。</p>
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">高频入口</p>
              <div className="space-y-3">
                {[
                  {
                    label: '先补会议',
                    title: featuredGuide.title,
                    action: () => {
                      setTab('guides');
                      setActiveGuide(featuredGuide);
                      setActiveRole(null);
                      setActiveMap(null);
                      setActiveQuestion(null);
                    },
                  },
                  {
                    label: '先看地图',
                    title: featuredMap.name,
                    action: () => {
                      setTab('maps');
                      setActiveMap(featuredMap);
                      setActiveRole(null);
                      setActiveGuide(null);
                      setActiveQuestion(null);
                    },
                  },
                  {
                    label: '先解问题',
                    title: featuredQuestion.title,
                    action: () => {
                      setTab('questions');
                      setActiveQuestion(featuredQuestion);
                      setActiveRole(null);
                      setActiveGuide(null);
                      setActiveMap(null);
                    },
                  },
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

        <section className="mb-10 grid gap-5 md:grid-cols-3">
          {quickPaths.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                setTab(item.onSelect);
                setQuery(item.query);
                setActiveRole(null);
                setActiveGuide(null);
                setActiveMap(null);
                setActiveQuestion(null);
              }}
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-yellow-300/25 hover:bg-slate-900/80"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">对症找内容</p>
              <h3 className="mb-3 text-2xl font-black text-white">{item.title}</h3>
              <p className="mb-5 text-sm leading-7 text-slate-300">{item.description}</p>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
                {item.actionLabel}
              </span>
            </button>
          ))}
        </section>

        <section className="mb-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="soft-panel rounded-[1.75rem] border border-white/10 p-5 backdrop-blur-xl">
            <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">快速查找</p>
                <h2 className="text-2xl font-black text-white md:text-3xl">按这局最缺的东西，直接切进去看</h2>
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
                placeholder="搜索职业、地图、发言关键词，比如 忍者 / 甩锅 / 灯房 / 误刀"
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
                      setActiveQuestion(null);
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
                      setActiveQuestion(null);
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
                      setActiveQuestion(null);
                    }}
                    className="group block h-full text-left"
                  >
                    <MapCard map={map} />
                  </button>
                ))}
              </div>
            )}

            {tab === 'questions' && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredQuestions.map((question) => (
                  <button
                    key={question.slug}
                    type="button"
                    onClick={() => {
                      setActiveQuestion(question);
                      setActiveRole(null);
                      setActiveGuide(null);
                      setActiveMap(null);
                    }}
                    className="group block h-full text-left"
                  >
                    <QuestionCard question={question} />
                  </button>
                ))}
              </div>
            )}

            {tab === 'roles' && filteredRoles.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                没搜到匹配职业，试试“警长”、“变形”或“误刀”。
              </div>
            )}
            {tab === 'guides' && filteredGuides.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                没搜到匹配攻略，试试“发言”、“残局”或“新手”。
              </div>
            )}
            {tab === 'maps' && filteredMaps.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                没搜到匹配地图，试试“通讯”、“反应堆”或“走廊”。
              </div>
            )}
            {tab === 'questions' && filteredQuestions.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
                没搜到匹配问题，试试“误刀”、“变形”或“发言”。
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-rose-400/15 bg-rose-400/8 p-6 backdrop-blur">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-rose-300">这个站到底解决什么</p>
              <h2 className="mb-3 text-2xl font-black text-white">不是教你背资料，是帮你少出锅</h2>
              <p className="text-sm leading-7 text-slate-300">
                真正容易拉开差距的，不是会不会念技能说明，而是你能不能看懂风险点、讲顺路线、在关键会议里把话说到点子上。
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-amber-400/15 bg-amber-400/8 p-6 backdrop-blur">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">读站建议</p>
              <h2 className="mb-3 text-2xl font-black text-white">职业 + 地图 + 发言，一起看才有效</h2>
              <p className="text-sm leading-7 text-slate-300">
                只看技能，你进会还是可能不会说；只看地图，你遇到高压身份还是会乱。把三条线串起来，再加上问题页做速查，理解会完整很多。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-5 md:grid-cols-4">
          <button
            type="button"
            onClick={() => {
              setTab('guides');
              setActiveGuide(featuredGuide);
              setActiveRole(null);
              setActiveMap(null);
              setActiveQuestion(null);
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
              setActiveQuestion(null);
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
              setActiveQuestion(null);
            }}
            className="rounded-[1.75rem] border border-fuchsia-400/15 bg-fuchsia-400/[0.07] p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-fuchsia-400/[0.11]"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">热门话题</p>
            <h3 className="mb-3 text-2xl font-black text-white">变形鸭为什么总能做假时间线？</h3>
            <p className="text-sm leading-7 text-slate-300">点开直接切到鸭阵营筛选，并把关键词聚焦到变形鸭。</p>
          </button>

          <button
            type="button"
            onClick={() => {
              setTab('questions');
              setActiveQuestion(featuredQuestion);
              setActiveRole(null);
              setActiveMap(null);
              setActiveGuide(null);
            }}
            className="rounded-[1.75rem] border border-violet-400/15 bg-violet-400/[0.07] p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-violet-400/[0.11]"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">搜索热门问题</p>
            <h3 className="mb-3 text-2xl font-black text-white">{featuredQuestion.title}</h3>
            <p className="text-sm leading-7 text-slate-300">{featuredQuestion.summary}</p>
          </button>
        </section>

        <section className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">站点定位</p>
            <h3 className="mb-4 text-2xl font-black text-white">给想上手、想复盘、想少犯错的人</h3>
            <p className="text-sm leading-7 text-slate-300">
              不管你是刚开始玩，还是已经在高压局里被会发言的人按着打，这里都优先整理最容易影响胜负的内容。
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">本轮优化重点</p>
            <h3 className="mb-4 text-2xl font-black text-white">先把高频搜索和高频痛点补齐</h3>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {releaseNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">怎么用最好</p>
            <h3 className="mb-4 text-2xl font-black text-white">别从头读，先找你当下的问题</h3>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-10 rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">FAQ</p>
              <h2 className="text-3xl font-black text-white">常见问题</h2>
            </div>
            <p className="text-sm text-slate-500">第一次进站、第一次打高压局，最常见的几个疑问这里先替你答了。</p>
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
            <h2 className="mb-5 text-2xl font-black text-white">点开就能直接扫重点</h2>

            {activeRole && <RolePanel role={activeRole} onClose={() => setActiveRole(null)} />}
            {activeGuide && <GuidePanel guide={activeGuide} onClose={() => setActiveGuide(null)} />}
            {activeMap && <MapPanel map={activeMap} onClose={() => setActiveMap(null)} />}
            {activeQuestion && <QuestionPanel question={activeQuestion} onClose={() => setActiveQuestion(null)} />}

            {!activeRole && !activeGuide && !activeMap && !activeQuestion && (
              <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-sm leading-7 text-slate-400">
                点左侧任意职业、攻略、地图或问题卡片，这里会直接展开重点内容，适合开局前快速扫一遍。
              </div>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">怎么读更高效</p>
              <h3 className="mb-4 text-2xl font-black text-white">先定位问题，再补对应内容</h3>
              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                <li>想查身份打法，先看职业库的定位、风险和会里模板。</li>
                <li>想提升会议表现，优先补发言与进阶攻略。</li>
                <li>想减少暴毙，优先看地图路线和危险区域。</li>
                <li>想快速搜一个明确问题，直接切到问题页。</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">后续还值得补</p>
              <h3 className="mb-4 text-2xl font-black text-white">下一版继续往深处做</h3>
              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                <li>更多高出场职业的对局误区与残局打法。</li>
                <li>更多地图的转点路线、甩锅点和站位建议。</li>
                <li>更多能直接带进会里的发言模板与反打句式。</li>
                <li>更多能承接搜索流量的专题问题页。</li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
