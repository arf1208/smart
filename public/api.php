<?php
/**
 * Gemini AI Proxy for Rumahweb Hosting
 * Menjaga API Key tetap aman di sisi server.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// AMBIL API KEY DARI SINI (Ganti dengan Key Anda)
$API_KEY = getenv('GEMINI_API_KEY') ?: 'YOUR_GEMINI_API_KEY_HERE';

if ($API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    echo json_encode(['error' => 'API Key belum disetel di server.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$prompt = $input['prompt'] ?? '';
$systemInstruction = $input['systemInstruction'] ?? '';
$isJson = $input['isJson'] ?? false;

if (empty($prompt)) {
    echo json_encode(['error' => 'Prompt kosong.']);
    exit;
}

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $API_KEY;

$data = [
    "contents" => [
        ["parts" => [["text" => $prompt]]]
    ],
    "systemInstruction" => [
        "parts" => [["text" => $systemInstruction]]
    ],
    "generationConfig" => [
        "temperature" => $isJson ? 0.4 : 0.7,
        "responseMimeType" => $isJson ? "application/json" : "text/plain"
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Penting untuk beberapa shared hosting

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
} else {
    http_response_code($httpCode);
    echo $response;
}

curl_close($ch);
?>
