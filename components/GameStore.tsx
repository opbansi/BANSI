
import React, { useState, useEffect, useRef } from 'react';
import { Genre, Game } from '../types';

interface GameStoreProps {
  games: Game[];
  searchQuery: string;
  onGameClick: (game: Game) => void;
  onAddToCart: (game: Game) => void;
  logPurchase?: (game: Game) => void;
  isLoadingImages?: boolean;
}

const GameStore: React.FC<GameStoreProps> = ({ games, searchQuery, onGameClick, onAddToCart, logPurchase, isLoadingImages }) => {
  const [activeGenre, setActiveGenre] = useState<Genre>('All');
  const [loadingGameId, setLoadingGameId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filteredGames = games.filter(game => {
    const matchesGenre = activeGenre === 'All' || game.genre === activeGenre;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const genres: Genre[] = ['All', 'Action', 'RPG', 'Indie', 'Horror', 'Adventure'];

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [filteredGames, activeGenre]);

  const handleBuyNow = (game: Game) => {
    setLoadingGameId(game.id);
    if (logPurchase) logPurchase(game);
    const message = encodeURIComponent(`I want to buy "${game.title}" from joystickjester.shop`);
    setTimeout(() => {
      window.open(`https://t.me/joystickjesters?text=${message}`, '_blank');
      setLoadingGameId(null);
    }, 400);
  };

  return (
    <section id="store" className="py-24 relative bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-white font-gaming text-4xl sm:text-5xl font-black tracking-tight uppercase italic flex items-center gap-4">
              <span className="w-2 h-10 bg-neon-blue shadow-[0_0_15px_rgba(0,210,255,0.8)]"></span>
              Steam <span className="text-neon-purple">Marketplace</span>
            </h2>
            <p className="text-gray-500 font-medium max-w-sm tracking-[0.2em] uppercase text-[10px]">Official Digital Vault • Global Distribution</p>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 bg-dark-surface rounded-2xl border border-white/5 backdrop-blur-md overflow-x-auto no-scrollbar">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 whitespace-nowrap ${
                  activeGenre === genre ? 'bg-neon-purple text-white shadow-[0_0_20px_rgba(108,92,231,0.6)]' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {filteredGames.map((game, index) => (
            <div 
              key={game.id} 
              className="group reveal-on-scroll anime-glow-card relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-neon-blue/40 transition-all duration-700 rounded-[2.5rem] overflow-hidden flex flex-col cursor-pointer hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(0,210,255,0.1)]"
              onClick={() => onGameClick(game)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-dark-card">
                {isLoadingImages && (
                  <div className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-fast"></div>
                )}
                <img 
                  src={game.imageUrl} 
                  alt={game.title} 
                  className={`w-full h-full object-cover transition-all duration-1000 ${isLoadingImages ? 'opacity-30 blur-sm' : 'opacity-100 blur-0'} group-hover:scale-110`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-90"></div>
                
                {/* Steam Branding */}
                <div className="absolute top-5 right-5 flex flex-col items-end gap-2 z-20">
                  <div className="p-2 bg-dark/60 backdrop-blur-md rounded-xl border border-white/10">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" alt="Steam" className="w-5 h-5 invert" />
                  </div>
                  <span className="bg-neon-blue/80 backdrop-blur-md border border-white/20 text-dark text-[7px] font-black uppercase px-2 py-0.5 rounded tracking-tighter">Steam Global Key</span>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-5 left-5 bg-neon-pink text-white px-4 py-1.5 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_0_20px_rgba(255,0,85,0.6)] z-20 animate-pulse">
                  -{game.discountPercentage}%
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 -mt-20 bg-gradient-to-b from-transparent via-dark/70 to-dark backdrop-blur-md">
                <h3 className="text-white font-gaming text-base md:text-xl mb-4 md:mb-6 group-hover:text-neon-blue transition-colors line-clamp-2 uppercase tracking-tighter font-black italic">{game.title}</h3>
                
                <div className="mt-auto space-y-6 md:space-y-8">
                  <div className="flex flex-col">
                    <span className="text-gray-600 line-through text-[10px] md:text-[12px] font-black tracking-[0.2em] uppercase">Market: ${game.originalPrice.toFixed(2)}</span>
                    <span className="text-white font-gaming text-3xl md:text-4xl font-black text-neon-purple leading-none drop-shadow-[0_0_10px_rgba(108,92,231,0.5)]">${game.discountPrice.toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); handleBuyNow(game); }}
                    className={`w-full ${loadingGameId === game.id ? 'bg-white text-dark scale-95' : 'bg-neon-blue text-dark'} font-black uppercase text-[10px] md:text-[12px] py-4 md:py-5 rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(0,210,255,0.4)] flex items-center justify-center tracking-[0.3em]`}
                  >
                    {loadingGameId === game.id ? 'Establishing Link...' : 'BUY NOW'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .reveal-on-scroll { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(15px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-active { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default GameStore;
