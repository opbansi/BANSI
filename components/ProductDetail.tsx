import React from 'react';
import { Game } from '../types';

interface ProductDetailProps {
  game: Game | null;
  onClose: () => void;
  onBuy: (game: Game) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ game, onClose, onBuy }) => {
  if (!game) return null;

  const handleSecurePurchase = () => {
    const message = encodeURIComponent(`I want to buy ${game.title}`);
    window.open(`https://t.me/joystickjesters?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-12 overflow-hidden">
      <div 
        className="absolute inset-0 bg-dark/95 backdrop-blur-2xl" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-dark-card border border-white/10 w-full max-w-6xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto sm:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col lg:flex-row animate-fade-in scroll-container">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 p-2 sm:p-3 bg-white/5 border border-white/10 rounded-full text-white hover:text-neon-blue transition-all backdrop-blur-md"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Image Section */}
        <div className="lg:w-5/12 h-64 sm:h-80 lg:h-auto relative shrink-0">
          <img 
            src={game.imageUrl} 
            alt={game.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-dark-card"></div>
        </div>

        {/* Content Section */}
        <div className="lg:w-7/12 p-6 sm:p-10 md:p-20 space-y-6 sm:space-y-10">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="bg-neon-purple/20 text-neon-purple text-[8px] sm:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-neon-purple/30">{game.genre}</span>
              <span className="bg-neon-blue/20 text-neon-blue text-[8px] sm:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-neon-blue/30">{game.category}</span>
            </div>
            <h2 className="text-white font-gaming text-3xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">{game.title}</h2>
            <p className="text-gray-400 text-sm sm:text-lg font-light leading-relaxed max-w-xl">{game.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 py-6 sm:py-10 border-y border-white/5">
            <div className="space-y-2">
              <h4 className="text-neon-blue text-[10px] font-black uppercase tracking-[0.4em] mb-4">Direct Key Protocol</h4>
              <div className="space-y-1">
                <span className="block text-gray-600 line-through text-xs sm:text-sm font-black uppercase tracking-widest">Market: $59.99</span>
                <span className="block text-white font-gaming text-4xl sm:text-5xl font-black text-neon-purple drop-shadow-neon">${game.discountPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col justify-end space-y-4">
              <button 
                onClick={handleSecurePurchase}
                className="w-full bg-neon-blue text-dark font-black uppercase text-[10px] sm:text-xs tracking-[0.4em] py-4 sm:py-5 rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(0,210,255,0.4)]"
              >
                SECURE PURCHASE VIA TELEGRAM
              </button>
              <p className="text-[7px] sm:text-[8px] text-center text-gray-500 font-black uppercase tracking-widest">Redirects to Joystick Jester High Command</p>
            </div>
          </div>

          <div className="space-y-6 pb-10 sm:pb-0">
            <h4 className="text-neon-purple text-[10px] font-black uppercase tracking-[0.4em]">System Requirements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-[10px] sm:text-[11px] font-bold text-gray-400">
              <div className="space-y-3">
                <p className="uppercase tracking-widest">OS: <span className="text-white normal-case font-medium">{game.requirements.os}</span></p>
                <p className="uppercase tracking-widest">CPU: <span className="text-white normal-case font-medium">{game.requirements.processor}</span></p>
                <p className="uppercase tracking-widest">GPU: <span className="text-white normal-case font-medium">{game.requirements.graphics}</span></p>
              </div>
              <div className="space-y-3">
                <p className="uppercase tracking-widest">RAM: <span className="text-white normal-case font-medium">{game.requirements.memory}</span></p>
                <p className="uppercase tracking-widest">HDD: <span className="text-white normal-case font-medium">{game.requirements.storage}</span></p>
                <p className="uppercase tracking-widest">DELIVERY: <span className="text-neon-blue font-black">INSTANT DEPLOYMENT</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .drop-shadow-neon {
          filter: drop-shadow(0 0 15px rgba(108, 92, 231, 0.6));
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;