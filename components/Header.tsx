import Link from 'next/link';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/guides/beginner-guide', label: '新手攻略' },
  { href: '/roles/pelican', label: '热门职业' },
];

export default function Header() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-yellow-400">
          GooseDuck Guide
        </Link>

        <nav className="flex gap-4 text-sm text-zinc-300 md:gap-6 md:text-base">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
