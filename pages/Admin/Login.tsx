
import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin password updated to 1111
    if (password === '1111') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-24 h-24 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-slate-300 animate-in fade-in zoom-in duration-500">
        <Lock size={40} />
      </div>
      
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">관리자 로그인</h2>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Admin Access Only</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6">
        <div className="relative">
          <input 
            type="password" 
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="••••"
            maxLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`
              w-full p-6 bg-white border-2 border-slate-100 rounded-[2rem] outline-none focus:border-slate-900 transition-all text-center text-4xl font-black tracking-[1em]
              ${error ? 'border-rose-300 ring-4 ring-rose-50 animate-shake' : ''}
            `}
          />
        </div>

        {error && (
          <div className="flex items-center justify-center gap-2 text-rose-500 text-xs font-bold animate-in slide-in-from-top-2">
            <AlertCircle size={14} /> 비밀번호가 올바르지 않습니다.
          </div>
        )}

        <button 
          type="submit"
          disabled={password.length < 4}
          className="w-full py-5 bg-slate-900 disabled:bg-slate-200 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-slate-200"
        >
          Login <ArrowRight size={20} />
        </button>
      </form>

      <p className="mt-16 text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center leading-relaxed">
        Default: 1111 <br/>
        Contact IT support if needed.
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
