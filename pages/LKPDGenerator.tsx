
import React, { useState } from 'react';
import { generateLKPD } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';
import { Icons } from '../constants';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await generateLKPD(formData);
      setResult(data || 'Gagal generate konten.');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <div className="pt-16 pb-12 px-8 text-center bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-xs font-bold uppercase tracking-wider">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Student Engagement Optimized
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1e293b] leading-[1.1] tracking-tight">
            Lembar Kerja<br/>
            <span className="text-emerald-600">Interaktif & Eksploratif.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Desain aktivitas siswa yang menantang nalar kritis dengan instruksi yang jelas dan rubrik penilaian terukur.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-[-40px] px-8">
        <div className="bg-white rounded-[32px] shadow-2xl shadow-emerald-100/50 border border-slate-100 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Penyusun</label>
                <input 
                  type="text"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium"
                  value={formData.teacherName}
                  onChange={e => setFormData({...formData, teacherName: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Mata Pelajaran</label>
                  <input 
                    type="text"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium"
                    placeholder="Contoh: Biologi"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Topik Kegiatan</label>
                  <input 
                    type="text"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium"
                    placeholder="Contoh: Rantai Makanan"
                    value={formData.topic}
                    onChange={e => setFormData({...formData, topic: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-6 rounded-3xl shadow-xl shadow-emerald-100 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Menyusun Struktur LKPD...' : 'Hasilkan LKPD Sekarang'}
            </button>
          </form>
        </div>

        {result && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white p-10 md:p-16 rounded-[32px] border border-slate-100 shadow-xl space-y-8">
              <div className="flex items-center justify-between pb-8 border-b border-slate-100">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Draf LKPD Profesional</h3>
                <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100">Cetak Sekarang</button>
              </div>
              <div className="prose prose-emerald max-w-none bg-slate-50 p-12 rounded-[24px] border border-dashed border-slate-300 whitespace-pre-wrap font-serif leading-relaxed">
                {result}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LKPDGenerator;
