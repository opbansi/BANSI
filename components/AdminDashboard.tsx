
import React, { useState } from 'react';
import { Game, User, PurchaseLog } from '../types';

interface AdminDashboardProps {
  games: Game[];
  users: User[];
  isChatEnabled: boolean;
  announcementText: string;
  purchaseLogs: PurchaseLog[];
  onUpdateGame: (games: Game[]) => void;
  onDeleteUser: (userId: string) => void;
  onToggleChat: (enabled: boolean) => void;
  onUpdateAnnouncement: (text: string) => void;
  onClose: () => void;
  isMaintenanceMode: boolean;
  onToggleMaintenance: (val: boolean) => void;
  cartCount: number;
  onCartClick: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  games, 
  users, 
  isChatEnabled,
  announcementText,
  purchaseLogs,
  onUpdateGame, 
  onDeleteUser, 
  onToggleChat,
  onUpdateAnnouncement,
  onClose,
  isMaintenanceMode,
  onToggleMaintenance,
  cartCount,
  onCartClick
}) => {
  const [view, setView] = useState<'games' | 'users' | 'settings' | 'logs'>('users');
  const [userSearch, setUserSearch] = useState('');
  
  const [newGame, setNewGame] = useState<Partial<Game>>({
    title: '',
    originalPrice: 59.99,
    discountPrice: 2.0,
    imageUrl: '',
    genre: 'Action',
    category: 'Trending',
    description: ''
  });

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.number.includes(userSearch) ||
    u.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleFileUpload = (gameId: string | null, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (gameId) {
          onUpdateGame(games.map(g => g.id === gameId ? { ...g, imageUrl: base64 } : g));
        } else {
          setNewGame(prev => ({ ...prev, imageUrl: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGame = () => {
    if (!newGame.title || !newGame.discountPrice) return;
    const game: Game = {
      id: Math.random().toString(36).substr(2, 9),
      title: newGame.title!,
      category: newGame.category as any || 'Trending',
      genre: newGame.genre as any || 'Action',
      imageUrl: newGame.imageUrl || 'https://via.placeholder.com/600x800',
      originalPrice: newGame.originalPrice || 59.99,
      discountPrice: newGame.discountPrice!,
      discountPercentage: Math.round((1 - (newGame.discountPrice! / (newGame.originalPrice || 59.99))) * 100),
      description: newGame.description || 'Professional AAA gaming title.',
      stock: 99,
      requirements: { os: "Win 10", processor: "i7", memory: "16GB", graphics: "RTX", storage: "100GB" }
    };
    onUpdateGame([game, ...games]);
    setNewGame({ title: '', originalPrice: 59.99, discountPrice: 2.0, imageUrl: '', genre: 'Action', category: 'Trending', description: '' });
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col overflow-y-auto animate-fade-in scroll-container no-scrollbar">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00d2ff 1px, transparent 1px), linear-gradient(90deg, #00d2ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex flex-col space-y-6 relative z-10 pb-32">
        
        {/* Simplified Admin Header */}
        <div className="bg-dark-card/80 backdrop-blur-3xl border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col lg:flex-row justify-between items-center gap-6 shadow-2xl">
          <a href="/" className="flex items-center gap-4 md:gap-6 self-start group no-underline">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-neon-purple/10 border border-neon-purple/40 flex items-center justify-center rounded-xl md:rounded-2xl transform md:rotate-12 group-hover:rotate-0 transition-all duration-700 shadow-[0_0_20px_rgba(108,92,231,0.2)]">
              <span className="text-white font-gaming text-xl md:text-3xl font-black italic">J</span>
            </div>
            <div>
              <h2 className="text-white font-gaming text-lg md:text-2xl font-black italic uppercase tracking-tighter">GOD-MODE <span className="text-neon-blue">CONSOLE</span></h2>
              <p className="text-gray-500 text-[8px] md:text-[10px] uppercase tracking-widest font-black italic mt-1">OPERATIVE: 9971653223</p>
            </div>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
            {/* Nav Links */}
            <div className="flex gap-2 mr-4">
              <button onClick={() => setView('users')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'users' ? 'bg-neon-blue text-dark' : 'text-gray-400 border border-white/10'}`}>OPERATIVES</button>
              <button onClick={() => setView('games')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'games' ? 'bg-neon-purple text-white' : 'text-gray-400 border border-white/10'}`}>INVENTORY</button>
              <button onClick={() => setView('logs')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'logs' ? 'bg-neon-pink text-white' : 'text-gray-400 border border-white/10'}`}>LOGS</button>
              <button onClick={() => setView('settings')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'settings' ? 'bg-white text-dark' : 'text-gray-400 border border-white/10'}`}>SYSTEM</button>
            </div>

            {/* Cart icon - accessible in both modes */}
            <button onClick={onCartClick} className="relative p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-neon-blue transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full animate-pulse">{cartCount}</span>}
            </button>

            <button onClick={onClose} className="px-6 py-3 bg-neon-pink text-white text-[9px] font-black uppercase border border-white/10 rounded-xl hover:bg-white hover:text-dark transition-all shadow-lg shadow-neon-pink/20">EXIT CONSOLE</button>
          </div>
        </div>

        <div className="flex-1 bg-dark-card/60 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl min-h-[500px]">
          {view === 'users' && (
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="p-4 border-b border-white/5 bg-white/5">
                <input type="text" placeholder="Search Node by Name or ID..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} className="w-full bg-dark/80 border border-white/10 rounded-xl px-6 py-4 text-[10px] text-white uppercase font-black tracking-widest outline-none focus:border-neon-blue transition-all" />
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-[10px] uppercase tracking-widest min-w-[600px]">
                  <thead className="bg-white/5 text-gray-400 font-black">
                    <tr><th className="p-6">OPERATIVE</th><th className="p-6">NUMBER</th><th className="p-6">PASSKEY</th><th className="p-6 text-right">ACTION</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-bold">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-neon-blue/5 transition-all">
                        <td className="p-6 text-white">{u.username}</td>
                        <td className="p-6 text-neon-blue">{u.number}</td>
                        <td className="p-6 text-neon-purple font-mono">{u.password || '••••'}</td>
                        <td className="p-6 text-right"><button onClick={() => onDeleteUser(u.id)} className="p-2 bg-neon-pink/10 text-neon-pink rounded-lg hover:bg-neon-pink hover:text-white transition-all shadow-lg">DELETE</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === 'games' && (
            <div className="p-8 space-y-10 overflow-y-auto no-scrollbar">
              <div className="bg-white/5 border border-neon-purple/20 rounded-[2rem] p-8 space-y-6">
                 <h3 className="text-white font-gaming text-xl uppercase italic font-black">ASSET <span className="text-neon-purple">DEPLOYMENT</span></h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="GAME TITLE" value={newGame.title} onChange={e => setNewGame({...newGame, title: e.target.value})} className="bg-dark/80 p-4 border border-white/10 rounded-xl text-xs text-white uppercase font-black outline-none focus:border-neon-purple" />
                    <input type="number" placeholder="UNIT PRICE ($)" value={newGame.discountPrice} onChange={e => setNewGame({...newGame, discountPrice: parseFloat(e.target.value)})} className="bg-dark/80 p-4 border border-white/10 rounded-xl text-xs text-white font-black outline-none focus:border-neon-purple" />
                    <div className="flex gap-4 items-center sm:col-span-2">
                       <label className="flex-1 bg-dark/80 p-4 border border-white/10 rounded-xl text-xs text-gray-500 uppercase font-black cursor-pointer hover:border-neon-blue transition-all">
                          {newGame.imageUrl ? 'ASSET LOADED' : 'UPLOAD JPG/PNG'}
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(null, e)} />
                       </label>
                       {newGame.imageUrl && <img src={newGame.imageUrl} className="w-16 h-12 object-cover rounded-xl border border-neon-blue shadow-lg" alt="preview" />}
                    </div>
                 </div>
                 <button onClick={handleAddGame} className="w-full bg-neon-purple text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-dark transition-all shadow-xl active:scale-95">AUTHENTICATE & DEPLOY</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map(game => (
                  <div key={game.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-5 group hover:border-neon-blue transition-all">
                    <img src={game.imageUrl} className="w-20 h-28 object-cover rounded-xl border border-white/10 shadow-lg" alt={game.title} />
                    <div className="flex-1 space-y-2">
                      <p className="text-white text-xs font-black uppercase truncate">{game.title}</p>
                      <p className="text-neon-blue font-gaming text-sm">${game.discountPrice}</p>
                      <button onClick={() => onUpdateGame(games.filter(g => g.id !== game.id))} className="text-neon-pink text-[8px] font-black uppercase hover:underline transition-all">TERMINATE ASSET</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'settings' && (
            <div className="p-10 space-y-12 overflow-y-auto no-scrollbar">
              <div className="space-y-6">
                 <h3 className="text-white font-gaming text-lg uppercase font-black text-center">MAINTENANCE <span className="text-neon-pink">PROTOCOL</span></h3>
                 <div className="flex flex-col items-center gap-6 p-10 bg-white/5 rounded-[2rem] border border-white/5 shadow-inner">
                    <button onClick={() => onToggleMaintenance(!isMaintenanceMode)} className={`w-32 h-14 rounded-full p-2 flex items-center transition-all duration-500 ${isMaintenanceMode ? 'bg-neon-pink justify-end' : 'bg-gray-800 justify-start'}`}>
                       <div className="w-10 h-10 rounded-full bg-white shadow-xl transform transition-transform"></div>
                    </button>
                    <span className={`text-[12px] font-black uppercase tracking-[0.3em] transition-colors ${isMaintenanceMode ? 'text-neon-pink' : 'text-gray-500'}`}>
                      {isMaintenanceMode ? 'MAINTENANCE ACTIVE (USERS LOCKED)' : 'LIVE MODE (OPEN ACCESS)'}
                    </span>
                 </div>
              </div>
              <div className="space-y-4">
                 <h3 className="text-white font-gaming text-lg uppercase font-black text-center">ANNOUNCEMENT <span className="text-neon-blue">ENCRYPTION</span></h3>
                 <textarea value={announcementText} onChange={e => onUpdateAnnouncement(e.target.value)} rows={3} className="w-full bg-dark/80 border border-white/10 p-6 rounded-[2rem] text-xs text-white uppercase font-black outline-none focus:border-neon-blue shadow-inner resize-none transition-all" />
              </div>
              <div className="flex flex-col items-center space-y-6">
                 <h3 className="text-white font-gaming text-lg uppercase font-black">NEURAL <span className="text-neon-purple">LOCKDOWN</span></h3>
                 <div className="flex items-center gap-6">
                    <button onClick={() => onToggleChat(!isChatEnabled)} className={`w-28 h-12 rounded-full p-2 flex items-center transition-all duration-500 ${isChatEnabled ? 'bg-neon-blue justify-end' : 'bg-gray-800 justify-start'}`}>
                       <div className="w-8 h-8 rounded-full bg-white shadow-xl transform transition-transform"></div>
                    </button>
                    <span className={`text-[10px] font-black uppercase ${isChatEnabled ? 'text-neon-blue' : 'text-neon-pink'}`}>{isChatEnabled ? 'CHATS UNLOCKED' : 'CHATS LOCKED'}</span>
                 </div>
              </div>
            </div>
          )}
          
          {view === 'logs' && (
            <div className="p-8 space-y-4 overflow-y-auto no-scrollbar">
              <h3 className="text-white font-gaming text-xl italic font-black uppercase">TRANSACTION <span className="text-neon-pink">TELEMETRY</span></h3>
              <div className="space-y-3">
                {purchaseLogs.length === 0 ? (
                  <p className="text-center text-gray-700 uppercase font-black py-20">NO TELEMETRY DETECTED</p>
                ) : (
                  purchaseLogs.map(log => (
                    <div key={log.id} className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-neon-pink/5 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-dark rounded-xl flex items-center justify-center font-gaming text-neon-pink border border-neon-pink/20 uppercase">{log.username[0]}</div>
                         <div>
                            <p className="text-white text-[10px] font-black uppercase">{log.username}</p>
                            <p className="text-gray-500 text-[8px] font-bold">ASSET: {log.gameTitle}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-neon-pink font-gaming text-lg font-black">${log.price.toFixed(2)}</p>
                         <p className="text-[7px] text-gray-700 font-mono uppercase">{new Date(log.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
