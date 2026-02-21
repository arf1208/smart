
import React from 'react';
import { School } from 'lucide-react';
import { APP_LOGO_URL } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-['Inter']">
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-12 z-20 no-print shrink-0">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-200/50 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
            <img 
              src={APP_LOGO_URL} 
              alt="Logo" 
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
        
        <div className="flex items-center gap-6">
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
