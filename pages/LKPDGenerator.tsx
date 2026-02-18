
import React, { useState } from 'react';
import { generateLKPD } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await generateLKPD(formData);
      setResult(data || 'Gagal generate konten.');
    } catch (err) {
      alert('Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24 font-['Inter']">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">LEMBAR KERJA SISWA</div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Generator <span className="text-emerald-600">LKPD Kreatif</span></h1>
          <p className="text-slate-500 font-medium mt-1">Ciptakan lembar kerja yang menantang eksplorasi siswa.</p>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-100 p-10 md:p-14 shadow-2xl shadow-slate-200/50 no-print">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mata Pelajaran</label>
                <input className="serasi-input" placeholder="Contoh: IPA" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required />
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
            <div className="bg-white p-16 md:p-24 rounded-[48px] shadow-2xl border border-slate-100">
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
      `}</style>
    </div>
  );
};

export default LKPDGenerator;
