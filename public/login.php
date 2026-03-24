<?php
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

$users = json_decode(file_get_contents('users.json'), true);
foreach ($users as $user) {
    if (($user['email'] === $email || $user['username'] === $email) && $user['password'] === $password) {
        echo json_encode(['success' => true, 'user' => ['name' => $user['name'], 'email' => $user['email']]]);
        exit;
    }
}
echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
