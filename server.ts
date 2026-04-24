
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  // API AI Proxy
  app.post("/api/ai", async (req, res) => {
    const { prompt, isJson } = req.body;
    
    try {
      const rawApiKey = process.env.MY_API_KEY || process.env.GEMINI_API_KEY;
      if (!rawApiKey) {
        return res.status(500).json({ error: "API Key tidak ditemukan. Silakan tambahkan MY_API_KEY di menu Settings > Secrets." });
      }

      const apiKey = rawApiKey.trim();
      const genAI = new GoogleGenAI({ apiKey });
      const result = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
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
        return res.status(500).json({ error: "AI tidak memberikan respon (mungkin terblokir filter keamanan)." });
      }

      if (isJson) {
        try {
          const cleanJson = text.replace(/```json\n?|```/g, "").trim();
          res.json(JSON.parse(cleanJson));
        } catch (e) {
          res.status(500).json({ error: "Format JSON dari AI tidak valid", raw: text });
        }
      } else {
        res.json({ text });
      }
    } catch (error: any) {
      console.error("AI Server Error:", error);
      res.status(500).json({ error: error.message || "Terjadi kesalahan pada AI Service" });
    }
  });

  // API Login - Mengecek ke users.json
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt: ${email} / ${password}`);
    
    try {
      const usersData = fs.readFileSync(path.join(process.cwd(), "public", "users.json"), "utf-8");
      const users = JSON.parse(usersData);
      
      const user = users.find((u: any) => 
        (u.email === email || u.username === email) && u.password === password
      );
      
      if (user) {
        res.json({ success: true, user: { name: user.name, email: user.email } });
      } else {
        res.status(401).json({ success: false, message: "Email atau Password salah / Tidak terdaftar." });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Terjadi kesalahan pada server." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
