
import React, { useState, useEffect } from 'react';

const NAMES = ['User420', 'CyberGhost', 'NeoVanguard', 'Alpha_Striker', 'Ghost_Rider', 'Raven66', 'Shadow_Protocol', 'Void_Runner', 'PixelMage', 'VanguardPrime', 'SectorOperator', 'GameHunter', 'KeyMaster'];
const GAMES_LIST = ['GTA V', 'God of War', 'Cyberpunk 2077', 'Spider-Man 2', 'RDR2', 'Black Myth: Wukong', 'Hogwarts Legacy', 'Ghost of Tsushima', 'Spider-Man Remastered', 'Detroit: Become Human'];

const LiveSales: React.FC = () => {
  const [sale, setSale] = useState<{ user: string, game: string } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const triggerSale = () => {
      const user = NAMES[Math.floor(Math.random() * NAMES.length)];
      const game = GAMES_LIST[Math.floor(Math.random() * GAMES_LIST.length)];
      setSale({ user, game });
      setVisible(true);
      
      const hideTimeout = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(hideTimeout);
    };

    const interval = setInterval(triggerSale, 15000 + Math.random() * 10000);
    const initialTrigger = setTimeout(triggerSale, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialTrigger);
    };
  }, []);

  if (!sale) return null;

  return (
    <div 
      className={`fixed bottom-8 left-8 z-[100] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] transform ${visible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0 pointer-events-none'}`}
    >
      <div className="bg-dark-card border border-neon-blue/20 p-4 rounded-2xl backdrop-blur-xl flex items-center space-x-4 shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(0,210,255,0.05)] border-l-4 border-l-neon-blue">
        <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center border border-neon-blue/20">
          <svg className="w-6 h-6 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.15em] leading-tight">
          <p className="text-neon-blue mb-1">TRANSACTION PROTOCOL</p>
          <p className="text-white">
            <span className="text-neon-purple font-bold">Someone</span> just bought <br />
            <span className="italic text-neon-blue">{sale.game}!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveSales;
