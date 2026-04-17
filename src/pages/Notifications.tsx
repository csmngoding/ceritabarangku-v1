import { Badge, Card, cn } from '@blinkdotnew/ui';
import { Heart, MessageSquare, Verified, UserPlus, RefreshCw } from 'lucide-react';
import { mockBarang, mockUsers } from '../lib/mock-data';

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: mockUsers['user-2'],
      barang: mockBarang[0],
      time: '2 jam lalu',
      content: 'menyukai cerita Bromo'
    },
    {
      id: 2,
      type: 'service',
      user: mockUsers['mitra-1'],
      barang: mockBarang[0],
      time: '1 hari lalu',
      content: 'menambahkan Catatan Resmi Servis'
    },
    {
      id: 3,
      type: 'follow',
      user: mockUsers['user-2'],
      barang: null,
      time: '2 hari lalu',
      content: 'mulai mengikuti Anda'
    },
    {
      id: 4,
      type: 'transfer',
      user: mockUsers['user-1'],
      barang: mockBarang[2],
      time: '1 minggu lalu',
      content: 'mengajukan transfer kepemilikan'
    }
  ];

  return (
    <div className="flex flex-col pb-20">
      <div className="bg-white px-6 py-10 shadow-sm">
        <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">
          Notifikasi
        </h1>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Update Terbaru Aktivitas Barang
        </p>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className="relative flex items-center gap-4 p-4 border-none bg-white shadow-sm hover:shadow-md transition-shadow">
             {/* Icon Indicator */}
             <div className="relative">
               <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                 <img src={notif.user.avatar} alt={notif.user.name} />
               </div>
               <div className={cn(
                 "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white",
                 notif.type === 'like' && "bg-rose-500 text-white",
                 notif.type === 'service' && "bg-secondary text-primary",
                 notif.type === 'follow' && "bg-primary text-primary-foreground",
                 notif.type === 'transfer' && "bg-indigo-500 text-white"
               )}>
                 {notif.type === 'like' && <Heart className="h-3 w-3 fill-current" />}
                 {notif.type === 'service' && <Verified className="h-3 w-3 fill-current" />}
                 {notif.type === 'follow' && <UserPlus className="h-3 w-3" />}
                 {notif.type === 'transfer' && <RefreshCw className="h-3 w-3" />}
               </div>
             </div>

             <div className="flex-1 min-w-0">
               <p className="text-xs leading-tight">
                 <span className="font-black uppercase tracking-tight">{notif.user.name}</span>{' '}
                 <span className="text-muted-foreground">{notif.content}</span>{' '}
                 {notif.barang && <span className="font-bold uppercase tracking-tight text-secondary">"{notif.barang.name}"</span>}
               </p>
               <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{notif.time}</p>
             </div>

             {!notif.barang && (
                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest">
                   Follow
                </Badge>
             )}
          </Card>
        ))}
      </div>

      {/* Suggested to follow */}
      <div className="p-6">
        <h2 className="mb-4 text-xs font-black uppercase tracking-widest">Saran Barang Untuk Diikuti</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
           {mockBarang.slice(0, 2).map((barang) => (
             <div key={barang.id} className="w-48 shrink-0 rounded-2xl bg-white p-4 shadow-sm border border-border/10">
               <div className="h-24 w-full overflow-hidden rounded-xl mb-3">
                 <img src={barang.images[0]} alt={barang.name} className="h-full w-full object-cover" />
               </div>
               <h4 className="text-[10px] font-black uppercase leading-tight tracking-tight truncate">{barang.name}</h4>
               <p className="text-[8px] font-mono text-muted-foreground mb-3">{barang.barangId}</p>
               <button className="w-full rounded-full bg-secondary py-1.5 text-[8px] font-black uppercase tracking-widest text-secondary-foreground">
                 Ikuti
               </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
