
import React, { useState } from 'react';
import { generateQuestions } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';

const QuestionGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    teacherName: 'Budi Santoso, S.Pd',
    level: EducationLevel.SMA,
    fase: Fase.E,
    kelas: '10-A',
    subject: '',
    count: 10,
    type: 'Pilihan Ganda' as 'Pilihan Ganda' | 'Essay',
    difficulty: 'Sedang' as 'Mudah' | 'Sedang' | 'Sulit'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await generateQuestions(formData);
      setResult(data);
    } catch (err) {
      alert('Gagal generate soal.');
    } finally {
      setLoading(false);
    }
  };

  const exportToWord = () => {
    if (!result) return;
    const content = document.getElementById('printable-area')?.innerHTML;
    const style = `
      <style>
        body { font-family: 'Times New Roman', serif; line-height: 1.5; padding: 2cm; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid black; padding: 8px; font-size: 11pt; }
        .no-border td { border: none; }
        h1, h2, h3 { text-align: center; margin: 10px 0; }
        .question-block { margin-bottom: 15px; page-break-inside: avoid; }
      </style>
    `;
    const blob = new Blob(['\ufeff', `<html><head>${style}</head><body>${content}</body></html>`], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Soal_Asesmen_${formData.subject}.doc`;
    a.click();
  };

  const exportToExcel = () => {
    if (!result) return;
    let csv = "Nomor,Pertanyaan,Kunci,Penjelasan\n";
    result.soal?.forEach((s: any) => {
      csv += `"${s.nomor}","${s.pertanyaan.replace(/"/g, '""')}","${s.jawabanBenar}","${s.penjelasan.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Data_Soal_${formData.subject}.csv`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-['Inter']">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="mb-10 text-center md:text-left no-print">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">SISTEM ASESMEN TERPADU</div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Generator <span className="text-indigo-600">Bank Soal</span></h1>
          <p className="text-slate-500 font-medium mt-1">Hasilkan soal ujian resmi dengan struktur yang sangat rapi.</p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-[40px] border border-slate-200 p-10 md:p-12 shadow-xl shadow-slate-200/50 no-print mb-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="input-label">Mata Pelajaran</label>
                <input className="serasi-input" placeholder="Misal: Biologi" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="input-label">Kelas / Rombel</label>
                <input className="serasi-input" placeholder="Misal: 10-A" value={formData.kelas} onChange={e => setFormData({...formData, kelas: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="input-label">Fase Kurikulum</label>
                <select className="serasi-input" value={formData.fase} onChange={e => setFormData({...formData, fase: e.target.value as Fase})}>
                  {Object.values(Fase).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="input-label">Jumlah Soal</label>
                <input type="number" min="1" max="50" className="serasi-input" value={formData.count} onChange={e => setFormData({...formData, count: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="input-label">Bentuk Soal</label>
                <select className="serasi-input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                  <option>Pilihan Ganda</option>
                  <option>Essay</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="input-label">Tingkat Kesulitan</label>
                <select className="serasi-input" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value as any})}>
                  <option>Mudah</option>
                  <option>Sedang</option>
                  <option>Sulit</option>
                </select>
              </div>
              <div className="lg:col-span-3 space-y-2">
                <label className="input-label">Nama Lengkap Guru Penyusun</label>
                <input className="serasi-input" value={formData.teacherName} onChange={e => setFormData({...formData, teacherName: e.target.value})} />
              </div>
            </div>

            <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-6 rounded-2xl shadow-xl transition-all uppercase tracking-[0.2em]">
              {loading ? 'PROSES MENYUSUN SOAL...' : 'HASILKAN SOAL ASESMEN'}
            </button>
          </form>
        </div>

        {/* Action Toolbar with Logos */}
        {result && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print bg-white p-6 rounded-[32px] border border-slate-200 shadow-md">
            <h3 className="text-xl font-black text-slate-800">Pratinjau Soal</h3>
            <div className="flex gap-4">
              {/* PDF Button */}
              <button onClick={handlePrint} className="logo-btn hover:bg-red-50 border-red-100 group" title="Download PDF / Cetak">
                <svg className="w-8 h-8 text-red-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="text-[10px] font-black text-red-600 mt-1 uppercase">PDF</span>
              </button>
              {/* Word Button */}
              <button onClick={exportToWord} className="logo-btn hover:bg-blue-50 border-blue-100 group" title="Download MS Word">
                <svg className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M9 15l2 2 4-4"></path>
                </svg>
                <span className="text-[10px] font-black text-blue-600 mt-1 uppercase">Word</span>
              </button>
              {/* Excel Button */}
              <button onClick={exportToExcel} className="logo-btn hover:bg-emerald-50 border-emerald-100 group" title="Download Excel">
                <svg className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                <span className="text-[10px] font-black text-emerald-600 mt-1 uppercase">Excel</span>
              </button>
            </div>
          </div>
        )}

        {/* Printable Area */}
        {result && (
          <div id="printable-area" className="bg-white p-12 md:p-20 rounded-[48px] shadow-2xl border border-slate-200 print:shadow-none print:border-none print:p-0 font-serif text-slate-900 leading-relaxed">
            
            <div className="text-center border-b-4 border-double border-black pb-8 mb-12">
              <h2 className="text-2xl font-black uppercase tracking-widest">Soal Asesmen Sumatif</h2>
              <h1 className="text-3xl font-black uppercase mt-2">{formData.subject}</h1>
              <div className="mt-8 flex justify-center">
                <table className="w-auto text-left font-bold text-sm border-none no-border printable-header-table">
                  <tbody>
                    <tr><td className="pr-4">Mata Pelajaran</td><td className="px-2">:</td><td>{formData.subject}</td><td className="pl-12 pr-4">Kelas / Rombel</td><td className="px-2">:</td><td>{formData.kelas}</td></tr>
                    <tr><td className="pr-4">Tahun Pelajaran</td><td className="px-2">:</td><td>2025/2026</td><td className="pl-12 pr-4">Penyusun</td><td className="px-2">:</td><td>{formData.teacherName}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-20">
              <h3 className="text-center font-black text-xl mb-8 underline underline-offset-8 uppercase">BAGIAN I: KISI-KISI PENYUSUNAN SOAL</h3>
              <table className="w-full border-collapse border-2 border-black">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border-2 border-black p-3 text-center text-sm font-black w-12">No</th>
                    <th className="border-2 border-black p-3 text-left text-sm font-black w-1/4">Materi Esensial</th>
                    <th className="border-2 border-black p-3 text-left text-sm font-black">Indikator Pencapaian Kompetensi</th>
                    <th className="border-2 border-black p-3 text-center text-sm font-black w-24">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {result.kisiKisi?.map((k: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border-2 border-black p-3 text-center font-bold align-top">{idx + 1}</td>
                      <td className="border-2 border-black p-3 text-sm font-bold uppercase align-top">{k.materi}</td>
                      <td className="border-2 border-black p-3 text-sm italic align-top">{k.indikator}</td>
                      <td className="border-2 border-black p-3 text-center font-black text-indigo-700 align-top">{k.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-20">
              <h3 className="text-center font-black text-xl mb-12 underline underline-offset-8 uppercase">BAGIAN II: INSTRUMEN SOAL UTAMA</h3>
              <div className="space-y-10">
                {result.soal?.map((s: any) => (
                  <div key={s.nomor} className="question-block break-inside-avoid">
                    <div className="flex gap-4 items-start">
                      <span className="font-bold text-lg min-w-[2.5rem]">{s.nomor}.</span>
                      <div className="flex-1 space-y-4">
                        {s.stimulus && (
                          <div className="p-6 bg-slate-50 border border-slate-200 text-slate-800 italic leading-relaxed text-base mb-4">
                            {s.stimulus}
                          </div>
                        )}
                        <p className="text-lg font-bold text-slate-900 leading-snug">{s.pertanyaan}</p>
                        {s.opsi && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mt-4">
                            {s.opsi.map((o: string, i: number) => (
                              <div key={i} className="flex gap-3 text-base">
                                <span className="font-bold">{String.fromCharCode(65+i)}.</span>
                                <span>{o}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {formData.type === 'Essay' && <div className="h-32 border-b-2 border-dashed border-slate-200 mt-4"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-24 pt-16 border-t-4 border-double border-black page-break-before">
              <h3 className="text-center font-black text-xl mb-8 underline underline-offset-8 uppercase">BAGIAN III: KUNCI JAWABAN & PEMBAHASAN</h3>
              <table className="w-full border-collapse border-2 border-black">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border-2 border-black p-3 text-center font-black w-16">No</th>
                    <th className="border-2 border-black p-3 text-center font-black w-24">Kunci</th>
                    <th className="border-2 border-black p-3 text-left font-black">Uraian / Penjelasan</th>
                  </tr>
                </thead>
                <tbody>
                  {result.soal?.map((s: any) => (
                    <tr key={s.nomor}>
                      <td className="border-2 border-black p-3 text-center font-bold align-top">{s.nomor}</td>
                      <td className="border-2 border-black p-3 text-center font-black text-emerald-700 align-top">{s.jawabanBenar}</td>
                      <td className="border-2 border-black p-3 text-sm italic text-slate-600 align-top">{s.penjelasan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .input-label { @apply block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1; }
        .serasi-input { 
          width: 100%;
          padding: 1.15rem 1.5rem;
          background-color: #ffffff !important;
          border: 2px solid #e2e8f0;
          border-radius: 1.25rem;
          outline: none;
          font-weight: 700;
          color: #1e293b;
          transition: all 0.2s;
        }
        .serasi-input:focus { border-color: #4f46e5; box-shadow: 0 0 0 5px rgba(79, 70, 229, 0.1); }
        .logo-btn { @apply flex flex-col items-center justify-center w-20 h-20 rounded-[24px] border border-slate-100 bg-white transition-all active:scale-95 shadow-sm; }
        
        @media print {
          .no-print, header, aside, .BackButton-container { display: none !important; }
          body { background: white !important; }
          #root { display: block !important; }
          #printable-area { border: none !important; padding: 0 !important; margin: 0 !important; }
          .page-break-before { page-break-before: always; }
          .printable-header-table td { border: none !important; padding: 2px 8px !important; }
        }
      `}</style>
    </div>
  );
};

export default QuestionGenerator;
