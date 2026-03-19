
import React, { useState } from 'react';
import { School } from 'lucide-react';
import { APP_LOGO_URL } from '../constants';
import { useToast } from '../context/ToastContext';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Silakan masukkan email dan kata sandi Anda.', 'error');
      return;
    }
    setLoading(true);
    console.log(`Sending login request for: ${email}`);
    
    try {
      // Menggunakan login.php agar kompatibel saat di-deploy ke hosting PHP
      const response = await fetch('/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Login failed with status ${response.status}: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login response data:', data);
      
      if (data.success) {
        showToast(`Selamat datang, ${data.user.name}!`, 'success');
        onLogin();
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Gagal terhubung ke server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex items-center justify-center p-6 relative overflow-hidden font-['Inter']">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="login-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#login-grid)" />
        </svg>
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[28px] shadow-2xl shadow-slate-200 mb-6 overflow-hidden border border-slate-100">
             <img 
               src={APP_LOGO_URL} 
               alt="Logo" 
               referrerPolicy="no-referrer"
               className="w-full h-full object-contain p-2"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 const fallback = e.currentTarget.nextElementSibling;
                 if (fallback) fallback.classList.remove('hidden');
               }}
             />
             <School className="text-blue-600 w-12 h-12 hidden" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight font-serif">Smart School</h1>
          <p className="text-slate-500 font-medium mt-2">Pusat Inovasi Guru Indonesia</p>
        </div>

        <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 border border-slate-100 p-10">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Selamat Datang</h2>
              <p className="text-sm text-slate-400 font-medium mt-1">Silakan masuk ke akun Anda</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email / Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="Masukkan email/username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-700">Kata Sandi</label>
                <button 
                  type="button"
                  onClick={() => showToast('Fitur Pemulihan Kata Sandi: Silakan hubungi Admin IT sekolah Anda untuk reset password.', 'info')}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Lupa Sandi?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 text-lg mt-4"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Menghubungkan...
                </>
              ) : (
                'Masuk Sekarang'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium mb-4">Belum punya akses Smart School?</p>
            <a 
              href="https://sekolah-ku.myscalev.com/c/checkout?variant_ids=456638&qty=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-4 px-6 rounded-2xl transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">Aktivasi Akun Selamanya</span>
              <span className="text-lg font-black mt-1 group-hover:scale-105 transition-transform">Beli Akses — Rp 49.000</span>
            </a>
          </div>
        </div>

        <div className="text-center mt-8 space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            &copy; 2026 Arftech. dev
          </p>
          <p className="text-[10px] font-medium text-slate-300">
            Inovasi Digital Pendidikan Indonesia • All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
