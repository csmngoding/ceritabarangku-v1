import { BarangCard } from '../components/BarangCard';
import { mockBarang } from '../lib/mock-data';
import { Badge, Input } from '@blinkdotnew/ui';
import { Search, Filter } from 'lucide-react';

export function ExplorePage() {
  return (
    <div>
      {/* Header & Search */}
      <div className="sticky top-0 z-40 bg-background/95 px-4 pt-2 pb-4 backdrop-blur-xl border-b border-border/30">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="CARI BARANG ATAU BRAND..." 
            className="h-12 border-border/50 bg-muted/50 rounded-2xl pl-10 text-[10px] font-black uppercase tracking-widest shadow-inner focus-visible:ring-secondary"
          />
        </div>
        
        {/* Category chips — whitespace:nowrap + inline-block for universal Safari compat */}
        <div 
          className="no-scrollbar"
          style={{ 
            overflowX: 'auto', 
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '4px' 
          }}
        >
          <button 
            className="h-8 rounded-full bg-secondary px-3 text-secondary-foreground shadow-sm"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'middle', marginRight: '8px' }}
          >
            <Filter className="h-4 w-4" />
          </button>
          {['Jam Tangan', 'Motor Klasik', 'Kamera Analog', 'Sneakers', 'Sepeda'].map((cat) => (
            <Badge 
              key={cat} 
              variant="outline" 
              className="cursor-pointer bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest"
              style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: '8px', whiteSpace: 'nowrap' }}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Discovery Grid — pure CSS Grid, no Tailwind shortcuts */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
          gap: '8px',
          padding: '16px',
          alignItems: 'start' 
        }}
      >
        {mockBarang.map((barang) => (
          <BarangCard key={barang.id} barang={barang} />
        ))}
      </div>

      {/* Trending Section */}
      <div style={{ marginTop: '32px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '48px' }}>
        <div className="mb-4" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h2 className="text-sm font-black uppercase tracking-widest">
            Trending Minggu Ini
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary underline decoration-secondary/30 decoration-2 underline-offset-4">
            Lihat Semua
          </span>
        </div>
        
        {/* Horizontal scroll — whitespace:nowrap + inline-block: BULLETPROOF Safari method */}
        <div 
          className="no-scrollbar"
          style={{ 
            overflowX: 'auto', 
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '8px',
            marginLeft: '-16px',
            marginRight: '-16px',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        >
          {mockBarang.slice(0, 3).map((barang, idx) => (
            <div 
              key={`trending-${barang.id}-${idx}`} 
              style={{ 
                display: 'inline-block', 
                width: '160px', 
                marginRight: idx < 2 ? '12px' : '0',
                verticalAlign: 'top',
                whiteSpace: 'normal'
              }}
            >
              <BarangCard barang={barang} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
