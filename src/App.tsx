import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ModulAjarPage from './pages/ModulAjarPage';
import BankSoalPage from './pages/BankSoalPage';
import LKPDPage from './pages/LKPDPage';
import AdminDocsPage from './pages/AdminDocsPage';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setActiveTab('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={setActiveTab} user={user} onLogout={handleLogout} />;
      case 'modul':
        return <ModulAjarPage onBack={() => setActiveTab('dashboard')} />;
      case 'soal':
        return <BankSoalPage onBack={() => setActiveTab('dashboard')} />;
      case 'lkpd':
        return <LKPDPage onBack={() => setActiveTab('dashboard')} />;
      case 'admin':
        return <AdminDocsPage onBack={() => setActiveTab('dashboard')} />;
      default:
        return <DashboardPage onNavigate={setActiveTab} user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      {renderContent()}
    </div>
  );
};

export default App;
