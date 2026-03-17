
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ModulAjarGenerator from './pages/ModulAjarGenerator';
import QuestionGenerator from './pages/QuestionGenerator';
import Library from './pages/Library';
import LKPDGenerator from './pages/LKPDGenerator';
import AdminDocsGenerator from './pages/AdminDocsGenerator';
import LoginPage from './pages/LoginPage';
import Tutorial from './pages/Tutorial';
import { APP_LOGO_URL } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    // Shared back button component for sub-pages
    const BackButton = () => (
      <div className="max-w-7xl mx-auto px-6 pt-8 no-print">
        <button 
          onClick={() => {
            setActiveTab('dashboard');
            setSearchTerm('');
          }}
          className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 hover:text-blue-600 transition-all shadow-sm"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Menu Utama
        </button>
      </div>
    );

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
      case 'modul':
        return <><BackButton /><ModulAjarGenerator /></>;
      case 'soal':
        return <><BackButton /><QuestionGenerator /></>;
      case 'lkpd':
        return <><BackButton /><LKPDGenerator /></>;
      case 'admin-docs':
        return <><BackButton /><AdminDocsGenerator /></>;
      case 'library':
        return <><BackButton /><Library searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></>;
      case 'tutorial':
        return <><BackButton /><Tutorial /></>;
      default:
        return <Dashboard setActiveTab={setActiveTab} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#fcfdfe] z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Abstract Shapes */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-48 -right-48 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-30"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              className="relative"
            >
              {/* Outer Glow */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-400 rounded-[40px] blur-2xl"
              />
              
              <div className="relative w-32 h-32 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(8,112,184,0.12)] flex items-center justify-center p-5 border border-white/50 backdrop-blur-sm">
                <motion.img 
                  src={APP_LOGO_URL} 
                  alt="Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="mt-12 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-black text-slate-800 tracking-tight font-serif"
              >
                Smart School
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.7 }}
                className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mt-3"
              >
                Pusat Inovasi Guru Indonesia
              </motion.p>
            </div>

            {/* Progress Bar Container */}
            <div className="mt-10 w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Shimmer effect on progress bar */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
              />
            </div>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-[10px] font-black text-blue-600/60 font-mono"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Arftech Digital Solution</span>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          {!isLoggedIn ? (
            <LoginPage onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <Layout 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLogout={() => setIsLoggedIn(false)}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            >
              {renderContent()}
              <footer className="mt-12 py-12 border-t border-slate-100 text-center no-print space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  &copy; 2026 Arftech. dev
                </p>
                <p className="text-[10px] font-medium text-slate-300">
                  Inovasi Digital Pendidikan Indonesia • All rights reserved.
                </p>
              </footer>
            </Layout>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
