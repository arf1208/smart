
import React, { useState, useMemo } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  level: 'SD' | 'SMP' | 'SMA';
  fase: string;
  category: string;
  cover: string;
  synopsis: string;
  chapters: string[];
  chapterContents?: Record<string, string>;
}

const books: Book[] = [
  // SMA - Sains & Matematika
  { 
    id: 1, title: 'Matematika Tingkat Lanjut Kelas XI', author: 'Kemendikbudristek', level: 'SMA', fase: 'F', category: 'Matematika',
    cover: 'https://picsum.photos/400/600?seed=math11',
    synopsis: 'Buku ini membahas konsep matematika tingkat lanjut termasuk Polinomial, Matriks, dan Transformasi Geometri untuk mempersiapkan siswa ke jenjang pendidikan tinggi.',
    chapters: ['Bab 1: Polinomial', 'Bab 2: Matriks', 'Bab 3: Geometri Analitik', 'Bab 4: Lingkaran'],
    chapterContents: {
      'Bab 1: Polinomial': `
        <h2>Pengertian Polinomial</h2>
        <p>Polinomial atau suku banyak adalah ekspresi matematika yang terdiri dari variabel dan koefisien. Bentuk umum polinomial derajat n adalah:</p>
        <p className="bg-slate-100 p-4 rounded-xl font-mono my-4">P(x) = a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0</p>
        <h3>Operasi Polinomial</h3>
        <p>Penjumlahan, pengurangan, dan perkalian polinomial dilakukan dengan menggabungkan suku-suku yang sejenis. Pembagian polinomial dapat dilakukan dengan metode bersusun atau metode Horner.</p>
        <h3>Teorema Sisa</h3>
        <p>Jika polinomial P(x) dibagi oleh (x - k), maka sisanya adalah P(k).</p>
      `,
      'Bab 2: Matriks': `
        <h2>Konsep Dasar Matriks</h2>
        <p>Matriks adalah susunan bilangan, simbol, atau ekspresi yang disusun dalam baris dan kolom sehingga membentuk suatu bangun persegi.</p>
        <h3>Jenis-jenis Matriks</h3>
        <ul>
          <li>Matriks Baris: Matriks yang hanya terdiri dari satu baris.</li>
          <li>Matriks Kolom: Matriks yang hanya terdiri dari satu kolom.</li>
          <li>Matriks Persegi: Matriks yang jumlah baris dan kolomnya sama.</li>
        </ul>
        <h3>Determinan dan Invers</h3>
        <p>Determinan matriks 2x2 [a b; c d] adalah ad - bc. Invers matriks digunakan untuk menyelesaikan sistem persamaan linear.</p>
      `
    }
  },
  { 
    id: 2, title: 'Fisika Terpadu Kelas X', author: 'Pusat Perbukuan RI', level: 'SMA', fase: 'E', category: 'Sains',
    cover: 'https://picsum.photos/400/600?seed=phys10',
    synopsis: 'Eksplorasi mendalam tentang hakikat fisika, pengukuran, energi terbarukan, dan pemanasan global dalam konteks kehidupan sehari-hari.',
    chapters: ['Bab 1: Pengukuran', 'Bab 2: Energi Terbarukan', 'Bab 3: Pemanasan Global', 'Bab 4: Arus Searah'],
    chapterContents: {
      'Bab 1: Pengukuran': `
        <h2>Hakikat Fisika dan Pengukuran</h2>
        <p>Fisika adalah cabang sains yang mempelajari gejala alam secara eksperimental dan matematis. Pengukuran adalah membandingkan suatu besaran dengan satuan standar.</p>
        <h3>Besaran Pokok dan Turunan</h3>
        <p>Besaran pokok meliputi Panjang (m), Massa (kg), Waktu (s), Suhu (K), Kuat Arus (A), Intensitas Cahaya (cd), dan Jumlah Zat (mol).</p>
        <h3>Angka Penting</h3>
        <p>Angka penting adalah semua angka yang diperoleh dari hasil pengukuran, termasuk angka terakhir yang ditaksir.</p>
      `
    }
  },
  { 
    id: 3, title: 'Kimia: Struktur Atom & Tabel Periodik Kelas X', author: 'Kemendikbudristek', level: 'SMA', fase: 'E', category: 'Sains',
    cover: 'https://picsum.photos/400/600?seed=chem10',
    synopsis: 'Mempelajari dasar-dasar kimia mulai dari struktur atom, konfigurasi elektron, hingga hukum-hukum dasar kimia.',
    chapters: ['Bab 1: Struktur Atom', 'Bab 2: Sistem Periodik', 'Bab 3: Ikatan Kimia', 'Bab 4: Stoikiometri'],
    chapterContents: {
      'Bab 1: Struktur Atom': `
        <h2>Struktur Atom dan Perkembangannya</h2>
        <p>Atom adalah unit terkecil dari materi yang mempertahankan sifat-sifat kimia suatu unsur. Teori atom telah berkembang dari model Dalton hingga mekanika kuantum.</p>
        <h3>Partikel Penyusun Atom</h3>
        <ul>
          <li>Proton: Partikel bermuatan positif di inti atom.</li>
          <li>Neutron: Partikel tidak bermuatan di inti atom.</li>
          <li>Elektron: Partikel bermuatan negatif yang mengelilingi inti.</li>
        </ul>
        <h3>Nomor Atom dan Nomor Massa</h3>
        <p>Nomor atom (Z) menunjukkan jumlah proton, sedangkan nomor massa (A) menunjukkan jumlah proton ditambah neutron.</p>
      `
    }
  },
  { 
    id: 12, title: 'Biologi: Evolusi & Hereditas Kelas XII', author: 'Kemendikbudristek', level: 'SMA', fase: 'F', category: 'Sains',
    cover: 'https://picsum.photos/400/600?seed=bio12_new',
    synopsis: 'Buku ini mengajak siswa mendalami mekanisme pewarisan sifat dan teori evolusi dalam pandangan biologi modern.',
    chapters: ['Bab 1: Pertumbuhan & Perkembangan', 'Bab 2: Metabolisme Sel', 'Bab 3: Substansi Genetik', 'Bab 4: Pembelahan Sel']
  },
  
  // SMA - Sosial & Humaniora
  { 
    id: 4, title: 'Ekonomi Makro & Mikro Kelas XI', author: 'Kemendikbudristek', level: 'SMA', fase: 'F', category: 'Sosial',
    cover: 'https://picsum.photos/400/600?seed=econ11',
    synopsis: 'Memahami mekanisme pasar, kebijakan fiskal, moneter, serta manajemen keuangan pribadi dan negara.',
    chapters: ['Bab 1: Pendapatan Nasional', 'Bab 2: Pertumbuhan Ekonomi', 'Bab 3: Ketenagakerjaan', 'Bab 4: Kebijakan Moneter'],
    chapterContents: {
      'Bab 1: Pendapatan Nasional': `
        <h2>Konsep Pendapatan Nasional</h2>
        <p>Pendapatan nasional adalah jumlah total pendapatan yang diterima oleh seluruh rumah tangga keluarga (RTK) di suatu negara dari penyerahan faktor-faktor produksi dalam satu periode tertentu.</p>
        <h3>Metode Penghitungan</h3>
        <ul>
          <li><strong>Pendekatan Produksi:</strong> Menjumlahkan nilai tambah seluruh sektor.</li>
          <li><strong>Pendekatan Pendapatan:</strong> Menjumlahkan upah, sewa, bunga, dan laba.</li>
          <li><strong>Pendekatan Pengeluaran:</strong> Y = C + I + G + (X - M).</li>
        </ul>
      `
    }
  },
  { 
    id: 5, title: 'Sosiologi: Masyarakat Digital Kelas X', author: 'Pusat Perbukuan RI', level: 'SMA', fase: 'E', category: 'Sosial',
    cover: 'https://picsum.photos/400/600?seed=soc10',
    synopsis: 'Mengkaji perubahan sosial di era digital dan interaksi sosial dalam masyarakat yang terus berkembang.',
    chapters: ['Bab 1: Pengantar Sosiologi', 'Bab 2: Identitas Diri', 'Bab 3: Tindakan Sosial', 'Bab 4: Penelitian Sosial']
  },
  { 
    id: 13, title: 'Geografi: Fenomena Geosfer Kelas XI', author: 'Pusat Perbukuan', level: 'SMA', fase: 'F', category: 'Sosial',
    cover: 'https://picsum.photos/400/600?seed=geo11',
    synopsis: 'Analisis tentang litosfer, hidrosfer, dan atmosfer serta pengaruhnya terhadap kehidupan manusia di bumi.',
    chapters: ['Bab 1: Keragaman Flora & Fauna', 'Bab 2: Sebaran Sumber Daya Alam', 'Bab 3: Lingkungan Hidup', 'Bab 4: Mitigasi Bencana']
  },
  { 
    id: 14, title: 'Sejarah Indonesia Modern Kelas XII', author: 'Kemendikbudristek', level: 'SMA', fase: 'F', category: 'Sejarah',
    cover: 'https://picsum.photos/400/600?seed=hist12',
    synopsis: 'Menelusuri jejak sejarah Indonesia mulai dari proklamasi hingga era reformasi dan tantangan masa depan.',
    chapters: ['Bab 1: Perjuangan Diplomasi', 'Bab 2: Demokrasi Liberal', 'Bab 3: Orde Baru', 'Bab 4: Era Reformasi']
  },

  // SMP - All Subjects
  { 
    id: 6, title: 'Informatika Berbasis Proyek Kelas VII', author: 'Kemendikbudristek', level: 'SMP', fase: 'D', category: 'Teknologi',
    cover: 'https://picsum.photos/400/600?seed=cs7',
    synopsis: 'Panduan belajar berpikir komputasional, teknologi informasi, sistem komputer, dan dampaknya bagi masyarakat.',
    chapters: ['Bab 1: Berpikir Komputasional', 'Bab 2: Teknologi Informasi', 'Bab 3: Sistem Komputer', 'Bab 4: Analisis Data'],
    chapterContents: {
      'Bab 1: Berpikir Komputasional': `
        <h2>Apa itu Berpikir Komputasional?</h2>
        <p>Berpikir komputasional (Computational Thinking) adalah metode penyelesaian masalah yang melibatkan teknik yang digunakan oleh ilmuwan komputer.</p>
        <h3>4 Pilar Berpikir Komputasional</h3>
        <ol>
          <li><strong>Dekomposisi:</strong> Memecah masalah besar menjadi bagian-bagian kecil.</li>
          <li><strong>Pengenalan Pola:</strong> Mencari kesamaan di antara masalah.</li>
          <li><strong>Abstraksi:</strong> Fokus pada informasi penting saja.</li>
          <li><strong>Algoritma:</strong> Menyusun langkah-langkah penyelesaian.</li>
        </ol>
      `
    }
  },
  { 
    id: 7, title: 'Bahasa Inggris: English for Bright Class VIII', author: 'Kemendikbudristek', level: 'SMP', fase: 'D', category: 'Bahasa',
    cover: 'https://picsum.photos/400/600?seed=eng8',
    synopsis: 'Focusing on daily conversations, storytelling, and procedural texts to enhance students confidence in speaking English.',
    chapters: ['Unit 1: Celebrating Independence', 'Unit 2: Kindness and Friendship', 'Unit 3: Save the Environment', 'Unit 4: No Littering'],
    chapterContents: {
      'Unit 1: Celebrating Independence': `
        <h2>Independence Day Celebration</h2>
        <p>In this unit, we will learn how to describe past events related to Independence Day celebrations in Indonesia.</p>
        <h3>Vocabulary</h3>
        <ul>
          <li>Flag hoisting ceremony (Upacara bendera)</li>
          <li>Panjat pinang (Greasy pole climbing)</li>
          <li>Sack race (Balap karung)</li>
        </ul>
        <h3>Grammar: Simple Past Tense</h3>
        <p>We use the simple past tense to talk about things that happened in the past. Example: "We <em>joined</em> the parade yesterday."</p>
      `
    }
  },
  { 
    id: 8, title: 'IPA Terpadu: Eksplorasi Alam Kelas IX', author: 'Pusat Perbukuan RI', level: 'SMP', fase: 'D', category: 'Sains',
    cover: 'https://picsum.photos/400/600?seed=ipa9',
    synopsis: 'Membahas sistem reproduksi manusia, pewarisan sifat, listrik statis, dan teknologi ramah lingkungan.',
    chapters: ['Bab 1: Sistem Reproduksi', 'Bab 2: Pewarisan Sifat', 'Bab 3: Listrik Statis', 'Bab 4: Listrik Dinamis']
  },
  { 
    id: 15, title: 'Matematika: Bangun Ruang Kelas VIII', author: 'Kemendikbudristek', level: 'SMP', fase: 'D', category: 'Matematika',
    cover: 'https://picsum.photos/400/600?seed=math8_smp',
    synopsis: 'Mempelajari luas permukaan and volume bangun ruang sisi datar serta lingkaran.',
    chapters: ['Bab 1: Teorema Pythagoras', 'Bab 2: Lingkaran', 'Bab 3: Bangun Ruang Sisi Datar', 'Bab 4: Statistika']
  },
  { 
    id: 16, title: 'IPS: Sejarah Nusantara Kelas VII', author: 'Kemendikbudristek', level: 'SMP', fase: 'D', category: 'Sosial',
    cover: 'https://picsum.photos/400/600?seed=ips7_smp',
    synopsis: 'Memahami asal usul bangsa Indonesia dan perkembangan kerajaan-kerajaan besar di Nusantara.',
    chapters: ['Bab 1: Manusia & Tempat', 'Bab 2: Kehidupan Zaman Praaksara', 'Bab 3: Kerajaan Hindu-Budha', 'Bab 4: Kerajaan Islam']
  },
  { 
    id: 17, title: 'Bahasa Indonesia: Mahir Berbahasa Kelas IX', author: 'Pusat Perbukuan', level: 'SMP', fase: 'D', category: 'Bahasa',
    cover: 'https://picsum.photos/400/600?seed=indo9_smp',
    synopsis: 'Penguatan kompetensi literasi melalui analisis teks laporan hasil percobaan, pidato persuasif, dan cerpen.',
    chapters: ['Bab 1: Laporan Percobaan', 'Bab 2: Pidato Persuasif', 'Bab 3: Menyusun Cerpen', 'Bab 4: Literasi Buku']
  },

  // SD - Primary Education
  { 
    id: 9, title: 'IPAS (IPA & Sosial) Kelas IV', author: 'Kemendikbudristek', level: 'SD', fase: 'B', category: 'Umum',
    cover: 'https://picsum.photos/400/600?seed=ipas4',
    synopsis: 'Buku yang menggabungkan konsep alam dan sosial untuk membantu siswa memahami lingkungan sekitar dengan lebih holistik.',
    chapters: ['Bab 1: Tumbuhan Sumber Kehidupan', 'Bab 2: Wujud Zat', 'Bab 3: Gaya di Sekitar Kita', 'Bab 4: Mengubah Bentuk Energi'],
    chapterContents: {
      'Bab 1: Tumbuhan Sumber Kehidupan': `
        <h2>Bagian Tubuh Tumbuhan</h2>
        <p>Tumbuhan memiliki bagian-bagian utama yang membantu mereka bertahan hidup dan tumbuh.</p>
        <h3>Akar, Batang, dan Daun</h3>
        <p>Akar menyerap air, batang menyalurkan makanan, dan daun adalah tempat fotosintesis.</p>
        <h3>Proses Fotosintesis</h3>
        <p>Tumbuhan memasak makanannya sendiri menggunakan cahaya matahari, air, dan karbon dioksida untuk menghasilkan oksigen dan karbohidrat.</p>
      `
    }
  },
  { 
    id: 10, title: 'Bahasa Indonesia: Lihat Sekitar Kelas II', author: 'Pusat Perbukuan RI', level: 'SD', fase: 'A', category: 'Bahasa',
    cover: 'https://picsum.photos/400/600?seed=indo2',
    synopsis: 'Mengajarkan kemampuan menyimak, membaca, berbicara, dan menulis melalui cerita interaktif dan gambar menarik.',
    chapters: ['Bab 1: Mengenal Perasaan', 'Bab 2: Menjaga Kesehatan', 'Bab 3: Berhati-hati di Mana Saja', 'Bab 4: Keluargaku Unik'],
    chapterContents: {
      'Bab 1: Mengenal Perasaan': `
        <h2>Ayo Mengenal Perasaan!</h2>
        <p>Setiap orang punya perasaan. Ada saatnya kita merasa senang, sedih, marah, atau takut.</p>
        <h3>Cerita Si Kancil yang Senang</h3>
        <p>Suatu hari, Kancil mendapatkan banyak buah apel. Kancil merasa sangat <strong>senang</strong>. Dia melompat-lompat kegirangan.</p>
        <h3>Tugas Literasi</h3>
        <p>Gambarlah wajahmu saat sedang merasa senang!</p>
      `
    }
  },
  { 
    id: 11, title: 'Seni Rupa & Kreativitas Kelas V', author: 'Kemendikbudristek', level: 'SD', fase: 'C', category: 'Seni',
    cover: 'https://picsum.photos/400/600?seed=art5',
    synopsis: 'Mendorong ekspresi diri melalui berbagai media seni rupa, mulai dari menggambar, memahat, hingga membuat karya dari bahan bekas.',
    chapters: ['Unit 1: Prinsip Seni', 'Unit 2: Menggambar Perspektif', 'Unit 3: Membuat Node', 'Unit 4: Produk Kreatif']
  },
  { 
    id: 18, title: 'Matematika: Dunia Angka Kelas I', author: 'Kemendikbudristek', level: 'SD', fase: 'A', category: 'Matematika',
    cover: 'https://picsum.photos/400/600?seed=math1_sd',
    synopsis: 'Dasar-dasar berhitung, pengenalan angka, dan operasi penjumlahan/pengurangan sederhana dengan ilustrasi menyenangkan.',
    chapters: ['Bab 1: Ayo Membilang', 'Bab 2: Penjumlahan', 'Bab 3: Pengurangan', 'Bab 4: Bentuk Bangun']
  },
  { 
    id: 19, title: 'Pendidikan Pancasila Kelas VI', author: 'Kemendikbudristek', level: 'SD', fase: 'C', category: 'PKn',
    cover: 'https://picsum.photos/400/600?seed=pkn6_sd',
    synopsis: 'Memahami nilai-nilai Pancasila, norma-norma di masyarakat, dan semangat persatuan dalam keberagaman.',
    chapters: ['Bab 1: Belajar Pancasila', 'Bab 2: Norma & Hak', 'Bab 3: Keberagaman Budaya', 'Bab 4: Persatuan Bangsa']
  },
  { 
    id: 20, title: 'IPAS: Ekosistem & Alam Kelas V', author: 'Pusat Perbukuan', level: 'SD', fase: 'C', category: 'Umum',
    cover: 'https://picsum.photos/400/600?seed=ipas5_sd',
    synopsis: 'Mempelajari harmoni dalam ekosistem, rantai makanan, dan cara menjaga kelestarian bumi sejak dini.',
    chapters: ['Bab 1: Cahaya & Bunyi', 'Bab 2: Harmoni Ekosistem', 'Bab 3: Magnet & Listrik', 'Bab 4: Struktur Bumi']
  },
  
  // Additional Books for Variety
  { 
    id: 21, title: 'Antropologi Kelas XI', author: 'Kemendikbudristek', level: 'SMA', fase: 'F', category: 'Sosial',
    cover: 'https://picsum.photos/400/600?seed=ant11',
    synopsis: 'Mempelajari keragaman budaya manusia, sistem kekerabatan, dan dinamika kebudayaan di Indonesia.',
    chapters: ['Bab 1: Ruang Lingkup Antropologi', 'Bab 2: Kebudayaan', 'Bab 3: Bahasa & Seni', 'Bab 4: Agama & Kepercayaan']
  },
  { 
    id: 22, title: 'Seni Musik: Suara Alam Kelas VII', author: 'Pusat Perbukuan', level: 'SMP', fase: 'D', category: 'Seni',
    cover: 'https://picsum.photos/400/600?seed=music7',
    synopsis: 'Mengenal teknik bernyanyi, alat musik tradisional, dan cara menciptakan komposisi musik sederhana.',
    chapters: ['Bab 1: Bernyanyi Solo', 'Bab 2: Bermain Alat Musik', 'Bab 3: Apresiasi Musik', 'Bab 4: Ansambel Musik']
  },
  { 
    id: 23, title: 'PJOK: Sehat & Bugar Kelas III', author: 'Kemendikbudristek', level: 'SD', fase: 'B', category: 'Olahraga',
    cover: 'https://picsum.photos/400/600?seed=sports3',
    synopsis: 'Panduan aktivitas fisik, permainan bola besar, serta edukasi pola hidup sehat bagi siswa sekolah dasar.',
    chapters: ['Bab 1: Pola Gerak Dasar', 'Bab 2: Permainan Bola Kecil', 'Bab 3: Kebugaran Jasmani', 'Bab 4: Kebersihan Diri']
  },
  { 
    id: 24, title: 'Bahasa Jepang: Nihongo Kelas X', author: 'Kemendikbudristek', level: 'SMA', fase: 'E', category: 'Bahasa',
    cover: 'https://picsum.photos/400/600?seed=jp10',
    synopsis: 'Dasar-dasar bahasa Jepang meliputi huruf Hiragana, Katakana, dan percakapan sehari-hari sederhana.',
    chapters: ['Bab 1: Aisatsu', 'Bab 2: Jikoshoukai', 'Bab 3: Kazoku', 'Bab 4: Gakkou no Seikatsu']
  },
  { 
    id: 25, title: 'Prakarya: Kerajinan Tangan Kelas IX', author: 'Pusat Perbukuan', level: 'SMP', fase: 'D', category: 'Seni',
    cover: 'https://picsum.photos/400/600?seed=craft9',
    synopsis: 'Mengembangkan kreativitas melalui pengolahan bahan keras, bahan lunak, dan wirausaha kerajinan.',
    chapters: ['Bab 1: Kerajinan Bahan Keras', 'Bab 2: Prinsip Kelistrikan', 'Bab 3: Budidaya Satwa Harapan', 'Bab 4: Pengolahan Hasil Peternakan']
  },
  { 
    id: 26, title: 'Informatika: Logika Pemrograman Kelas XI', author: 'Kemendikbudristek', level: 'SMA', fase: 'F', category: 'Teknologi',
    cover: 'https://picsum.photos/400/600?seed=it11_sma',
    synopsis: 'Pendalaman algoritma, pemrograman Python, jaringan komputer, dan keamanan data.',
    chapters: ['Bab 1: Algoritma & Struktur Data', 'Bab 2: Pemrograman Prosedural', 'Bab 3: Dampak Sosial Informatika', 'Bab 4: Proyek Informatika']
  }
];

const Library: React.FC = () => {
  const [filter, setFilter] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesFilter = filter === 'Semua' || book.level === filter;
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

  // Chapter Reader View
  if (selectedBook && activeChapter) {
    const content = selectedBook.chapterContents?.[activeChapter] || `
      <div className="py-20 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <h3 className="text-xl font-black text-slate-800">Konten Sedang Disiapkan</h3>
        <p className="text-slate-500 mt-2">Materi lengkap untuk ${activeChapter} sedang dalam proses sinkronisasi digital.</p>
      </div>
    `;

    return (
      <div className="max-w-5xl mx-auto py-8 px-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => setActiveChapter(null)}
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Detail Buku
          </button>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>

        <div className={`rounded-[48px] shadow-2xl border transition-all duration-500 p-12 md:p-20 ${
          readerTheme === 'light' ? 'bg-white border-slate-100' : 
          readerTheme === 'sepia' ? 'bg-[#f4ecd8] border-[#e6d5b8]' : 
          'bg-slate-900 border-slate-800'
        }`}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <span className={`font-black text-[10px] uppercase tracking-[0.3em] mb-4 block ${
                readerTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>{selectedBook.title}</span>
              <h1 className={`text-4xl font-black tracking-tight ${
                readerTheme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>{activeChapter}</h1>
              <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-8 rounded-full"></div>
            </div>

            <div className={`prose max-w-none prose-headings:font-black prose-p:leading-relaxed prose-p:text-lg ${
              readerTheme === 'light' ? 'prose-slate prose-headings:text-slate-900 prose-p:text-slate-600' : 
              readerTheme === 'sepia' ? 'prose-stone prose-headings:text-[#5f4b32] prose-p:text-[#5f4b32]' : 
              'prose-invert prose-headings:text-white prose-p:text-slate-300'
            }`}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            <div className={`mt-20 pt-10 border-t flex items-center justify-between ${
              readerTheme === 'dark' ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <button className="flex items-center gap-3 text-slate-400 font-bold hover:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Bab Sebelumnya
              </button>
              
              <div className="flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-2xl">
                {(['light', 'sepia', 'dark'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setReaderTheme(t)}
                    className={`w-8 h-8 rounded-xl border transition-all ${
                      readerTheme === t ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent'
                    } ${
                      t === 'light' ? 'bg-white' : t === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-slate-900'
                    }`}
                  />
                ))}
              </div>

              <button className="flex items-center gap-3 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                Bab Selanjutnya
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reader View (Detailed Book Access)
  if (selectedBook) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-6 animate-in fade-in duration-500">
        <button 
          onClick={() => {setSelectedBook(null); setActiveChapter(null);}}
          className="flex items-center gap-2 text-blue-600 font-bold mb-8 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali ke Perpustakaan
        </button>

        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Sidebar / Cover Area */}
            <div className="lg:col-span-4 bg-slate-50 p-12 flex flex-col items-center border-r border-slate-100">
              <div className="w-full aspect-[2/3] rounded-[32px] overflow-hidden shadow-2xl mb-8 relative group/cover">
                <img src={selectedBook.cover} className="w-full h-full object-cover" alt={selectedBook.title} />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/cover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Halaman</span>
                    <span className="font-black text-slate-800">±240 Hal.</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ukuran</span>
                    <span className="font-black text-slate-800">12.5 MB</span>
                  </div>
                </div>
                
                <button 
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
                    link.download = `${selectedBook.title}.pdf`;
                    link.target = '_blank';
                    link.click();
                    alert('Mengunduh buku: ' + selectedBook.title);
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Unduh Buku (PDF)
                </button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Tersedia untuk dibaca offline</p>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8 p-12 space-y-12">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                   <span className="bg-blue-600 text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-md shadow-blue-100">{selectedBook.level}</span>
                   <span className="bg-white border border-slate-200 text-slate-500 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest">FASE {selectedBook.fase}</span>
                   <span className="bg-slate-100 text-slate-600 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest">{selectedBook.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight tracking-tight">{selectedBook.title}</h1>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   </div>
                   <p className="text-slate-600 font-bold">Penulis: <span className="text-slate-900">{selectedBook.author}</span></p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  Sinopsis & Tujuan Pembelajaran
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium text-lg">
                  {selectedBook.synopsis}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  Daftar Isi (E-Book Chapters)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedBook.chapters.map((chapter, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1 transition-all cursor-pointer group"
                      onClick={() => setActiveChapter(chapter)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-blue-600 text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {idx + 1}
                        </div>
                        <span className="font-black text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{chapter}</span>
                      </div>
                      <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="bg-amber-50 border border-amber-100 p-8 rounded-[32px] flex items-start gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 opacity-30 group-hover:scale-110 transition-transform"></div>
                  <div className="w-14 h-14 bg-white text-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200/50">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-black text-amber-800 text-base">Informasi Lisensi Digital</h4>
                    <p className="text-amber-700 text-sm mt-2 leading-relaxed font-medium">Buku teks ini tersedia secara resmi sebagai Buku Teks Utama Kurikulum Merdeka. Hak cipta milik Kemendikbudristek dan disebarluaskan untuk mendukung pemerataan kualitas pendidikan di seluruh wilayah Indonesia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gallery View
  return (
    <div className="max-w-7xl mx-auto space-y-12 py-12 px-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 text-[10px] font-black uppercase tracking-widest">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
            Koleksi Buku Kurikulum Merdeka
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1] tracking-tight">
            Perpustakaan <span className="text-blue-600">Digital Guru</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl text-lg leading-relaxed">
            Akses instan ke {books.length}+ buku teks utama dan referensi pedagogis resmi untuk menunjang aktivitas belajar mengajar Anda.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-80">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Cari judul, penulis, atau kategori..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-white p-2 rounded-3xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar scroll-smooth">
            {['Semua', 'SD', 'SMP', 'SMA'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-[20px] text-sm font-black transition-all whitespace-nowrap ${
                  filter === f 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-10">
          {filteredBooks.map(book => (
            <div 
              key={book.id} 
              className="group flex flex-col h-full animate-in fade-in zoom-in duration-500"
              onClick={() => setSelectedBook(book)}
            >
              <div className="relative aspect-[2/3] bg-slate-200 rounded-[32px] overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-200/50 group-hover:-translate-y-3 transition-all duration-500 cursor-pointer">
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <span className="block text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">Kemendikbudristek</span>
                     <button className="w-full py-3.5 bg-white text-blue-600 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-black/20">
                       Baca Sekarang
                     </button>
                   </div>
                </div>
                
                <img src={book.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={book.title} />
                
                {/* Level Badge on Image (Floating) */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[10px] px-3 py-1.5 rounded-xl font-black shadow-lg border border-slate-100">
                    {book.level}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex-1 flex flex-col">
                <h4 className="font-black text-slate-800 text-base line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors cursor-pointer mb-2">
                  {book.title}
                </h4>
                <div className="mt-auto pt-2 space-y-3">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest truncate">
                    {book.author}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg font-black uppercase tracking-tight">FASE {book.fase}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg font-black uppercase tracking-tight">{book.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center bg-white border border-slate-100 rounded-[48px] shadow-xl shadow-slate-200/50">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
            <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <h3 className="text-2xl font-black text-slate-800">Koleksi Tidak Ditemukan</h3>
          <p className="text-slate-400 font-bold mt-3 max-w-sm mx-auto uppercase tracking-widest text-xs">Coba cari judul buku lain atau sesuaikan filter jenjang pendidikan Anda.</p>
          <button 
            onClick={() => {setSearchTerm(''); setFilter('Semua');}}
            className="mt-10 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-200 transition-all active:scale-[0.98]"
          >
            Tampilkan Semua Buku
          </button>
        </div>
      )}
      
      {/* Library Bottom Banner */}
      <div className="pt-20">
         <div className="bg-slate-900 rounded-[48px] p-16 md:p-24 text-center relative overflow-hidden group">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-[0.05]">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <pattern id="lib-pattern-footer" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 L 20 10 M 10 0 L 10 20" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <rect width="100" height="100" fill="url(#lib-pattern-footer)" />
              </svg>
            </div>
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full -ml-40 -mt-40 blur-[100px] group-hover:bg-blue-500/30 transition-colors duration-1000"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full -mr-40 -mb-40 blur-[100px] group-hover:bg-indigo-500/30 transition-colors duration-1000"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
               <div className="space-y-4">
                 <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">Terus Perbarui Wawasan Mengajar Anda</h3>
                 <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
               </div>
               
               <p className="text-slate-400 font-bold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic">
                 "Mendedikasikan layanan terbaik untuk menunjang kesuksesan Anda dalam mendidik generasi bangsa adalah prioritas utama kami."
               </p>
               
               <div className="pt-6">
                 <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                   Smart School Professional Support
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Library;
