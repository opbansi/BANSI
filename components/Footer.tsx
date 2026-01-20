
import React from 'react';

const Footer: React.FC = () => {
  const scrollToStore = () => {
    document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-neon-purple/5 blur-[150px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neon-purple flex items-center justify-center rounded-2xl shadow-[0_0_20px_rgba(108,92,231,0.6)]">
                <span className="text-white font-gaming text-2xl font-black italic">J</span>
              </div>
              <span className="text-white font-gaming text-2xl font-black italic tracking-tighter uppercase">
                JOYSTICK<span className="text-neon-blue">JESTERS</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs font-medium leading-relaxed uppercase tracking-[0.2em]">
              High-end digital terminal for elite gaming assets. Verified Steam keys only. Instant deployment globally at <span className="text-white">joystickjester.shop</span>.
            </p>
            <div className="flex gap-6">
               <div className="flex flex-col">
                 <span className="text-[10px] text-neon-blue font-black uppercase tracking-widest mb-1">Protection</span>
                 <span className="text-xs text-white font-bold">SECURE SSL</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] text-neon-purple font-black uppercase tracking-widest mb-1">Delivery</span>
                 <span className="text-xs text-white font-bold">INSTANT KEY</span>
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-gaming text-xs font-black uppercase tracking-[0.5em] mb-10">Asset Sectors</h4>
            <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <li><button onClick={scrollToStore} className="hover:text-neon-blue transition-all uppercase">Action Operatives</button></li>
              <li><button onClick={scrollToStore} className="hover:text-neon-purple transition-all uppercase">Open World Realms</button></li>
              <li><button onClick={scrollToStore} className="hover:text-neon-blue transition-all uppercase">RPG Odysseys</button></li>
              <li><button onClick={scrollToStore} className="hover:text-neon-purple transition-all uppercase">Adventure Horizons</button></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-gaming text-xs font-black uppercase tracking-[0.5em] mb-10">Protocol Hub</h4>
            <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <li><a href="#" className="hover:text-neon-blue transition-all">Privacy protocol</a></li>
              <li><a href="#" className="hover:text-neon-purple transition-all">Terms of service</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-all">Refund policy</a></li>
              <li><a href="#" className="hover:text-neon-purple transition-all">Key verification</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-gaming text-xs font-black uppercase tracking-[0.5em] mb-10">Status Feed</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-white">Systems Nominal</span>
              </div>
              <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.3em] italic">Cluster: GLOBAL_MAIN_01</p>
            </div>
          </div>
        </div>
        
        <div className="h-[1px] w-full bg-white/5 mb-16"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-700 uppercase tracking-[0.5em] font-black gap-10 text-center md:text-left">
          <p>© 2026 Joystick Jester. Registered terminal at joystickjester.shop</p>
          <div className="flex items-center space-x-12">
            <div className="flex items-center gap-3 group grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
              <svg className="w-6 h-6 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span>SECURE SSL</span>
            </div>
            <div className="flex items-center gap-3 group grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
              <svg className="w-6 h-6 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>VERIFIED KEYS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
