import { Card, Badge, cn } from '@blinkdotnew/ui';
import { Verified, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Barang } from '../lib/mock-data';

interface BarangCardProps {
  barang: Barang;
}

export function BarangCard({ barang }: BarangCardProps) {
  return (
    <Link to={`/barang/${barang.id}`}>
      <Card className="group relative overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={barang.images[0]} 
            alt={barang.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
        
        {/* Status Badge */}
        {barang.status === 'Verified' && (
          <div className="absolute left-2 top-2">
            <Badge className="bg-primary px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-primary-foreground">
              Verified
            </Badge>
          </div>
        )}
        {barang.status === 'Pending-Verification' && (
          <div className="absolute left-2 top-2">
            <Badge className="bg-muted px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-muted-foreground border border-border/50">
              In Process
            </Badge>
          </div>
        )}

        <div className="p-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xs font-black uppercase leading-tight tracking-tight text-foreground">
                {barang.name}
              </h3>
              <p className="font-mono text-[9px] text-muted-foreground">
                {barang.barangId}
              </p>
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
              {barang.category}
            </span>
            <div className="flex items-center gap-0.5 text-muted-foreground">
              <MapPin className="h-2.5 w-2.5" />
              <span className="text-[8px] font-bold uppercase tracking-tighter">Jakarta</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
