import React, { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@blinkdotnew/ui';

interface LocationResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationPickerProps {
  value: string;
  onChange: (location: string) => void;
  label?: string;
}

export function LocationPicker({ value, onChange, label }: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = useCallback(async (query: string) => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
        {
          headers: {
            'Accept-Language': 'id',
          },
        }
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchLocations(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, searchLocations]);

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-full items-center gap-2 rounded-xl bg-muted/30 px-3 text-xs font-bold uppercase transition-all hover:bg-muted/50 focus:ring-2 focus:ring-secondary/20 outline-none"
      >
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className={value ? "text-foreground" : "text-muted-foreground text-left line-clamp-1"}>
          {value || 'Pilih Tempat'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-[130] w-full max-w-[400px] overflow-hidden rounded-[32px] bg-background shadow-2xl border border-border/10"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tight">Cari Lokasi</h3>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Contoh: Jakarta Selatan, Cafe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/30 border-none text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Mencari...</span>
                    </div>
                  ) : results.length > 0 ? (
                    results.map((result) => (
                      <button
                        key={result.place_id}
                        type="button"
                        onClick={() => {
                          onChange(result.display_name.split(',')[0]);
                          setIsOpen(false);
                        }}
                        className="flex w-full items-start gap-3 p-4 rounded-2xl hover:bg-muted/50 transition-colors text-left group"
                      >
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 group-hover:text-secondary transition-colors" />
                        <div>
                          <p className="text-sm font-bold uppercase tracking-tight line-clamp-1">
                            {result.display_name.split(',')[0]}
                          </p>
                          <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5 font-medium leading-relaxed">
                            {result.display_name.split(',').slice(1).join(',').trim()}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : searchQuery.length >= 3 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground opacity-50">
                      <Search className="h-6 w-6 mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center px-6">
                        Lokasi tidak ditemukan. Coba gunakan kata kunci lain.
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground opacity-30">
                      <MapPin className="h-6 w-6 mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Ketik min. 3 karakter
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-muted/20 p-4 text-center border-t border-border/5">
                 <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/50">Powered by OpenStreetMap</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
