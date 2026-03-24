<?php
/**
 * Login Handler for Rumahweb Hosting
 * Mengamankan proses login di sisi server.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// Baca data user dari file json yang aman
// Di hosting, sebaiknya file ini ditaruh di luar folder public_html jika memungkinkan
$usersJson = file_get_contents('users.json');
$users = json_decode($usersJson, true);

$foundUser = null;
foreach ($users as $user) {
    if (($user['email'] === $email || $user['username'] === $email) && $user['password'] === $password) {
        $foundUser = [
            'name' => $user['name'],
            'email' => $user['email']
        ];
        break;
    }
}

if ($foundUser) {
    echo json_encode(['success' => true, 'user' => $foundUser]);
} else {
    echo json_encode(['success' => false, 'message' => 'Email atau Password salah.']);
}
?>
