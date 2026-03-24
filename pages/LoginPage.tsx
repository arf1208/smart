import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/users.json');
      const users = await response.json();
      const user = users.find((u: any) => (u.email === email || u.username === email) && u.password === password);
      
      if (user) {
        onLogin({ name: user.name, email: user.email, username: user.username });
      } else {
        setError('Email atau Password salah.');
      }
    } catch (err) {
      setError('Gagal memproses login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 border border-slate-100 animate-in fade-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight font-serif">Smart School</h1>
          <p className="text-slate-500 font-medium mt-2">Masuk untuk mulai berinovasi</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email / Username</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" />
          </div>
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Kata Sandi</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-2xl shadow-xl transition-all uppercase tracking-widest disabled:opacity-50">
            {loading ? 'Masuk...' : 'Masuk Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
