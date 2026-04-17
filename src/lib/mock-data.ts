export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  badges: string[];
  stats: {
    itemsCount: number;
    followersCount: number;
    storiesCount: number;
  };
}

export type EntryType = 'MEMORI' | 'MODIFIKASI' | 'SERVIS' | 'TRANSFER';
export type ItemStatus = 'Verified' | 'Self-Claimed';
export type ItemCondition = 'Mint' | 'Excellent' | 'Good' | 'Fair' | 'Poor';

export interface StoryEntry {
  id: string;
  barangId: string;
  type: EntryType;
  title?: string;
  date: string;
  content: string;
  images: string[];
  location?: string;
  workshop?: string;
  isOfficial?: boolean;
  price?: number;
  pricePublic?: boolean;
  condition?: ItemCondition;
  authorId: string;
}

export interface Barang {
  id: string;
  barangId: string; // CB-XXXX-XXXX
  name: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  description: string;
  images: string[];
  status: ItemStatus;
  condition: ItemCondition;
  ownerId: string;
  followersCount: number;
  createdAt: string;
}

export const mockUsers: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    name: 'Andra Ramadhan',
    username: 'andraram',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    badges: ['Kolektor 5 Tahun', 'Storyteller'],
    stats: { itemsCount: 3, followersCount: 1250, storiesCount: 42 }
  },
  'user-2': {
    id: 'user-2',
    name: 'Bima Sakti',
    username: 'bimasakti',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    badges: ['10 Barang Verified'],
    stats: { itemsCount: 12, followersCount: 3400, storiesCount: 156 }
  },
  'mitra-1': {
    id: 'mitra-1',
    name: 'Kustom Kontainer',
    username: 'kustomkontainer',
    avatar: 'https://images.unsplash.com/photo-1590611380053-da6447021fbb?auto=format&fit=crop&w=150&q=80',
    badges: ['Mitra Resmi'],
    stats: { itemsCount: 0, followersCount: 890, storiesCount: 230 }
  }
};

export const mockBarang: Barang[] = [
  {
    id: 'barang-1',
    barangId: 'CB-8821-0942',
    name: 'Si Merah RX-King',
    category: 'Motor Klasik',
    brand: 'Yamaha',
    model: 'RX-King',
    year: 1995,
    description: 'Motor legendaris kesayangan yang sudah menemani dari jaman kuliah. Kondisi mesin sangat terawat.',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f91dbbe980?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'Verified',
    condition: 'Excellent',
    ownerId: 'user-1',
    followersCount: 450,
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'barang-2',
    barangId: 'CB-1245-7890',
    name: 'Seiko Turtle SRP777',
    category: 'Jam Tangan',
    brand: 'Seiko',
    model: 'Prospex Turtle',
    year: 2018,
    description: 'Daily driver yang tangguh. Sudah keliling Indonesia bareng.',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'Self-Claimed',
    condition: 'Good',
    ownerId: 'user-1',
    followersCount: 85,
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: 'barang-3',
    barangId: 'CB-9900-1122',
    name: 'Leica M6 Classic',
    category: 'Kamera Analog',
    brand: 'Leica',
    model: 'M6',
    year: 1984,
    description: 'Kamera rangefinder ikonik. Dibeli dari kolektor di Berlin.',
    images: [
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'Verified',
    condition: 'Mint',
    ownerId: 'user-2',
    followersCount: 1200,
    createdAt: '2023-11-20T00:00:00Z'
  }
];

export const mockEntries: StoryEntry[] = [
  {
    id: 'entry-1',
    barangId: 'barang-1',
    type: 'MEMORI',
    title: 'Trip to Bromo',
    date: '2024-04-10T10:00:00Z',
    content: 'Hari ini bawa si Merah ke Bromo. Ternyata RX-King 1995 masih kuat nanjak tanpa kendala. Memori tak terlupakan bersama kawan-kawan komunitas.',
    images: [
      'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Gunung Bromo, Jawa Timur',
    condition: 'Excellent',
    authorId: 'user-1'
  },
  {
    id: 'entry-2',
    barangId: 'barang-1',
    type: 'SERVIS',
    title: 'Ganti Piston & Ring',
    date: '2024-03-15T14:30:00Z',
    content: 'Servis besar berkala. Penggantian piston set original Yamaha. Tarikan kembali responsif seperti baru keluar dealer.',
    images: [
      'https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&w=800&q=80'
    ],
    workshop: 'Kustom Kontainer',
    isOfficial: true,
    price: 1500000,
    pricePublic: true,
    condition: 'Excellent',
    authorId: 'mitra-1'
  },
  {
    id: 'entry-3',
    barangId: 'barang-3',
    type: 'MODIFIKASI',
    title: 'Custom Leather Wrap',
    date: '2024-01-20T09:00:00Z',
    content: 'Ganti skin bawaan dengan kulit kambing asli warna cognac. Sentuhan personal untuk kamera legendaris.',
    images: [
      'https://images.unsplash.com/photo-1495121553079-4c61bbbc19df?auto=format&fit=crop&w=800&q=80'
    ],
    workshop: 'Leather Lab Jakarta',
    condition: 'Mint',
    authorId: 'user-2'
  }
];
