import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { mockUsers, User } from '../lib/mock-data';
import { cn } from '@blinkdotnew/ui';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

// Brand Icons
const TwitterX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
);

const Facebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LikeSheet({ isOpen, onClose, userIds }: SheetProps & { userIds: string[] }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-2xl rounded-t-[32px] bg-background p-6 pb-12 shadow-2xl">
            <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-border" />
            <h2 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-center">Disukai Oleh</h2>
            <div className="max-h-[60vh] overflow-y-auto space-y-4 no-scrollbar">
              {userIds.map(uid => {
                const u = mockUsers[uid];
                if (!u) return null;
                return (
                  <div key={uid} className="flex items-center justify-between">
                    <Link 
                      to="/profile/$userId" 
                      params={{ userId: uid }}
                      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                      <div className="h-10 w-10 overflow-hidden rounded-full border border-border/50">
                        <img src={u.avatar} alt={u.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">{u.name}</p>
                        <p className="text-[8px] font-bold text-secondary uppercase tracking-widest">@{u.username}</p>
                      </div>
                    </Link>
                    <button className="rounded-full border border-border/50 px-4 py-1.5 text-[8px] font-black uppercase tracking-widest transition-colors hover:bg-secondary hover:text-primary">Ikuti</button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function ShareSheet({ isOpen, onClose, storyId }: SheetProps & { storyId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://ceritabarangku.app/story/${storyId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialActions = [
    { icon: WhatsApp, label: 'WhatsApp', color: 'bg-[#25D366]' },
    { icon: TwitterX, label: 'X (Twitter)', color: 'bg-black' },
    { icon: Instagram, label: 'Instagram', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
    { icon: Facebook, label: 'Facebook', color: 'bg-[#1877F2]' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-2xl rounded-t-[32px] bg-background p-6 pb-12 shadow-2xl">
            <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-border" />
            <h2 className="mb-8 text-sm font-black uppercase tracking-[0.2em] text-center">Bagikan Cerita</h2>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              {socialActions.map((social) => (
                <button key={social.label} className="flex flex-col items-center gap-2 transition-transform active:scale-90">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm", social.color)}>
                    <social.icon />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-tighter text-muted-foreground">{social.label}</span>
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <p className="truncate text-[10px] font-mono font-bold text-muted-foreground">ceritabarangku.app/story/{storyId}</p>
                </div>
                <button 
                  onClick={handleCopy}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-secondary px-4 py-2 text-primary transition-all active:scale-95"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{copied ? 'Disalin' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
