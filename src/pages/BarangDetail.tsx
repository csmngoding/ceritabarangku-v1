import { useParams, useRouter } from '@tanstack/react-router';
import { mockBarang, mockEntries, mockUsers } from '../lib/mock-data';
import { Badge, Tabs, TabsList, TabsTrigger, TabsContent, cn } from '@blinkdotnew/ui';
import { Verified, Share2, Heart, Shield, Calendar, ArrowRight, User } from 'lucide-react';
import { TimelineEntry } from '../components/TimelineEntry';
import { useState, useEffect } from 'react';

export function BarangDetailPage() {
  const { id } = useParams({ from: '/barang/$id' });
  const router = useRouter();
  const { onOpenEntrySheet } = router.options.context as any;
  
  const barang = mockBarang.find((b) => b.id === id);
  const owner = barang ? mockUsers[barang.ownerId] : null;
  const entries = mockEntries.filter((e) => e.barangId === id).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!barang || !owner) return (
    <div className="p-12 text-center font-black uppercase tracking-widest text-muted-foreground">
      Barang Tidak Ditemukan
    </div>
  );

  return (
    <div className="flex flex-col pb-20">
      {/* Sticky Header Mobile */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 transition-all duration-300 md:hidden",
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      )}>
        <div className={cn("flex items-center gap-2 transition-opacity duration-300", scrolled ? "opacity-100" : "opacity-0")}>
          <h2 className="max-w-[150px] truncate text-xs font-black uppercase tracking-widest">
            {barang.name}
          </h2>
          {barang.status === 'Verified' && <Verified className="h-3 w-3 fill-primary text-primary-foreground" />}
        </div>
        <div className="flex gap-4">
          <Heart className={cn("h-5 w-5", scrolled ? "text-foreground" : "text-white")} />
          <Share2 className={cn("h-5 w-5", scrolled ? "text-foreground" : "text-white")} />
        </div>
      </div>

      {/* Hero Gallery */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img src={barang.images[0]} alt={barang.name} className="h-full w-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-lg">
            {barang.status}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-1">
          {barang.images.map((_, i) => (
            <div key={i} className={cn("h-1 rounded-full transition-all", i === 0 ? "w-6 bg-primary" : "w-1.5 bg-white/50")} />
          ))}
        </div>
      </div>

      {/* Main Info */}
      <div className="relative -mt-6 rounded-t-3xl bg-background px-6 pt-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-widest">{barang.brand}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{barang.model}</span>
          </div>
          <h1 className="text-3xl font-black uppercase leading-none tracking-tighter text-foreground">
            {barang.name}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {barang.barangId}
            </p>
            <div className="h-4 w-[1px] bg-border" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Sejak {barang.year}
            </span>
          </div>
        </div>

        {/* Owner Card */}
        <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-border/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
              <img src={owner.avatar} alt={owner.name} />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Pemilik Saat Ini</p>
              <h4 className="text-sm font-bold uppercase tracking-tight">{owner.name}</h4>
            </div>
          </div>
          <Badge variant="outline" className="border-secondary/20 text-secondary">
            Follow
          </Badge>
        </div>

        {/* Tab System */}
        <Tabs defaultValue="cerita" className="w-full">
          <TabsList className="sticky top-14 z-40 mb-8 w-full justify-start gap-8 border-b border-border bg-background/95 pb-0 backdrop-blur-md">
            <TabsTrigger value="cerita" className="rounded-none border-b-2 border-transparent px-0 pb-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:text-secondary">
              CeritaFeed
            </TabsTrigger>
            <TabsTrigger value="galeri" className="rounded-none border-b-2 border-transparent px-0 pb-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:text-secondary">
              Galeri
            </TabsTrigger>
            <TabsTrigger value="info" className="rounded-none border-b-2 border-transparent px-0 pb-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:text-secondary">
              Detail Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cerita" className="mt-0 space-y-2 outline-none">
            {entries.length > 0 ? (
              <div className="pt-4">
                {entries.map((entry, idx) => (
                  <TimelineEntry 
                    key={entry.id} 
                    entry={entry} 
                    isFirst={idx === 0} 
                    isLast={idx === entries.length - 1} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center font-black uppercase tracking-widest text-muted-foreground/40">
                Belum ada cerita
              </div>
            )}
          </TabsContent>

          <TabsContent value="galeri" className="mt-0 outline-none">
            <div className="grid grid-cols-3 gap-1">
              {mockEntries.flatMap(e => e.images).concat(barang.images).map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden bg-muted">
                  <img src={img} alt="Gallery" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-0 space-y-6 outline-none">
             <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Kategori</p>
                  <p className="text-xs font-bold uppercase">{barang.category}</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Tahun</p>
                  <p className="text-xs font-bold uppercase">{barang.year}</p>
                </div>
                <div className="col-span-2 rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Deskripsi</p>
                  <p className="text-xs leading-relaxed">{barang.description}</p>
                </div>
             </div>
             
             <div>
               <h3 className="mb-4 text-xs font-black uppercase tracking-widest">Kepemilikan</h3>
               <div className="space-y-3">
                 <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
                   <div className="flex items-center gap-3">
                     <div className="h-8 w-8 overflow-hidden rounded-full bg-border">
                        <img src={owner.avatar} alt={owner.name} />
                     </div>
                     <div>
                       <p className="text-xs font-bold uppercase tracking-tight">{owner.name}</p>
                       <p className="text-[9px] font-medium text-muted-foreground italic">Sekarang - Nov 2023</p>
                     </div>
                   </div>
                   <Badge className="bg-primary text-[8px] font-black uppercase tracking-widest text-primary-foreground">Aktif</Badge>
                 </div>
                 <div className="flex items-center justify-between rounded-xl bg-muted/20 p-3 grayscale opacity-50">
                   <div className="flex items-center gap-3">
                     <div className="h-8 w-8 overflow-hidden rounded-full bg-border">
                        <User className="h-5 w-5 m-1.5 text-muted-foreground" />
                     </div>
                     <div>
                       <p className="text-xs font-bold uppercase tracking-tight">Kolektor Berlin</p>
                       <p className="text-[9px] font-medium text-muted-foreground italic">Nov 2023 - Jan 1984</p>
                     </div>
                   </div>
                   <ArrowRight className="h-4 w-4 text-muted-foreground" />
                 </div>
               </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Owner FAB - Tambah Cerita */}
      <button 
        onClick={onOpenEntrySheet}
        className="fixed bottom-24 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary shadow-2xl transition-transform active:scale-90 md:bottom-10"
      >
        <div className="relative">
          <span className="text-3xl font-light">+</span>
        </div>
      </button>
    </div>
  );
}
