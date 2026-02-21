
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ModulAjarGenerator from './pages/ModulAjarGenerator';
import QuestionGenerator from './pages/QuestionGenerator';
import Library from './pages/Library';
import LKPDGenerator from './pages/LKPDGenerator';
import AdminDocsGenerator from './pages/AdminDocsGenerator';
import LoginPage from './pages/LoginPage';
import Tutorial from './pages/Tutorial';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    // Shared back button component for sub-pages
    const BackButton = () => (
      <div className="max-w-7xl mx-auto px-6 pt-8 no-print">
        <button 
          onClick={() => setActiveTab('dashboard')}
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
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'modul':
        return <><BackButton /><ModulAjarGenerator /></>;
      case 'soal':
        return <><BackButton /><QuestionGenerator /></>;
      case 'lkpd':
        return <><BackButton /><LKPDGenerator /></>;
      case 'admin-docs':
        return <><BackButton /><AdminDocsGenerator /></>;
      case 'library':
        return <><BackButton /><Library /></>;
      case 'tutorial':
        return <><BackButton /><Tutorial /></>;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsLoggedIn(false)}>
      {renderContent()}
      <footer className="mt-12 py-8 border-t border-slate-200 text-center no-print">
        <p className="text-slate-400 text-sm">
          Copyright &copy; 2026 Smart School. All rights reserved. <br/>
          Inovasi Digital Pendidikan Indonesia •
        </p>
      </footer>
    </Layout>
  );
};

export default App;
