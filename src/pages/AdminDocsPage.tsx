import React, { useState } from 'react';
import { ArrowLeft, Printer, Copy } from 'lucide-react';
import { generateContent } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AdminDocsPageProps {
  onBack: () => void;
}

const AdminDocsPage: React.FC<AdminDocsPageProps> = ({ onBack }) => {
  const [subject, setSubject] = useState('');
  const [docType, setDocType] = useState('ATP');
  const [fase, setFase] = useState('E');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!subject) return;
    setLoading(true);
    setResult('');
    
    const prompt = `Buatkan dokumen ${docType} untuk Mapel: ${subject}, Fase: ${fase}.`;
    const instruction = "Anda adalah pakar administrasi pendidikan. Buat dokumen yang baku dan sesuai format Kurikulum Merdeka.";

    try {
      const content = await generateContent(prompt, instruction);
      setResult(content || '');
    } catch (error) {
      alert('Gagal membuat dokumen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 p-8 max-w-6xl mx-auto">
      <button onClick={onBack} className="mb-10 flex items-center gap-3 text-slate-400 font-black hover:text-blue-600 transition-colors uppercase tracking-widest text-xs no-print">
        <ArrowLeft size={16} /> Kembali ke Dashboard
      </button>

      <div className="bg-white rounded-[48px] border border-slate-100 p-12 shadow-2xl shadow-slate-200/50 no-print">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Generator Admin Guru</h2>
          <p className="text-slate-500 font-medium mt-2 text-lg">Hasilkan ATP, CP, dan RPP dalam hitungan detik.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mata Pelajaran</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Contoh: Bahasa Indonesia" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" />
          </div>
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Jenis Dokumen</label>
            <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all">
              <option value="ATP">ATP (Alur Tujuan Pembelajaran)</option>
              <option value="CP">CP (Capaian Pembelajaran)</option>
              <option value="RPP">RPP Sederhana</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Fase Kurikulum</label>
            <select value={fase} onChange={(e) => setFase(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all">
              <option value="A">Fase A (Kelas 1-2)</option>
              <option value="B">Fase B (Kelas 3-4)</option>
              <option value="C">Fase C (Kelas 5-6)</option>
              <option value="D">Fase D (Kelas 7-9)</option>
              <option value="E">Fase E (Kelas 10)</option>
              <option value="F">Fase F (Kelas 11-12)</option>
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-7 rounded-3xl shadow-xl transition-all disabled:opacity-50 text-xl uppercase tracking-[0.2em]">
          {loading ? 'SEDANG MENYUSUN...' : 'GENERATE DOKUMEN'}
        </button>
      </div>

      {result && (
        <div className="mt-16 animate-in fade-in duration-700">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pratinjau Dokumen</h3>
            <div className="flex gap-4">
              <button onClick={() => window.print()} className="p-4 bg-slate-50 hover:bg-red-50 text-red-600 rounded-2xl border border-slate-100 transition-all font-black uppercase text-xs tracking-widest"><Printer size={20} /></button>
              <button onClick={() => navigator.clipboard.writeText(result)} className="p-4 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-2xl border border-slate-100 transition-all font-black uppercase text-xs tracking-widest"><Copy size={20} /></button>
            </div>
          </div>
          <div className="bg-white p-16 md:p-24 rounded-[60px] shadow-2xl border border-slate-50 print:shadow-none print:p-0">
            <div className="prose prose-slate max-w-none leading-relaxed text-lg text-slate-800 whitespace-pre-line">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocsPage;
