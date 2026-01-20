
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  cartCount: number;
  onCartClick: () => void;
  currentUser: User | null;
  onAuthClick: (mode: 'login' | 'signup') => void;
  onAdminClick: () => void;
  onOrdersClick: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  searchQuery, 
  cartCount, 
  onCartClick, 
  currentUser, 
  onAuthClick,
  onAdminClick,
  onOrdersClick,
  onProfileClick,
  onLogout
}) => {
  const handleSearchInteraction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      alert("Neural Access Required: Please LOGIN to use search sector protocols.");
      return;
    }
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-dark/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl transition-all duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-4 h-24 flex items-center justify-between gap-3 md:gap-6">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2 shrink-0 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="relative w-10 h-10 md:w-14 md:h-14 bg-neon-purple flex items-center justify-center rounded-xl md:rounded-2xl transform md:rotate-12 group-hover:rotate-0 transition-all duration-700 shadow-[0_0_15px_rgba(108,92,231,0.4)]">
            <span className="text-white font-gaming text-xl md:text-3xl font-black italic">J</span>
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-white font-gaming text-xs md:text-2xl font-black tracking-tighter uppercase italic leading-none drop-shadow-[0_0_10px_rgba(0,210,255,0.3)]">
              JOYSTICK<span className="text-neon-blue">JESTER</span>
            </span>
            <span className="text-gray-600 text-[5px] md:text-[9px] font-black tracking-[0.5em] uppercase mt-1">joystickjester.shop</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-[150px] md:max-w-md relative group">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInteraction}
              placeholder={currentUser ? "Sector..." : "Login"}
              className={`w-full bg-dark-surface/60 border border-white/10 rounded-xl md:rounded-2xl px-4 py-2 md:px-8 md:py-3.5 text-[9px] md:text-xs outline-none transition-all md:pl-12 text-white uppercase tracking-[0.1em] font-black placeholder:text-gray-700 shadow-inner focus:border-neon-blue ${!currentUser && 'cursor-not-allowed opacity-50'}`}
            />
            <svg className="hidden md:block w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within:text-neon-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
          {/* Admin Command Link for Master */}
          {currentUser?.isAdmin && (
            <button onClick={onAdminClick} className="hidden lg:flex px-4 py-2.5 bg-neon-blue/10 border border-neon-blue/30 text-neon-blue rounded-xl text-[8px] font-black uppercase tracking-[0.2em] hover:bg-neon-blue hover:text-dark transition-all shadow-lg animate-pulse">
               👑 COMMAND
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-2 md:gap-3">
              <div onClick={onProfileClick} className="flex items-center space-x-2 cursor-pointer group">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-neon-blue transition-all">
                  {currentUser.profilePic ? (
                    <img src={currentUser.profilePic} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-neon-blue font-gaming text-sm md:text-xl">{currentUser.username[0].toUpperCase()}</span>
                  )}
                </div>
              </div>
              <button onClick={onLogout} className="p-2.5 bg-neon-pink/10 border border-neon-pink/30 text-neon-pink rounded-xl hover:bg-neon-pink hover:text-white transition-all transform active:scale-95 shrink-0 shadow-[0_0_10px_rgba(255,0,85,0.2)]">
                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 md:space-x-3">
              <button 
                onClick={() => onAuthClick('login')} 
                className="px-2.5 md:px-5 py-2 md:py-3 bg-white/5 border border-white/10 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-dark transition-all transform active:scale-95"
              >
                LOGIN
              </button>
              <button 
                onClick={() => onAuthClick('signup')} 
                className="px-2.5 md:px-5 py-2 md:py-3 bg-neon-purple text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-neon-blue transition-all border border-white/10 transform active:scale-95 shadow-[0_0_15px_rgba(108,92,231,0.4)]"
              >
                SIGNUP
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
