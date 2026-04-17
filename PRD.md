# PRD — CeritaBarangku.com
**Product Requirements Document**
Version 2.0 · April 2026

---

## 1. Vision & Overview

**CeritaBarangku.com** adalah platform digital *provenance* dan media sosial berbasis benda yang mentransformasi barang fisik menjadi entitas hidup dengan identitas, sejarah, dan nilai emosional yang terverifikasi secara permanen.

Setiap barang mendapatkan **paspor digital unik (BarangID)** yang merekam seluruh perjalanan hidupnya — memori petualangan pemilik, progres modifikasi, hingga catatan perawatan resmi dari mitra bengkel terpercaya. Dikemas dalam antarmuka **mobile-first** yang modern, dengan feed timeline yang mengalir layaknya media sosial.

> *"Setiap barang punya cerita. Kami pastikan cerita itu tidak hilang."*

---

## 2. Design Language Summary

| Atribut | Nilai |
|---|---|
| **Font** | Cabinet Grotesk (Fontshare) — semua weight 100–900 |
| **Aksen Primer** | Reef `#CCFBA3` — emosi, komunitas, memori, verified |
| **Aksen Sekunder** | Persian Blue `#2319DF` — kepercayaan, aksi, resmi, teknologi |
| **WCAG Ratio** | 7.86:1 AAA antara kedua aksen |
| **Background** | Linen hangat `#F5F0E8` — tidak pernah pure white |
| **Navigasi Mobile** | Bottom tab bar + FAB `+` center |
| **Referensi UI** | TWOTWO Social Athletics — rotated label, editorial grid, object-hero photo |

---

## 3. Problem Statement

Tidak ada cara terstandarisasi dan terpercaya untuk:
- Mendokumentasikan sejarah lengkap sebuah barang (kepemilikan, kondisi, perawatan)
- Memverifikasi keaslian dan kondisi barang saat transaksi resale
- Membangun komunitas kolektor yang berpusat pada **barang**, bukan hanya orang
- Meningkatkan nilai jual kembali melalui rekam jejak terdokumentasi

Akibatnya: barang bernilai kehilangan konteks historisnya, kepercayaan di pasar sekunder rendah, dan cerita di balik benda-benda kesayangan punah bersama pemiliknya.

---

## 4. Target Users

| Segmen | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Kolektor Hobi** | Pecinta jam tangan, kamera analog, motor custom, sepeda, sneakers | Rekam modifikasi, dokumentasi kondisi, resale value |
| **Pemilik Barang Warisan** | Penerima barang antik/heirloom dari keluarga | Cerita leluhur, rantai kepemilikan, preservasi memori |
| **Komunitas Bengkel** | Bengkel motor, jam, sepeda, elektronik terpercaya | Menerbitkan service record resmi |
| **Pembeli Pasar Sekunder** | Calon pembeli yang ingin verifikasi sejarah barang | Due diligence, histori lengkap, kepercayaan |
| **Admin Platform** | Tim CeritaBarangku | Menerbitkan plakat fisik, verifikasi mitra, moderasi |

---

## 5. Core Concept: Tiga Pilar Platform

### 5.1 Plakat Fisik sebagai "Jangkar" Identitas
Setiap barang yang terdaftar dapat menerima **plakat fisik eksklusif** (NFC chip + QR code) yang diterbitkan Admin. Plakat ini mengunci identitas digital barang secara permanen. Tanpa plakat: status `Self-Claimed`. Dengan plakat: status `Verified`.

### 5.2 Paspor Digital (BarangID)
Setiap barang memiliki profil tersendiri — dengan CeritaFeed (timeline), galeri foto, statistik, dan riwayat pemilik. Paspor bersifat permanen dan tidak bisa dihapus, hanya bisa ditransfer.

### 5.3 Ekosistem Kepercayaan
Mitra bengkel resmi menerbitkan **Service Record** yang ter-timestamp. Komunitas bisa mengikuti (*follow*) barang spesifik. Feed berisi update dari semua barang yang di-follow.

---

## 6. Mobile App Architecture

### 6.1 Navigasi Utama — Bottom Tab Bar

```
┌─────────────────────────────────────────┐
│                                         │
│          [ Konten Halaman ]             │
│                                         │
├──────┬──────┬───────┬──────┬────────────┤
│  🏠  │  🔍  │  ⊕   │  🔔  │  👤       │
│Beranda│Explore│Tambah│ Notif│  Profil   │
└──────┴──────┴───────┴──────┴────────────┘
         FAB: Persian Blue circle, Reef "+" icon
```

### 6.2 Sitemap & Navigasi

```
CeritaBarangku App
│
├── TAB: Beranda
│   ├── Stories Bar (followed barang updates)
│   └── CeritaFeed Global (semua barang yang diikuti)
│
├── TAB: Explore
│   ├── Search bar
│   ├── Filter: Kategori | Brand | Kota | Era
│   └── Grid: Barang Cards (2-col masonry)
│
├── FAB: Tambah Cerita / Daftarkan Barang
│   ├── Bottom sheet: "Tambah ke Barang Existing"
│   └── Bottom sheet: "Daftarkan Barang Baru"
│
├── TAB: Notifikasi
│   ├── Update dari barang yang diikuti
│   ├── Reaksi & komentar
│   └── Status pengajuan plakat
│
├── TAB: Profil
│   ├── Koleksi aktif (grid barang)
│   ├── Riwayat kepemilikan
│   └── Pengaturan
│
└── SCREEN: BarangPage /:barangId
    ├── Hero gallery (swipeable)
    ├── Sticky info bar
    ├── Tab: CeritaFeed | Galeri | Info
    └── FAB: Tambah Cerita (owner only)
```

---

## 7. Features & Requirements

### 7.1 Beranda — CeritaFeed Global

**F-HOME-01 · Stories Bar**
- Row horizontal scroll di bagian atas halaman
- Menampilkan foto thumbnail barang yang di-follow, diberi ring berwarna Reef jika ada update baru
- Tap untuk lihat preview 3 entry terbaru dalam bottom sheet

**F-HOME-02 · Feed Timeline**
- Infinite scroll, chronological reverse (terbaru di atas)
- Setiap card menampilkan: mini-header barang, entry type chip, konten, foto (jika ada), reaction bar
- Filter chips sticky di bawah stories bar: Semua | MEMORI | MODIFIKASI | SERVIS | TRANSFER
- Pull-to-refresh dengan animasi Reef-colored spinner

**F-HOME-03 · Feed Card Anatomy**
```
┌─────────────────────────────────────┐
│ [foto barang 40px] Nama Barang       │
│                    CB-XXXX-XXXX  ✓  │
├─────────────────────────────────────┤
│ [MEMORI chip] · 2 jam lalu          │
│                                     │
│ Hari ini bawa si Merah ke Bromo.    │
│ Ternyata RX-King 1995 masih kuat... │
│                                     │
│ ┌────────┬────────┐                 │
│ │ foto 1 │ foto 2 │                 │
│ └────────┴────────┘                 │
│                                     │
│ [Keren! 12]  [Pengen! 4]  [💬 3]   │
└─────────────────────────────────────┘
```

---

### 7.2 BarangPage — Paspor Digital

**F-BP-01 · Hero Gallery**
- Full-width swipeable image carousel, aspect 4:3
- Dot pagination indicator
- Foto terbaru sebagai cover, semua foto historis tersimpan

**F-BP-02 · Sticky Info Bar**
- Muncul setelah scroll melewati hero image
- Konten: Nama barang | BarangID chip (monospace) | Status badge | Tombol Follow/Unfollow
- Verified badge: background Reef `#CCFBA3`, teks gelap `#0E0D1A`

**F-BP-03 · Tab Switcher (sticky di bawah info bar)**
Tiga tab:
1. **CeritaFeed** — timeline kronologis semua entry
2. **Galeri** — grid semua foto yang pernah diupload
3. **Info** — spesifikasi, riwayat pemilik, stats

**F-BP-04 · CeritaFeed (Timeline)**
- Left-side connector line (2px `#D4CCBF`)
- Per entry: dot berwarna sesuai tipe → card entry
- Chronological descending (terbaru atas), option toggle ascending untuk "baca dari awal"
- Entry tipe SERVIS dari mitra mendapat border Persian Blue `#2319DF` + badge "Catatan Resmi"

**F-BP-05 · FAB Tambah Cerita**
- Hanya visible untuk pemilik aktif barang
- Persian Blue circle, Reef "+" icon, bottom-right
- Tap → bottom sheet pilih tipe entry

---

### 7.3 Entry System — Tambah Cerita

**F-EN-01 · Pilih Tipe Entry (Bottom Sheet)**
```
┌──────────────────────────────────┐
│ ▬  Tambah Cerita                 │
│                                  │
│ [MEMORI ☁]   [MODIFIKASI ⚙]     │
│                                  │
│ [SERVIS 🔧*] [TRANSFER →]       │
│  *Khusus Mitra                   │
└──────────────────────────────────┘
```

**F-EN-02 · Form MEMORI**
Field: Judul (opsional) · Tanggal kejadian · Narasi (maks 2000 char) · Upload foto (maks 10) · Tag lokasi (kota/tempat, opsional) · Kondisi barang saat itu (Excellent/Good/Fair/Need Service)

**F-EN-03 · Form MODIFIKASI**
Field: Jenis modifikasi · Workshop/bengkel (tag Mitra jika ada) · Narasi · Foto BEFORE (min 1, required) · Foto AFTER (min 1, required) · Material/part yang digunakan · Estimasi biaya (toggle private/public)

**F-EN-04 · Form SERVIS (Mitra Only)**
- Hanya akun Mitra Bengkel Terverifikasi
- Field: Deskripsi servis · Part yang diganti · Kondisi sebelum/sesudah · Mekanik · Biaya total · Odometer/jam pakai (opsional)
- Setelah 24 jam: terkunci, tidak bisa diedit
- Auto-notifikasi ke semua followers barang

**F-EN-05 · Photo Upload UX**
- Tap area atau drag-and-drop
- Preview grid langsung muncul saat foto dipilih
- Reorder dengan drag
- Hapus dengan tap × pada thumbnail
- Kompresi otomatis ke maks 2MB per foto, original disimpan

**F-EN-06 · Immutable Record**
Semua entry yang sudah dipublikasi: tidak bisa dihapus dari database. Pemilik hanya bisa mengubah visibilitas (public/private) dalam 24 jam pertama. Moderasi admin hanya bisa hide, bukan delete.

---

### 7.4 Onboarding & Registrasi Barang

**F-OB-01 · Daftar Barang Baru**
- Nama barang · Kategori (dropdown + ikon) · Brand/Model · Tahun produksi · Deskripsi · Min 1 foto (required)
- Sistem generate BarangID unik: format `CB-XXXX-XXXX` (monospace)
- Status awal: `Self-Claimed`

**F-OB-02 · Kategori Barang**
Jam Tangan · Kamera Analog · Motor Klasik · Sepeda · Sneakers · Audio/HiFi · Kendaraan Klasik · Aksesori Fashion · Barang Antik · Elektronik Vintage · Lainnya

**F-OB-03 · Upgrade ke Verified**
1. User ajukan dari dalam app: Barang Settings → "Ajukan Verifikasi Plakat"
2. Isi alamat pengiriman plakat
3. Admin approve → produksi & kirim plakat fisik (NFC + QR)
4. User scan plakat dengan in-app NFC/QR scanner
5. Status otomatis berubah: `Verified` (Reef badge muncul dengan animasi spring)
6. BarangID terkunci ke plakat secara permanen

---

### 7.5 Social & Komunitas

**F-SC-01 · Follow Barang**
- User follow barang (bukan hanya orang)
- Semua update barang yang difollow masuk ke CeritaFeed Beranda
- Notifikasi push: entry baru, service record, transfer kepemilikan

**F-SC-02 · Reaksi & Komentar**
- Reaksi per entry: `Keren!` · `Pengen!` · `Langka!` · `Nostalgia`
- Komentar dengan 1 level threading
- Pemilik barang bisa pin komentar

**F-SC-03 · Explore & Discovery**
- Search by nama, brand, model, BarangID
- Filter: Kategori · Brand · Kota · Era (dekade) · Status (Verified/All)
- Sections: Barang Terpilih (editorial) · Trending Minggu Ini · Terbaru Verified · Nearby (kota sama)

**F-SC-04 · Profil User**
- Grid koleksi aktif
- Riwayat kepemilikan (eks-pemilik dengan status badge)
- Badge: Kolektor 5 Tahun · 10 Barang Verified · Storyteller (50+ entries) · dll
- Statistik: total barang dimiliki · total followers barang · total cerita ditulis

---

### 7.6 Transfer Kepemilikan

**F-TR-01 · Mulai Transfer**
- Dari BarangPage → Settings → Transfer Kepemilikan
- Input username atau email penerima
- Konfirmasi 2FA untuk pemilik aktif

**F-TR-02 · Penerimaan**
- Penerima dapat notifikasi dan 7 hari untuk accept/reject
- Setelah diterima: entry `TRANSFER` otomatis ditambah ke timeline
- Riwayat semua pemilik sebelumnya tetap visible publik

**F-TR-03 · Proteksi**
- Plakat fisik tidak berubah — tetap terkunci ke BarangID yang sama
- Hanya kepemilikan digital yang berpindah

---

### 7.7 Resale & Kepercayaan

**F-RS-01 · Provenance Report**
- PDF yang bisa di-generate per barang
- Konten: ringkasan timeline, daftar pemilik, semua service record, foto kondisi per periode
- Watermark QR ke BarangPage online
- Berguna untuk transaksi jual beli — bagikan ke calon pembeli

**F-RS-02 · Kondisi Resmi**
Pemilik set kondisi terkini: Mint · Excellent · Good · Fair · Poor
Riwayat perubahan kondisi tercatat di timeline.

---

### 7.8 Admin & Mitra

**F-AD-01 · Dashboard Admin**
- Queue pengajuan plakat: approve → produksi → kirim → konfirmasi scan
- Verifikasi akun Mitra Bengkel (upload dokumen usaha)
- Moderasi entry yang dilaporkan
- Analytics: barang terdaftar, verified count, DAU/MAU, entry per kategori

**F-AD-02 · Mitra Bengkel**
- Badge `Mitra Resmi` setelah verifikasi
- Akses form SERVIS
- Dashboard: list barang yang pernah dilayani, statistik servis bulanan

---

## 8. UX Flows — Mobile

### 8.1 First-Time User Flow
```
Splash → Onboarding 3 slides → Register/Login
→ "Daftarkan Barang Pertamamu" empty state
→ Form pendaftaran barang
→ BarangPage pertama → Tutorial overlay
→ Beranda Feed
```

### 8.2 Add Entry Flow (Owner)
```
BarangPage → FAB (+) 
→ Bottom sheet: pilih tipe entry
→ Form entry (full screen)
→ Photo upload (jika ada)
→ Preview → Publikasikan
→ Animasi: entry muncul di top of timeline
→ Notifikasi dikirim ke followers
```

### 8.3 Verify Barang Flow
```
BarangPage → Settings → "Ajukan Plakat Verified"
→ Form alamat kirim
→ Status: "Dalam Proses" (gray badge)
→ [beberapa hari] Push notif: "Plakat dikirim"
→ [tiba] Push notif: "Scan plakat untuk Verified"
→ In-app NFC/QR scan
→ Animasi badge Verified muncul (spring scale)
→ Notifikasi ke semua followers: "[Barang] kini Verified!"
```

---

## 9. Technical Requirements

### 9.1 Platform & Stack
- **Web App**: PWA mobile-first, installable
- **iOS & Android**: Native (Fase 2)
- **NFC/QR**: In-app scanner untuk plakat fisik

### 9.2 Backend
- REST API + GraphQL untuk CeritaFeed queries
- Image CDN dengan original + compressed variants
- Immutable records: entry tidak bisa dihapus dari DB (soft-hide only)
- NFC UUID binding: chip fisik → BarangID digital (write-once)

### 9.3 Performance
- FCP < 1.5 detik pada 4G
- Image lazy loading dengan blur placeholder
- Infinite scroll pada semua feed
- Offline read: BarangPage yang pernah dibuka

### 9.4 Security
- Transfer kepemilikan: 2FA dari kedua pihak
- NFC chip: kriptografi satu arah, write-once
- Rate limiting: upload foto, pembuatan entry

---

## 10. Success Metrics

### Acquisition (6 bulan pertama)
- 10.000 barang terdaftar
- 500 barang Verified
- 50 mitra bengkel terverifikasi

### Engagement
- Rata-rata 3 entry per barang per bulan
- 30% barang aktif memiliki ≥1 follower di luar pemilik
- Provenance Report di-generate untuk 20% barang Verified

### Retention
- DAU/MAU ≥ 25%
- 60% user kembali dalam 30 hari setelah daftar barang pertama

### Trust & Quality
- NPS ≥ 45
- < 2% dispute pada proses transfer
- 95% service record dari mitra tanpa komplain dalam 30 hari

---

## 11. Phased Roadmap

### Fase 1 — MVP (Bulan 1–4)
- Daftar & profil barang, BarangID
- CeritaFeed: MEMORI & MODIFIKASI
- Follow barang & notifikasi dasar
- Plakat fisik (manual Admin)
- Admin dashboard dasar
- PWA mobile-first

### Fase 2 — Community (Bulan 5–8)
- SERVIS entry untuk Mitra Bengkel
- Transfer kepemilikan 2FA
- Provenance Report PDF
- Explore & Discovery lengkap
- Reaksi & komentar
- Stories Bar

### Fase 3 — Marketplace (Bulan 9–12)
- Listing jual terintegrasi
- Integrasi resale platform (Tokopedia, Carousell)
- Native iOS & Android
- API publik untuk mitra
- Program badge & gamifikasi

---

## 12. Open Questions

1. Model monetisasi: per plakat fisik (one-time) atau langganan bulanan?
2. Service Record: gratis untuk mitra sebagai insentif bergabung, atau berbayar?
3. Apakah barang bisa di-set private (tidak terlihat publik)?
4. Kebijakan barang ilegal/sensitif — workflow pelaporan komunitas?
5. Integrasi tracking pengiriman saat proses transfer kepemilikan?

---

*Dokumen ini adalah versi hidup. Semua keputusan fitur harus divalidasi dengan user research sebelum memasuki sprint development.*

**Prepared for:** Tim Produk CeritaBarangku.com
**Design Reference:** `design_guidelines.json` v2.0
**Last updated:** April 2026
