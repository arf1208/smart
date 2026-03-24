<?php
/**
 * login.php - Halaman Login
 */
require_once 'config.php';

// Logout logic
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: login.php");
    exit;
}

// Login logic
if (isset($_POST['login_action'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $users = json_decode(file_get_contents('users.json'), true);
    
    foreach ($users as $user) {
        if (($user['email'] === $email || $user['username'] === $email) && $user['password'] === $password) {
            $_SESSION['user'] = $user;
            header("Location: index.php");
            exit;
        }
    }
    $login_error = "Email atau Password salah.";
}

// Redirect if already logged in
if (isset($_SESSION['user'])) {
    header("Location: index.php");
    exit;
}

include 'header.php';
?>

<div class="min-h-screen flex items-center justify-center p-6 bg-slate-50">
    <div class="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 border border-slate-100">
        <div class="text-center mb-10">
            <h1 class="text-4xl font-black text-slate-900 tracking-tight font-serif">Smart School</h1>
            <p class="text-slate-500 font-medium mt-2">Masuk untuk mulai berinovasi</p>
        </div>
        
        <?php if (isset($login_error)): ?>
            <div class="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold border border-red-100 animate-pulse">
                <?= $login_error ?>
            </div>
        <?php endif; ?>

        <form method="POST" class="space-y-6">
            <input type="hidden" name="login_action" value="1">
            <div>
                <label class="input-label">Email / Username</label>
                <input type="text" name="email" required class="serasi-input" placeholder="admin@school.com">
            </div>
            <div>
                <label class="input-label">Kata Sandi</label>
                <input type="password" name="password" required class="serasi-input" placeholder="••••••••">
            </div>
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-2xl shadow-xl transition-all uppercase tracking-widest">
                Masuk Sekarang
            </button>
        </form>
    </div>
</div>

<?php include 'footer.php'; ?>
