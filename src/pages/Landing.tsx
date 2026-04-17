import React from 'react';
import { Link } from '@tanstack/react-router';
import { Button, Badge } from '@blinkdotnew/ui';
import { Box, Sparkles, Heart, ShieldCheck, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { TimelineEntry } from '../components/TimelineEntry';
import { mockEntries, mockBarang } from '../lib/mock-data';

export function LandingPage() {
  const topEntries = mockEntries.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground overflow-x-hidden">
      {/* Dynamic Navbar */}
      <nav className="fixed top-8 left-0 right-0 w-full h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border bg-background/80 backdrop-blur-md z-50">
        <Link to="/foryou" className="flex items-center gap-2">
          <span className="text-xl font-black uppercase tracking-tighter text-secondary">
            CeritaBarangku
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/explore" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary transition-colors hidden md:block">
            Explore
          </Link>
          <Button variant="ghost" className="hidden sm:inline-flex font-semibold uppercase tracking-widest text-xs">Masuk</Button>
          <Button className="rounded-full bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 px-4 sm:px-6 uppercase tracking-widest text-[10px] sm:text-xs h-8 sm:h-10 shadow-lg">
            Daftar
          </Button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-[1440px] mx-auto pt-[5rem] pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-xl">

        {/* TWOTWO Editorial Hero - Mobile First Typography */}
        <section className="px-4 md:px-8 py-10 md:py-24 lg:py-32 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-[-20%] md:right-0 w-[150%] md:w-1/3 h-full bg-primary/10 md:bg-primary/5 rounded-bl-[100px] -z-10 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-4xl"
          >
            <Badge variant="outline" className="mb-4 md:mb-6 border-secondary text-secondary px-3 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
              Digital Provenance Platform
            </Badge>

            <h1 className="text-[clamp(40px,10vw,88px)] font-black tracking-tighter mb-4 md:mb-8 leading-[0.95] text-foreground">
              BARANG ANDA. <br className="hidden sm:block" /> <span className="text-secondary italic">CERITA ANDA.</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Platform untuk merekam historis barang kesayangan. Dari unboxing, modifikasi, servis rutin, hingga berpindah tangan.
              Jejak digital otentik untuk nilai yang lebih tinggi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/foryou" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 text-sm rounded-full font-bold shadow-lg uppercase tracking-widest transition-transform active:scale-95">
                  Mulai Dokumentasi
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Layout Mobile First = 1 Col merentang, Desktop = 3 Columns */}
        <section className="grid grid-cols-1 lg:grid-cols-[280px_minmax(auto,680px)_280px] gap-6 md:gap-8 px-4 lg:px-8 mt-2 md:mt-4">

          {/* Top Column on Mobile / Left Column on Desktop - Features */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-[88px] h-fit md:order-1 order-2">
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
              <h3 className="font-black text-xs md:text-sm uppercase tracking-widest text-muted-foreground mb-4 md:mb-6">Kenapa Mencatat?</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground">
                    <Hash className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">BarangID Otentik</h4>
                    <p className="text-xs text-muted-foreground mt-1">Setiap barang mendapatkan ID unik selamanya.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Bukti Perawatan</h4>
                    <p className="text-xs text-muted-foreground mt-1">Catat histori servis untuk nilai jual kembali maksimal.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-amber-100 flex items-center justify-center text-amber-900">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Transfer Memori</h4>
                    <p className="text-xs text-muted-foreground mt-1">Warisan cerita diteruskan ke pemilik baru.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Display Column on Mobile / Center Col on Desktop - Timeline Barang Hits */}
          <div className="w-full flex justify-center md:order-2 order-1">
            <div className="w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-lg font-black uppercase tracking-widest text-foreground">Timeline Barang Hits</h2>
                <Link to="/explore" className="text-xs font-bold uppercase tracking-widest text-secondary hover:underline">Lihat Semua</Link>
              </div>

              <div className="relative">
                {/* Simulated vertical timeline line extending full height */}
                <div className="absolute left-[31px] top-4 bottom-8 w-[2px] bg-border/40 z-0 hidden sm:block" />

                {topEntries.map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <TimelineEntry
                      entry={entry}
                      barang={mockBarang.find(b => b.id === entry.barangId)}
                      isFirst={idx === 0}
                      isLast={idx === topEntries.length - 1}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center bg-card border border-border p-8 rounded-2xl shadow-sm">
                <Sparkles className="h-8 w-8 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Simpan Ceritamu Sendiri</h3>
                <p className="text-sm text-muted-foreground mb-6">Bergabung dan jadikan barang-barangmu memiliki nyawa digitalnya sendiri.</p>
                <Link to="/">
                  <Button className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 rounded-full font-bold uppercase tracking-widest text-xs px-8 h-12">
                    Buat Akun Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Column on Mobile / Right Column on Desktop - Community Stats */}
          <div className="lg:sticky lg:top-[88px] h-fit md:order-3 order-3 mt-4 lg:mt-0">
            <div className="rounded-2xl bg-secondary p-5 md:p-6 shadow-sm overflow-hidden relative">
              <div className="relative z-10 text-secondary-foreground">
                <h3 className="font-black text-xs uppercase tracking-widest mb-6 opacity-80">Pertumbuhan Komunitas</h3>
                <div className="mb-4">
                  <div className="text-4xl font-black tracking-tighter mb-1">12.4K</div>
                  <div className="text-xs font-semibold uppercase tracking-widest opacity-80">Barang Tercatat</div>
                </div>
                <div className="mb-8">
                  <div className="text-4xl font-black tracking-tighter mb-1">89K</div>
                  <div className="text-xs font-semibold uppercase tracking-widest opacity-80">Momen Diabadikan</div>
                </div>
                <Badge className="bg-primary text-primary-foreground border-none font-bold">
                  Bergabung Sekarang
                </Badge>
              </div>

              {/* Accent circle */}
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            </div>
          </div>

        </section>
      </main>

      {/* Clean & Simple Footer */}
      <footer className="w-full border-t border-border/30 py-16 px-4 bg-card/10">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8 text-secondary">
            <span className="text-sm font-black uppercase tracking-[0.3em]">
              CeritaBarangku
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            {['Tentang', 'Panduan', 'Keamanan', 'Privasi', 'Bantuan'].map((link) => (
              <Link 
                key={link} 
                to="/" 
                className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-secondary transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="w-12 h-[1px] bg-border/50 mb-8" />

          <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40 text-center leading-loose">
            © 2026 CeritaBarangku Platform.<br />
            Membangun provenance digital untuk aset fisik berharga.
          </p>
        </div>
      </footer>
    </div>
  );
}
