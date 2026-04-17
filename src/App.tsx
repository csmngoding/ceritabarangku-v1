import { createRouter, createRoute, createRootRouteWithContext, RouterProvider, Outlet } from '@tanstack/react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/Home';
import { ExplorePage } from './pages/Explore';
import { BarangDetailPage } from './pages/BarangDetail';
import { ProfilePage } from './pages/Profile';
import { NotificationsPage } from './pages/Notifications';
import { Toaster } from '@blinkdotnew/ui';
import { EntrySheet } from './components/EntrySheet';
import { useState } from 'react';

interface RouterContext {
  onOpenEntrySheet: () => void;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const { onOpenEntrySheet } = rootRoute.useContext();
    
    return (
      <>
        <AppLayout onOpenEntrySheet={onOpenEntrySheet} />
        <EntrySheet isOpen={isEntrySheetOpen} onClose={() => setIsEntrySheetOpen(false)} />
        <Toaster position="top-right" />
      </>
    );
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const exploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/explore',
  component: ExplorePage,
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notifications',
  component: NotificationsPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/barang/$id',
  component: BarangDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  exploreRoute,
  notificationsRoute,
  profileRoute,
  detailRoute,
]);

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

export default function App() {
  const [isEntrySheetOpen, setIsEntrySheetOpen] = useState(false);

  const router = createRouter({ 
    routeTree,
    context: {
      onOpenEntrySheet: () => setIsEntrySheetOpen(true),
    }
  });

  return (
    <>
      <RouterProvider router={router} />
      <EntrySheet isOpen={isEntrySheetOpen} onClose={() => setIsEntrySheetOpen(false)} />
    </>
  );
}
