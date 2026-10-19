# ULIDO Undangan Scroll V1 — GitHub Pages

## Apa yang berubah?
- Tampilan pembuka maroon emas dengan nama tamu dan tombol **Buka Undangan**.
- Setelah tombol diklik, seluruh halaman undangan berupa gambar disusun **vertikal**, tidak di-flip.
- HP: gulir ke bawah seperti website undangan biasa. Desktop: gambar dibatasi lebar maksimal 720px agar proporsional.
- Musik MP3 dicoba diputar setelah tombol dibuka (jika file tersedia), dengan tombol jeda/putar.
- Gambar mendukung SVG, WebP, JPG dan PNG; jumlah tidak dibatasi khusus.

## Ganti isi pesanan
Edit **config.js** saja:
- `couple`: nama pasangan.
- `coverIcon`: path logo WebP, misalnya `assets/ornaments/logo.webp`. Kosong = hati emas bawaan.
- `pages`: daftar gambar berurutan. Untuk WebP, misalnya `'assets/pages/01.webp'`.
- `backgroundMusic`: path file MP3, misalnya `'assets/music/background.mp3'`.
- `whatsappNumber` dan `mapsUrl`: opsional, bila diisi akan muncul di bagian akhir.
- `defaultGuest`: sapaan default.

**Nama tamu khusus:** gunakan `?to=Nama%20Tamu`, contoh `https://username.github.io/repo/?to=Bapak%20Andi`.

## Deploy ke GitHub Pages
1. Ekstrak ZIP, lalu upload **isi folder** ke root repository (file `index.html` harus ada di root).
2. GitHub → Settings → Pages → Build and deployment: Deploy from a branch.
3. Branch `main`, folder `/(root)`, Save.
4. Buka URL GitHub Pages setelah deployment selesai.

## Penting
- Empat SVG di `assets/pages` hanyalah contoh. Anda boleh menghapus dan mengganti semuanya dengan WebP lalu memperbarui `pages` di config.
- Belum ada MP3 dalam ZIP; taruh file `background.mp3` sendiri di `assets/music` agar audio bekerja.
- Untuk gambar WebP ukuran 1080x1920, usahakan kompresi bagus agar scroll cepat di ponsel.
- Isi berupa gambar, jadi teks pada gambar **tidak menjadi tombol/link yang bisa diklik**. Gunakan tautan WhatsApp/Maps di konfigurasi untuk tautan interaktif.
- Beberapa browser memblokir audio otomatis; pemutaran dimulai dari interaksi klik pengguna namun tetap bergantung kebijakan browser.
