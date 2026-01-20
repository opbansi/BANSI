
import React, { useState } from 'react';
import { User, Message } from '../types';

interface ChatSystemProps {
  currentUser: User;
  users: User[];
  messages: Message[];
  onSendMessage: (msg: Message) => void;
  onClose: () => void;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ currentUser, users, messages, onSendMessage, onClose }) => {
  const [search, setSearch] = useState('');
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [inputText, setInputText] = useState('');

  const filteredUsers = users.filter(u => u.number.includes(search) && u.id !== currentUser.id);
  const chatMessages = messages.filter(m => 
    (m.senderId === currentUser.id && m.receiverId === activeUser?.id) ||
    (m.senderId === activeUser?.id && m.receiverId === currentUser.id)
  );

  const handleSend = () => {
    if (!inputText.trim() || !activeUser) return;
    const msg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: currentUser.id,
      receiverId: activeUser.id,
      text: inputText,
      timestamp: Date.now(),
      seen: false
    };
    onSendMessage(msg);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-[180] bg-dark/95 backdrop-blur-3xl flex items-center justify-center sm:p-4">
      <div className="absolute inset-0 hidden sm:block" onClick={onClose}></div>
      <div className="relative bg-dark-card/60 backdrop-blur-3xl border border-white/10 w-full h-full sm:h-[85vh] sm:max-w-5xl sm:rounded-[3rem] overflow-hidden flex shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        
        {/* Sidebar */}
        <div className={`w-full sm:w-80 border-r border-white/5 flex flex-col bg-dark/20 ${activeUser ? 'hidden sm:flex' : 'flex'}`}>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-gaming text-xl font-black uppercase italic tracking-tighter">Neural <span className="text-neon-blue">Comms</span></h3>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-all"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5} /></svg></button>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by ID..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-dark/50 p-4 rounded-2xl border border-white/10 text-[10px] uppercase font-black tracking-widest outline-none focus:border-neon-blue transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
            {filteredUsers.length === 0 ? (
              <p className="text-center text-gray-700 text-[10px] uppercase font-black py-10">No nodes found</p>
            ) : (
              filteredUsers.map(u => (
                <button 
                  key={u.id} 
                  onClick={() => setActiveUser(u)}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${activeUser?.id === u.id ? 'bg-neon-purple/20 border border-neon-purple/30' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 bg-dark-surface rounded-2xl flex items-center justify-center border border-white/10 font-gaming uppercase text-neon-blue shadow-lg overflow-hidden">
                      {u.profilePic ? <img src={u.profilePic} className="w-full h-full object-cover" /> : u.username[0]}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-dark ${u.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-white text-[10px] font-black uppercase tracking-tight truncate">{u.username}</p>
                    <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{u.number}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        {activeUser ? (
          <div className="flex-1 flex flex-col w-full h-full bg-dark-card/40">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-dark/30 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveUser(null)} className="sm:hidden p-2 text-gray-500 hover:text-white transition-all"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
                <div className="w-12 h-12 bg-dark-surface rounded-2xl flex items-center justify-center border border-white/10 text-neon-purple font-gaming shadow-xl overflow-hidden shrink-0">
                   {activeUser.profilePic ? <img src={activeUser.profilePic} className="w-full h-full object-cover" /> : activeUser.username[0]}
                </div>
                <div>
                  <h4 className="text-white text-[11px] font-black uppercase tracking-widest truncate max-w-[120px] sm:max-w-none">{activeUser.username}</h4>
                  <p className="text-neon-blue text-[8px] font-black uppercase tracking-widest">Operator Connected</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={onClose} className="p-3 text-gray-500 hover:text-white transition-all bg-white/5 rounded-xl border border-white/10 sm:hidden"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5} /></svg></button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 no-scrollbar scroll-container">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10">
                   <svg className="w-24 h-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                   <p className="font-gaming uppercase tracking-[0.5em] text-xs">Begin neural exchange</p>
                </div>
              ) : (
                chatMessages.map(m => (
                  <div key={m.id} className={`flex ${m.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] sm:max-w-[75%] p-4 sm:p-6 rounded-3xl ${m.senderId === currentUser.id ? 'bg-neon-purple text-white rounded-tr-none shadow-[0_10px_30px_rgba(108,92,231,0.2)]' : 'bg-dark border border-white/10 text-gray-300 rounded-tl-none'}`}>
                      <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                      <div className="flex items-center justify-end gap-2 mt-4">
                         <span className="text-[7px] opacity-40 uppercase font-black">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                         {m.senderId === currentUser.id && (
                           <svg className={`w-3 h-3 ${m.seen ? 'text-neon-blue' : 'text-white/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7m-5-2l5 5l-10 10" /></svg>
                         )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/5 flex items-center gap-3 sm:gap-6 bg-dark/20">
              <button className="hidden sm:flex p-5 bg-white/5 rounded-2xl text-gray-500 hover:text-neon-blue transition-all border border-white/5 hover:border-neon-blue/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" strokeWidth={2} /></svg>
              </button>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type secure payload..." 
                className="flex-1 bg-dark/60 p-5 rounded-2xl border border-white/10 outline-none text-xs text-white focus:border-neon-blue transition-all shadow-inner"
              />
              <button onClick={handleSend} className="p-5 bg-neon-blue rounded-2xl text-dark shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:bg-white transition-all group transform active:scale-90">
                <svg className="w-7 h-7 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-10 text-center space-y-8 hidden sm:flex">
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJicnJmcmZyeXlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyJnB0PWEmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/3o7TKVUn7iM8FMEU24/giphy.gif" alt="standby" className="w-64 h-64 grayscale opacity-30 rounded-full" />
            <div className="space-y-4">
              <h3 className="font-gaming text-4xl uppercase font-black italic tracking-tighter">Select Neural Node</h3>
              <p className="text-[10px] uppercase tracking-[0.8em] font-black">Establishing secure P2P handshake protocol</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSystem;
