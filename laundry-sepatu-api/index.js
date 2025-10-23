// Import library
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const cors = require('cors');

// Muat environment variables dari .env
dotenv.config();

// Inisialisasi Express
const app = express();
app.use(cors());
app.use(express.json());

// Inisialisasi Klien Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const PORT = process.env.PORT || 3000;

// === DEFINISI ENDPOINTS ===

// 1. CREATE (Tambah item cucian baru)
app.post('/items', async (req, res) => {
    const { customer_name, shoe_type } = req.body;

    if (!customer_name || !shoe_type) {
        return res.status(400).json({ error: 'Nama pelanggan dan tipe sepatu wajib diisi' });
    }

    const { data, error } = await supabase
        .from('items')
        .insert([
            { customer_name: customer_name, shoe_type: shoe_type, status: 'Diterima' }
        ])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// 2. READ (Ambil semua item + Filter status)
app.get('/items', async (req, res) => {
    const { status } = req.query;

    let query = supabase.from('items').select('*').order('created_at', { ascending: false });

    // Terapkan filter jika ada
    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

// 3. READ (Ambil satu item berdasarkan ID)
app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    
    const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Item tidak ditemukan' });

    res.status(200).json(data);
});

// 4. UPDATE (Ubah status atau data item)
app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { customer_name, shoe_type, status } = req.body;

    const { data, error } = await supabase
        .from('items')
        .update({ customer_name, shoe_type, status })
        .eq('id', id)
        .select();
        
    if (error) return res.status(500).json({ error: error.message });
    if (data.length === 0) return res.status(404).json({ error: 'Item tidak ditemukan' });
    
    res.status(200).json(data[0]);
});

// 5. DELETE (Hapus item)
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;

    const { error, data } = await supabase
        .from('items')
        .delete()
        .eq('id', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });
    if (data.length === 0) return res.status(404).json({ error: 'Item tidak ditemukan' });

    res.status(200).json({ message: 'Item berhasil dihapus', deletedItem: data[0] });
});


// Jalankan server
app.listen(PORT, () => {
    console.log(`API berjalan di http://localhost:${PORT}`);
});

// Export app untuk Vercel
module.exports = app;