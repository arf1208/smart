<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// AMAN: Kunci API disimpan di server (PHP), tidak akan terlihat oleh browser atau robot Google
$api_key = "AIzaSyBUjtjmbbwIp0ZNzmYmwa4WSp3I0IRY1KQ"; 

$data = json_decode(file_get_contents("php://input"), true);
$prompt = $data['prompt'] ?? '';

if (empty($prompt)) {
    echo json_encode(["error" => "Prompt kosong"]);
    exit;
}

// URL API Gemini
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $api_key;

// Data yang dikirim ke Google
$payload = [
    "contents" => [
        [
            "parts" => [
                ["text" => $prompt]
            ]
        ]
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(["error" => "CURL Error: " . curl_error($ch)]);
} else {
    echo $response;
}

curl_close($ch);
?>
