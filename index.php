<?php
/**
 * index.php - Dashboard Utama
 */
require_once 'config.php';
protect_page();

include 'header.php';
?>

<main class="max-w-6xl mx-auto p-8">
    <div class="mb-12">
        <h2 class="text-4xl font-black text-slate-900 tracking-tight">Pusat <span class="text-blue-600">Inovasi Guru</span></h2>
        <p class="text-slate-500 font-medium mt-2 text-lg">Pilih alat bantu administrasi yang ingin Anda buat hari ini.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Modul Ajar -->
        <a href="modul-ajar.php" class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:scale-[1.03] transition-all cursor-pointer group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors"></div>
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10 bg-blue-50 text-blue-600 transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-3 relative z-10">Modul Ajar</h3>
            <p class="text-slate-500 font-medium leading-relaxed relative z-10">Susun administrasi Kurikulum Merdeka otomatis.</p>
        </a>

        <!-- Bank Soal -->
        <a href="bank-soal.php" class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:scale-[1.03] transition-all cursor-pointer group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-indigo-50 transition-colors"></div>
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10 bg-indigo-50 text-indigo-600 transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-3 relative z-10">Bank Soal</h3>
            <p class="text-slate-500 font-medium leading-relaxed relative z-10">Hasilkan soal HOTS pilihan ganda atau essay.</p>
        </a>

        <!-- LKPD -->
        <a href="lkpd.php" class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:scale-[1.03] transition-all cursor-pointer group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-50 transition-colors"></div>
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10 bg-emerald-50 text-emerald-600 transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-3 relative z-10">LKPD Interaktif</h3>
            <p class="text-slate-500 font-medium leading-relaxed relative z-10">Lembar Kerja Peserta Didik yang kontekstual.</p>
        </a>

        <!-- Admin Guru -->
        <a href="admin-docs.php" class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:scale-[1.03] transition-all cursor-pointer group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-amber-50 transition-colors"></div>
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10 bg-amber-50 text-amber-600 transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-3 relative z-10">Admin Guru</h3>
            <p class="text-slate-500 font-medium leading-relaxed relative z-10">Hasilkan ATP, CP, dan RPP dalam hitungan detik.</p>
        </a>
    </div>
</main>

<?php include 'footer.php'; ?>
