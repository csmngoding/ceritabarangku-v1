import { Badge, Card, cn } from '@blinkdotnew/ui';
import { Verified, Calendar, MapPin, User, ChevronRight } from 'lucide-react';
import { StoryEntry, ItemCondition, Barang } from '../lib/mock-data';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link } from '@tanstack/react-router';

interface TimelineEntryProps {
  entry: StoryEntry;
  barang?: Barang;
  isFirst?: boolean;
  isLast?: boolean;
}

const conditionColors: Record<ItemCondition, string> = {
  Mint: 'text-emerald-500',
  Excellent: 'text-secondary',
  Good: 'text-secondary',
  Fair: 'text-amber-500',
  Poor: 'text-rose-500',
};

export function TimelineEntry({ entry, barang, isFirst, isLast }: TimelineEntryProps) {
  return (
    <div className="relative pl-12 pb-10">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[19px] top-6 bottom-0 w-[2px] bg-border/50" />
      )}
      
      {/* Dot Indicator */}
      <div className={cn(
        "absolute left-[10px] top-1 z-10 h-5 w-5 rounded-full border-4 border-background",
        entry.type === 'MEMORI' && "bg-primary shadow-[0_0_10px_rgba(204,251,163,0.5)]",
        entry.type === 'MODIFIKASI' && "bg-amber-500",
        entry.type === 'SERVIS' && "bg-secondary shadow-[0_0_10px_rgba(35,25,223,0.3)]",
        entry.type === 'TRANSFER' && "bg-indigo-500",
        entry.type === 'PASSPORT' && "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
      )} />

      {/* Date floating label */}
      <div className="absolute left-[-2px] -top-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
          {format(new Date(entry.date), 'dd MMM yyyy', { locale: id })}
        </span>
      </div>

      <Link to="/story/$id" params={{ id: entry.id }} className="block">
        <Card className={cn(
          "group overflow-hidden border-none bg-white p-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]",
          entry.isOfficial && "border-l-4 border-l-secondary"
        )}>
          {barang && (
            <div className="mb-4 flex items-center gap-3 border-b border-border/30 pb-3">
              <div className="h-8 w-8 overflow-hidden rounded-md bg-muted">
                <img 
                  src={barang.images[0]} 
                  alt={barang.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-tight text-foreground">
                  {barang.name}
                </h5>
                <p className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest">
                  {barang.barangId}
                </p>
              </div>
            </div>
          )}
          <div className="mb-3 flex items-center justify-between">
            <Badge className={cn(
              "text-[9px] font-black uppercase tracking-widest",
              entry.type === 'MEMORI' && "bg-primary/20 text-primary-foreground border-primary/30",
              entry.type === 'MODIFIKASI' && "bg-amber-100 text-amber-900 border-amber-200",
              entry.type === 'SERVIS' && "bg-secondary/10 text-secondary border-secondary/20",
              entry.type === 'TRANSFER' && "bg-indigo-100 text-indigo-900 border-indigo-200",
              entry.type === 'PASSPORT' && "bg-emerald-100 text-emerald-900 border-emerald-300"
            )}>
              {entry.type}
            </Badge>
            {(entry.isOfficial || entry.type === 'PASSPORT') && (
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <Verified className="w-2.5 h-2.5" /> Resmi Sistem
              </span>
            )}
          </div>

          <h4 className="mb-1 text-sm font-black uppercase tracking-tight text-foreground">
            {entry.title || (entry.type === 'MEMORI' ? 'Catatan Perjalanan' : entry.type)}
          </h4>
          
          <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
            {entry.content}
          </p>

          {entry.images.length > 0 && (
            <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
              {entry.images.map((img, idx) => (
                <div key={idx} className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img src={img} alt="Story entry" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 border-t border-border/30 pt-3">
            {entry.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{entry.location}</span>
              </div>
            )}
            {entry.workshop && (
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="h-4 border-secondary/20 bg-secondary/5 px-1.5 text-[8px] font-bold text-secondary">
                  {entry.workshop}
                </Badge>
              </div>
            )}
            {entry.condition && (
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold uppercase tracking-tighter text-muted-foreground">Kondisi:</span>
                <span className={cn("text-[10px] font-black uppercase tracking-widest", conditionColors[entry.condition])}>
                  {entry.condition}
                </span>
              </div>
            )}
          </div>
        </Card>
      </Link>
    </div>
  );
}
