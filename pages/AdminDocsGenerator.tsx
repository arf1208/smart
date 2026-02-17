
import React, { useState } from 'react';
import { generateAdminDocs } from '../services/geminiService';
import { EducationLevel, Fase } from '../types';
import { Icons } from '../constants';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await generateAdminDocs(formData);
      setResult(data || 'Gagal generate konten.');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportWord = () => {
    if (!result) return;

    // Standard Markdown to HTML for Academic Admin Docs
    const convertMarkdownToHtml = (md: string) => {
      return md
        .replace(/^### (.*$)/gim, '<h3 style="margin-top:12pt; margin-bottom:4pt; color:#34495e;">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 style="margin-top:16pt; margin-bottom:6pt; border-bottom:1pt solid #ccc; padding-bottom:3pt; color:#2c3e50;">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 style="text-align:center; margin-bottom:20pt; font-size:18pt; color:#2c3e50;">$1</h1>')
        .replace(/^[\*-]\s+(.*$)/gim, '<li style="margin-bottom:3pt;">$1</li>')
        .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
        .replace(/\n/gim, '<br>');
    };

    const htmlContent = convertMarkdownToHtml(result);

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${formData.docType}</title>
      <style>
        @page { size: A4; margin: 2.5cm; }
        body { font-family: "Times New Roman", serif; font-size: 11pt; line-height: 1.4; }
      </style>
      </head><body>
      <div style="text-align:center; border-bottom:2pt solid #000; margin-bottom:20pt; padding-bottom:10pt;">
        <h2 style="margin:0;">DOKUMEN ADMINISTRASI GURU</h2>
        <p style="margin:0; font-weight:bold;">TIPE DOKUMEN: ${formData.docType} | MATA PELAJARAN: ${formData.subject.toUpperCase()}</p>
      </div>
      ${htmlContent}
      </body></html>
    `;
    
    const blob = new Blob(['\ufeff', header], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = url;
    fileDownload.download = `Admin_${formData.docType}_${formData.subject.replace(/\s/g, '_')}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
    URL.revokeObjectURL(url);
  };

  const docDesc = {
    'ATP': 'Alur logis pengajaran satu fase penuh untuk memastikan tujuan pembelajaran tercapai.',
    'CP': 'Analisis mendalam elemen capaian kompetensi per fase sesuai Standar Nasional Pendidikan.',
    'RPP': 'Rencana harian (Lesson Plan) yang padat, operasional, dan berorientasi pada aksi kelas.'
  };

  return (
    <div className="pb-20">
      <div className="pt-16 pb-12 px-8 text-center bg-white border-b border-slate-100 relative overflow-hidden no-print">
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full border border-amber-100 text-xs font-bold uppercase tracking-wider">
            Admin Governance Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1e293b] leading-[1.1] tracking-tight">
            Administrasi<br/>
            <span className="text-amber-600">Terstruktur & Akuntabel.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Dokumen CP, ATP, dan RPP yang selaras, memudahkan verifikasi pengawas dan memperjelas peta jalan mengajar Anda.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-[-40px] px-8">
        <div className="bg-white rounded-[32px] shadow-2xl shadow-amber-100/50 border border-slate-100 p-8 md:p-12 no-print">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-6">
               <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Pilih Jenis Dokumen</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['ATP', 'CP', 'RPP'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, docType: type})}
                      className={`py-4 rounded-2xl font-black transition-all border ${
                        formData.docType === type 
                          ? 'bg-amber-600 text-white border-amber-600 shadow-lg' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 font-medium italic mt-2 px-2">
                   {docDesc[formData.docType]}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Nama Guru Pembuat</label>
                <input 
                  type="text"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500/20 outline-none font-medium"
                  value={formData.teacherName}
                  onChange={e => setFormData({...formData, teacherName: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Mata Pelajaran</label>
                <input 
                  type="text"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500/20 outline-none font-medium"
                  placeholder="Contoh: Sosiologi"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-6 rounded-3xl shadow-xl shadow-amber-100 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Menganalisis Kurikulum...' : `Hasilkan Dokumen ${formData.docType}`}
            </button>
          </form>
        </div>

        {result && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white p-10 md:p-16 rounded-[32px] border border-slate-100 shadow-xl space-y-8 print-container">
              <div className="flex items-center justify-between pb-8 border-b border-slate-100 no-print">
                <h3 className="text-2xl font-black text-slate-800">Review Dokumen {formData.docType}</h3>
                <button 
                  onClick={handleExportWord}
                  className="px-6 py-3 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-700 transition-colors shadow-lg shadow-amber-100"
                >
                  Ekspor Word
                </button>
              </div>
              <div className="prose prose-amber max-w-none bg-slate-50 p-12 rounded-[24px] border border-slate-200 whitespace-pre-wrap font-serif leading-relaxed print:bg-white print:border-none">
                {result}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDocsGenerator;
