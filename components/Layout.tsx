
import React, { useState, useEffect } from 'react';
import { School, Settings, X, Key, Check } from 'lucide-react';
import { APP_LOGO_URL } from '../constants';
import { setDynamicApiKey } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout, searchTerm, setSearchTerm }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('user_gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setDynamicApiKey(savedKey);
    }
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('user_gemini_api_key', apiKey);
    setDynamicApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setShowSettings(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-['Inter']">
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-12 z-20 no-print shrink-0">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            setActiveTab('dashboard');
            setSearchTerm('');
          }}
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-200/50 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
            <img 
              src={APP_LOGO_URL} 
              alt="Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain p-1.5"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <School className="text-blue-600 w-6 h-6 hidden" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none group-hover:text-blue-600 transition-colors font-serif">Smart School</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-1">Asisten Digital Guru</p>
          </div>
        </div>

        {/* Global Search Bar in Header */}
        <div className="hidden lg:flex flex-1 max-w-md mx-12">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder={activeTab === 'library' ? "Cari buku, penulis..." : "Cari fitur..."}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none font-bold text-xs transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
            title="Pengaturan API Key"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setActiveTab('tutorial')}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'tutorial' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Tutorial
          </button>
          <div className="flex items-center">
             <button 
               onClick={onLogout}
               className="flex items-center gap-2 px-5 py-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl font-bold text-sm transition-all group border border-transparent hover:border-red-100"
             >
               <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
               <span className="hidden md:inline">Keluar</span>
             </button>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Key className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Pengaturan API</h3>
                </div>
                <button onClick={() => setShowSettings(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
                Jika Anda menggunakan StackBlitz atau lingkungan tanpa menu Secrets, masukkan API Key Gemini Anda di sini. Kunci akan disimpan di browser Anda.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gemini API Key</label>
                  <div className="relative">
                    <input 
                      type="password"
                      placeholder="AIzaSy..."
                      className="w-full pl-4 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-600 outline-none font-bold text-sm transition-all"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSaveKey}
                  disabled={!apiKey}
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    isSaved ? 'bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-5 h-5" />
                      Tersimpan
                    </>
                  ) : (
                    'Simpan Pengaturan'
                  )}
                </button>
                
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center text-xs text-blue-600 font-bold hover:underline mt-4"
                >
                  Dapatkan API Key Gratis di Sini
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#fcfdfe]">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
