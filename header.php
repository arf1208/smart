<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart School AI - Pusat Inovasi Guru</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Playfair+Display:wght@900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        [x-cloak] { display: none !important; }
        .serasi-input { @apply w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all; }
        .input-label { @apply block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1; }
        @media print { .no-print { display: none !important; } }
    </style>
</head>
<body class="bg-[#fcfdfe] text-slate-800" x-data="appHandler()">

    <!-- NOTIFIKASI TOAST -->
    <div class="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <template x-for="toast in toasts" :key="toast.id">
            <div x-show="toast.show" x-transition class="px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 bg-white min-w-[300px]"
                 :class="toast.type === 'success' ? 'border-emerald-100 text-emerald-700' : 'border-red-100 text-red-700'">
                <span x-text="toast.message" class="font-bold text-sm"></span>
            </div>
        </template>
    </div>

    <?php if (isset($_SESSION['user'])): ?>
    <nav class="bg-white border-b border-slate-100 px-8 py-5 flex justify-between items-center sticky top-0 z-50 no-print">
        <a href="index.php" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span class="text-white font-black text-xl">S</span>
            </div>
            <h1 class="text-2xl font-black text-slate-900 font-serif tracking-tight">Smart School</h1>
        </a>
        <div class="flex items-center gap-6">
            <div class="text-right hidden md:block">
                <p class="text-sm font-black text-slate-900"><?= $_SESSION['user']['name'] ?></p>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><?= $_SESSION['user']['username'] ?></p>
            </div>
            <a href="login.php?logout=1" class="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Keluar</a>
        </div>
    </nav>
    <?php endif; ?>
