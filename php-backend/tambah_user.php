<?php
// --- KONFIGURASI ---
$host = "localhost";
$user = "sekb7418_sekb7418_smart"; 
$pass = "fd24u4fUTcmH44";     
$db   = "sekb7418_sekb7418_smart"; 

// PASSWORD UNTUK MENGAKSES HALAMAN INI (Ganti sesuai keinginan Anda)
$HALAMAN_PASSWORD = "admin_smart_school_2026";

$conn = new mysqli($host, $user, $pass, $db);
$message = "";

if (isset($_POST['tambah'])) {
    $auth_pass = $_POST['auth_pass'];
    
    if ($auth_pass === $HALAMAN_PASSWORD) {
        $name = $conn->real_escape_string($_POST['name']);
        $email = $conn->real_escape_string($_POST['email']);
        $password = $_POST['password']; // Disimpan sebagai plain text sesuai alur login Anda

        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
        
        if ($conn->query($sql) === TRUE) {
            $message = "<div style='color: green; font-weight: bold;'>Berhasil! User $name telah didaftarkan.</div>";
        } else {
            $message = "<div style='color: red;'>Gagal: " . $conn->error . "</div>";
        }
    } else {
        $message = "<div style='color: red;'>Password Akses Halaman Salah!</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tambah User - Smart School Admin</title>
    <style>
        body { font-family: sans-serif; background: #f0f4f8; display: flex; justify-content: center; padding: 50px; }
        .card { background: white; padding: 30px; border-radius: 20px; shadow: 0 10px 25px rgba(0,0,0,0.1); width: 400px; }
        input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
        button:hover { background: #1d4ed8; }
        .gen-btn { background: #10b981; margin-bottom: 20px; }
        .gen-btn:hover { background: #059669; }
        hr { border: 0; border-top: 1px solid #eee; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Tambah Akses User</h2>
        <p style="font-size: 12px; color: #666;">Gunakan halaman ini untuk mendaftarkan user dari Scalev.</p>
        
        <?php echo $message; ?>

        <form method="POST">
            <input type="text" name="name" placeholder="Nama Lengkap User" required>
            <input type="email" name="email" placeholder="Email User" required>
            <input type="text" name="password" id="pass_field" placeholder="Password User" required>
            
            <button type="button" class="gen-btn" onclick="generatePass()">Buat Password Acak</button>
            
            <hr>
            <p style="font-size: 11px; font-weight: bold; color: #ef4444;">PASSWORD AKSES ADMIN:</p>
            <input type="password" name="auth_pass" placeholder="Masukkan Password Admin Anda" required>
            
            <button type="submit" name="tambah">Daftarkan User Sekarang</button>
        </form>
    </div>

    <script>
        function generatePass() {
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let pass = "";
            for (let i = 0; i < 8; i++) {
                pass += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            document.getElementById('pass_field').value = pass;
        }
    </script>
</body>
</html>
