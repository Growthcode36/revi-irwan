# Revi & Irwan — Undangan Pernikahan Digital

Undangan pernikahan digital untuk **Revi & Irwan**, dibangun murni dengan HTML, CSS, dan JavaScript (tanpa framework), siap dipublikasikan lewat **GitHub Pages**.

**Tema:** *Aurora Minang* — nuansa futuristik glassmorphism (cyan, violet, gold di atas latar deep-space) dengan sentuhan ornamen Minangkabau yang halus, menggantikan tema navy/dongker klasik.

---

## 1. Struktur Folder

```
wedding-invitation/
├── index.html          # struktur halaman & konten undangan
├── style.css            # semua styling & tema
├── script.js             # semua logika interaktif
├── README.md
└── assets/
    ├── images/
    │   └── ornament.svg  # motif ornamen (sudah termasuk)
    └── audio/             # taruh music.mp3 di sini (opsional)
```

> File `manifest.json` dan `sw.js` (PWA/offline) sengaja tidak disertakan karena undangan ini dipakai online melalui link, sesuai permintaan.

## 2. Yang Perlu Anda Ganti

| Item | Lokasi | Keterangan |
|---|---|---|
| Foto mempelai | `index.html` → `.couple-photo` | Ganti `<div class="couple-photo"><span>Foto</span></div>` dengan `<img src="assets/images/nama-file.jpg" alt="...">` |
| Musik latar | `assets/audio/music.mp3` | Tambahkan file MP3 Anda dengan nama persis `music.mp3` |
| Nomor rekening & nama pemilik | `index.html` → bagian *Wedding Gift* | Cari `1234 5678 9012` dan `NAMA PEMILIK REKENING` |
| Nomor WhatsApp | `script.js` → `initWhatsapp()` | Ganti variabel `phone` dengan nomor asli (format `62...`, tanpa `+` atau `0` di depan) |
| Tanggal/waktu countdown | `index.html` → `#countdown` | Atribut `data-target="2026-07-17T10:00:00+07:00"` |

## 3. Cara Membagikan dengan Nama Tamu

Tambahkan parameter `?to=` pada URL, contoh:

```
https://namaanda.github.io/wedding-invitation/?to=Bapak%20Ahmad
```

Spasi bisa ditulis sebagai `%20` atau `+`.

## 4. Fitur Auto-Scroll

Setelah tombol **"Buka Undangan"** ditekan, halaman otomatis bergulir perlahan menyusuri tiap bagian undangan. Auto-scroll **langsung berhenti secara permanen** begitu pengguna melakukan interaksi manual: scroll dengan mouse/trackpad, menyentuh/menggeser layar, menekan tombol keyboard, atau mengklik menu navigasi. Kecepatannya bisa disesuaikan lewat variabel `SPEED` di dalam fungsi `AutoScroll` pada `script.js`.

## 5. Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `wedding-invitation`.
2. Upload seluruh isi folder ini (bukan foldernya, tapi isinya) ke repository tersebut.
3. Masuk ke **Settings → Pages**.
4. Pada **Source**, pilih branch `main` dan folder `/root`, lalu **Save**.
5. Tunggu 1–2 menit, undangan akan aktif di:
   `https://username-anda.github.io/wedding-invitation/`

## 6. Catatan Teknis

- 100% vanilla HTML/CSS/JS — tidak ada dependensi build/framework.
- Responsive penuh: mobile (320px+), tablet, desktop, hingga large desktop.
- Menghormati `prefers-reduced-motion` untuk pengguna yang sensitif terhadap animasi.
- Ucapan tamu disimpan di `localStorage` browser masing-masing pengunjung (bukan database bersama) — cocok untuk demo/skala kecil. Untuk menampung ucapan dari semua tamu di satu tempat, perlu backend/database terpisah (di luar cakupan project statis ini).
- Nomor rekening dan nomor WhatsApp pada kode ini adalah **placeholder/dummy** — wajib diganti sebelum dibagikan ke tamu.

---

Dibuat dengan ❤️ untuk hari bahagia Revi & Irwan.
