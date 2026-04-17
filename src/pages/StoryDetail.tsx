import { useParams, Link } from '@tanstack/react-router';
import { ChevronLeft, MoreHorizontal, Heart, MessageSquare, Share2, Send, Verified, Copy } from 'lucide-react';
import { mockEntries, mockBarang, mockUsers, User } from '../lib/mock-data';
import { Badge, Card, cn } from '@blinkdotnew/ui';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LikeSheet, ShareSheet } from '../components/SocialSheets';

// Mock Social Icons for ShareSheet if lucide doesn't have brands (Twitter is X)
const TwitterX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
  </svg>
);

export function StoryDetailPage() {
  const { id: entryId } = useParams({ from: '/story/$id' });
  const entry = mockEntries.find((e) => e.id === entryId);
  const barang = entry ? mockBarang.find((b) => b.id === entry.barangId) : null;
  const author = entry ? mockUsers[entry.authorId] : null;

  const [isLikeSheetOpen, setIsLikeSheetOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [liked, setLiked] = useState(entry?.likes.includes('user-1') || false); // Mocking active user as user-1
  const [localLikesCount, setLocalLikesCount] = useState(entry?.likes.length || 0);

  if (!entry || !barang || !author) {
    return <div className="p-8 text-center font-black uppercase tracking-widest">Cerita Tidak Ditemukan</div>;
  }

  const handleLike = () => {
    if (liked) {
      setLocalLikesCount(prev => prev - 1);
    } else {
      setLocalLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Editorial Header */}
      <div className="fixed top-8 left-0 right-0 z-50 bg-background/80 px-4 py-4 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between">
          <button onClick={() => window.history.back()} className="p-2 -ml-2 hover:text-secondary transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/80">
            Detail Cerita
          </h1>
          <button className="p-2 -mr-2">
            <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full pt-16">
        {/* Main Content Card (Similar to FeedCard but fixed) */}
        <div className="p-4">
          <Link
            to="/barang/$id"
            params={{ id: barang.id }}
            className="mb-6 flex items-center justify-between hover:bg-muted/30 -mx-2 p-2 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-border/50">
                <img src={barang.images[0]} alt={barang.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-widest">{barang.name}</span>
                  {barang.status === 'Verified' && <Verified className="h-3 w-3 fill-primary text-primary-foreground" />}
                </div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">{barang.barangId}</p>
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{formatDistanceToNow(new Date(entry.date), { locale: id })} yang lalu</p>
          </Link>

          <Badge variant="outline" className="mb-4 bg-primary/10 text-[10px] font-black uppercase tracking-widest text-primary-foreground border-primary/20">
            {entry.type}
          </Badge>

          <h2 className="mb-3 text-lg font-black uppercase leading-tight tracking-tight text-foreground">
            {entry.title || entry.type}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {entry.content}
          </p>

          {entry.images.length > 0 && (
            <div className="mb-8 grid grid-cols-1 gap-2">
              {entry.images.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl bg-muted shadow-sm">
                  <img src={img} alt="Entry detail" className="w-full object-contain max-h-[500px]" />
                </div>
              ))}
            </div>
          )}

          {/* Social Stats Section */}
          <div className="flex items-center justify-between border-t border-border/10 py-4">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-2 transition-transform active:scale-90",
                  liked ? "text-secondary" : "text-muted-foreground"
                )}
              >
                <Heart className={cn("h-5 w-5", liked && "fill-secondary")} />
                <span className="text-[10px] font-black uppercase tracking-widest" onClick={(e) => { e.stopPropagation(); setIsLikeSheetOpen(true); }}>
                  {localLikesCount} LIKES
                </span>
              </button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">{entry.comments.length} KOMENTAR</span>
              </div>
            </div>
            <button
              onClick={() => setIsShareSheetOpen(true)}
              className="text-muted-foreground hover:text-secondary transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Comment Thread */}
          <div className="mt-8 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Cerita Mereka</h3>
            {entry.comments.length > 0 ? (
              entry.comments.map((comment) => {
                const cUser = mockUsers[comment.userId];
                return (
                  <div key={comment.id} className="flex gap-4">
                    <Link to="/profile/$userId" params={{ userId: comment.userId }} className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted border border-border/50 hover:opacity-80 transition-opacity">
                      <img src={cUser.avatar} alt={cUser.name} className="h-full w-full object-cover" />
                    </Link>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Link to="/profile/$userId" params={{ userId: comment.userId }} className="text-[10px] font-black uppercase tracking-widest text-foreground hover:text-secondary transition-colors">
                          {cUser.name}
                        </Link>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">{formatDistanceToNow(new Date(comment.date), { locale: id })} lalu</span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-10 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 italic">Belum ada komentar. Jadilah yang pertama!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Comment Box */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border/10 bg-background/95 px-4 py-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-border/50">
            <img src={mockUsers['user-1'].avatar} alt="Me" className="h-full w-full object-cover" />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="TULIS KOMENTAR..."
              className="w-full rounded-full border-none bg-muted/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-secondary/20"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <LikeSheet isOpen={isLikeSheetOpen} onClose={() => setIsLikeSheetOpen(false)} userIds={entry.likes} />
      <ShareSheet isOpen={isShareSheetOpen} onClose={() => setIsShareSheetOpen(false)} storyId={entry.id} />
    </div>
  );
}

// Reusing Check icon from elsewhere or importing it
import { Check as LucideCheck } from 'lucide-react';
const Check = LucideCheck;
