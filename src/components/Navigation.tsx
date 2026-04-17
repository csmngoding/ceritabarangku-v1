import { Home, Search, Plus, Bell, User } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@blinkdotnew/ui';

interface NavProps {
  onOpenEntrySheet: () => void;
  isDetailView?: boolean;
}

export function BottomNav({ onOpenEntrySheet }: NavProps) {
  const location = useLocation();
  const activeTab = location.pathname;

  const tabs = [
    { icon: Home, label: 'Beranda', href: '/foryou' },
    { icon: Search, label: 'Explore', href: '/explore' },
    { icon: Plus, label: 'Tambah', href: '/tambah', isFab: true },
    { icon: Bell, label: 'Notif', href: '/notifications' },
    { icon: User, label: 'Profil', href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[calc(4rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] items-center justify-around border-t border-border bg-background/80 px-2 backdrop-blur-md md:hidden">
      {tabs.map((tab) => {
        if (tab.isFab) {
          return (
            <div key={tab.label} className="flex flex-1 items-center justify-center h-full">
              <button
                className="relative -top-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform active:scale-90"
                onClick={onOpenEntrySheet}
              >
                <Plus className="h-8 w-8" />
              </button>
            </div>
          );
        }

        const isActive = activeTab === tab.href;
        return (
          <Link
            key={tab.label}
            to={tab.href as any}
            className={cn(
              "flex flex-1 items-center justify-center h-full transition-colors",
              isActive ? "text-secondary" : "text-muted-foreground"
            )}
          >
            <tab.icon className={cn("h-6 w-6", isActive && "fill-current")} />
          </Link>
        );
      })}
    </nav>
  );
}

export function DesktopNavbar({ onOpenEntrySheet, isDetailView }: NavProps) {
  const location = useLocation();
  const activeTab = location.pathname;

  const navItems = [
    { label: 'For You', href: '/foryou' },
    { label: 'Explore', href: '/explore' },
    { label: 'Notifikasi', href: '/notifications' },
    { label: 'Profil', href: '/profile' },
  ];

  return (
    <header className={cn(
      "sticky top-8 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 md:px-8 backdrop-blur-md transition-transform duration-300",
      isDetailView && "max-md:hidden"
    )}>
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-black uppercase tracking-tighter text-secondary">
          CeritaBarangku
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
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
          Tambah Cerita
        </button>
      </nav>

      <div className="flex justify-end md:hidden items-center gap-4">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-muted shadow-sm border border-border/50">
          <img src="https://robohash.org/andraram?set=set1&bgset=bg2&size=150x150" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
