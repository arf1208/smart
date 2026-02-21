
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
  const key = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!key) {
    throw new Error("API Key tidak ditemukan. Pastikan GEMINI_API_KEY sudah diatur di environment variables.");
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
    const prompt = `Buatkan MODUL AJAR KURIKULUM MERDEKA lengkap dan mendalam.
- Guru: ${params.teacherName}
- Mapel: ${params.subject}
- Materi: ${params.topic}
- Fase: ${params.fase}
- Durasi: ${params.duration}

Struktur Modul WAJIB mencakup:
1. Informasi Umum (Identitas, Kompetensi Awal, Profil Pelajar Pancasila, Sarana Prasarana)
2. Komponen Inti (Tujuan Pembelajaran, Pemahaman Bermakna, Pertanyaan Pemantik, Kegiatan Pembelajaran Lengkap, Asesmen)
3. Lampiran (LKPD, Pengayaan & Remedial, Glosarium, Daftar Pustaka)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION, 
        temperature: 0.5
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
        temperature: 0.3, 
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
