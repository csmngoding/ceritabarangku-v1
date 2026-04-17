import React, { useState } from 'react';
import { ChevronLeft, Camera, Check, Info, Package, Tag, Layers, Calendar, Type } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@blinkdotnew/ui';

export function TambahBarangPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    model: '',
    year: '',
    description: ''
  });

  const categories = [
    'Motor Klasik',
    'Jam Tangan',
    'Kamera Analog',
    'Sepeda',
    'Alat Musik',
    'Lainnya'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32">
      {/* Fixed Header */}
      <div className="fixed top-8 md:top-24 left-0 right-0 z-40 bg-background/80 px-4 py-4 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-4 max-w-2xl mx-auto w-full">
          <button onClick={() => window.history.back()} className="p-2 -ml-2 hover:text-secondary transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">
            Daftarkan Barang
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pt-24 md:pt-40 space-y-10">
        {/* Section 1: Identitas */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-1 bg-secondary rounded-full" />
            <h2 className="text-xs font-black uppercase tracking-widest">Identitas Barang</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nama Barang</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Contoh: Brompton M6L, RX-King 1995..."
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-border/50 text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Kategori</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select 
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-border/50 text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Tahun Produksi</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="number"
                    placeholder="YYYY"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-border/50 text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Merk / Brand</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text"
                    placeholder="Contoh: Yamaha, Rolex..."
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-border/50 text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Seri / Model</label>
                <div className="relative">
                  <Info className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text"
                    placeholder="Contoh: M6L, Submariner..."
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-border/50 text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Deskripsi */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-1 bg-secondary rounded-full" />
            <h2 className="text-xs font-black uppercase tracking-widest">Narasi Barang</h2>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Deskripsi Singkat</label>
            <div className="relative">
              <Type className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
              <textarea 
                placeholder="Ceritakan sedikit tentang barang ini. Apa yang membuatnya spesial bagimu?"
                className="w-full min-h-[160px] pl-12 pr-4 py-4 rounded-2xl bg-white border border-border/50 text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Media */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-1 bg-secondary rounded-full" />
            <h2 className="text-xs font-black uppercase tracking-widest">Media & Foto</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="aspect-square rounded-2xl border-2 border-dashed border-border bg-muted/10 flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:bg-muted/20 cursor-pointer">
                <Camera className="h-8 w-8" />
                <span className="text-[10px] font-black uppercase tracking-widest">Foto Utama</span>
             </div>
             <div className="aspect-square rounded-2xl border-2 border-dashed border-border/50 bg-muted/5 flex flex-col items-center justify-center gap-2 text-muted-foreground/50">
                <span className="text-2xl font-light">+</span>
             </div>
          </div>
          <p className="text-[10px] text-muted-foreground italic text-center">Tip: Gunakan foto dengan pencahayaan baik agar barangmu terlihat semakin istimewa.</p>
        </section>
      </div>

      {/* Fixed Bottom Bar - Floating above Mobile Nav */}
      <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] md:bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border z-40">
        <div className="max-w-2xl mx-auto">
          <button 
            className="flex w-full h-14 items-center justify-center gap-3 rounded-full bg-secondary text-primary shadow-xl transition-all active:scale-[0.98] hover:bg-secondary/90"
            onClick={() => {
              // konsep submit
              alert('Barang Berhasil Didaftarkan!');
              window.history.back();
            }}
          >
            <span className="font-black uppercase tracking-[0.2em] text-sm">Daftarkan Barang</span>
            <Check className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
