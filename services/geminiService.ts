import { GoogleGenAI } from "@google/genai";

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
  return `Gagal generate konten: ${message || "Terjadi kesalahan sistem."}`;
};

// Mode Preview: Gunakan SDK resmi dengan Key dari Environment (Otomatis & Aman)
const callAI = async (prompt: string, isJson: boolean = false) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "undefined") {
      return "Gagal: Gemini API Key tidak ditemukan di environment. Pastikan Anda sudah menyetelnya di pengaturan.";
    }

    const genAI = new GoogleGenAI({ apiKey });
    const result = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: isJson ? "application/json" : "text/plain",
        temperature: isJson ? 0.4 : 0.7 
      }
    });

    const text = result.text;
    console.log("AI Raw Response:", text);

    if (!text) {
      throw new Error("AI tidak memberikan respon (mungkin terblokir filter keamanan).");
    }

    if (isJson) {
      try {
        // Bersihkan jika AI memberikan markdown code blocks
        const cleanJson = text.replace(/```json\n?|```/g, "").trim();
        return JSON.parse(cleanJson);
      } catch (e) {
        console.error("JSON Parse Error:", e, "Raw text:", text);
        throw new Error("Format data dari AI tidak valid. Silakan coba lagi.");
      }
    }
    
    return text;
  } catch (err) {
    throw err;
  }
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
    return await callAI(prompt);
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

WAJIB menghasilkan JSON dengan struktur berikut dan JANGAN biarkan array 'soal' kosong:
{
  "kisiKisi": [
    { "no": 1, "materi": "...", "indikator": "..." }
  ],
  "soal": [
    {
      "nomor": 1,
      "pertanyaan": "...",
      "pilihan": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
      "jawabanBenar": "A",
      "penjelasan": "..."
    }
  ]
}`;

  try {
    return await callAI(prompt, true);
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
    return await callAI(prompt);
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
    return await callAI(prompt);
  } catch (err) {
    throw new Error(handleError(err));
  }
};
