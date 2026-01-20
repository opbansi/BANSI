
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-dark/80 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-dark-surface z-[120] border-l border-neon-blue/30 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-white font-gaming text-xl font-black uppercase tracking-widest italic">Inventory Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-sm font-gaming uppercase tracking-widest">Cart is Empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-dark-card border border-white/5 p-4 rounded-sm flex items-center space-x-4">
                <img src={item.imageUrl} className="w-20 h-12 object-cover rounded border border-neon-purple/20" />
                <div className="flex-1">
                  <h4 className="text-white text-xs font-black uppercase line-clamp-1">{item.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <button onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} className="text-neon-blue hover:text-white">-</button>
                    <span className="text-white text-xs">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="text-neon-blue hover:text-white">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-neon-purple font-gaming text-sm">${(item.discountPrice * item.quantity).toFixed(2)}</p>
                  <button onClick={() => onRemove(item.id)} className="text-[8px] text-neon-pink uppercase font-black hover:underline mt-1">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-dark space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Subtotal</span>
              <span className="text-white font-gaming text-2xl font-black">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-neon-blue text-dark py-4 font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)]"
            >
              Secure Protocol Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
