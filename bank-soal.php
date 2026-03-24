<?php
/**
 * bank-soal.php
 */
require_once 'config.php';
protect_page();
include 'header.php';
?>

<main class="max-w-6xl mx-auto p-8">
    <a href="index.php" class="mb-10 flex items-center gap-3 text-slate-400 font-black hover:text-blue-600 transition-colors uppercase tracking-widest text-xs no-print">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Kembali ke Dashboard
    </a>

    <div class="bg-white rounded-[48px] border border-slate-100 p-12 shadow-2xl shadow-slate-200/50 no-print">
        <div class="mb-12">
            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Generator Bank Soal</h2>
            <p class="text-slate-500 font-medium mt-2 text-lg">Hasilkan soal HOTS pilihan ganda atau essay secara kilat.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
                <label class="input-label">Mata Pelajaran</label>
                <input type="text" x-model="formData.subject" placeholder="Contoh: Matematika" class="serasi-input">
            </div>
            <div>
                <label class="input-label">Jumlah Soal</label>
                <input type="number" x-model="formData.count" class="serasi-input">
            </div>
            <div>
                <label class="input-label">Fase Kurikulum</label>
                <select x-model="formData.fase" class="serasi-input">
                    <option value="A">Fase A (Kelas 1-2)</option>
                    <option value="B">Fase B (Kelas 3-4)</option>
                    <option value="C">Fase C (Kelas 5-6)</option>
                    <option value="D">Fase D (Kelas 7-9)</option>
                    <option value="E">Fase E (Kelas 10)</option>
                    <option value="F">Fase F (Kelas 11-12)</option>
                </select>
            </div>
        </div>

        <button @click="handleGenerate('soal')" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-7 rounded-3xl shadow-xl transition-all disabled:opacity-50 text-xl uppercase tracking-[0.2em]">
            <span x-show="!loading">GENERATE BANK SOAL</span>
            <span x-show="loading" class="flex items-center justify-center gap-3">
                <svg class="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                SEDANG MENYUSUN...
            </span>
        </button>
    </div>

    <!-- HASIL -->
    <div x-show="result" class="mt-16 animate-in fade-in duration-700">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8 no-print bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg">
            <h3 class="text-2xl font-black text-slate-900 tracking-tight">Pratinjau Soal</h3>
            <div class="flex gap-4">
                <button @click="window.print()" class="p-4 bg-slate-50 hover:bg-red-50 text-red-600 rounded-2xl border border-slate-100 transition-all font-black uppercase text-xs tracking-widest">Cetak / PDF</button>
                <button @click="copyToClipboard()" class="p-4 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-2xl border border-slate-100 transition-all font-black uppercase text-xs tracking-widest">Salin Teks</button>
            </div>
        </div>
        <div class="bg-white p-16 md:p-24 rounded-[60px] shadow-2xl border border-slate-50 print:shadow-none print:p-0">
            <div class="space-y-12 font-serif text-slate-900">
                <h1 class="text-3xl font-black text-center uppercase border-b-4 border-black pb-6 mb-12">Bank Soal: <span x-text="formData.subject"></span></h1>
                <template x-for="(s, i) in result.soal" :key="i">
                    <div class="space-y-4">
                        <p class="text-xl font-bold"><span x-text="i+1"></span>. <span x-text="s.pertanyaan"></span></p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
                            <template x-for="(opt, idx) in s.opsi" :key="idx">
                                <p class="text-lg font-medium"><span x-text="String.fromCharCode(65+idx)"></span>. <span x-text="opt"></span></p>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</main>

<?php include 'footer.php'; ?>
