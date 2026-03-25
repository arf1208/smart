import React, { useState } from 'react';
import { ArrowLeft, Printer, Copy } from 'lucide-react';
import { generateContent } from '../services/geminiService';

interface BankSoalPageProps {
  onBack: () => void;
}

const BankSoalPage: React.FC<BankSoalPageProps> = ({ onBack }) => {
  const [subject, setSubject] = useState('');
  const [count, setCount] = useState(5);
  const [fase, setFase] = useState('E');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!subject) return;
    setLoading(true);
    setResult(null);
    
    const prompt = `Hasilkan ${count} soal Pilihan Ganda HOTS untuk Mapel: ${subject}, Fase: ${fase}. WAJIB JSON: { "soal": [ { "pertanyaan": "...", "opsi": ["A", "B", "C", "D", "E"], "jawabanBenar": "A" } ] }`;
    const instruction = "Anda adalah pakar evaluasi pendidikan. Buat soal yang menantang dan sesuai kurikulum.";

    try {
      const content = await generateContent(prompt, instruction, true);
      const data = JSON.parse(content || '{}');
      setResult(data);
    } catch (error) {
      alert('Gagal membuat soal.');
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
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Generator Bank Soal</h2>
          <p className="text-slate-500 font-medium mt-2 text-lg">Hasilkan soal HOTS pilihan ganda atau essay secara kilat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mata Pelajaran</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Contoh: Matematika" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" />
          </div>
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Jumlah Soal</label>
            <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" />
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
          {loading ? 'SEDANG MENYUSUN...' : 'GENERATE BANK SOAL'}
        </button>
      </div>

      {result && result.soal && (
        <div className="mt-16 animate-in fade-in duration-700">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pratinjau Soal</h3>
            <div className="flex gap-4">
              <button onClick={() => window.print()} className="p-4 bg-slate-50 hover:bg-red-50 text-red-600 rounded-2xl border border-slate-100 transition-all font-black uppercase text-xs tracking-widest"><Printer size={20} /></button>
              <button onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))} className="p-4 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-2xl border border-slate-100 transition-all font-black uppercase text-xs tracking-widest"><Copy size={20} /></button>
            </div>
          </div>
          <div className="bg-white p-16 md:p-24 rounded-[60px] shadow-2xl border border-slate-50 print:shadow-none print:p-0">
            <div className="space-y-12 font-serif text-slate-900">
              <h1 className="text-3xl font-black text-center uppercase border-b-4 border-black pb-6 mb-12">Bank Soal: {subject}</h1>
              {result.soal.map((s: any, i: number) => (
                <div key={i} className="space-y-4">
                  <p className="text-xl font-bold">{i + 1}. {s.pertanyaan}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
                    {s.opsi.map((opt: string, idx: number) => (
                      <p key={idx} className="text-lg font-medium">{String.fromCharCode(65 + idx)}. {opt}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSoalPage;
