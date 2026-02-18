
import React from 'react';
import { Icons } from '../constants';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const menuFeatures = [
    { 
      id: 'modul', 
      name: 'Modul Ajar', 
      desc: 'Buat Modul Ajar Kurikulum Merdeka lengkap dengan P5 & Asesmen.',
      icon: <Icons.Modul />, 
      color: 'bg-blue-600', 
      shadow: 'shadow-blue-100' 
    },
    { 
      id: 'soal', 
      name: 'Asesmen Soal', 
      desc: 'Hasilkan soal Pilihan Ganda & Essay berbasis HOTS secara otomatis.',
      icon: <Icons.Soal />, 
      color: 'bg-indigo-600', 
      shadow: 'shadow-indigo-100' 
    },
    { 
      id: 'lkpd', 
      name: 'Generator LKPD', 
      desc: 'Susun Lembar Kerja Siswa yang interaktif dan eksploratif.',
      icon: <Icons.LKPD />, 
      color: 'bg-emerald-600', 
      shadow: 'shadow-emerald-100' 
    },
    { 
      id: 'admin-docs', 
      name: 'Administrasi (RPP/ATP/CP)', 
      desc: 'Generate dokumen CP, ATP, dan RPP yang akuntabel & sistematis.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ), 
      color: 'bg-amber-600', 
      shadow: 'shadow-amber-100' 
    },
    { 
      id: 'library', 
      name: 'E-Library / Buku Digital', 
      desc: 'Akses buku teks resmi & literatur pedagogis Kemendikbudristek.',
      icon: <Icons.Library />, 
      color: 'bg-slate-700', 
      shadow: 'shadow-slate-100' 
    },
  ];

  return (
    <div className="px-6 md:px-12 py-12 space-y-12">
      <div className="text-center md:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 text-xs font-black uppercase tracking-widest">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Platform Siap Digunakan
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight tracking-tight">
          Apa yang ingin Anda <span className="text-blue-600">kerjakan hari ini?</span>
        </h2>
        <p className="text-lg text-slate-500 font-medium max-w-2xl">
          Pilih salah satu fitur layanan kami di bawah ini untuk membantu mempercepat penyusunan administrasi mengajar Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuFeatures.map((feature) => (
          <div 
            key={feature.id}
            onClick={() => setActiveTab(feature.id)}
            className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${feature.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="relative z-10 space-y-6">
              <div className={`${feature.color} w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-xl ${feature.shadow} group-hover:scale-110 transition-transform duration-500`}>
                {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-black text-sm group-hover:gap-4 transition-all uppercase tracking-widest">
                Mulai Sekarang
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[32px] text-white flex flex-col justify-between shadow-2xl shadow-blue-200">
          <div>
            <h3 className="text-2xl font-black mb-3">Butuh Bantuan?</h3>
            <p className="text-blue-100 font-medium text-sm leading-relaxed">
              Panduan lengkap penggunaan Smart School tersedia di Pusat Edukasi kami.
            </p>
          </div>
          <button className="mt-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3">
            Buka Tutorial
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </div>
      </div>

      <div className="pt-12 border-t border-slate-100">
        <div className="bg-white border border-slate-100 p-10 rounded-[40px] shadow-xl shadow-blue-50/50 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Impact Komunitas</p>
              <h4 className="text-2xl font-black text-slate-800">15,420+ Guru Indonesia</h4>
              <p className="text-slate-500 text-sm font-medium">Telah menggunakan Smart School untuk mempermudah administrasi mengajar.</p>
            </div>
          </div>
          <div className="relative z-10 hidden md:block">
            <div className="px-8 py-4 bg-blue-50 rounded-3xl border border-blue-100">
              <p className="text-blue-600 font-black text-3xl tabular-nums">15.4k+</p>
              <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Total Akses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
