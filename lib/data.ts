export type Team = '鹅阵营' | '鸭阵营' | '中立';

// Launch content set for the public MVP build.
// Content is written for a public-facing launch version and should be treated as guide content, not an official game database.

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
  {
    slug: 'detective',
    name: '侦探',
    team: '鹅阵营',
    difficulty: 3,
    description: '偏信息型神职，擅长拼接案发前后的行动链。',
    tips: ['优先记关键人路线', '会议里别一次性全爆信息', '尽量让别人先说'],
    speech: '我不急着定人，我先把前后路线对一遍。',
    playstyle: '信息拼图型，越到中后期价值越大。',
    counter: '怕自己前期站位太乱，导致信息无法闭环。',
    badge: '追线者',
  },
  {
    slug: 'assassin',
    name: '刺客',
    team: '鸭阵营',
    difficulty: 5,
    description: '高压会议角色，往往不是靠刀，而是靠会里点名制造崩盘。',
    tips: ['优先锁高信息神职', '不要乱点身份', '会前先做一轮信息布局'],
    speech: '你既然这么肯定，那你到底是什么身份？',
    playstyle: '会议斩杀型，核心是压迫感和心理战。',
    counter: '怕自己前面对局信息太少，导致刺杀逻辑过于生硬。',
    badge: '会场猎手',
  },
  {
    slug: 'dodo',
    name: '渡渡鸟',
    team: '中立',
    difficulty: 4,
    description: '目标不是活到最后，而是想办法让全场把票投到自己头上。',
    tips: ['故意制造轻度矛盾', '别演过头', '让自己成为可以怀疑但不至于离谱的目标'],
    speech: '你们想投我可以，但最好先想想谁最希望你们这样做。',
    playstyle: '反向带票型，核心在于控制别人对你的敌意强度。',
    counter: '怕自己太像好人没人投，也怕演太过直接暴露中立意图。',
    badge: '骗票王',
  },
];

export const guides: Guide[] = [
  {
    slug: 'how-to-lie',
    title: '高端局狼人怎么发言',
    excerpt: '学会伪装、转移视角与带票。',
    content: `1. 不要急着甩锅，而是先把自己的路线说顺。
2. 发言越自然越好，情绪太满很容易让人反感。
3. 适当提供真信息，半真半假的发言最难拆。
4. 别抢警长节奏，先让别人把怀疑链铺开。`,
    category: '发言',
    bullets: ['先给局部真信息', '甩锅要顺着时间线', '票型永远服务残局'],
  },
  {
    slug: 'beginner-guide',
    title: '新手入门攻略',
    excerpt: '快速学会鹅鸭杀核心玩法。',
    content: `1. 学会看地图和公共区域，不要全程迷路。
2. 不要乱报警，报警前先想你要说什么。
3. 注意发言逻辑，别只会说“不是我”。
4. 跟团能降低暴毙率，但也要学会记录谁和谁一起走。`,
    category: '新手',
    bullets: ['先活下来', '先学看信息', '别急着装懂'],
  },
  {
    slug: 'meeting-rhythm',
    title: '会议发言节奏怎么拿',
    excerpt: '先报信息，再立怀疑，最后带票。',
    content: `1. 报自己完整路线，别只讲一句“我在做任务”。
2. 点出最矛盾的人，但不要一开口就判死刑。
3. 把你怀疑的原因拆成时间、位置和行为三段。
4. 最后明确自己票型，让别人知道你不是随便跟票。`,
    category: '进阶',
    bullets: ['路线清楚比情绪重要', '怀疑链越短越强', '结论要能被复盘'],
  },
  {
    slug: 'sheriff-misfire',
    title: '警长为什么总会误刀',
    excerpt: '不是操作问题，更多是信息和心理节奏的问题。',
    content: `1. 很多警长死于“太想立功”，信息不足就硬拍人。
2. 鸭阵营最喜欢做出可疑动作，诱导警长自爆。
3. 真正稳的警长，会把自己的刀留给最明确的破绽位。
4. 会上发言不要太像警长，不然你连出刀机会都没有。`,
    category: '进阶',
    bullets: ['别急着立功', '误刀比不刀更伤节奏', '藏身份比秀身份重要'],
  },
  {
    slug: 'duck-team-openings',
    title: '鸭阵营开局三分钟该做什么',
    excerpt: '先做节奏，再做身份，再做刀口。',
    content: `1. 开局先建立“正常人设”，不要急着表现得很会玩。
2. 观察谁发言欲强、谁站位散，这些都是后续利用对象。
3. 第一次击杀不是越快越好，而是越容易嫁祸越好。
4. 会前尽量让自己有一条可信路线，不然所有刀都像你的。`,
    category: '发言',
    bullets: ['先立人设', '刀口服务锅位', '别把自己做成唯一嫌疑人'],
  },
  {
    slug: 'solo-survival',
    title: '单走玩家怎么提高生存率',
    excerpt: '会单走，不等于会送。',
    content: `1. 单走之前先看地图，别进长走廊和纯死角。
2. 每次转点都要记住路上见过谁。
3. 如果你是高价值身份，单走就得准备好会议里自证。
4. 单走最怕无信息暴毙，所以路线规划比任务效率更重要。`,
    category: '新手',
    bullets: ['死角少去', '路线要能复述', '高价值身份更要惜命'],
  },
];

export const maps: GameMap[] = [
  {
    slug: 'space-station',
    name: '太空站',
    description: '经典地图，适合新手理解任务线、转点和公共区域逻辑。',
    tasks: ['修电力', '上传数据', '启动反应堆', '检查终端', '校准信号'],
    dangerZones: ['反应堆门口', '灯房转角', '资料上传长走廊'],
    bestFor: '新手熟悉基础转点与刀点判断',
  },
  {
    slug: 'black-swan',
    name: '黑天鹅',
    description: '地图更紧凑，会议与刀口节奏更快，适合高压对局。',
    tasks: ['检查引擎', '重连保险丝', '校准通讯', '重启主机'],
    dangerZones: ['二层过道', '左下封闭舱', '通讯房入口'],
    bestFor: '快节奏发言和强对抗身份局',
  },
  {
    slug: 'jungle-temple',
    name: '丛林神殿',
    description: '视野变化多，转点复杂，适合喜欢做信息差和绕后玩法的玩家。',
    tasks: ['搬运祭品', '重连机关', '检查图腾', '补充火把'],
    dangerZones: ['独桥口', '神殿后侧小道', '机关房角落'],
    bestFor: '中高强度博弈局和擅长路线设计的玩家',
  },
  {
    slug: 'basement-lab',
    name: '地下实验室',
    description: '封闭房间多，信息常常被切断，非常考验会中复盘能力。',
    tasks: ['录入样本', '检查电路', '清理反应槽', '备份实验数据'],
    dangerZones: ['双门实验间', '监控外走廊', '冷藏区入口'],
    bestFor: '高压力残局和喜欢做封闭空间博弈的玩家',
  },
  {
    slug: 'snow-cabin',
    name: '雪地小屋',
    description: '视野开阔但转点距离长，适合做时间线文章，也适合靠落单抓机会。',
    tasks: ['修理暖炉', '补充燃料', '检查信号塔', '整理仓库'],
    dangerZones: ['信号塔外侧', '仓库后门', '长雪道中段'],
    bestFor: '喜欢做路线推理和远距离观察的玩家',
  },
];
