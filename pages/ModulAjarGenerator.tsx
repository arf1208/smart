
import React, { useState } from 'react';
import { generateModulAjar } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';
import { Icons } from '../constants';

const ModulAjarGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    teacherName: 'Budi Santoso, S.Pd',
    level: EducationLevel.SMA,
    fase: Fase.E,
    subject: '',
    topic: '',
    duration: '2x45 Menit'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await generateModulAjar(formData);
      setResult(data || 'Gagal generate konten.');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menghubungi.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    if (!result) return;

    // Simple Markdown to HTML converter for professional Word Export
    const convertMarkdownToHtml = (md: string) => {
      return md
        .replace(/^### (.*$)/gim, '<h3 style="margin-top:14pt; margin-bottom:4pt; font-family:Arial, sans-serif;">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 style="margin-top:18pt; margin-bottom:6pt; font-family:Arial, sans-serif; border-bottom: 1px solid #eee;">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 style="text-align:center; margin-bottom:20pt; font-family:Arial, sans-serif;">$1</h1>')
        .replace(/^\d+\.\s+(.*$)/gim, '<p style="margin-left:20pt; text-indent:-20pt; margin-bottom:6pt;">$1</p>')
        .replace(/^[\*-]\s+(.*$)/gim, '<li style="margin-left:20pt; margin-bottom:4pt;">$1</li>')
        .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
        .replace(/\*(.*?)\*/gim, '<i>$1</i>')
        .split('\n').map(line => line.trim() === '' ? '<br>' : (line.startsWith('<') ? line : `<p style="margin-bottom:8pt; text-align:justify;">${line}</p>`)).join('');
    };

    const htmlContent = convertMarkdownToHtml(result);

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Modul Ajar</title>
        <style>
          @page {
            size: A4;
            margin: 2.54cm;
          }
          body {
            font-family: "Times New Roman", serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
          }
          h1, h2, h3 { color: #2c3e50; }
        </style>
      </head>
      <body>
        <div style="margin-bottom: 30pt; text-align: center; border-bottom: 2px solid #000; padding-bottom: 10pt;">
          <h2 style="margin: 0; font-size: 16pt;">MODUL AJAR KURIKULUM MERDEKA</h2>
          <p style="margin: 5pt 0 0 0; font-size: 12pt; font-weight: bold;">${formData.subject.toUpperCase()} - ${formData.topic.toUpperCase()}</p>
        </div>
        ${htmlContent}
      </body>
      </html>
    `;
    
    const blob = new Blob(['\ufeff', header], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = url;
    fileDownload.download = `Modul_Ajar_${formData.subject.replace(/\s/g, '_')}_${formData.teacherName.replace(/\s/g, '_')}.doc`;
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Kurikulum Merdeka Compliance
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1e293b] leading-[1.1] tracking-tight">
            Susun Modul Ajar<br/>
            <span className="text-blue-600">Sempurna & Sistematis.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Satu dokumen lengkap berisi Identitas, P5, Langkah Pembelajaran, hingga Asesmen dalam hitungan detik.
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
                  <h3 className="text-xl font-bold text-slate-800">Identitas Penulis</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Nama Guru Lengkap</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                      value={formData.teacherName}
                      onChange={e => setFormData({...formData, teacherName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Jenjang</label>
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
                        value={formData.level}
                        onChange={e => setFormData({...formData, level: e.target.value as EducationLevel})}
                      >
                        {Object.values(EducationLevel).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Fase</label>
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
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
                  <h3 className="text-xl font-bold text-slate-800">Detail Pembelajaran</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Mata Pelajaran</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
                      placeholder="Contoh: Fisika"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Topik Utama</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
                      placeholder="Contoh: Medan Magnet"
                      value={formData.topic}
                      onChange={e => setFormData({...formData, topic: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Alokasi Waktu</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
                      placeholder="Contoh: 3 JP (3x45 menit)"
                      value={formData.duration}
                      onChange={e => setFormData({...formData, duration: e.target.value})}
                      required
                    />
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
                {loading ? 'Menyusun Modul Ajar...' : 'Generate Modul Ajar Sekarang'}
              </div>
            </button>
          </form>
        </div>

        {result && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white p-8 md:p-12 rounded-[32px] border border-slate-100 shadow-xl space-y-8 print-container">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100 no-print">
                <div>
                  <h3 className="text-2xl font-black text-slate-800">Draf Modul Ajar</h3>
                  <p className="text-slate-500 font-medium mt-1">Dokumen siap tinjau dan kustomisasi.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleExportWord}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 transition-all hover:bg-slate-100"
                  >
                    <Icons.Download /> Word
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 transition-all hover:bg-blue-700"
                  >
                    <Icons.Download /> Cetak PDF
                  </button>
                </div>
              </div>
              <div id="printable-modul-content" className="prose prose-slate max-w-none bg-slate-50 p-10 rounded-[24px] border border-slate-200 font-serif leading-relaxed whitespace-pre-wrap print:bg-white print:border-none print:p-0">
                {result}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulAjarGenerator;
