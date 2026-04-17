import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Settings, Wrench, ArrowRight, Camera, MapPin, Check } from 'lucide-react';
import { Badge, cn } from '@blinkdotnew/ui';
import { useState } from 'react';

interface EntrySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EntrySheet({ isOpen, onClose }: EntrySheetProps) {
  const [step, setStep] = useState<'type' | 'form'>('type');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const entryTypes = [
    { id: 'MEMORI', icon: Cloud, label: 'MEMORI', color: 'bg-primary text-primary-foreground', desc: 'Petualangan & kenangan' },
    { id: 'MODIFIKASI', icon: Settings, label: 'MODIFIKASI', color: 'bg-amber-500 text-white', desc: 'Perubahan & upgrade' },
    { id: 'SERVIS', icon: Wrench, label: 'SERVIS', color: 'bg-secondary text-primary', desc: 'Perawatan resmi mitra' },
    { id: 'TRANSFER', icon: ArrowRight, label: 'TRANSFER', color: 'bg-indigo-500 text-white', desc: 'Pindah kepemilikan' },
  ];

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setStep('form');
  };

  const reset = () => {
    setStep('type');
    setSelectedType(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-2xl rounded-t-[32px] bg-background p-6 pb-12 shadow-2xl"
          >
            <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-border" />
            
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-tight">
                {step === 'type' ? 'Tambah Cerita' : `Baru: ${selectedType}`}
              </h2>
              <button onClick={reset} className="rounded-full bg-muted p-2 text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {step === 'type' ? (
              <div className="grid grid-cols-2 gap-4">
                {entryTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleSelectType(type.id)}
                    className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm border border-border/10 transition-transform active:scale-95"
                  >
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", type.color)}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest">{type.label}</p>
                      <p className="text-[8px] font-medium text-muted-foreground">{type.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Narasi Cerita</label>
                  <textarea 
                    placeholder="Apa yang terjadi hari ini?"
                    className="w-full min-h-[120px] rounded-2xl border-none bg-muted/30 p-4 text-sm focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tanggal</label>
                     <div className="flex h-11 items-center gap-2 rounded-xl bg-muted/30 px-3 text-xs font-bold uppercase">
                       <Calendar className="h-4 w-4 text-muted-foreground" />
                       17 April 2026
                     </div>
                   </div>
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lokasi</label>
                     <div className="flex h-11 items-center gap-2 rounded-xl bg-muted/30 px-3 text-xs font-bold text-muted-foreground uppercase">
                       <MapPin className="h-4 w-4" />
                       Pilih Tempat
                     </div>
                   </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Upload Foto (Maks 10)</label>
                  <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/10">
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                       <Camera className="h-6 w-6" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Tambah Foto</span>
                    </div>
                  </div>
                </div>

                <button className="flex w-full h-14 items-center justify-center gap-2 rounded-full bg-secondary text-primary shadow-lg transition-transform active:scale-95">
                  <span className="font-black uppercase tracking-widest">Publikasikan</span>
                  <Check className="h-5 w-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
