import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Settings, Wrench, ArrowRight, Camera, MapPin, Check, Calendar, ChevronRight, Info } from 'lucide-react';
import { Badge, cn } from '@blinkdotnew/ui';
import { useState, useEffect } from 'react';
import { mockBarang } from '../lib/mock-data';
import { DatePicker } from './DatePicker';
import { LocationPicker } from './LocationPicker';

interface EntrySheetProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedBarangId?: string | null;
}

export function EntrySheet({ isOpen, onClose, preselectedBarangId }: EntrySheetProps) {
  const [step, setStep] = useState<'barang_select' | 'type' | 'form'>('barang_select');
  const [selectedBarangId, setSelectedBarangId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  // Filter items owned by user-1 (the primary user for this proto)
  const myItems = mockBarang.filter(b => b.ownerId === 'user-1');
  const activeBarang = mockBarang.find(b => b.id === (selectedBarangId || preselectedBarangId));

  useEffect(() => {
    if (isOpen) {
      if (preselectedBarangId) {
        setSelectedBarangId(preselectedBarangId);
        setStep('type');
      } else {
        setSelectedBarangId(null);
        setStep('barang_select');
      }
      setSelectedType(null);
    }
  }, [isOpen, preselectedBarangId]);

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
            
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">
                  {step === 'barang_select' && 'Pilih Barang'}
                  {step === 'type' && 'Kategori Cerita'}
                  {step === 'form' && `Baru: ${selectedType}`}
                </h2>
                {activeBarang && step !== 'barang_select' && (
                  <div className="mt-1 flex items-center gap-1.5 opacity-60">
                    <div className="h-3 w-3 rounded-full bg-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{activeBarang.name}</span>
                  </div>
                )}
              </div>
              <button onClick={reset} className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80">
                <X className="h-5 w-5" />
              </button>
            </div>

            {step === 'barang_select' && (
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Pilih barang yang ingin kamu ceritakan hari ini:</p>
                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                  {myItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedBarangId(item.id);
                        setStep('type');
                      }}
                      className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-border/10 transition-all hover:border-secondary/40 active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded-xl border border-border/50">
                          <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold uppercase tracking-tight">{item.name}</p>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase">{item.barangId}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                    </button>
                  ))}
                  
                  <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-5 text-muted-foreground transition-colors hover:bg-muted/20">
                    <Info className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Daftarkan Barang Baru</span>
                  </button>
                </div>
              </div>
            )}

            {step === 'type' && (
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
            )}

            {step === 'form' && (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Narasi Cerita</label>
                  <textarea 
                    placeholder="Apa yang terjadi hari ini?"
                    className="w-full min-h-[120px] rounded-2xl border-none bg-muted/30 p-4 text-sm focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <DatePicker 
                      label="Tanggal"
                      value={selectedDate}
                      onChange={setSelectedDate}
                    />
                    <LocationPicker
                      label="Lokasi"
                      value={selectedLocation}
                      onChange={setSelectedLocation}
                    />
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
