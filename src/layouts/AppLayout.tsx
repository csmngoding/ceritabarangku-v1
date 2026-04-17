import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { BottomNav, DesktopNavbar } from '../components/Navigation';

interface AppLayoutProps {
  onOpenEntrySheet: () => void;
}

export function AppLayout({ onOpenEntrySheet }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <DesktopNavbar onOpenEntrySheet={onOpenEntrySheet} />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="mx-auto max-w-2xl">
          <Outlet />
        </div>
      </main>

      <BottomNav onOpenEntrySheet={onOpenEntrySheet} />
    </div>
  );
}
