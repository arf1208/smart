
import React, { useState } from 'react';
import { generateLKPD } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';
import { SUBJECTS } from '../constants';

const LKPDGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    teacherName: 'Budi Santoso, S.Pd',
    level: EducationLevel.SMP,
    fase: Fase.D,
    subject: '',
    topic: ''
  });

  const renderDocument = (text: string) => {
    let html = text
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/^## (.*$)/gim, '<h2 class="lkpd-h2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="lkpd-h3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/^\s*[\*-]\s+(.*$)/gim, '<li class="lkpd-li">$1</li>')
      .replace(/\n\n/g, '<div class="h-6"></div>')
      .replace(/\n/g, '<br />');
    
    return { __html: html };
  };

  const exportToWord = () => {
    if (!result) return;
    const content = result.replace(/\n/g, '<br/>');
    const style = `
      <style>
        body { font-family: 'Times New Roman', serif; line-height: 1.6; padding: 2cm; }
        h1, h2, h3 { text-align: center; }
        table { width: 100%; border-collapse: collapse; }
        td, th { border: 1px solid black; padding: 8px; }
      </style>
    `;
    const blob = new Blob(['\ufeff', `<html><head>${style}</head><body>${content}</body></html>`], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LKPD_${formData.subject}.doc`;
    a.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setResult(null);
    try {
      const data = await generateLKPD(formData);
      setResult(data || 'Gagal generate konten.');
    } catch (err: any) {
      alert('Terjadi kesalahan: ' + (err.message || 'Silakan coba lagi.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24 font-['Inter']">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="mb-10 no-print">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">LEMBAR KERJA SISWA</div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Generator <span className="text-emerald-600">LKPD Kreatif</span></h1>
          <p className="text-slate-500 font-medium mt-1">Ciptakan lembar kerja yang menantang eksplorasi siswa.</p>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-100 p-10 md:p-14 shadow-2xl shadow-slate-200/50 no-print">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mata Pelajaran</label>
                <input 
                  className="serasi-input" 
                  placeholder="Ketik nama mata pelajaran (Contoh: IPA)" 
                  value={formData.subject} 
                  onChange={e => setFormData({...formData, subject: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Fase / Kelas</label>
                <select className="serasi-input" value={formData.fase} onChange={e => setFormData({...formData, fase: e.target.value as Fase})}>
                  {Object.values(Fase).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Jenjang Pendidikan</label>
                <select className="serasi-input" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value as EducationLevel})}>
                  {Object.values(EducationLevel).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Topik Eksplorasi</label>
                <input className="serasi-input" placeholder="Contoh: Rantai Makanan" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Penyusun</label>
                <input className="serasi-input" value={formData.teacherName} onChange={e => setFormData({...formData, teacherName: e.target.value})} />
              </div>
            </div>
            <button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-6 rounded-2xl shadow-xl transition-all uppercase tracking-widest">
              {loading ? 'MERANCANG LKPD...' : 'HASILKAN LKPD SEKARANG'}
            </button>
          </form>
        </div>

        {result && (
          <div className="mt-16">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print bg-white p-6 rounded-[32px] border border-slate-200 shadow-md">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Pratinjau LKPD Berhasil Dibuat</h3>
              <div className="flex gap-4">
                <button onClick={() => window.print()} className="logo-btn hover:bg-red-50 border-red-100 group" title="Cetak / PDF">
                  <svg className="w-8 h-8 text-red-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span className="text-[10px] font-black text-red-600 mt-1 uppercase">Cetak</span>
                </button>
                <button onClick={exportToWord} className="logo-btn hover:bg-blue-50 border-blue-100 group" title="Download MS Word">
                  <svg className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M9 15l2 2 4-4"></path>
                  </svg>
                  <span className="text-[10px] font-black text-blue-600 mt-1 uppercase">Word</span>
                </button>
                <button onClick={() => { navigator.clipboard.writeText(result); alert('Tersalin ke clipboard!'); }} className="logo-btn hover:bg-slate-50 border-slate-200 group" title="Salin Teks">
                  <svg className="w-8 h-8 text-slate-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span className="text-[10px] font-black text-slate-600 mt-1 uppercase">Salin</span>
                </button>
              </div>
            </div>
            <div id="printable-area" className="bg-white p-16 md:p-24 rounded-[48px] shadow-2xl border border-slate-100 print:shadow-none print:border-none print:p-0">
               <div className="lkpd-renderer" dangerouslySetInnerHTML={renderDocument(result)} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .serasi-input { 
          width: 100%;
          padding: 1rem 1.5rem;
          background-color: #ffffff !important;
          border: 2px solid #e2e8f0;
          border-radius: 1rem;
          outline: none;
          font-weight: 700;
          color: #1e293b;
          transition: all 0.2s;
        }
        .serasi-input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
        .logo-btn { @apply flex flex-col items-center justify-center w-20 h-20 rounded-[24px] border border-slate-100 bg-white transition-all active:scale-95 shadow-sm; }

        @media print {
          .no-print, header, aside, .BackButton-container { display: none !important; }
          body { background: white !important; }
          #root { display: block !important; }
          #printable-area { border: none !important; padding: 0 !important; margin: 0 !important; }
          .max-w-5xl { max-width: 100% !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default LKPDGenerator;
