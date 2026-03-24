# Panduan Hosting ke Rumahweb (Shared Hosting)

Aplikasi ini sudah dirancang agar bisa berjalan di hosting PHP biasa seperti Rumahweb.

## Langkah-langkah Deployment:

1. **Build Project**
   Jalankan perintah berikut di terminal:
   ```bash
   npm run build
   ```
   Ini akan menghasilkan folder bernama `dist`.

2. **Upload ke cPanel**
   - Masuk ke File Manager di cPanel Rumahweb.
   - Buka folder `public_html`.
   - Upload **semua isi** dari folder `dist` ke dalam `public_html`.

3. **Konfigurasi API Key (PENTING)**
   - Di dalam `public_html`, cari file `api.php`.
   - Edit file tersebut.
   - Cari baris: `$API_KEY = getenv('GEMINI_API_KEY') ?: 'YOUR_GEMINI_API_KEY_HERE';`
   - Ganti `'YOUR_GEMINI_API_KEY_HERE'` dengan kunci API Gemini Anda yang asli.
   - Simpan file.

4. **Selesai!**
   Buka domain Anda, aplikasi akan otomatis mendeteksi bahwa ia sedang berjalan di hosting dan menggunakan file PHP untuk keamanan.

## Keamanan:
- File `users.json` digunakan oleh `login.php` di sisi server.
- API Key Anda tidak akan pernah terlihat oleh pengguna di browser karena diproses di dalam `api.php`.
