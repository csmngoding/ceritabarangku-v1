import React, { createContext, useContext } from 'react';
import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { BottomNav, DesktopNavbar } from '../components/Navigation';
import { mockBarang } from '../lib/mock-data';

interface AppLayoutProps {
  onOpenEntrySheet: () => void;
}

export const AppLayoutContext = createContext<{ onOpenEntrySheet: () => void }>({
  onOpenEntrySheet: () => {},
});

export function useAppLayout() {
  return useContext(AppLayoutContext);
}

export function AppLayout({ onOpenEntrySheet }: AppLayoutProps) {
  const location = useLocation();
  const isDetailView = location.pathname.startsWith('/barang/') || location.pathname.startsWith('/story/') || location.pathname.startsWith('/tambah-barang');

  return (
    <AppLayoutContext.Provider value={{ onOpenEntrySheet }}>
      <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <DesktopNavbar onOpenEntrySheet={onOpenEntrySheet} isDetailView={isDetailView} />
        
        <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_minmax(auto,680px)_280px] gap-md px-0 lg:px-md lg:pt-md overflow-x-hidden">
          
          {/* Left Sidebar on Desktop */}
          <div className="hidden lg:block sticky top-[120px] h-fit">
             <div className="rounded-2xl border border-border bg-card p-sm shadow-[var(--shadow-sm)]">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-muted mb-3 border border-border/50">
                  <img src="https://robohash.org/andraram?set=set1&bgset=bg2&size=150x150" alt="Andra Ramadhan" />
                </div>
                <h3 className="font-bold text-lg leading-tight uppercase tracking-widest mt-1">Andra Ramadhan</h3>
                <p className="text-secondary text-sm font-medium uppercase tracking-widest mt-1">@andraram</p>
                <div className="mt-4 flex gap-4 text-sm font-medium">
                  <div><span className="font-bold">1.2k</span> Pengikut</div>
                  <div><span className="font-bold">42</span> Post</div>
                </div>
             </div>
          </div>
          
          {/* Main Content Area */}
          <div className="w-full">
            <Outlet />
          </div>

          {/* Right Sidebar on Desktop - Lagi Rame */}
          <div className="hidden lg:block sticky top-[120px] h-fit">
             <div className="rounded-2xl border border-border bg-card p-sm shadow-[var(--shadow-sm)]">
                 <h3 className="font-bold text-xs mb-3 uppercase tracking-widest text-muted-foreground">Lagi Rame</h3>
                 <div className="space-y-4">
                     {mockBarang.slice(0, 3).map((barang) => (
                       <Link 
                         to="/barang/$id" 
                         params={{ id: barang.id }} 
                         key={barang.id} 
                         className="flex gap-3 hover:bg-muted/50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors"
                       >
                           <div className="h-12 w-12 rounded-md bg-muted overflow-hidden flex-shrink-0 border border-border/50">
                             <img src={barang.images[0]} alt={barang.name} className="object-cover w-full h-full" />
                           </div>
                           <div className="flex flex-col justify-center">
                               <div className="font-semibold text-sm line-clamp-1">{barang.name}</div>
                               <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-0.5">{barang.followersCount} Followers</div>
                           </div>
                       </Link>
                     ))}
                 </div>
             </div>
             
             <div className="mt-4 rounded-2xl bg-primary/10 p-sm text-primary-foreground border border-primary/20">
               <h3 className="font-bold text-xs mb-1 uppercase tracking-widest text-secondary">Beta Program</h3>
               <p className="text-xs text-primary-foreground/80 leading-relaxed font-medium">Bergabung dengan progam VIP akses awal untuk 100 member pertama.</p>
             </div>
          </div>
          
        </main>

        <BottomNav onOpenEntrySheet={onOpenEntrySheet} />
      </div>
    </AppLayoutContext.Provider>
  );
}
