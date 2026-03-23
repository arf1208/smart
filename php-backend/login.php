<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Konfigurasi Database (Sesuaikan saat di Rumahweb)
$host = "localhost";
$user = "root"; // Ganti dengan username DB Rumahweb
$pass = "";     // Ganti dengan password DB Rumahweb
$dbname = "smart_school"; // Ganti dengan nama DB Rumahweb

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Koneksi database gagal"]));
}

$stmt = $conn->prepare("SELECT name, email FROM users WHERE (email = ? OR username = ?) AND password = ?");
$stmt->bind_param("sss", $email, $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "Email atau Password salah."]);
}

$stmt->close();
$conn->close();
?>
