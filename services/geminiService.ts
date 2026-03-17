
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `Anda adalah AI Pakar Evaluasi Pendidikan Indonesia dengan spesialisasi Kurikulum Merdeka untuk semua jenjang (SD, SMP, SMA, SMK).
Tugas Anda: Menyusun instrumen asesmen, modul ajar, LKPD, dan administrasi guru yang baku, rapi, dan sesuai kaidah penulisan soal HOTS (Higher Order Thinking Skills).

Ketentuan Penulisan:
1. Hindari penggunaan simbol markdown seperti ** atau ### dalam isi teks soal/opsi jika dalam format JSON.
2. Gunakan Bahasa Indonesia formal yang sangat jernih dan profesional.
3. Stimulus soal harus relevan, edukatif, dan kontekstual (kasus nyata, data, atau narasi).
4. Pilihan jawaban (distraktor) harus logis, homogen, dan memiliki panjang kalimat yang seimbang.
5. Untuk Mata Pelajaran Kejuruan (SMK): Pastikan konten teknis akurat, menggunakan istilah industri yang tepat, dan mengacu pada standar kompetensi kerja yang relevan (SKKNI atau standar industri).
6. PENTING: Jangan mengulang informasi identitas (nama sekolah, kelas, tahun ajaran, kurikulum) di dalam kolom materi esensial. Isikan hanya topik materinya saja (maksimal 3-5 kata).`;

const handleError = (error: any) => {
  console.error("API Error:", error);
  const message = error?.message || "";
  
  if (message.includes("quota") || error?.status === 429) {
    return "Kuota API terlampaui. Silakan coba beberapa saat lagi atau pastikan akun penagihan (billing) Anda aktif.";
  }
  
  if (message.includes("Requested entity was not found")) {
    return "Layanan tidak tersedia atau model tidak ditemukan. Pastikan konfigurasi API Key sudah benar.";
  }

  return `Gagal generate konten: ${message || "Terjadi kesalahan sistem."}`;
};

const getApiKey = () => {
  // Cek MY_API_KEY (kunci custom user) dulu, kalau tidak ada pakai GEMINI_API_KEY (sistem)
  const key = process.env.MY_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("API Key tidak ditemukan. Silakan tambahkan 'MY_API_KEY' di menu Secrets.");
  }
  return key;
};

export const generateModulAjar = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  topic: string;
  duration: string;
}) => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const prompt = `Buatkan MODUL AJAR KURIKULUM MERDEKA yang sangat lengkap, sistematis, dan mendalam.
- Guru: ${params.teacherName}
- Mapel: ${params.subject}
- Materi: ${params.topic}
- Fase: ${params.fase}
- Jenjang/Level: ${params.level}
- Durasi: ${params.duration}

Struktur Modul WAJIB mencakup komponen berikut secara detail:

I. INFORMASI UMUM
1. Identitas Modul: Nama penyusun, institusi, tahun, jenjang, kelas, dan alokasi waktu.
2. Kompetensi Awal: Pengetahuan/keterampilan yang perlu dimiliki siswa sebelum mempelajari topik ini.
3. Profil Pelajar Pancasila: Sebutkan dimensi yang berkaitan (misal: Mandiri, Bernalar Kritis, Kreatif).
4. Sarana dan Prasarana: Fasilitas dan bahan yang dibutuhkan.
5. Target Peserta Didik: (Reguler/Tipikal, Kesulitan Belajar, atau Pencapaian Tinggi).
6. Model Pembelajaran: Sebutkan model yang digunakan (misal: PBL, PJBL, Discovery Learning).

II. KOMPONEN INTI
1. Tujuan Pembelajaran: Harus spesifik dan terukur.
2. Pemahaman Bermakna: Manfaat yang akan diperoleh siswa setelah proses pembelajaran.
3. Pertanyaan Pemantik: Pertanyaan untuk menumbuhkan rasa ingin tahu siswa.
4. Persiapan Pembelajaran: Langkah-langkah teknis sebelum mengajar.
5. Kegiatan Pembelajaran:
   - Pendahuluan (Apersepsi, Motivasi)
   - Inti (Langkah-langkah sesuai model pembelajaran)
   - Penutup (Refleksi, Kesimpulan, Tindak Lanjut)
6. Asesmen:
   - Asesmen sebelum pembelajaran (Diagnostik)
   - Asesmen selama proses pembelajaran (Formatif)
   - Asesmen pada akhir proses pembelajaran (Sumatif)
7. Pengayaan dan Remedial: Strategi untuk siswa yang butuh tantangan lebih atau bantuan tambahan.
8. Refleksi Peserta Didik dan Guru.

III. LAMPIRAN
1. Lembar Kerja Peserta Didik (LKPD): Ringkasan tugas/aktivitas siswa.
2. Bahan Bacaan Guru & Peserta Didik: Ringkasan materi esensial.
3. Glosarium: Istilah-istilah penting dan artinya.
4. Daftar Pustaka.

Gunakan format yang rapi, profesional, dan mudah dibaca oleh guru.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION, 
        temperature: 0.7
      }
    });
    return response.text;
  } catch (err) {
    throw new Error(handleError(err));
  }
};

export const generateQuestions = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  kelas: string;
  subject: string;
  count: number;
  type: 'Pilihan Ganda' | 'Essay';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
}) => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const prompt = `Hasilkan TEPAT ${params.count} butir soal ${params.type} untuk mata pelajaran ${params.subject} Kelas ${params.kelas}.
Tingkat Kesulitan: ${params.difficulty} (Berbasis HOTS).

WAJIB menghasilkan JSON dengan struktur yang valid dan lengkap. 
PENTING: Anda HARUS menghasilkan ${params.count} soal. Jangan berhenti di tengah jalan. 

Struktur JSON:
1. kisiKisi: array objek { materi: string, indikator: string, level: string (L1/L2/L3) }. 
   "materi" harus spesifik topik (misal: "Hukum Newton", "Sistem Pencernaan").
2. soal: array objek { nomor: number, stimulus: string, pertanyaan: string, opsi: string[] (kosongkan jika Essay), jawabanBenar: string, penjelasan: string }.

Ketentuan Khusus:
- Stimulus harus mendalam dan kontekstual.
- Jika jumlah soal banyak (${params.count} soal), pastikan setiap soal tetap unik dan berkualitas.
- Pastikan JSON tertutup dengan sempurna (valid JSON).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.4, 
        responseSchema: {
          type: Type.OBJECT,
          required: ["kisiKisi", "soal"],
          properties: {
            kisiKisi: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["materi", "indikator", "level"],
                properties: {
                  materi: { type: Type.STRING },
                  indikator: { type: Type.STRING },
                  level: { type: Type.STRING }
                }
              }
            },
            soal: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["nomor", "pertanyaan", "jawabanBenar", "penjelasan"],
                properties: {
                  nomor: { type: Type.NUMBER },
                  stimulus: { type: Type.STRING },
                  pertanyaan: { type: Type.STRING },
                  opsi: { type: Type.ARRAY, items: { type: Type.STRING } },
                  jawabanBenar: { type: Type.STRING },
                  penjelasan: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text?.trim();
    if (!text) throw new Error("Model returned empty response");
    
    // Handle potential markdown code blocks
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : text;
    
    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Raw Text:", text);
      throw new Error("Gagal mengurai hasil generate. Silakan coba lagi.");
    }
  } catch (err) {
    throw new Error(handleError(err));
  }
};

export const generateLKPD = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  topic: string;
}) => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const prompt = `Buatkan LKPD (Lembar Kerja Peserta Didik) interaktif dan eksploratif untuk ${params.subject}, topik: ${params.topic}. 
Sertakan langkah kerja praktikum/diskusi yang jelas, tabel pengamatan, dan pertanyaan analisis.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });
    return response.text;
  } catch (err) {
    throw new Error(handleError(err));
  }
};

export const generateAdminDocs = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  docType: 'ATP' | 'CP' | 'RPP';
}) => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const prompt = `Buatkan dokumen ${params.docType} resmi Kurikulum Merdeka untuk mata pelajaran ${params.subject} Fase ${params.fase}. 
Pastikan struktur tabel rapi dan substansi sesuai dengan standar Kemendikbudristek terbaru.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });
    return response.text;
  } catch (err) {
    throw new Error(handleError(err));
  }
};
