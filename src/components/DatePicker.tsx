import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, startOfToday, subDays, isBefore, isAfter } from 'date-fns';
import { id } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@blinkdotnew/ui';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

export function DatePicker({ value, onChange, label }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  
  const selectedDate = value ? new Date(value) : null;

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-2 py-4">
        <button
          onClick={(e) => { e.preventDefault(); setCurrentMonth(subMonths(currentMonth, 1)); }}
          className="rounded-full p-2 hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-black uppercase tracking-widest">
          {format(currentMonth, 'MMMM yyyy', { locale: id })}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); setCurrentMonth(addMonths(currentMonth, 1)); }}
          className="rounded-full p-2 hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const today = startOfToday();
    const minDate = subDays(today, 7);
    const maxDate = today;

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, today);
        
        // Check if date is within allowed range (H-7 to Today)
        const isDateDisabled = isBefore(day, minDate) || isAfter(day, maxDate);

        days.push(
          <div
            key={day.toString()}
            className={cn(
              "relative flex h-10 w-full items-center justify-center text-xs font-bold transition-all rounded-lg",
              !isCurrentMonth ? "text-muted-foreground/30" : "text-foreground",
              isSelected ? "bg-secondary text-primary shadow-lg scale-110 z-10" : !isDateDisabled ? "hover:bg-muted/50 cursor-pointer" : "opacity-20 cursor-not-allowed",
              isToday && !isSelected && "ring-1 ring-secondary/30"
            )}
            onClick={() => {
              if (isDateDisabled) return;
              onChange(format(cloneDay, 'yyyy-MM-dd'));
              setIsOpen(false);
            }}
          >
            <span>{formattedDate}</span>
            {isToday && !isSelected && (
              <div className="absolute bottom-1.5 h-1 w-1 rounded-full bg-secondary" />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="p-2 space-y-1">{rows}</div>;
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>}
      <div className="relative">
        <button
          onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
          className="flex h-11 w-full items-center gap-2 rounded-xl bg-muted/30 px-3 text-xs font-bold uppercase transition-all hover:bg-muted/50 focus:ring-2 focus:ring-secondary/20 outline-none"
        >
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value ? format(new Date(value), 'd MMMM yyyy', { locale: id }) : 'Pilih Tanggal'}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                className="relative z-[110] w-full max-w-[320px] overflow-hidden rounded-[32px] bg-background p-4 shadow-2xl border border-border/10"
              >
                {renderHeader()}
                {renderDays()}
                {renderCells()}
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full rounded-2xl bg-muted py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/80"
                >
                  Tutup
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
