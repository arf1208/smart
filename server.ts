
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  // API Login - Mengecek ke users.json
  app.post(["/api/login", "/login.php"], (req, res) => {
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

  // Proxy Gemini untuk Preview (StackBlitz)
  app.post("/gemini_proxy.php", async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY tidak ditemukan di environment preview." });
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Gagal menghubungi API Gemini dari server preview." });
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
