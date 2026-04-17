import { StoriesBar } from '../components/StoriesBar';
import { FeedCard } from '../components/FeedCard';
import { mockEntries } from '../lib/mock-data';
import { Badge } from '@blinkdotnew/ui';

export function HomePage() {
  // Sort entries by date descending
  const sortedEntries = [...mockEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col">
      {/* Top Banner for Branding */}
      <div className="flex h-14 items-center justify-between px-4 md:hidden">
        <h1 className="text-xl font-black uppercase tracking-tighter text-secondary">
          CeritaBarangku
        </h1>
        <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="User" />
        </div>
      </div>

      <StoriesBar />

      {/* Feed Filters */}
      <div className="sticky top-0 z-30 flex gap-2 overflow-x-auto bg-background/80 px-4 py-3 backdrop-blur-md no-scrollbar border-b border-border/50">
        {['Semua', 'Memori', 'Modifikasi', 'Servis', 'Transfer'].map((filter, i) => (
          <Badge 
            key={filter} 
            variant={i === 0 ? "default" : "outline"}
            className="cursor-pointer px-4 py-1.5 text-[10px] font-black uppercase tracking-widest"
          >
            {filter}
          </Badge>
        ))}
      </div>

      {/* Feed List */}
      <div className="p-4">
        {sortedEntries.map((entry) => (
          <FeedCard key={entry.id} entry={entry} />
        ))}
        
        {/* Placeholder for infinite scroll */}
        <div className="flex justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    </div>
  );
}
