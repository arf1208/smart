import React from 'react';
import { BookOpen, FileText, ClipboardList, Settings, LogOut } from 'lucide-react';

interface DashboardPageProps {
  user: any;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigate, onLogout }) => {
  const menus = [
    { id: 'modul', title: 'Modul Ajar', desc: 'Susun administrasi Kurikulum Merdeka otomatis.', icon: <BookOpen />, color: 'bg-blue-50 text-blue-600' },
    { id: 'soal', title: 'Bank Soal', desc: 'Hasilkan soal HOTS pilihan ganda atau essay.', icon: <ClipboardList />, color: 'bg-indigo-50 text-indigo-600' },
    { id: 'lkpd', title: 'LKPD Interaktif', desc: 'Lembar Kerja Peserta Didik yang kontekstual.', icon: <FileText />, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'admin', title: 'Admin Guru', desc: 'Hasilkan ATP, CP, dan RPP dalam hitungan detik.', icon: <Settings />, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <nav className="bg-white border-b border-slate-100 px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-serif tracking-tight">Smart School</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-sm font-black text-slate-900">{user.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.username}</p>
          </div>
          <button onClick={onLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Pusat <span className="text-blue-600">Inovasi Guru</span></h2>
          <p className="text-slate-500 font-medium mt-2 text-lg">Pilih alat bantu administrasi yang ingin Anda buat hari ini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menus.map((menu) => (
            <div key={menu.id} onClick={() => onNavigate(menu.id)} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:scale-[1.03] transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors"></div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10 transition-colors ${menu.color}`}>
                {menu.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 relative z-10">{menu.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed relative z-10">{menu.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
