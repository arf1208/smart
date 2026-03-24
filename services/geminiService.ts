
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

// Mode Pintar: Deteksi apakah sedang di Preview atau di Hosting asli
const isPreview = window.location.hostname.includes('run.app') || 
                  window.location.hostname.includes('localhost') ||
                  window.location.hostname.includes('webcontainer.io');

// Selalu gunakan PROXY agar API Key aman di sisi server (tidak bocor ke browser)
const PROXY_URL = "/gemini_proxy.php";

const handleError = (error: any) => {
  console.error("API Error:", error);
  const message = error?.message || "";
  return `Gagal generate konten: ${message || "Terjadi kesalahan sistem."}`;
};

export const generateModulAjar = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  topic: string;
  duration: string;
}) => {
  const prompt = `Buatkan MODUL AJAR KURIKULUM MERDEKA yang sangat lengkap, sistematis, dan mendalam.
- Guru: ${params.teacherName}
- Mapel: ${params.subject}
- Materi: ${params.topic}
- Fase: ${params.fase}
- Jenjang/Level: ${params.level}
- Durasi: ${params.duration}

Struktur Modul WAJIB mencakup komponen berikut secara detail:
I. INFORMASI UMUM
II. KOMPONEN INTI
III. LAMPIRAN`;

  try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    
    if (data.error) throw new Error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
    
    // Handle format response dari Gemini API via Proxy
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Format balasan AI tidak sesuai.");
    return text;
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
  const prompt = `Hasilkan TEPAT ${params.count} butir soal ${params.type} untuk mata pelajaran ${params.subject} Kelas ${params.kelas}.
Tingkat Kesulitan: ${params.difficulty} (Berbasis HOTS).
WAJIB menghasilkan JSON dengan struktur: { kisiKisi: [], soal: [] }`;

  try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    
    if (data.error) throw new Error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    return JSON.parse(text);
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
  const prompt = `Buatkan LKPD interaktif untuk ${params.subject}, topik: ${params.topic}.`;
  try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    
    if (data.error) throw new Error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Format balasan AI tidak sesuai.");
    return text;
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
  const prompt = `Buatkan dokumen ${params.docType} untuk ${params.subject} Fase ${params.fase}.`;
  try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    
    if (data.error) throw new Error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Format balasan AI tidak sesuai.");
    return text;
  } catch (err) {
    throw new Error(handleError(err));
  }
};
