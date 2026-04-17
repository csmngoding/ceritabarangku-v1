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

export interface StoryComment {
  id: string;
  entryId: string;
  userId: string;
  content: string;
  date: string;
}

export interface StoryLike {
  userId: string;
  date: string;
}

export type EntryType = 'MEMORI' | 'MODIFIKASI' | 'SERVIS' | 'TRANSFER' | 'PASSPORT';
export type ItemStatus = 'Verified' | 'Self-Claimed' | 'Pending-Verification';
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
  likes: string[]; // array of userIds
  comments: StoryComment[];
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
    avatar: 'https://robohash.org/andraram?set=set1&bgset=bg2&size=150x150',
    badges: ['Kolektor 5 Tahun', 'Storyteller'],
    stats: { itemsCount: 3, followersCount: 1250, storiesCount: 42 }
  },
  'user-2': {
    id: 'user-2',
    name: 'Bima Sakti',
    username: 'bimasakti',
    avatar: 'https://robohash.org/bimasakti?set=set1&bgset=bg1&size=150x150',
    badges: ['10 Barang Verified'],
    stats: { itemsCount: 12, followersCount: 3400, storiesCount: 156 }
  },
  'mitra-1': {
    id: 'mitra-1',
    name: 'Kustom Kontainer',
    username: 'kustomkontainer',
    avatar: 'https://robohash.org/kustomkontainer?set=set3&bgset=bg1&size=150x150',
    badges: ['Mitra Resmi'],
    stats: { itemsCount: 0, followersCount: 890, storiesCount: 230 }
  },
  'user-3': {
    id: 'user-3',
    name: 'Riana Putri',
    username: 'rianaputri',
    avatar: 'https://robohash.org/rianaputri?set=set1&bgset=bg2&size=150x150',
    badges: ['Vintage Lover'],
    stats: { itemsCount: 5, followersCount: 450, storiesCount: 15 }
  },
  'user-4': {
    id: 'user-4',
    name: 'Deri Pratama',
    username: 'deripratama',
    avatar: 'https://robohash.org/deripratama?set=set1&bgset=bg1&size=150x150',
    badges: ['Watch Collector'],
    stats: { itemsCount: 8, followersCount: 120, storiesCount: 8 }
  },
  'user-5': {
    id: 'user-5',
    name: 'Elsa Wijaya',
    username: 'elsawijaya',
    avatar: 'https://robohash.org/elsawijaya?set=set1&bgset=bg2&size=150x150',
    badges: ['Luxe Hunter'],
    stats: { itemsCount: 2, followersCount: 980, storiesCount: 30 }
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
      'https://imgx.gridoto.com/crop/0x0:0x0/700x465/photo/gridoto/2018/11/26/2253199687.jpg',
      'https://i.pinimg.com/736x/58/bd/46/58bd46cb892a8cd79159e6bd4ddc8b4a.jpg',
      'https://i.pinimg.com/736x/ce/c7/e9/cec7e9eb89ac5a0d26d6d1a2d5449e27.jpg'
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
      'https://www.swingwatch.co.id/wp-content/uploads/2018/06/SRPC95K1-10.jpg',
      'https://i.ebayimg.com/images/g/~1gAAOSwz2pm03Bi/s-l1200.jpg'
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
      'https://i.pinimg.com/736x/18/2e/62/182e629b807be01632e477ae456952cd.jpg',
      'https://i.pinimg.com/1200x/1d/f7/0d/1df70dc9692c54c9d95cf3520aee986a.jpg'
    ],
    status: 'Verified',
    condition: 'Mint',
    ownerId: 'user-2',
    followersCount: 1200,
    createdAt: '2023-11-20T00:00:00Z'
  },
  {
    id: 'barang-4',
    barangId: 'CB-4455-6677',
    name: 'Brompton M6L Raw Lacquer',
    category: 'Sepeda',
    brand: 'Brompton',
    model: 'M6L',
    year: 2021,
    description: 'Sepeda lipat andalan untuk commute. Sedang dalam proses verifikasi plakat.',
    images: [
      'https://i.pinimg.com/1200x/d9/30/37/d9303748e99906acaa620bf0b41dbb6a.jpg'
    ],
    status: 'Pending-Verification',
    condition: 'Excellent',
    ownerId: 'user-2',
    followersCount: 310,
    createdAt: '2024-03-10T00:00:00Z'
  },
  {
    id: 'barang-5',
    barangId: 'CB-7733-1188',
    name: 'Rolex Datejust 36 Blue Dial',
    category: 'Jam Tangan',
    brand: 'Rolex',
    model: 'Datejust 36',
    year: 2022,
    description: 'Classic elegance with a sunray blue dial. Fluted bezel and Jubilee bracelet.',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFoKNlhT4Hee4exvgTxqt52emPNO-rmiqRbg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSneg_-2RoRaTEMDOpnKoH3UPu_mezToT0KKA&s'
    ],
    status: 'Verified',
    condition: 'Mint',
    ownerId: 'user-1',
    followersCount: 890,
    createdAt: '2024-04-01T00:00:00Z'
  },
  {
    id: 'barang-6',
    barangId: 'CB-5566-0011',
    name: 'Fujifilm X100V Silver',
    category: 'Kamera Analog',
    brand: 'Fujifilm',
    model: 'X100V',
    year: 2023,
    description: 'The perfect companion for street photography. Compact with a sharp 23mm F2 lens.',
    images: [
      'https://sentradigital.com/Images/WizardContent/Wiz-202303/72748/x100-v-silver-fujifilm-kamera.webp',
      'https://m.media-amazon.com/images/I/81PSiRStCJL._AC_UF350,350_QL80_.jpg'
    ],
    status: 'Self-Claimed',
    condition: 'Excellent',
    ownerId: 'user-2',
    followersCount: 420,
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 'barang-7',
    barangId: 'CB-3322-9900',
    name: 'Vespa Primavera 150',
    category: 'Motor Klasik',
    brand: 'Vespa',
    model: 'Primavera 150',
    year: 2017,
    description: 'Iconic Italian design. Smooth ride for weekend cruising in the city.',
    images: [
      'https://imgcdn.oto.com/large/gallery/exterior/87/1113/vespa-primavera-91949.jpg'
    ],
    status: 'Verified',
    condition: 'Excellent',
    ownerId: 'user-1',
    followersCount: 150,
    createdAt: '2024-02-10T00:00:00Z'
  },
  {
    id: 'barang-8',
    barangId: 'CB-1199-5544',
    name: 'Fender Stratocaster 1970',
    category: 'Alat Musik',
    brand: 'Fender',
    model: 'Stratocaster',
    year: 1970,
    description: 'Sebuah mahakarya vintage dengan tone yang tidak tertandingi. Masih menggunakan pick-up asli dari tahun 70-an.',
    images: [
      'https://www.vintageandrare.com/uploads/products/74761/5339821/original.jpg'
    ],
    status: 'Self-Claimed',
    condition: 'Excellent',
    ownerId: 'user-2',
    followersCount: 280,
    createdAt: '2024-03-05T00:00:00Z'
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
      'https://cdn0-production-images-kly.akamaized.net/9yYIOD5EKs7cCQ6TocALd0OZNNk=/1280x720/smart/filters:quality(75):strip_icc()/kly-media-production/medias/1205855/original/043061500_1460885307-rx_king.jpg',
      'https://jadiberangkat.id/wp-content/uploads/2024/12/Bromo-tengger-semeru-_3__11zon-1024x682.webp'
    ],
    location: 'Gunung Bromo, Jawa Timur',
    condition: 'Excellent',
    authorId: 'user-1',
    likes: ['user-2', 'user-3', 'user-4'],
    comments: [
      { id: 'c1', entryId: 'entry-1', userId: 'user-3', content: 'Keren banget si Merah! Masih seger ya buat nanjak.', date: '2024-04-10T11:00:00Z' },
      { id: 'c2', entryId: 'entry-1', userId: 'user-4', content: 'Inspirasi restorasi nih. Engine-nya standar mas?', date: '2024-04-11T09:30:00Z' }
    ]
  },
  {
    id: 'entry-2',
    barangId: 'barang-1',
    type: 'SERVIS',
    title: 'Ganti Piston & Ring',
    date: '2024-03-15T14:30:00Z',
    content: 'Servis besar berkala. Penggantian piston set original Yamaha. Tarikan kembali responsif seperti baru keluar dealer.',
    images: [
      'https://imgx.gridoto.com/crop/0x0:0x0/700x465/photo/gridoto/2018/11/26/2253199687.jpg'
    ],
    workshop: 'Kustom Kontainer',
    isOfficial: true,
    price: 1500000,
    pricePublic: true,
    condition: 'Excellent',
    authorId: 'mitra-1',
    likes: ['user-1'],
    comments: []
  },
  {
    id: 'entry-3',
    barangId: 'barang-3',
    type: 'MODIFIKASI',
    title: 'Custom Leather Wrap',
    date: '2024-01-20T09:00:00Z',
    content: 'Ganti skin bawaan dengan kulit kambing asli warna cognac. Sentuhan personal untuk kamera legendaris.',
    images: [
      'https://i.redd.it/custom-leather-wraps-i-made-for-a-couple-of-my-soviet-era-v0-xr8z1xjsr1if1.jpg?width=4032&format=pjpg&auto=webp&s=45ce9d564be526a312cd7d79ffad8d2214129e30'
    ],
    workshop: 'Leather Lab Jakarta',
    condition: 'Mint',
    authorId: 'user-2',
    likes: ['user-5'],
    comments: [
      { id: 'c3', entryId: 'entry-3', userId: 'user-5', content: 'Rapih banget pengerjaan kulitnya.', date: '2024-01-21T10:00:00Z' }
    ]
  },
  {
    id: 'entry-4',
    barangId: 'barang-2',
    type: 'MEMORI',
    title: 'Diving di Raja Ampat',
    date: '2024-02-14T08:00:00Z',
    content: 'Sensasi luar biasa perdana bawa Seiko Turtle menyelam hingga kedalaman 20 meter. Lume indikator benar-benar terang benderang di bawah laut yang gelap. Jam ini pantas dapat label Prospex divers tangguh!',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://watchesbysjx.com/wp-content/uploads/2017/01/JM-dive-review-5.jpg'
    ],
    location: 'Wayag, Raja Ampat, Papua',
    condition: 'Good',
    authorId: 'user-1',
    likes: ['user-3', 'user-5'],
    comments: []
  },
  {
    id: 'entry-5',
    barangId: 'barang-3',
    type: 'MEMORI',
    title: 'Street Photography Kyoto',
    date: '2024-03-01T15:00:00Z',
    content: 'Terjebak hujan lebat di lorong Gion. Kamera M6 sempat basah terguyur, tapi bodi magnesium alloy terbukti tahan banting. Hasil jepretan roll film Portra 400 sukses menangkap aura magis kota tua ini.',
    images: [
      'https://image.idntimes.com/post/20260328/pexels-ryutaro-5745817_976d2508-aed4-496e-837f-3fcd5fb61ac9.jpg',
      'https://image.idntimes.com/post/20260328/pexels-satoshi-1715547_48850e59-a2d5-4fe1-b607-99e6353a3319.jpg'
    ],
    location: 'Gion, Kyoto, Jepang',
    condition: 'Mint',
    authorId: 'user-2',
    likes: ['user-1', 'user-4'],
    comments: []
  },
  {
    id: 'entry-6',
    barangId: 'barang-1',
    type: 'MODIFIKASI',
    title: 'Tuning Karbu & Knalpot',
    date: '2023-11-12T10:00:00Z',
    content: 'Hari libur dihabiskan setup spuyer karburator agar seimbang dengan knalpot kolong 3v3 perut udang yang baru dipasang. Suara langsung melengking khas jambakan setan RX-King.',
    images: [
      'https://buletinislam.com/wp-content/uploads/2022/07/karburator.jpg'
    ],
    workshop: 'Bintang Racing Team (BRT)',
    condition: 'Good',
    authorId: 'user-1',
    likes: [],
    comments: []
  },
  {
    id: 'entry-7',
    barangId: 'barang-2',
    type: 'SERVIS',
    title: 'Ganti Strap Premium NATO',
    date: '2023-12-10T14:00:00Z',
    content: 'Bosan dengan rubber band silikon bawaan pabrik yang lengket saat berkeringat keras. Ganti menggunakan premium NATO strap kain canvas warna putih tulang + garis merah.',
    images: [
      'https://m.media-amazon.com/images/I/71rTEQH+ozL._AC_UY1100_.jpg'
    ],
    price: 350000,
    pricePublic: true,
    condition: 'Excellent',
    authorId: 'user-1',
    likes: [],
    comments: []
  },
  {
    id: 'entry-genesis',
    barangId: 'barang-1',
    type: 'PASSPORT',
    title: 'Penerbitan Digital Passport',
    date: '2024-01-10T00:00:00Z',
    content: 'Aset ini telah sah terdaftar di sistem. Seluruh data, nomor referensi, spesifikasi pabrikan, serta klaim kepemilikan pertama telah ditinjau dan terverifikasi secara resmi.',
    images: [],
    condition: 'Excellent',
    authorId: 'user-1',
    likes: [],
    comments: []
  },
  {
    id: 'entry-genesis-3',
    barangId: 'barang-3',
    type: 'PASSPORT',
    title: 'Penerbitan Digital Passport',
    date: '2023-11-20T00:00:00Z',
    content: 'Kamera rangefinder Leica M6 Classic (1984) telah resmi didaftarkan ke sistem CeritaBarangku. Verifikasi keaslian seri produksi, kondisi fisik bodi & metering, serta bukti kepemilikan sah telah ditinjau dan disetujui.',
    images: [],
    condition: 'Mint',
    authorId: 'user-2',
    likes: [],
    comments: []
  },
  {
    id: 'entry-genesis-5',
    barangId: 'barang-5',
    type: 'PASSPORT',
    title: 'Penerbitan Digital Passport',
    date: '2024-04-01T00:00:00Z',
    content: 'Rolex Datejust 36 dengan dial biru matahari telah terverifikasi secara penuh. Nomor seri dan bukti keaslian dari dealer resmi telah divalidasi oleh sistem.',
    images: [],
    condition: 'Mint',
    authorId: 'user-1',
    likes: [],
    comments: []
  },
  {
    id: 'entry-genesis-7',
    barangId: 'barang-7',
    type: 'PASSPORT',
    title: 'Penerbitan Digital Passport',
    date: '2024-02-10T00:00:00Z',
    content: 'Vespa Primavera 150 (2017) telah resmi terdaftar. Verifikasi nomor rangka dan kepemilikan tangan pertama telah disetujui.',
    images: [],
    condition: 'Excellent',
    authorId: 'user-1',
    likes: [],
    comments: []
  },
  {
    id: 'entry-8',
    barangId: 'barang-6',
    type: 'MEMORI',
    title: 'First Roll in Malioboro',
    date: '2024-02-05T19:00:00Z',
    content: 'Coba simulasi film recipie "Kodak Portra 400" di X100V buat street photography malem-malem di Jogja. Focus-nya cepet banget buat motret objek bergerak.',
    images: [
      'https://i.pinimg.com/1200x/a6/73/47/a673478b39219640ed31d225f86f9619.jpg'
    ],
    location: 'Malioboro, Yogyakarta',
    condition: 'Excellent',
    authorId: 'user-2',
    likes: ['user-3'],
    comments: []
  },
  {
    id: 'entry-9',
    barangId: 'barang-8',
    type: 'MEMORI',
    title: 'Sesi Rekaman Studio',
    date: '2024-03-20T07:30:00Z',
    content: 'Digunakan untuk mengisi track gitar di album terbaru kawan lama. Karakter suaranya yang "twangy" khas 70-an bener-bener dapet banget di lagu ballad ini.',
    images: [
      'https://waltgracevintage.com/cdn/shop/products/IMG_9703_256704bd-0185-4e61-9dd9-34d793f6e804.jpg?v=1627765900'
    ],
    location: 'Studio Musik Jakarta',
    condition: 'Excellent',
    authorId: 'user-2',
    likes: ['user-1'],
    comments: []
  },
  {
    id: 'entry-10',
    barangId: 'barang-4',
    type: 'SERVIS',
    title: 'Instalasi Mudguard Carbon',
    date: '2024-03-15T11:00:00Z',
    content: 'Upgrade mudguard standar ke material carbon asli. Lebih ringan dan bikin tampilan Brompton makin gahar tapi tetep elegan.',
    images: [
      'https://cdn11.bigcommerce.com/s-y6rxtt0m81/products/655/images/18246/Q102888_2__19489.1770981149.1280.1280.jpg?c=1'
    ],
    workshop: 'Brompton Experience Store',
    condition: 'Excellent',
    authorId: 'user-2',
    likes: [],
    comments: []
  }
];
