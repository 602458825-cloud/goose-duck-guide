import Link from 'next/link';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/guides/beginner-guide', label: '新手入门' },
  { href: '/roles/sheriff', label: '职业推荐' },
  { href: '/maps/space-station', label: '地图路线' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 text-lg font-black text-slate-950 shadow-lg shadow-yellow-500/20">
            G
          </span>
          <span className="text-xl font-black tracking-tight text-white md:text-2xl">
            GooseDuck Guide
          </span>
        </Link>

        <nav className="flex gap-4 text-sm text-slate-300 md:gap-6 md:text-base">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
