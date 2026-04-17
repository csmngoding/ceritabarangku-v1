import { mockBarang } from '../lib/mock-data';
import { cn } from '@blinkdotnew/ui';

export function StoriesBar() {
  return (
    <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-4 py-6">
      {mockBarang.map((barang, idx) => (
        <div key={barang.id} className="flex shrink-0 flex-col items-center gap-2">
          <div 
            className={cn(
              "h-16 w-16 overflow-hidden rounded-full border-2 p-0.5 transition-transform active:scale-90",
              idx === 0 ? "border-primary" : "border-border"
            )}
          >
            <div className="h-full w-full overflow-hidden rounded-full">
              <img src={barang.images[0]} alt={barang.name} className="h-full w-full object-cover" />
            </div>
          </div>
          <span className="max-w-[70px] truncate text-center text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
            {barang.name.split(' ')[0]}
          </span>
        </div>
      ))}
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-border bg-muted/30">
          <span className="text-xl font-light text-muted-foreground">+</span>
        </div>
        <span className="text-center text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
          Daftar
        </span>
      </div>
    </div>
  );
}
