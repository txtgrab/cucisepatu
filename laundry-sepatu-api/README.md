# API Layanan Cuci Sepatu (Laundry)

REST API sederhana untuk mengelola daftar barang (sepatu) yang sedang dalam proses pencucian. Dibangun menggunakan Node.js, Express, dan Supabase.

## Tujuan & Fitur Utama

Tujuan proyek ini adalah menyediakan backend untuk aplikasi (web atau mobile) layanan cuci sepatu.

Fitur Utama:
* **CRUD:** Create, Read, Update, Delete data cucian.
* **Manajemen Status:** Melacak status sepatu (Diterima, Dicuci, Selesai, Diambil).
* **Filtering:** Memfilter daftar cucian berdasarkan status.

## Struktur Data

Data disimpan dalam tabel `items` di Supabase dengan skema berikut:

| Kolom         | Tipe        | Deskripsi                                        |
|---------------|-------------|--------------------------------------------------|
| `id`          | `bigint`    | Primary Key (Auto-increment)                     |
| `created_at`  | `timestamptz` | Waktu data dibuat                                |
| `customer_name` | `text`    | Nama pelanggan                                   |
| `shoe_type`   | `text`    | Tipe/merek sepatu (misal: "Sneakers Putih")      |
| `status`      | `text`    | Status cucian ('Diterima', 'Dicuci', 'Selesai') |

## Instalasi & Menjalankan Lokal

1.  Clone repository ini:
    ```bash
    git clone [https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git](https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git)
    cd NAMA_REPO_ANDA
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Buat file `.env` di root proyek dan isi dengan kredensial Supabase Anda:
    ```ini
    SUPABASE_URL=https://PROYEK_ANDA.supabase.co
    SUPABASE_KEY=KUNCI_ANON_ANDA
    ```
4.  Jalankan server:
    ```bash
    npm start
    ```
    API akan berjalan di `http://localhost:3000`.

## Dokumentasi API Endpoints

**URL Deploy Vercel:** `[LINK_VERCEL_ANDA]` (Contoh: `https://laundry-sepatu-api.vercel.app`)

---

### 1. [POST] /items
Menambahkan data cucian baru.

**Body (JSON):**
```json
{
  "customer_name": "Fajar Herdiansyah",
  "shoe_type": "Nike Air Force 1"
}