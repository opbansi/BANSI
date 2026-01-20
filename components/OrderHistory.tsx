
import React from 'react';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  onClose: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onClose }) => {
  return (
    <div className="fixed inset-0 z-[150] bg-dark/95 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-dark-card border border-neon-blue/30 w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,210,255,0.1)] flex flex-col">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-white font-gaming text-2xl font-black uppercase italic tracking-tighter">Purchase <span className="text-neon-blue">Logs</span></h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-black">Secure Transaction History</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {orders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
              <div className="w-20 h-20 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="font-gaming uppercase tracking-[0.3em] text-sm">No transaction records found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white/5 border border-white/5 rounded-xl p-6 hover:border-neon-purple/30 transition-all group">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center space-x-4">
                      <span className="text-[10px] bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded font-black">ID: {order.id.slice(-8).toUpperCase()}</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{order.date}</span>
                    </div>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-4">
                          <img src={item.imageUrl} className="w-12 h-8 object-cover rounded border border-white/10" />
                          <div className="flex-1">
                            <p className="text-white text-xs font-black uppercase tracking-tighter">{item.title}</p>
                            <p className="text-gray-500 text-[8px] uppercase">Qty: {item.quantity} x ${item.discountPrice.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-black block mb-1">Total Paid</span>
                      <span className="text-neon-blue font-gaming text-2xl font-black">${order.total.toFixed(2)}</span>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover:bg-neon-blue group-hover:text-dark transition-all">
                      Retrieve Product Keys
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
