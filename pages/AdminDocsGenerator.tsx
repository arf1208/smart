
import React, { useState } from 'react';
import { generateAdminDocs } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';
import { SUBJECTS } from '../constants';

const AdminDocsGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    teacherName: 'Budi Santoso, S.Pd',
    level: EducationLevel.SMA,
    fase: Fase.E,
    subject: '',
    docType: 'ATP' as 'ATP' | 'CP' | 'RPP'
  });

  const renderDocument = (text: string) => {
    let html = text
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/\|(.+)\|/g, (match) => {
        if (match.includes('---')) return '';
        const cells = match.split('|').filter(c => c.trim() !== '');
        return `<tr>${cells.map(c => `<td class="border border-slate-300 p-4 text-sm font-medium">${c.trim()}</td>`).join('')}</tr>`;
      })
      .replace(/(<tr>.*<\/tr>)+/g, match => `<table class="w-full border-collapse my-8 bg-white shadow-sm border-2 border-slate-200"><tbody>${match}</tbody></table>`)
      .replace(/^## (.*$)/gim, '<h2 class="admin-h2">$1</h2>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-black text-slate-900">$1</strong>')
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
    a.download = `${formData.docType}_${formData.subject}.doc`;
    a.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setResult(null);
    try {
      const data = await generateAdminDocs(formData);
      setResult(data || 'Gagal generate konten.');
    } catch (err: any) {
      alert('Terjadi kesalahan: ' + (err.message || 'Silakan coba lagi.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <div className="pt-16 pb-12 px-8 text-center bg-white border-b border-slate-100 no-print">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Administrasi <span className="text-amber-600">Kurikulum Merdeka</span></h1>
        <p className="text-lg text-slate-500 mt-4 font-medium">Pemetaan CP, Alur Tujuan Pembelajaran (ATP), dan RPP secara otomatis.</p>
      </div>

      <div className="max-w-5xl mx-auto mt-[-40px] px-8">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 no-print">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-3 gap-6">
              {['ATP', 'CP', 'RPP'].map(t => (
                <button 
                  key={t} 
                  type="button" 
                  onClick={() => setFormData({...formData, docType: t as any})} 
                  className={`py-5 rounded-2xl font-black text-lg border-2 transition-all ${
                    formData.docType === t 
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xl shadow-amber-100' 
                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-amber-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                 <label className="label">Mata Pelajaran</label>
                 <input 
                   className="input-field" 
                   placeholder="Ketik nama mata pelajaran (Contoh: Sejarah)" 
                   value={formData.subject} 
                   onChange={e => setFormData({...formData, subject: e.target.value})} 
                   required 
                 />
               </div>
               <div className="space-y-3">
                 <label className="label">Fase / Kelas</label>
                 <select className="input-field" value={formData.fase} onChange={e => setFormData({...formData, fase: e.target.value as Fase})}>
                   {Object.values(Fase).map(v => <option key={v} value={v}>{v}</option>)}
                 </select>
               </div>
            </div>
            <button className="w-full bg-slate-900 text-white font-black py-6 rounded-3xl shadow-xl transition-all hover:bg-black text-lg">
              Generate Dokumen Sekarang
            </button>
          </form>
        </div>

        {result && (
          <div className="mt-16 animate-in fade-in duration-700">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print bg-white p-6 rounded-[32px] border border-slate-200 shadow-md">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Pratinjau Dokumen Berhasil Dibuat</h3>
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
               <div className="mb-12 border-b-2 border-slate-100 pb-8">
                  <h2 className="text-3xl font-black text-slate-900 uppercase">Dokumen {formData.docType}</h2>
                  <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest">{formData.subject} - {formData.fase}</p>
               </div>
               <div className="admin-renderer" dangerouslySetInnerHTML={renderDocument(result)} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .label { @apply text-xs font-black text-slate-400 uppercase tracking-widest ml-1; }
        .input-field { @apply w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-bold text-slate-700; }
        .admin-renderer { @apply leading-[1.9] text-lg text-slate-800; }
        .admin-h2 { @apply text-2xl font-black text-slate-900 mt-12 mb-6 border-l-8 border-amber-600 pl-6 bg-slate-50 py-4 rounded-r-3xl; }
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

export default AdminDocsGenerator;
