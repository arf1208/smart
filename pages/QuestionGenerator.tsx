
import React, { useState } from 'react';
import { generateQuestions } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';
import { Icons } from '../constants';

const QuestionGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    teacherName: 'Budi Santoso, S.Pd',
    level: EducationLevel.SMA,
    fase: Fase.E,
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
      console.error(err);
      alert('Gagal generate soal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    const contentElement = document.getElementById('printable-soal-content');
    if (!contentElement || !result) return;

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Bank Soal</title>
      <style>
        @page { size: A4; margin: 2cm; }
        body { font-family: "Times New Roman", serif; font-size: 11pt; line-height: 1.4; }
        h1 { text-align: center; font-size: 16pt; margin-bottom: 20pt; text-transform: uppercase; }
        .soal-item { margin-bottom: 15pt; page-break-inside: avoid; }
        .soal-text { font-weight: bold; margin-bottom: 8pt; }
        .opsi-container { margin-left: 20pt; margin-bottom: 10pt; }
        .opsi-item { margin-bottom: 3pt; }
        .kunci-box { margin-top: 10pt; padding: 10pt; background: #f9f9f9; border: 1pt solid #ddd; font-style: italic; font-size: 10pt; }
        .header-meta { border-bottom: 2pt solid #000; margin-bottom: 20pt; padding-bottom: 10pt; }
      </style>
      </head><body>
      <div class="header-meta">
        <h1 style="margin:0;">BANK SOAL ASESMEN</h1>
        <p style="margin:0; text-align:center;">Mata Pelajaran: <b>${formData.subject}</b> | Jenjang: <b>${formData.level}</b></p>
        <p style="margin:0; text-align:center;">Penyusun: <b>${formData.teacherName}</b></p>
      </div>
      <div id="content">
    `;
    
    // Clean content by removing UI-only elements for a clean Word Doc
    const cleanContent = Array.from(contentElement.querySelectorAll('.soal-item')).map((item, idx) => {
      const qText = item.querySelector('.soal-text')?.textContent;
      const options = Array.from(item.querySelectorAll('.opsi-item-text')).map((opt, i) => 
        `<div class="opsi-item">${String.fromCharCode(65 + i)}. ${opt.textContent}</div>`
      ).join('');
      const answer = item.querySelector('.kunci-jawaban-text')?.textContent;
      
      return `
        <div class="soal-item">
          <div class="soal-text">${idx + 1}. ${qText}</div>
          <div class="opsi-container">${options}</div>
          <div class="kunci-box"><b>Kunci & Pembahasan:</b> ${answer}</div>
        </div>
      `;
    }).join('');

    const footer = "</div></body></html>";
    const sourceHTML = header + cleanContent + footer;
    
    const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = url;
    fileDownload.download = `Bank_Soal_${formData.subject.replace(/\s/g, '_')}_${formData.teacherName.replace(/\s/g, '_')}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="pt-16 pb-12 px-8 text-center bg-white border-b border-slate-100 relative overflow-hidden no-print">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100"><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern><rect width="100" height="100" fill="url(#grid)" /></svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 text-xs font-bold uppercase tracking-wider">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Teknologi Gemini 3.0 Generative
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e293b] leading-[1.1] tracking-tight">
            Buat Soal Ujian Berkualitas<br/>
            <span className="text-blue-600">Tanpa Ribet & Instan.</span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Asisten cerdas guru Indonesia. Hasilkan soal berbasis HOTS yang relevan dengan Kurikulum Merdeka hanya dalam satu klik.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-[-40px] px-8">
        <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 border border-slate-100 p-8 md:p-12 no-print">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-800">Identitas Pengajar</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Nama Guru Pembuat
                    </label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                      placeholder="Contoh: Budi Santoso, S.Pd"
                      value={formData.teacherName}
                      onChange={e => setFormData({...formData, teacherName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                        Jenjang
                      </label>
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium text-sm"
                        value={formData.level}
                        onChange={e => setFormData({...formData, level: e.target.value as EducationLevel})}
                      >
                        {Object.values(EducationLevel).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                        Fase
                      </label>
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium text-sm"
                        value={formData.fase}
                        onChange={e => setFormData({...formData, fase: e.target.value as Fase})}
                      >
                        {Object.values(Fase).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-800">Kriteria Soal</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Jumlah Soal
                      </label>
                      <input 
                        type="number"
                        min="1" max="50"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                        value={formData.count}
                        onChange={e => setFormData({...formData, count: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                        Tipe Soal
                      </label>
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value as any})}
                      >
                        <option value="Pilihan Ganda">Pilihan Ganda</option>
                        <option value="Essay">Essay</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      Mata Pelajaran
                    </label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                      placeholder="Contoh: Matematika / Fisika / Bahasa"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                      Tingkat Kesulitan
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Mudah', 'Sedang', 'Sulit'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({...formData, difficulty: level as any})}
                          className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                            formData.difficulty === level 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                              : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-3xl shadow-2xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-4 text-xl">
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Menyusun Soal HOTS...
                  </>
                ) : (
                  <>
                    Hasilkan Soal Sekarang
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white p-8 md:p-12 rounded-[32px] border border-slate-100 shadow-xl space-y-10 print-container">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100 no-print">
                <div>
                  <h3 className="text-2xl font-black text-slate-800">Hasil Bank Soal</h3>
                  <p className="text-slate-500 font-medium mt-1">{result.header}</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleExportWord}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-2xl border border-slate-200 transition-all"
                  >
                    <Icons.Download /> Word
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-100"
                  >
                    <Icons.Download /> Cetak PDF
                  </button>
                </div>
              </div>

              <div id="printable-soal-content" className="space-y-12">
                <div className="print-only hidden text-center w-full mb-8">
                  <h1 className="text-2xl font-black">{result.header}</h1>
                  <p className="text-slate-500 font-bold uppercase tracking-widest mt-2 border-b-2 border-slate-900 pb-4">Dokumen Asesmen Kurikulum Merdeka</p>
                </div>

                {result.soal.map((s: any, i: number) => (
                  <div key={i} className="group relative break-inside-avoid soal-item">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 no-print">
                        {s.nomor}
                      </div>
                      <div className="flex-1 space-y-6">
                        <p className="text-xl font-bold text-slate-800 leading-relaxed soal-text">
                          <span className="print-only hidden">{s.nomor}. </span>
                          {s.pertanyaan}
                        </p>
                        
                        {s.opsi && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opsi-list">
                            {s.opsi.map((opt: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group/opt hover:border-blue-200 hover:bg-blue-50 transition-all cursor-default print:bg-white print:border-slate-200">
                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400 group-hover/opt:text-blue-500 group-hover/opt:border-blue-200 shadow-sm transition-all shrink-0">
                                  {String.fromCharCode(65 + idx)}
                                </div>
                                <span className="text-slate-700 font-medium opsi-item-text">{opt}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[24px] space-y-3 print:border-slate-200 print:mt-4 kunci-jawaban">
                          <div className="flex items-center gap-2 text-emerald-700 font-black text-sm uppercase tracking-wider no-print">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Kunci Jawaban & Pembahasan
                          </div>
                          <p className="text-slate-800 font-bold"><span className="text-emerald-600">Jawaban Benar:</span> {s.jawabanBenar}</p>
                          <p className="text-slate-600 text-sm leading-relaxed kunci-jawaban-text"><span className="font-bold text-slate-800">Jawaban ${s.jawabanBenar}. Penjelasan:</span> {s.penjelasan}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 break-before-page no-print-section">
                <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 print:bg-white print:border-slate-200">
                   <h4 className="flex items-center gap-2 text-xl font-black text-slate-800 mb-4">
                     <svg className="w-6 h-6 text-blue-600 no-print" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                     Kisi-kisi Penyusunan Soal
                   </h4>
                   <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{result.kisiKisi}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionGenerator;
