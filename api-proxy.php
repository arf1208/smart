<?php
/**
 * api-proxy.php - Jembatan Aman ke Gemini AI
 */
require_once 'config.php';
protect_page(); // Hanya user login yang bisa panggil AI

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$prompt = $input['prompt'] ?? '';
$instruction = $input['instruction'] ?? '';
$isJson = $input['isJson'] ?? false;

if (empty($prompt)) {
    echo json_encode(['error' => 'Prompt kosong.']);
    exit;
}

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $API_KEY;

$data = [
    "contents" => [["parts" => [["text" => $prompt]]]],
    "systemInstruction" => ["parts" => [["text" => $instruction]]],
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
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

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
