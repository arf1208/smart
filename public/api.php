<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$API_KEY = getenv('GEMINI_API_KEY') ?: 'YOUR_GEMINI_API_KEY_HERE';

$input = json_decode(file_get_contents('php://input'), true);
$prompt = $input['prompt'] ?? '';
$instruction = $input['instruction'] ?? '';
$isJson = $input['isJson'] ?? false;

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
echo $response;
curl_close($ch);
