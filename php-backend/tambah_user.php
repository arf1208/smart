<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$name = $data['name'] ?? '';

// Konfigurasi Database (Sesuaikan saat di Rumahweb)
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "smart_school";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Koneksi database gagal"]));
}

$stmt = $conn->prepare("INSERT INTO users (email, username, password, name) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $email, $username, $password, $name);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User berhasil ditambahkan"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menambahkan user"]);
}

$stmt->close();
$conn->close();
?>
