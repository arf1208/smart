
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = "Anda adalah pakar kurikulum pendidikan Indonesia dengan spesialisasi Kurikulum Merdeka. Dokumen yang Anda buat harus profesional, sistematis, mengikuti standar HOTS (Higher Order Thinking Skills), dan menyertakan Profil Pelajar Pancasila (P5).";

export const generateModulAjar = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  topic: string;
  duration: string;
}) => {
  const prompt = `Buatkan Modul Ajar Kurikulum Merdeka yang Lengkap dan Profesional.
  Identitas Penulis: ${params.teacherName}
  Jenjang: ${params.level} (${params.fase})
  Mata Pelajaran: ${params.subject}
  Materi Utama: ${params.topic}
  Durasi: ${params.duration}
  
  Struktur Dokumen:
  1. INFORMASI UMUM (Identitas, Kompetensi Awal, P5, Sarana Prasarana, Target Peserta Didik, Model Pembelajaran).
  2. KOMPONEN INTI (Tujuan Pembelajaran, Pemahaman Bermakna, Pertanyaan Pemantik, Persiapan Pembelajaran).
  3. KEGIATAN PEMBELAJARAN (Pendahuluan, Inti dengan sintaks model pembelajaran, Penutup).
  4. ASESMEN (Instrumen & Rubrik).
  5. LAMPIRAN (LKPD singkat, Bahan Bacaan, Glosarium, Daftar Pustaka).
  
  Gunakan Bahasa Indonesia formal standar akademik. Format dengan Markdown yang sangat rapi.`;

  // Always use gemini-3-pro-preview for complex text reasoning tasks
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });

  return response.text;
};

export const generateQuestions = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  count: number;
  type: 'Pilihan Ganda' | 'Essay';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
}) => {
  const prompt = `Hasilkan ${params.count} butir soal ${params.type} Berbasis HOTS.
  Penyusun: ${params.teacherName}
  Mata Pelajaran: ${params.subject}
  Jenjang: ${params.level}
  Tingkat Kesulitan: ${params.difficulty}
  
  Ketentuan:
  - Soal harus menguji nalar tingkat tinggi (Analisis, Evaluasi, atau Kreasi).
  - Untuk Pilihan Ganda, sertakan 5 opsi (A-E) yang homogen dan logis.
  - Sertakan Kunci Jawaban dan Pembahasan mendalam (Scaffolding).
  - Sertakan Kisi-kisi (Elemen, Materi, Indikator Soal, Level Kognitif).`;

  // Use gemini-3-pro-preview for complex question generation tasks
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          header: { type: Type.STRING, description: "Judul dokumen dan identitas pembuat" },
          soal: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                nomor: { type: Type.NUMBER },
                pertanyaan: { type: Type.STRING },
                opsi: { type: Type.ARRAY, items: { type: Type.STRING } },
                jawabanBenar: { type: Type.STRING },
                penjelasan: { type: Type.STRING }
              }
            }
          },
          kisiKisi: { type: Type.STRING, description: "Tabel kisi-kisi dalam format teks/markdown" }
        },
        required: ["header", "soal", "kisiKisi"]
      }
    }
  });

  // Extract text safely and handle potential undefined before parsing
  const jsonStr = response.text?.trim() || '{}';
  return JSON.parse(jsonStr);
};

export const generateLKPD = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  topic: string;
}) => {
  const prompt = `Buatkan Lembar Kerja Peserta Didik (LKPD) Interaktif.
  Penyusun: ${params.teacherName}
  Mata Pelajaran: ${params.subject}
  Topik: ${params.topic}
  
  Komponen LKPD:
  1. Judul & Identitas Siswa.
  2. Tujuan Pembelajaran.
  3. Petunjuk Belajar.
  4. Paparan Materi Ringkas/Stimulus (Gambar/Kasus).
  5. Tugas/Langkah Kerja Eksploratif.
  6. Pertanyaan Refleksi/Diskusi.
  7. Rubrik Penilaian Diri.
  
  Format dalam Markdown yang bersih dan siap cetak.`;

  // Complex pedagogical tasks use gemini-3-pro-preview
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION }
  });

  return response.text;
};

export const generateAdminDocs = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  docType: 'ATP' | 'CP' | 'RPP';
}) => {
  const prompt = `Buatkan dokumen administrasi guru: ${params.docType}.
  Penyusun: ${params.teacherName}
  Mata Pelajaran: ${params.subject}
  Fase: ${params.fase}
  
  Jika CP: Uraikan Capaian Pembelajaran per elemen.
  Jika ATP: Buat Alur Tujuan Pembelajaran dengan perkiraan jam pelajaran dan kata kunci.
  Jika RPP: Buat RPP Plus yang ringkas namun padat (1-2 halaman).
  
  Format Markdown profesional.`;

  // Curriculum planning is a complex reasoning task, use gemini-3-pro-preview
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION }
  });

  return response.text;
};
