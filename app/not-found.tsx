import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">404</p>
        <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">这个页面溜走了</h1>
        <p className="mx-auto mb-8 max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
          你要找的职业、地图或攻略暂时不存在。先回首页继续看热门内容会更快。
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-yellow-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-200"
        >
          返回首页
        </Link>
      </section>
    </main>
  );
}
