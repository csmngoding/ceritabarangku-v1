import { Home, Search, Plus, Bell, User } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@blinkdotnew/ui';

interface NavProps {
  onOpenEntrySheet: () => void;
}

export function BottomNav({ onOpenEntrySheet }: NavProps) {
  const location = useLocation();
  const activeTab = location.pathname;

  const tabs = [
    { icon: Home, label: 'Beranda', href: '/' },
    { icon: Search, label: 'Explore', href: '/explore' },
    { icon: Plus, label: 'Tambah', href: '/tambah', isFab: true },
    { icon: Bell, label: 'Notif', href: '/notifications' },
    { icon: User, label: 'Profil', href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/80 px-4 backdrop-blur-md md:hidden">
      {tabs.map((tab) => {
        if (tab.isFab) {
          return (
            <button
              key={tab.label}
              className="relative -top-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform active:scale-90"
              onClick={onOpenEntrySheet}
            >
              <Plus className="h-8 w-8" />
            </button>
          );
        }

        const isActive = activeTab === tab.href;
        return (
          <Link
            key={tab.label}
            to={tab.href as any}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors",
              isActive ? "text-secondary font-semibold" : "text-muted-foreground"
            )}
          >
            <tab.icon className={cn("h-6 w-6", isActive && "fill-current")} />
            <span className="text-[10px] uppercase tracking-wider">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function DesktopNavbar({ onOpenEntrySheet }: NavProps) {
  const location = useLocation();
  const activeTab = location.pathname;

  const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Notifikasi', href: '/notifications' },
    { label: 'Profil', href: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-50 hidden h-16 w-full items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-md md:flex">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-black uppercase tracking-tighter text-secondary">
          CeritaBarangku
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href as any}
            className={cn(
              "text-sm font-medium uppercase tracking-widest transition-colors hover:text-secondary",
              activeTab === item.href ? "text-secondary" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
        <button 
          onClick={onOpenEntrySheet}
          className="flex h-10 items-center justify-center rounded-full bg-secondary px-6 text-xs font-bold uppercase tracking-widest text-secondary-foreground transition-transform active:scale-95"
        >
          Tambah Barang
        </button>
      </nav>
    </header>
  );
}
