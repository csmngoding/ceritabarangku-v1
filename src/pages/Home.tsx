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
    <div className="flex flex-col pt-2">
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
