import type { Metadata } from 'next';
import './globals.css';

const siteName = '鹅鸭杀手游攻略站';
const siteDescription = '鹅鸭杀手游职业强度、地图路线、会议发言模板与高端局思路，一站快速看懂。';

export const metadata: Metadata = {
  metadataBase: new URL('https://goose-duck-guide.vercel.app'),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    '鹅鸭杀',
    '鹅鸭杀手游',
    '鹅鸭杀攻略',
    '鹅鸭杀职业攻略',
    '鹅鸭杀地图攻略',
    '鹅鸭杀发言模板',
  ],
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
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
