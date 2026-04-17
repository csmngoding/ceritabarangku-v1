import { Badge, Card, cn } from '@blinkdotnew/ui';
import { Heart, MessageSquare, Share2, Verified } from 'lucide-react';
import { StoryEntry, mockBarang, mockUsers, EntryType } from '../lib/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

interface FeedCardProps {
  entry: StoryEntry;
}

const typeColors: Record<EntryType, string> = {
  MEMORI: 'bg-primary/20 text-primary-foreground border-primary/30',
  MODIFIKASI: 'bg-amber-100 text-amber-900 border-amber-200',
  SERVIS: 'bg-secondary/10 text-secondary border-secondary/20',
  TRANSFER: 'bg-indigo-100 text-indigo-900 border-indigo-200',
};

export function FeedCard({ entry }: FeedCardProps) {
  const barang = mockBarang.find((b) => b.id === entry.barangId);
  const user = mockUsers[entry.authorId];

  if (!barang) return null;

  return (
    <Card className="mb-4 overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
            <img 
              src={barang.images[0]} 
              alt={barang.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold uppercase leading-tight tracking-tight">
                {barang.name}
              </h3>
              {barang.status === 'Verified' && (
                <Verified className="h-3.5 w-3.5 fill-primary text-primary-foreground" />
              )}
            </div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              {barang.barangId}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
            {formatDistanceToNow(new Date(entry.date), { addSuffix: true, locale: id })}
          </p>
        </div>
      </div>

      {/* Content Type Badge */}
      <div className="px-4 py-1">
        <Badge 
          variant="outline" 
          className={cn("text-[10px] font-black uppercase tracking-widest", typeColors[entry.type])}
        >
          {entry.type}
        </Badge>
      </div>

      {/* Text Content */}
      <div className="px-4 py-2">
        <p className="text-sm leading-relaxed text-foreground">
          {entry.content}
        </p>
      </div>

      {/* Images Grid */}
      {entry.images.length > 0 && (
        <div className={cn(
          "grid gap-1 px-4 py-2",
          entry.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
        )}>
          {entry.images.map((img, idx) => (
            <div 
              key={idx} 
              className={cn(
                "aspect-[4/3] overflow-hidden rounded-lg bg-muted",
                entry.images.length === 3 && idx === 0 && "col-span-2 aspect-[16/9]"
              )}
            >
              <img src={img} alt="Entry content" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Footer / Actions */}
      <div className="flex items-center justify-between border-t border-border/50 p-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-secondary">
            <Heart className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">12</span>
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-secondary">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">3</span>
          </button>
        </div>
        <button className="text-muted-foreground transition-colors hover:text-secondary">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}
