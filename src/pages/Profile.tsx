import { mockUsers, mockBarang } from '../lib/mock-data';
import { Badge, Card, cn } from '@blinkdotnew/ui';
import { Settings, Grid, List, History, User as UserIcon, ChevronLeft } from 'lucide-react';
import { BarangCard } from '../components/BarangCard';
import { useParams, Link } from '@tanstack/react-router';
import { useState } from 'react';

export function ProfilePage() {
  const params = useParams({ strict: false }) as { userId?: string };
  const userId = params.userId;
  const isOurs = !userId || userId === 'user-1';
  
  const user = userId ? (mockUsers[userId] || mockUsers['user-1']) : mockUsers['user-1'];
  const userItems = mockBarang.filter(b => b.ownerId === user.id);

  const [activeTab, setActiveTab] = useState('collection');

  return (
    <div className="flex flex-col pb-20">
      {/* Profile Header */}
      <div className="bg-white px-6 pt-6 pb-8 shadow-sm">
        {!isOurs && (
          <button onClick={() => window.history.back()} className="mb-4 -ml-2 p-2 text-muted-foreground hover:text-secondary transition-colors inline-flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Kembali</span>
          </button>
        )}
        <div className="flex items-start justify-between mb-6">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-primary p-1">
            <div className="h-full w-full overflow-hidden rounded-full bg-muted">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>
          </div>
          {isOurs ? (
            <button className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-border">
              <Settings className="h-5 w-5" />
            </button>
          ) : (
            <button className="rounded-full bg-secondary px-6 py-2 text-[10px] font-black uppercase tracking-widest text-primary shadow-lg shadow-secondary/20 transition-all hover:brightness-110 active:scale-95">
              Ikuti Pengguna
            </button>
          )}
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">
            {user.name}
          </h1>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            @{user.username}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {user.badges.map(badge => (
            <Badge key={badge} variant="outline" className="border-primary/30 bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary-foreground">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
          <div className="text-center">
            <p className="text-lg font-black leading-none">{user.stats.itemsCount}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Barang</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black leading-none">{user.stats.storiesCount}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cerita</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black leading-none">{user.stats.followersCount}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Followers</p>
          </div>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-widest">
            {isOurs ? 'Koleksi Saya' : `Koleksi ${user.name}`}
          </h2>
          <div className="flex gap-2">
             <button className="p-1 text-secondary">
               <Grid className="h-4 w-4" />
             </button>
             <button className="p-1 text-muted-foreground">
               <List className="h-4 w-4" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {userItems.map(barang => (
            <BarangCard key={barang.id} barang={barang} />
          ))}
          {isOurs && (
            <Link to="/tambah-barang">
              <Card className="flex aspect-[3/4] flex-col items-center justify-center border-2 border-dashed border-border bg-muted/20 transition-colors hover:bg-muted/30 cursor-pointer">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-border text-muted-foreground">
                  <span className="text-2xl font-light">+</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Daftar Barang</p>
              </Card>
            </Link>
          )}
        </div>
      </div>

      {/* Ownership History / Activity stub */}
      <div className="px-6 pb-12">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest">Aktivitas Terkini</h2>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
           <div className="flex items-start gap-4">
             <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
             <div>
               <p className="text-xs font-bold leading-tight">Mendaftarkan "Si Merah RX-King"</p>
               <p className="text-[10px] text-muted-foreground">3 bulan yang lalu</p>
             </div>
           </div>
           <div className="mt-4 border-t border-border pt-4">
             <div className="flex items-center gap-2 text-secondary">
               <History className="h-4 w-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Lihat Semua Riwayat</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
