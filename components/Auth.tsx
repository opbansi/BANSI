
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface AuthProps {
  initialMode?: 'login' | 'signup';
  onLogin: (user: User) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ initialMode = 'login', onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      username: username || (isLogin ? 'Operator' : 'New_Operative'),
      number: number,
      password: password,
      email: `${username || 'ops'}@joystickjester.shop`,
      status: 'online'
    });
  };

  const animeLoop = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJicnJmcmZyeXlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyJnB0PWEmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/3o7TKVUn7iM8FMEU24/giphy.gif";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 animate-anime-reveal">
      <div className="absolute inset-0 bg-dark/95 backdrop-blur-3xl" onClick={onClose}></div>
      
      {/* Anime Background Loop for Auth */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none overflow-hidden scale-110">
        <img src={animeLoop} alt="auth-anime" className="w-full h-full object-cover grayscale mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.15),transparent_70%)]"></div>
      </div>

      <div className="relative bg-dark-card/40 backdrop-blur-3xl border-2 border-white/10 w-full max-w-md h-full sm:h-auto sm:rounded-[3rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.8)] flex flex-col justify-center transform transition-all duration-700 hover:border-neon-blue/30">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white p-2 z-30 transition-colors">
           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5} /></svg>
        </button>

        <div className="p-8 md:p-14 space-y-10">
          <div className="text-center space-y-4">
            <div className={`inline-block p-4 ${isLogin ? 'bg-neon-blue/10 border-neon-blue/20' : 'bg-neon-purple/10 border-neon-purple/20'} rounded-3xl border mb-4 shadow-2xl transition-colors duration-500`}>
              <svg className={`w-10 h-10 ${isLogin ? 'text-neon-blue' : 'text-neon-purple'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-white font-gaming text-4xl font-black uppercase italic tracking-tighter drop-shadow-2xl">
              {isLogin ? 'Access Node' : 'Create ID'}
            </h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] font-black">Secure Jester Protocol v4.0</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 uppercase tracking-widest font-black ml-4">Full Name</label>
                <input required value={username} onChange={e => setUsername(e.target.value)} placeholder="ENTER YOUR TAG" className="w-full bg-dark/60 border border-white/10 p-5 focus:border-neon-purple outline-none transition-all text-white placeholder:text-gray-800 rounded-2xl font-black text-xs uppercase tracking-widest shadow-inner" />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[9px] text-gray-500 uppercase tracking-widest font-black ml-4">Mobile Number</label>
              <input required value={number} onChange={e => setNumber(e.target.value)} placeholder="9971XXXXXX" className="w-full bg-dark/60 border border-white/10 p-5 focus:border-neon-blue outline-none transition-all text-white placeholder:text-gray-800 rounded-2xl font-black text-xs uppercase tracking-widest shadow-inner" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-gray-500 uppercase tracking-widest font-black ml-4">Secret Passkey</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-dark/60 border border-white/10 p-5 focus:border-neon-blue outline-none transition-all text-white placeholder:text-gray-800 rounded-2xl font-black text-xs uppercase tracking-widest shadow-inner" />
            </div>

            <button type="submit" className={`w-full py-6 ${isLogin ? 'bg-neon-blue' : 'bg-neon-purple'} text-white font-black uppercase tracking-[0.6em] text-[11px] hover:bg-white hover:text-dark transition-all rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] transform active:scale-95 mt-6 border border-white/10`}>
              {isLogin ? 'Establish Link' : 'Authorize Account'}
            </button>
          </form>

          <div className="pt-4 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-gray-500 text-[10px] uppercase font-black hover:text-white transition-colors tracking-[0.3em]">
              {isLogin ? "NEW OPERATIVE? SIGNUP HERE" : "ALREADY ENLISTED? LOGIN HERE"}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes anime-reveal {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .animate-anime-reveal {
          animation: anime-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slow-zoom { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .animate-slow-zoom { animation: slow-zoom 20s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default Auth;
