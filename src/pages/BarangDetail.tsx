import { useParams, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { mockBarang, mockEntries, mockUsers } from '../lib/mock-data';
import { useAppLayout } from '../layouts/AppLayout';
import { Badge, Tabs, TabsList, TabsTrigger, TabsContent, cn } from '@blinkdotnew/ui';
import { Verified, Share2, Heart, Shield, Calendar, ArrowRight, User, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { TimelineEntry } from '../components/TimelineEntry';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export function BarangDetailPage() {
  const { id } = useParams({ from: '/barang/$id' });
  const { onOpenEntrySheet } = useAppLayout();

  const barang = mockBarang.find((b) => b.id === id);
  const owner = barang ? mockUsers[barang.ownerId] : null;
  const entries = mockEntries.filter((e) => e.barangId === id).sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [showQrModal, setShowQrModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = () => {
    if (barang.images.length > 1) {
      setCurrentImg((prev) => (prev + 1) % barang.images.length);
    }
  };

  const prevImg = () => {
    if (barang.images.length > 1) {
      setCurrentImg((prev) => (prev - 1 + barang.images.length) % barang.images.length);
    }
  };

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
        "fixed top-8 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 transition-all duration-300 md:hidden",
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      )}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className={cn(
              "p-2 -ml-2 rounded-full transition-colors",
              scrolled ? "text-foreground" : "text-white bg-black/20 backdrop-blur-sm"
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className={cn("flex items-center gap-2 transition-opacity duration-300", scrolled ? "opacity-100" : "opacity-0")}>
            <h2 className="max-w-[150px] truncate text-xs font-black uppercase tracking-widest">
              {barang.name}
            </h2>
            {barang.status === 'Verified' && <Verified className="h-3 w-3 fill-primary text-primary-foreground" />}
          </div>
        </div>

        <div className="flex gap-2">
          <button className={cn("p-2 rounded-full", !scrolled && "bg-black/20 backdrop-blur-sm")}>
            <Heart className={cn("h-5 w-5", scrolled ? "text-foreground" : "text-white")} />
          </button>
          <button className={cn("p-2 rounded-full", !scrolled && "bg-black/20 backdrop-blur-sm")}>
            <Share2 className={cn("h-5 w-5", scrolled ? "text-foreground" : "text-white")} />
          </button>
        </div>
      </div>

      {/* Hero Gallery Slider */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={barang.images[currentImg]}
            alt={barang.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full object-cover"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 50) prevImg();
              else if (info.offset.x < -50) nextImg();
            }}
          />
        </AnimatePresence>

        {/* Navigation Arrows (Desktop) */}
        {barang.images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
            <button onClick={prevImg} className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/40">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextImg} className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/40">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Pagination Dots */}
        {barang.images.length > 1 && (
          <div className="absolute bottom-10 inset-x-0 flex justify-center gap-1.5 pt-12">
            {barang.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  currentImg === i ? "w-8 bg-primary shadow-[0_0_10px_rgba(211,252,160,0.5)]" : "w-1.5 bg-white/40"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Info */}
      <div className="relative -mt-6 rounded-t-3xl bg-background px-6 pt-8 z-10">
        <div className="absolute -top-3 left-6 z-50">
          <Badge className={cn(
            "px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-md border-2 border-background",
            barang.status === 'Verified' && "bg-primary text-primary-foreground",
            barang.status === 'Self-Claimed' && "bg-secondary text-primary",
            barang.status === 'Pending-Verification' && "bg-muted text-muted-foreground"
          )}>
            {barang.status === 'Pending-Verification' ? 'In Process' : barang.status}
          </Badge>
        </div>
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

        {/* Passport Verification CTA - Only for Self-Claimed */}
        {barang.status === 'Self-Claimed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 overflow-hidden rounded-2xl bg-secondary shadow-lg border border-primary/20"
          >
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Passport Center</h3>
                  <Badge variant="outline" className="h-4 border-primary/30 text-primary text-[8px] font-bold px-1.5 uppercase">Action Required</Badge>
                </div>
                <p className="mt-1.5 text-[10px] leading-relaxed text-primary/80 font-semibold">
                  Barang ini belum terverifikasi secara permanen. Ajukan plakat fisik untuk mendapatkan status <span className="underline decoration-primary/40 underline-offset-2">Verified</span>.
                </p>
              </div>
            </div>
            <button className="w-full bg-primary py-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 group">
              Ajukan Plakat Verified
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}

        {/* Verification in Progress - Only for Pending */}
        {barang.status === 'Pending-Verification' && (
          <div className="mb-8 overflow-hidden rounded-2xl bg-muted/30 border border-border p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border border-border text-muted-foreground animate-pulse">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground">Plakat Progres</h3>
              <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground font-medium">
                Permohonan verifikasi sedang diproses. Plakat fisik akan dikirim ke alamat Anda dalam 3-5 hari kerja.
              </p>
            </div>
          </div>
        )}

        {/* Verified Passport Card - Only for Verified */}
        {barang.status === 'Verified' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 overflow-hidden rounded-2xl bg-secondary shadow-lg border-2 border-primary/10"
          >
            <div className="bg-primary-foreground p-5 pb-8 relative overflow-hidden">
              {/* Decorative background logo */}
              <Shield className="absolute -right-4 -bottom-4 h-32 w-32 text-primary/5 rotate-12" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Verified className="h-4 w-4 fill-primary text-primary-foreground" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Official Passport</h3>
                  </div>
                  <Badge className="bg-primary text-primary-foreground text-[8px] font-black px-2 uppercase tracking-tighter">Gold Plakat</Badge>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-primary/40 mb-0.5">Asset Identification</p>
                    <p className="text-sm font-black uppercase tracking-tighter text-primary">{barang.barangId}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-primary/40 mb-0.5">Physical Plakat ID</p>
                    <p className="text-sm font-black uppercase tracking-tighter text-primary">PLK-{barang.id.toUpperCase()}</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      onClick={() => setShowQrModal(true)}
                      className="h-16 w-16 bg-primary-foreground p-1.5 rounded-xl shadow-xl relative group cursor-pointer border border-secondary/20 transition-transform active:scale-95"
                    >
                      {/* Mock QR Code Pattern */}
                      <div className="grid grid-cols-5 h-full w-full gap-[2px]">
                        {Array.from({ length: 25 }).map((_, i) => {
                          // 3 corner markers (standard QR look)
                          const isCorner = (
                            (i === 0 || i === 1 || i === 5 || i === 6) || // Top-left
                            (i === 3 || i === 4 || i === 8 || i === 9) || // Top-right
                            (i === 15 || i === 16 || i === 20 || i === 21) // Bottom-left
                          );
                          // random-ish data bits
                          const isBit = !isCorner && (i % 3 === 0 || i % 7 === 1);

                          return (
                            <div
                              key={i}
                              className={cn(
                                "rounded-[1px] transition-colors duration-500",
                                isCorner ? "bg-primary" : isBit ? "bg-primary" : "bg-black/5"
                              )}
                            />
                          );
                        })}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/40 backdrop-blur-[1px] rounded-xl">
                        <Search className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-primary/40 mb-1">Passport Scan</p>
                      <p className="text-[10px] font-bold uppercase tracking-tight text-primary leading-none">Authentication<br />Ready</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest text-primary/40 mb-0.5">Verified Since</p>
                    <p className="text-xs font-bold uppercase tracking-tight text-primary">MARCH 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full bg-primary py-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 group">
              Detail Plakat Fisik
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}

        {/* Item Social / Follow Section */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-border/10 bg-white shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between border-b border-border/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-muted shadow-sm">
                    <img src={`https://robohash.org/fan${i}${barang.id}?set=set1&size=50x50`} alt="Follower" />
                  </div>
                ))}
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-secondary/10 text-[8px] font-black text-secondary shadow-sm">
                  +{(barang.followersCount - 3).toLocaleString()}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-foreground">
                  {barang.followersCount.toLocaleString()} <span className="text-muted-foreground font-bold">Mengikuti</span>
                </p>
                <div className="flex items-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-bold uppercase text-emerald-600">Terpantau Aktif</span>
                </div>
              </div>
            </div>
            <button className="rounded-full bg-secondary px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary shadow-lg shadow-secondary/20 transition-all hover:brightness-110 active:scale-95">
              Follow Barang
            </button>
          </div>

          <div className="flex items-center justify-between bg-muted/20 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full border border-border/50 bg-muted">
                <img src={owner.avatar} alt={owner.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Pemilik Saat Ini</p>
                <h4 className="text-[10px] font-bold uppercase tracking-tight text-foreground/80">{owner.name}</h4>
              </div>
            </div>
            <Link
              to="/profile/$userId"
              params={{ userId: owner.id }}
              className="text-[8px] font-black uppercase tracking-[0.15em] text-secondary/70 hover:text-secondary transition-colors"
            >
              Lihat Koleksi
            </Link>
          </div>
        </div>

        {/* Tab System */}
        <Tabs defaultValue="cerita" className="w-full">
          <TabsList className="sticky top-[72px] z-40 mb-8 w-full justify-start gap-8 border-b border-border bg-background/95 pb-0 backdrop-blur-md md:top-14">
            <TabsTrigger value="cerita" className="rounded-none border-b-2 border-transparent px-0 pb-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:text-secondary">
              Timeline & Passport
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

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-secondary p-8 shadow-2xl border-4 border-primary"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary">
                  <Shield className="h-8 w-8" />
                </div>

                <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-primary">
                  Authentication Passport
                </h3>
                <p className="mb-8 text-xs font-bold uppercase tracking-widest text-primary/60">
                  ID: {barang.barangId}
                </p>

                <div className="rounded-3xl bg-secondary p-4 ring-8 ring-primary/5">
                  <div className="overflow-hidden rounded-2xl bg-secondary p-3 shadow-inner">
                    <QRCodeSVG
                      value={barang.barangId}
                      size={200}
                      fgColor="#3D021E"
                      bgColor="#D3FCA0"
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>

                <div className="mt-10 w-full space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">
                    Verified Digital Plakat
                  </p>
                  <button
                    onClick={() => setShowQrModal(false)}
                    className="w-full rounded-2xl bg-primary py-4 text-[10px] font-black uppercase tracking-widest text-secondary shadow-lg active:scale-95 transition-transform"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
