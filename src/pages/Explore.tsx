import { BarangCard } from '../components/BarangCard';
import { mockBarang } from '../lib/mock-data';
import { Badge, Input } from '@blinkdotnew/ui';
import { Search, Filter } from 'lucide-react';

export function ExplorePage() {
  return (
    <div className="flex flex-col">
      {/* Header & Search */}
      <div className="sticky top-0 z-40 bg-background/80 px-4 py-4 backdrop-blur-md">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Cari Barang, Brand, atau BarangID..." 
            className="h-11 border-none bg-white pl-10 text-xs font-bold uppercase tracking-widest shadow-sm focus-visible:ring-secondary"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button className="flex h-8 items-center justify-center rounded-full bg-secondary px-3 text-secondary-foreground shadow-sm">
            <Filter className="h-4 w-4" />
          </button>
          {['Jam Tangan', 'Motor Klasik', 'Kamera Analog', 'Sneakers', 'Sepeda'].map((cat) => (
            <Badge 
              key={cat} 
              variant="outline" 
              className="cursor-pointer whitespace-nowrap bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest"
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Discovery Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {mockBarang.map((barang) => (
          <BarangCard key={barang.id} barang={barang} />
        ))}
        {/* Repeat some items for visual density in mock */}
        {mockBarang.map((barang) => (
          <BarangCard key={`${barang.id}-ref`} barang={barang} />
        ))}
      </div>

      {/* Suggested Sections */}
      <div className="mt-8 px-4 pb-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-sm font-black uppercase tracking-widest">
            Trending Minggu Ini
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary underline decoration-primary decoration-2 underline-offset-4">
            Lihat Semua
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {mockBarang.slice(0, 2).map((barang) => (
            <div key={barang.id} className="w-[180px] shrink-0">
              <BarangCard barang={barang} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
