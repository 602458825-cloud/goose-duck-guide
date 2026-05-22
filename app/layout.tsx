import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '鹅鸭杀手游攻略站',
  description: '最全鹅鸭杀手游职业攻略、地图任务、发言技巧',
  keywords: ['鹅鸭杀', '鹅鸭杀手游', '鹅鸭杀攻略', '职业攻略', '地图任务'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-zinc-950 text-white">{children}</body>
    </html>
  );
}
