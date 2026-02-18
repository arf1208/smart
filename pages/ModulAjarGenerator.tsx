
import React, { useState } from 'react';
import { generateModulAjar } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';

const ModulAjarGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({
    teacherName: 'Budi Santoso, S.Pd',
    level: EducationLevel.SMA,
    fase: Fase.E,
    subject: '',
    topic: '',
    duration: '2x45 Menit'
  });

  const renderDocument = (text: string) => {
    let html = text
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/\|(.+)\|/g, (match) => {
        if (match.includes('---')) return '';
        const cells = match.split('|').filter(c => c.trim() !== '');
        return `<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`;
      })
      .replace(/(<tr>.*<\/tr>)+/g, match => `<div class="overflow-x-auto my-6"><table class="doc-table"><tbody>${match}</tbody></table></div>`)
      .replace(/^### (.*$)/gim, '<h3 class="doc-h3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="doc-h2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="doc-h1">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/^\s*[\*-]\s+(.*$)/gim, '<li class="doc-li doc-disc">$1</li>')
      .replace(/\n\n/g, '<div class="h-4"></div>')
      .replace(/\n/g, '<br />');
    
    return { __html: html };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await generateModulAjar(formData);
      setResult(data || 'Gagal generate konten.');
    } catch (err) {
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24 font-['Inter']">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Header - Hilangkan PRO */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">ADMINISTRASI GURU</div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Generator <span className="text-blue-600">Modul Ajar</span></h1>
          <p className="text-slate-500 font-medium mt-1">Susun administrasi Kurikulum Merdeka secara sistematis dan serasi.</p>
        </div>

        {/* FORM - SIMETRIS & BERSIH */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-10 md:p-14 shadow-2xl shadow-slate-200/50 no-print">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {/* Kolom-kolom Input */}
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Penyusun</label>
                <input className="serasi-input" value={formData.teacherName} onChange={e => setFormData({...formData, teacherName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mata Pelajaran</label>
                <input className="serasi-input" placeholder="Contoh: Fisika" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Topik Utama</label>
                <input className="serasi-input" placeholder="Contoh: Energi Terbarukan" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Jenjang Pendidikan</label>
                <select className="serasi-input" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value as EducationLevel})}>
                  {Object.values(EducationLevel).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Fase Pembelajaran</label>
                <select className="serasi-input" value={formData.fase} onChange={e => setFormData({...formData, fase: e.target.value as Fase})}>
                  {Object.values(Fase).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Durasi Waktu</label>
                <input className="serasi-input" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-[0.99] disabled:opacity-50 text-lg uppercase tracking-widest">
              {loading ? 'SISTEM SEDANG MENYUSUN...' : 'GENERATE MODUL AJAR'}
            </button>
          </form>
        </div>

        {/* Hasil */}
        {result && (
          <div className="mt-20">
            <div className="flex justify-between items-center mb-8 no-print">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Pratinjau Dokumen</h3>
              <div className="flex gap-3">
                <button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-xl">Cetak</button>
                <button onClick={() => { navigator.clipboard.writeText(result); setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); }} className="bg-slate-100 text-slate-600 px-8 py-3.5 rounded-xl font-bold transition-all">{copySuccess ? 'Tersalin!' : 'Salin'}</button>
              </div>
            </div>
            <div className="bg-white p-12 md:p-24 rounded-[48px] shadow-2xl border border-slate-100">
               <div className="document-renderer" dangerouslySetInnerHTML={renderDocument(result)} />
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
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        .document-renderer { font-family: 'Inter', sans-serif; color: #1e293b; line-height: 1.8; }
        .doc-h1 { @apply text-3xl font-black text-center mb-10 text-slate-900 uppercase; }
        .doc-h2 { @apply text-xl font-black text-slate-900 mt-12 mb-4 border-l-4 border-blue-600 pl-4; }
        .doc-table { @apply w-full border-collapse my-6; }
        .doc-table td { @apply border border-slate-200 p-3 text-sm font-medium; }
        strong { @apply font-black text-slate-950; }
      `}</style>
    </div>
  );
};

export default ModulAjarGenerator;
