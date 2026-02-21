
import React from 'react';

const Tutorial: React.FC = () => {
  const steps = [
    {
      title: 'Generate Modul Ajar',
      desc: 'Masukkan nama guru, mata pelajaran, topik, dan durasi. Klik tombol generate untuk mendapatkan modul ajar lengkap sesuai Kurikulum Merdeka.',
      icon: '📘'
    },
    {
      title: 'Membuat Bank Soal',
      desc: 'Tentukan jumlah soal, tingkat kesulitan, dan bentuk soal (PG/Essay). Sistem akan menghasilkan soal berbasis HOTS beserta kunci jawaban.',
      icon: '📝'
    },
    {
      title: 'Menyusun LKPD',
      desc: 'Gunakan fitur Generator LKPD untuk membuat lembar kerja siswa yang interaktif dengan langkah kerja dan pertanyaan analisis.',
      icon: '📋'
    },
    {
      title: 'Administrasi Guru',
      desc: 'Generate dokumen ATP, CP, atau RPP secara otomatis dengan format yang rapi dan sesuai standar Kemendikbudristek.',
      icon: '📁'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24 font-['Inter']">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">PANDUAN PENGGUNA</div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pusat <span className="text-blue-600">Edukasi Smart School</span></h1>
          <p className="text-slate-500 font-medium mt-2">Pelajari cara memaksimalkan fitur asisten digital untuk produktivitas mengajar Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-6">{step.icon}</div>
              <h3 className="text-xl font-black text-slate-800 mb-3">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 rounded-[40px] p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <h3 className="text-2xl font-black mb-4">Masih Butuh Bantuan?</h3>
          <p className="text-blue-100 font-medium mb-8">Tim support kami siap membantu Anda 24/7 melalui saluran WhatsApp resmi.</p>
          <button 
            onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
            className="px-10 py-4 bg-white text-blue-600 font-black rounded-2xl shadow-xl hover:scale-105 transition-all"
          >
            Hubungi Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
