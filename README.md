# Messaging App

Aplikasi pesan real-time berbasis monorepo — tersedia dalam dua platform:

- **Web** → Next.js 14 (App Router) + PWA
- **Mobile** → React Native (Expo)

---

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Struktur Proyek](#struktur-proyek)
- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
  - [Web](#web)
  - [Mobile](#mobile)
- [Struktur Folder Detail](#struktur-folder-detail)
- [Mock Data](#mock-data)
- [Menghubungkan ke Backend](#menghubungkan-ke-backend)
- [Build untuk Produksi](#build-untuk-produksi)
- [Troubleshooting](#troubleshooting)

---

## Prasyarat

Pastikan sudah terinstal di komputer kamu:

| Tools | Versi Minimal | Cek Instalasi |
|---|---|---|
| Node.js | 18.x | `node -v` |
| npm | 10.x | `npm -v` |
| Git | — | `git --version` |
| Expo Go (HP) | Latest | Install dari App Store / Play Store |

> **macOS / iOS simulator**: Butuh Xcode 15+
> **Android emulator**: Butuh Android Studio + emulator aktif

---

## Struktur Proyek

```
messaging-app/
├── apps/
│   ├── web/          → Next.js PWA
│   └── mobile/       → React Native (Expo)
├── shared/
│   └── types/        → TypeScript interfaces bersama
├── package.json      → Monorepo root (Turborepo)
└── turbo.json
```

---

## Instalasi

### 1. Clone repository

```bash
git clone <repo-url> messaging-app
cd messaging-app
```

### 2. Install semua dependency sekaligus (dari root)

```bash
npm install
```

> Perintah ini otomatis menginstal dependency untuk `apps/web`, `apps/mobile`, dan `shared/types` sekaligus karena menggunakan npm workspaces.

---

## Menjalankan Aplikasi

### Web

```bash
# Dari root proyek
npm run dev:web

# ATAU masuk ke folder web langsung
cd apps/web
npm run dev
```

Buka browser di: **http://localhost:3000**

Fitur yang bisa dicoba:
- Klik salah satu percakapan di sidebar kiri
- Ketik pesan dan tekan **Enter** atau klik tombol kirim
- Klik **+** di sidebar untuk simulasi chat baru
- Cari percakapan via kolom search

---

### Mobile

#### Langkah 1 — Masuk ke folder mobile

```bash
cd apps/mobile
```

#### Langkah 2 — Install dependency mobile

```bash
npm install
```

#### Langkah 3 — Jalankan Expo

```bash
npx expo start
```

Terminal akan menampilkan QR code. Pilih salah satu cara:

| Cara | Perintah / Langkah |
|---|---|
| **HP fisik** (direkomendasikan) | Scan QR code pakai app **Expo Go** |
| **iOS Simulator** (macOS) | Tekan `i` di terminal |
| **Android Emulator** | Tekan `a` di terminal (emulator harus sudah berjalan) |
| **Web browser** | Tekan `w` di terminal |

> **Catatan**: Expo Go harus terhubung ke WiFi yang **sama** dengan komputer kamu.

#### Perintah tambahan Expo

```bash
npx expo start --clear      # Bersihkan cache sebelum start
npx expo start --tunnel     # Pakai tunnel (beda network / VPN)
npx expo run:ios            # Build native iOS (butuh Xcode)
npx expo run:android        # Build native Android (butuh Android Studio)
```

---

## Struktur Folder Detail

### Web (`apps/web/`)

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx       → Halaman login
│   │   └── register/page.tsx    → Halaman register
│   └── (app)/
│       ├── layout.tsx           → Layout dengan sidebar
│       ├── chat/page.tsx        → Halaman kosong (pilih chat)
│       └── chat/[id]/page.tsx   → Halaman chat room
├── components/
│   ├── auth/                    → AuthGuard, AuthProvider
│   ├── common/                  → Avatar
│   ├── messages/                → MessageBubble, MessageList, MessageInput, ChatHeader
│   └── sidebar/                 → ChatSidebar, ChatListItem, NewChatModal
├── hooks/                       → useChats, useMessages, usePresence
├── lib/firebase/                → config, auth, firestore, storage, presence, messaging
├── mock/data.ts                 → Data dummy untuk preview UI
└── store/                       → authStore, chatStore (Zustand)
```

### Mobile (`apps/mobile/`)

```
src/
├── App.tsx                      → Entry point
├── navigation/
│   ├── RootNavigator.tsx        → Navigator utama
│   ├── AppNavigator.tsx         → Tab + Stack navigator (sudah login)
│   └── AuthNavigator.tsx        → Stack login & register
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── chats/
│   │   ├── ChatListScreen.tsx   → Daftar percakapan
│   │   ├── ChatRoomScreen.tsx   → Ruang chat
│   │   └── NewChatScreen.tsx    → Mulai chat baru
│   └── profile/
│       └── ProfileScreen.tsx
├── components/
│   ├── common/Avatar.tsx
│   ├── chat/ChatListItem.tsx
│   └── messages/
│       ├── MessageBubble.tsx
│       ├── MessageList.tsx
│       └── MessageInput.tsx
├── mock/data.ts                 → Data dummy untuk preview UI
├── services/firebase/           → auth, firestore, storage, presence
├── store/                       → authStore, chatStore (Zustand)
└── services/notifications.ts   → FCM push notification
```

---

## Mock Data

Saat ini aplikasi berjalan menggunakan **data dummy** (`src/mock/data.ts`) agar bisa dipreview tanpa backend.

Data yang tersedia:

| ID | Tipe | Peserta |
|---|---|---|
| `1` | Direct | You ↔ Budi Santoso |
| `2` | Group  | You, Budi Santoso, Sari Dewi |
| `3` | Direct | You ↔ Sari Dewi |

Untuk mengubah data dummy, edit file berikut:

```
apps/web/src/mock/data.ts
apps/mobile/src/mock/data.ts
```

---

## Menghubungkan ke Backend

Semua logika data ada di layer **services** yang terpisah dari UI. Ketika backend sudah siap:

### Web

1. Edit `apps/web/src/hooks/useChats.ts` → ganti `MOCK_CHATS` dengan `GET /chats`
2. Edit `apps/web/src/hooks/useMessages.ts` → ganti `MOCK_MESSAGES` dengan `GET /chats/:id/messages`
3. Edit `apps/web/src/app/(app)/chat/[id]/page.tsx` → ganti `handleSend` dengan `POST /chats/:id/messages`
4. Aktifkan kembali `AuthProvider` dan `AuthGuard`

### Mobile

1. Edit `apps/mobile/src/services/firebase/firestore.ts` → ganti dengan API call
2. Edit `apps/mobile/src/navigation/RootNavigator.tsx` → aktifkan auth state check
3. Pastikan header `Authorization: Bearer <token>` dikirim di setiap request

### Contoh service abstraction

```ts
// Contoh: services/api/messages.ts
const BASE_URL = 'https://api.yourbackend.com';

export async function getMessages(chatId: string, token: string) {
  const res = await fetch(`${BASE_URL}/chats/${chatId}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function postMessage(chatId: string, text: string, token: string) {
  const res = await fetch(`${BASE_URL}/chats/${chatId}/messages`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  return res.json();
}
```

---

## Build untuk Produksi

### Web

```bash
cd apps/web

# Build
npm run build

# Preview build hasil
npm run start
```

Output ada di folder `apps/web/.next/`

### Mobile

```bash
cd apps/mobile

# Build APK Android (tanpa EAS)
npx expo run:android --variant release

# Build IPA iOS
npx expo run:ios --configuration Release

# Build via EAS (direkomendasikan untuk distribusi)
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

---

## Troubleshooting

### Error: `Cannot find module '@/...'` (mobile)

```bash
cd apps/mobile
npm install
npx expo start --clear
```

Pastikan `babel-plugin-module-resolver` sudah terinstall (sudah ada di devDependencies).

---

### `Module not found: @messaging/types`

```bash
# Dari root proyek
npm install
```

Pastikan `shared/types` sudah terdaftar di `package.json` root sebagai workspace.

---

### Port 3000 sudah dipakai

```bash
cd apps/web
npm run dev -- -p 3001
```

---

### Expo: QR code tidak bisa discan

```bash
# Coba mode tunnel (tidak perlu satu WiFi)
npx expo start --tunnel
```

---

### Expo: Cache bermasalah

```bash
npx expo start --clear

# Atau bersihkan cache npm
npm start -- --reset-cache
```

---

### `error: cannot find module 'next-pwa'`

```bash
cd apps/web
npm install next-pwa
```

---

### iOS Simulator tidak muncul

Pastikan Xcode sudah terinstal dan sudah pernah dibuka minimal sekali:

```bash
xcode-select --install
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

---

### Android Emulator tidak terdeteksi

```bash
# Cek apakah emulator sudah jalan
adb devices

# Kalau belum, buka Android Studio → Device Manager → Start emulator
```
