export type Team = '鹅阵营' | '鸭阵营' | '中立';

export type Role = {
  slug: string;
  name: string;
  team: Team;
  difficulty: number;
  description: string;
  tips: string[];
  speech: string;
  playstyle: string;
  counter: string;
  badge: string;
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: '新手' | '进阶' | '发言';
  bullets: string[];
};

export type GameMap = {
  slug: string;
  name: string;
  description: string;
  tasks: string[];
  dangerZones: string[];
  bestFor: string;
};

export const roles: Role[] = [
  {
    slug: 'pelican',
    name: '鹈鹕',
    team: '中立',
    difficulty: 5,
    description: '可以吞下玩家并隐藏尸体，节奏感很强，成败全看出手时机。',
    tips: ['不要连续吃人', '优先吃警长', '会议前隐藏自己'],
    speech: '我一直在做任务，你们谁看见我刀人了？',
    playstyle: '高风险爆发型，靠节奏窗口一波拉开人数差。',
    counter: '怕被多人视野锁定，也怕会议前后时间轴对不上。',
    badge: '吞噬者',
  },
  {
    slug: 'canada-goose',
    name: '加拿大鹅',
    team: '鹅阵营',
    difficulty: 2,
    description: '被杀时自动报警，适合做诱饵位和信息位。',
    tips: ['尽量单走', '诱导狼人出刀', '保护关键身份'],
    speech: '如果我是加拿大鹅，狼现在已经炸了。',
    playstyle: '低操作高信息，核心是站位和诱导对手犯错。',
    counter: '怕被中立技能绕开，也怕自己发言太满被反推。',
    badge: '信息核',
  },
  {
    slug: 'ninja',
    name: '忍者',
    team: '鸭阵营',
    difficulty: 4,
    description: '可以远距离瞬间击杀目标，擅长制造突发混乱。',
    tips: ['利用视野盲区', '不要在人群里开技能', '优先秒关键身份'],
    speech: '刚刚断灯，我根本没看到谁死了。',
    playstyle: '爆发收割型，讲究盲区、灯光和切入角度。',
    counter: '怕刀口太直白，被关键目击者锁定行进路线。',
    badge: '瞬杀位',
  },
  {
    slug: 'sheriff',
    name: '警长',
    team: '鹅阵营',
    difficulty: 3,
    description: '拥有主动出刀能力，但误刀会自爆，是最吃判断的强神职。',
    tips: ['优先抓行为异常位', '别在信息不足时硬开枪', '会议里少暴露自己节奏'],
    speech: '我这票不是乱投，是在保后面的信息链。',
    playstyle: '高压判断型，靠发言、站位和临场决断带节奏。',
    counter: '最怕被反串误导，也怕鸭子故意做出诱刀动作。',
    badge: '裁决者',
  },
  {
    slug: 'morphling',
    name: '变形鸭',
    team: '鸭阵营',
    difficulty: 4,
    description: '采样后可伪装成其他玩家，是制造假目击和混乱的王牌角色。',
    tips: ['先采样活跃玩家', '变形后立刻做局', '别贪太长持续时间'],
    speech: '你说看见我？那你看的到底是我还是别人？',
    playstyle: '伪装博弈型，核心不是刀而是制造错误时间线。',
    counter: '怕被多人交叉对位，也怕原身时间轴过于完整。',
    badge: '伪装师',
  },
  {
    slug: 'vulture',
    name: '秃鹫',
    team: '中立',
    difficulty: 3,
    description: '通过吃尸体达成胜利，最需要观察残局节奏和场上清尸速度。',
    tips: ['跟在鸭子节奏后', '别太早暴露吃尸路径', '会议前尽量完成关键数量'],
    speech: '尸体一直在消失，你们不觉得比刀人更奇怪吗？',
    playstyle: '机会主义型，靠残局嗅觉和路线规划偷下胜利。',
    counter: '怕尸体被及时报警，也怕地图太开阔没有遮挡。',
    badge: '收尸人',
  },
];

export const guides: Guide[] = [
  {
    slug: 'how-to-lie',
    title: '高端局狼人怎么发言',
    excerpt: '学会伪装、转移视角与带票。',
    content: `1. 不要急着甩锅
2. 发言越自然越好
3. 适当提供真信息
4. 别抢警长节奏`,
    category: '发言',
    bullets: ['先给局部真信息', '甩锅要顺着时间线', '票型永远服务残局'],
  },
  {
    slug: 'beginner-guide',
    title: '新手入门攻略',
    excerpt: '快速学会鹅鸭杀核心玩法。',
    content: `1. 学会看地图
2. 不要乱报警
3. 注意发言逻辑
4. 跟团减少死亡`,
    category: '新手',
    bullets: ['先活下来', '先学看信息', '别急着装懂'],
  },
  {
    slug: 'meeting-rhythm',
    title: '会议发言节奏怎么拿',
    excerpt: '先报信息，再立怀疑，最后带票。',
    content: `1. 报自己完整路线
2. 点出最矛盾的人
3. 不要一开口就判死刑
4. 最后明确自己票型`,
    category: '进阶',
    bullets: ['路线清楚比情绪重要', '怀疑链越短越强', '结论要能被复盘'],
  },
];

export const maps: GameMap[] = [
  {
    slug: 'space-station',
    name: '太空站',
    description: '经典地图，适合新手理解任务线、转点和公共区域逻辑。',
    tasks: ['修电力', '上传数据', '启动反应堆'],
    dangerZones: ['反应堆门口', '灯房转角', '资料上传长走廊'],
    bestFor: '新手熟悉基础转点与刀点判断',
  },
  {
    slug: 'black-swan',
    name: '黑天鹅',
    description: '地图更紧凑，会议与刀口节奏更快，适合高压对局。',
    tasks: ['检查引擎', '重连保险丝', '校准通讯'],
    dangerZones: ['二层过道', '左下封闭舱', '通讯房入口'],
    bestFor: '快节奏发言和强对抗身份局',
  },
];
