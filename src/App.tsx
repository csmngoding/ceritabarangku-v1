import { createRouter, createRoute, createRootRoute, RouterProvider, useLocation } from '@tanstack/react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/Home';
import { ExplorePage } from './pages/Explore';
import { BarangDetailPage } from './pages/BarangDetail';
import { ProfilePage } from './pages/Profile';
import { NotificationsPage } from './pages/Notifications';
import { Toaster } from '@blinkdotnew/ui';
import { EntrySheet } from './components/EntrySheet';
import { LandingPage } from './pages/Landing';
import { StoryDetailPage } from './pages/StoryDetail';
import { TambahBarangPage } from './pages/TambahBarang';
import { useState } from 'react';

function RootComponent() {
  const [isEntrySheetOpen, setIsEntrySheetOpen] = useState(false);
  const location = useLocation();
  // Hide standard layout for landing page
  const isLanding = location.pathname === '/';

  // Detect if we're on a barang detail page and extract ID
  const isBarangDetail = location.pathname.startsWith('/barang/');
  const currentBarangId = isBarangDetail ? location.pathname.split('/')[2] : null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-8 bg-secondary text-secondary-foreground z-[100] flex items-center overflow-hidden border-b border-background/10">
        <marquee className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] w-full" scrollamount="6">
          🚧 THIS APP IS IN DEVELOPMENT PROCESS 🚧 &nbsp; &nbsp; &nbsp; &nbsp; 🚧 TAMPILAN DAN FITUR DAPAT BERUBAH SEWAKTU-WAKTU 🚧
        </marquee>
      </div>
      <div className="pt-8">
        {isLanding ? (
          <LandingPage />
        ) : (
          <AppLayout onOpenEntrySheet={() => setIsEntrySheetOpen(true)} />
        )}
      </div>
      <EntrySheet 
        isOpen={isEntrySheetOpen} 
        onClose={() => setIsEntrySheetOpen(false)} 
        preselectedBarangId={currentBarangId}
      />
      <Toaster position="top-right" />
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  // component is rendered inside RootComponent directly to bypass layout constraints
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/foryou',
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

const userProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile/$userId',
  component: ProfilePage,
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/barang/$id',
  component: BarangDetailPage,
});

const storyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/story/$id',
  component: StoryDetailPage,
});

const tambahBarangRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tambah-barang',
  component: TambahBarangPage,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  homeRoute,
  exploreRoute,
  notificationsRoute,
  profileRoute,
  userProfileRoute,
  detailRoute,
  storyDetailRoute,
  tambahBarangRoute,
]);

const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
