<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// SOLUSI PLUG & PLAY: Membaca data dari users.json agar tidak perlu setting database MySQL di Rumahweb
$users_file = __DIR__ . "/users.json";

if (!file_exists($users_file)) {
    echo json_encode(["success" => false, "message" => "File users.json tidak ditemukan di server."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$users_data = json_decode(file_get_contents($users_file), true);

$found_user = null;
foreach ($users_data as $user) {
    if (($user['email'] === $email || $user['username'] === $email) && $user['password'] === $password) {
        $found_user = [
            "name" => $user['name'],
            "email" => $user['email']
        ];
        break;
    }
}

if ($found_user) {
    echo json_encode(["success" => true, "user" => $found_user]);
} else {
    echo json_encode(["success" => false, "message" => "Email atau Password salah."]);
}
?>
