
import React, { useState } from 'react';
import { Game, CartItem } from '../types';

interface CheckoutProps {
  game?: Game | null; // For direct buy
  cartItems?: CartItem[]; // For cart checkout
  onClose: () => void;
  onComplete: (items: CartItem[], total: number) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ game, cartItems, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const itemsToBuy: CartItem[] = game 
    ? [{ ...game, quantity: 1 }] 
    : cartItems || [];

  const total = itemsToBuy.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

  const handlePay = () => {
    setProcessing(true);
    // Professional payment processing simulation
    setTimeout(() => {
      setProcessing(false);
      setStep(3);
      onComplete(itemsToBuy, total);
    }, 4000);
  };

  if (itemsToBuy.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative bg-dark-surface border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-10 space-y-10">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-gaming text-2xl font-black uppercase italic tracking-tighter">Terminal <span className="text-neon-blue">Checkout</span></h3>
            <button onClick={onClose} className="text-gray-500 hover:text-white p-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="max-h-40 overflow-y-auto space-y-3 bg-dark/50 border border-white/5 p-4 rounded-2xl">
                {itemsToBuy.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-6">
                    <img src={item.imageUrl} className="w-16 h-10 object-cover rounded-xl border border-neon-purple/30" />
                    <div className="flex-1">
                      <h4 className="text-white text-[10px] font-black uppercase tracking-widest line-clamp-1">{item.title}</h4>
                      <p className="text-neon-blue text-sm font-gaming font-black">${item.discountPrice.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Delivery Intel (Email)</label>
                  <input type="email" placeholder="vanguard@sector7.io" className="w-full bg-dark p-4 border border-white/10 rounded-xl focus:border-neon-blue outline-none text-xs text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Protocol</label>
                    <select className="w-full bg-dark p-4 border border-white/10 rounded-xl focus:border-neon-blue outline-none text-xs text-white appearance-none">
                      <option>Secure PayPal</option>
                      <option>Crypto Node</option>
                      <option>Visa / Master</option>
                    </select>
                  </div>
                   <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Voucher</label>
                    <input type="text" placeholder="JESTER10" className="w-full bg-dark p-4 border border-white/10 rounded-xl focus:border-neon-blue outline-none text-xs text-white uppercase" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-gray-500 text-[10px] uppercase font-black">Gross Total</span>
                <span className="text-white font-gaming text-2xl font-black">${total.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-neon-purple text-white py-5 font-black uppercase text-xs tracking-[0.4em] hover:bg-neon-blue hover:text-dark transition-all rounded-xl shadow-[0_0_20px_rgba(108,92,231,0.3)]"
              >
                Connect to Gate
              </button>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-8 animate-fade-in">
               {!processing ? (
                 <>
                   <div className="text-center space-y-4">
                     <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Final Authorization Required</p>
                     <p className="text-white font-gaming text-5xl font-black text-neon-blue">${total.toFixed(2)}</p>
                   </div>
                   <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SSL Encryption</span>
                        <span className="text-green-500 text-[10px] font-black uppercase">Active</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Anti-Fraud Engine</span>
                        <span className="text-green-500 text-[10px] font-black uppercase">Verified</span>
                     </div>
                   </div>
                   <button 
                     onClick={handlePay}
                     className="w-full bg-neon-blue text-dark py-5 font-black uppercase text-xs tracking-[0.4em] transition-all rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                   >
                     Authorize Transaction
                   </button>
                   <button onClick={() => setStep(1)} className="w-full text-gray-600 text-[10px] uppercase font-bold hover:text-white transition-colors">Go Back</button>
                 </>
               ) : (
                 <div className="py-12 flex flex-col items-center justify-center space-y-10">
                   <div className="relative w-32 h-32">
                      <div className="absolute inset-0 border-4 border-neon-purple/10 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-4 border-4 border-neon-blue/10 rounded-full"></div>
                      <div className="absolute inset-4 border-4 border-neon-blue border-b-transparent rounded-full animate-spin [animation-duration:1.5s]"></div>
                      <div className="absolute inset-8 border-4 border-neon-pink/10 rounded-full"></div>
                      <div className="absolute inset-8 border-4 border-neon-pink border-l-transparent rounded-full animate-spin [animation-duration:2.5s]"></div>
                   </div>
                   <div className="text-center space-y-4">
                     <p className="text-neon-blue font-gaming text-2xl font-black uppercase italic animate-pulse">Routing Funds</p>
                     <p className="text-gray-600 text-[8px] font-black uppercase tracking-[0.8em]">SECURE BLOCKCHAIN HANDSHAKE IN PROGRESS</p>
                   </div>
                 </div>
               )}
             </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 space-y-10 animate-fade-in">
              <div className="w-24 h-24 bg-neon-blue/10 rounded-full flex items-center justify-center mx-auto border-4 border-neon-blue shadow-[0_0_40px_rgba(0,210,255,0.5)]">
                <svg className="w-12 h-12 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-gaming text-4xl font-black uppercase italic tracking-tighter leading-none">Access <span className="text-neon-blue">Granted</span></h4>
                <p className="text-gray-500 text-xs font-light max-w-xs mx-auto leading-relaxed uppercase tracking-widest">Transaction successful. Digital keys have been injected into your profile vault.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-5 bg-dark border border-neon-blue text-neon-blue font-black uppercase text-[10px] tracking-[0.4em] rounded-xl hover:bg-neon-blue hover:text-dark transition-all"
              >
                Close Terminal
              </button>
            </div>
          )}

          <div className="flex items-center justify-center space-x-8 opacity-20">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 grayscale invert" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 grayscale invert" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 grayscale invert" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
