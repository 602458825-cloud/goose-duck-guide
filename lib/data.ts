export type Role = {
  slug: string;
  name: string;
  team: string;
  difficulty: number;
  description: string;
  tips: string[];
  speech: string;
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
};

export type GameMap = {
  slug: string;
  name: string;
  description: string;
  tasks: string[];
};

export const roles: Role[] = [
  {
    slug: 'pelican',
    name: '鹈鹕',
    team: '中立',
    difficulty: 5,
    description: '可以吞下玩家并隐藏尸体。',
    tips: ['不要连续吃人', '优先吃警长', '会议前隐藏自己'],
    speech: '我一直在做任务，你们谁看见我刀人了？',
  },
  {
    slug: 'canada-goose',
    name: '加拿大鹅',
    team: '鹅阵营',
    difficulty: 2,
    description: '被杀时自动报警。',
    tips: ['尽量单走', '诱导狼人出刀', '保护关键身份'],
    speech: '如果我是加拿大鹅，狼现在已经炸了。',
  },
  {
    slug: 'ninja',
    name: '忍者',
    team: '鸭阵营',
    difficulty: 4,
    description: '可以远距离瞬间击杀目标。',
    tips: ['利用视野盲区', '不要在人群里开技能', '优先秒关键身份'],
    speech: '刚刚断灯，我根本没看到谁死了。',
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
  },
  {
    slug: 'beginner-guide',
    title: '新手入门攻略',
    excerpt: '快速学会鹅鸭杀核心玩法。',
    content: `1. 学会看地图
2. 不要乱报警
3. 注意发言逻辑
4. 跟团减少死亡`,
  },
];

export const maps: GameMap[] = [
  {
    slug: 'space-station',
    name: '太空站',
    description: '经典地图，适合新手。',
    tasks: ['修电力', '上传数据', '启动反应堆'],
  },
];
