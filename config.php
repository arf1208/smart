<?php
/**
 * config.php - Pengaturan Global
 */
session_start();

// GANTI DENGAN API KEY GEMINI ANDA
$API_KEY = "YOUR_GEMINI_API_KEY_HERE";

// Fungsi untuk proteksi halaman (harus login)
function protect_page() {
    if (!isset($_SESSION['user'])) {
        header("Location: login.php");
        exit;
    }
}
?>
