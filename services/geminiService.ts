
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `Anda adalah AI Pakar Evaluasi Pendidikan Indonesia.
Tugas Anda: Menyusun instrumen asesmen yang baku, rapi, dan sesuai kaidah penulisan soal HOTS.

Ketentuan Penulisan:
1. Hindari penggunaan simbol markdown seperti ** atau ### dalam isi teks soal/opsi.
2. Gunakan Bahasa Indonesia formal yang sangat jernih.
3. Stimulus soal harus relevan, edukatif, dan kontekstual.
4. Pilihan jawaban (distraktor) harus logis dan memiliki panjang kalimat yang seimbang.
5. PENTING: Jangan mengulang informasi identitas (nama sekolah, kelas, tahun ajaran, kurikulum) di dalam kolom materi esensial. Isikan hanya topik materinya saja (maksimal 3-5 kata).`;

export const generateModulAjar = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  topic: string;
  duration: string;
}) => {
  const prompt = `Buatkan MODUL AJAR KURIKULUM MERDEKA lengkap.
- Guru: ${params.teacherName}
- Mapel: ${params.subject}
- Materi: ${params.topic}
- Fase: ${params.fase}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.6 }
  });
  return response.text;
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
  const prompt = `Hasilkan ${params.count} soal ${params.type} untuk ${params.subject} Kelas ${params.kelas}.
Tingkat Kesulitan: ${params.difficulty}.

WAJIB menghasilkan JSON dengan struktur:
1. kisiKisi: array objek { materi, indikator, level }. Isikan "materi" hanya dengan nama topik yang ringkas (misal: "Besaran Fisika", "Sel Hewan").
2. soal: array objek { nomor, stimulus, pertanyaan, opsi, jawabanBenar, penjelasan }

Pastikan teks bersih tanpa karakter markdown.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          kisiKisi: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
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

  return JSON.parse(response.text || '{}');
};

export const generateLKPD = async (params: {
  teacherName: string;
  level: string;
  fase: string;
  subject: string;
  topic: string;
}) => {
  const prompt = `Buatkan LKPD interaktif: ${params.subject}, topik: ${params.topic}.`;
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
  const prompt = `Buatkan dokumen ${params.docType} untuk ${params.subject} Fase ${params.fase}.`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION }
  });
  return response.text;
};
