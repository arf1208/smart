
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
  // Menambahkan route /login.php agar sinkron dengan LoginPage.tsx di preview
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
