<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// --- KONFIGURASI DATABASE ---
$host = "localhost";
$user = "root"; // Sesuaikan dengan user phpMyAdmin Anda
$pass = "";     // Sesuaikan dengan password phpMyAdmin Anda
$db   = "smart_school"; // Nama database Anda

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Koneksi Database Gagal"]));
}

// --- PROSES LOGIN ---
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    // Cari user berdasarkan email
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Cek Password (disini saya pakai plain text sesuai permintaan Anda, 
        // tapi disarankan pakai password_verify nanti)
        if ($password === $user['password']) {
            echo json_encode([
                "success" => true,
                "user" => [
                    "name" => $user['name'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Password salah."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Email tidak terdaftar."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap."]);
}

$conn->close();
?>
