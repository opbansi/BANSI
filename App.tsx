
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameStore from './components/GameStore';
import AIRecommender from './components/AIRecommender';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';
import FloatingButtons from './components/FloatingButtons';
import LiveSales from './components/LiveSales';
import MouseEffect from './components/MouseEffect';
import TopAnnouncement from './components/TopAnnouncement';
import ChatSystem from './components/ChatSystem';
import { Game, User, CartItem, Order, Message, PurchaseLog } from './types';
import { INITIAL_GAMES } from './constants';
import { fetchOfficialPoster } from './geminiService';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isSyncingImages, setIsSyncingImages] = useState(false);
  
  // E-commerce & User State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [announcementText, setAnnouncementText] = useState('🔥 FLASH SALE: All Steam Games under $2.5! | ⚡ Instant Delivery via Telegram | 🎮 Join 1000+ Gamers on joystickjester.shop');
  const [purchaseLogs, setPurchaseLogs] = useState<PurchaseLog[]>([]);

  // Persistent storage
  useEffect(() => {
    const savedGames = localStorage.getItem('jester_games');
    const loadedGames = savedGames ? JSON.parse(savedGames) : INITIAL_GAMES;
    setGames(loadedGames);

    const savedUser = localStorage.getItem('jester_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const savedAllUsers = localStorage.getItem('jester_all_users');
    if (savedAllUsers) setAllUsers(JSON.parse(savedAllUsers));

    const savedMaintenance = localStorage.getItem('jester_maintenance');
    if (savedMaintenance !== null) setIsMaintenanceMode(JSON.parse(savedMaintenance));

    const savedChatStatus = localStorage.getItem('jester_chat_enabled');
    if (savedChatStatus !== null) setIsChatEnabled(JSON.parse(savedChatStatus));

    const savedAnnouncement = localStorage.getItem('jester_announcement');
    if (savedAnnouncement) setAnnouncementText(savedAnnouncement);

    const savedLogs = localStorage.getItem('jester_purchase_logs');
    if (savedLogs) setPurchaseLogs(JSON.parse(savedLogs));

    syncGameImages(loadedGames);
  }, []);

  const syncGameImages = async (currentGames: Game[]) => {
    const needsUpdate = currentGames.filter(g => g.imageUrl === 'sync_required_placeholder' || g.imageUrl === '');
    if (needsUpdate.length === 0) return;
    setIsSyncingImages(true);
    const updatedGames = [...currentGames];
    for (let i = 0; i < updatedGames.length; i++) {
      if (updatedGames[i].imageUrl === 'sync_required_placeholder' || updatedGames[i].imageUrl === '') {
        try {
          const officialUrl = await fetchOfficialPoster(updatedGames[i].title);
          updatedGames[i] = { ...updatedGames[i], imageUrl: officialUrl };
          setGames([...updatedGames]);
        } catch (e) { console.error(e); }
      }
    }
    localStorage.setItem('jester_games', JSON.stringify(updatedGames));
    setIsSyncingImages(false);
  };

  const handleLogin = (user: User) => {
    // Master Admin Number: 9971653223 | Password: bansi9900
    const isMasterAdmin = user.number === '9971653223' && user.password === 'bansi9900';
    const existingUser = allUsers.find(u => u.number === user.number);
    const loggedUser: User = { 
      ...user, 
      ...(existingUser || {}),
      isAdmin: isMasterAdmin, 
      status: 'online' as const
    };
    setCurrentUser(loggedUser);
    localStorage.setItem('jester_user', JSON.stringify(loggedUser));
    
    setAllUsers(prev => {
      const updated = existingUser ? prev.map(u => u.number === user.number ? loggedUser : u) : [...prev, loggedUser];
      localStorage.setItem('jester_all_users', JSON.stringify(updated));
      return updated;
    });

    if (isMasterAdmin) setShowAdmin(true);
    setAuthMode(null);
  };

  const toggleMaintenance = (val: boolean) => {
    setIsMaintenanceMode(val);
    localStorage.setItem('jester_maintenance', JSON.stringify(val));
  };

  // Maintenance Screen
  if (isMaintenanceMode && !currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJicnJmcmZyeXlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyJnB0PWEmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/3o7TKVUn7iM8FMEU24/giphy.gif" className="w-full h-full object-cover grayscale" alt="maintenance" />
        </div>
        <div className="relative z-10 space-y-8 max-w-2xl animate-anime-reveal">
          <div className="w-24 h-24 bg-neon-purple mx-auto flex items-center justify-center rounded-[2rem] shadow-[0_0_50px_rgba(108,92,231,0.5)] border border-white/20">
            <span className="text-white font-gaming text-5xl font-black italic">J</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-white font-gaming text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              SYSTEM <span className="text-neon-blue">PATCHING</span>
            </h1>
            <p className="text-gray-400 font-light text-lg md:text-xl tracking-[0.2em] uppercase max-w-md mx-auto">
              Our neural network is undergoing essential maintenance. We'll be back online in a flash.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 pt-10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
              <span className="w-2 h-2 bg-neon-pink rounded-full animate-ping"></span>
              <span className="text-neon-pink text-[10px] font-black uppercase tracking-widest">Status: Restricted Access</span>
            </div>
            <button onClick={() => setAuthMode('login')} className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-all underline">
              Operative Access Point
            </button>
          </div>
        </div>
        {authMode && <Auth initialMode="login" onLogin={handleLogin} onClose={() => setAuthMode(null)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark font-sans text-white selection:bg-neon-blue selection:text-dark relative flex flex-col scroll-container">
      <TopAnnouncement text={announcementText} />
      <MouseEffect />
      <Header 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery} 
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onAuthClick={(mode) => setAuthMode(mode)}
        onAdminClick={() => setShowAdmin(true)}
        onOrdersClick={() => setShowOrders(true)}
        onProfileClick={() => setShowProfile(true)}
        onLogout={() => { setCurrentUser(null); localStorage.removeItem('jester_user'); setShowAdmin(false); }}
      />
      
      <main className="relative z-10 flex-1">
        {authMode && <Auth initialMode={authMode} onLogin={handleLogin} onClose={() => setAuthMode(null)} />}
        
        {showAdmin && currentUser?.isAdmin && (
          <AdminDashboard 
            games={games} 
            users={allUsers}
            isChatEnabled={isChatEnabled}
            announcementText={announcementText}
            purchaseLogs={purchaseLogs}
            onUpdateGame={(updated) => { setGames(updated); localStorage.setItem('jester_games', JSON.stringify(updated)); }}
            onDeleteUser={(id) => { const filtered = allUsers.filter(u => u.id !== id); setAllUsers(filtered); localStorage.setItem('jester_all_users', JSON.stringify(filtered)); }}
            onToggleChat={setIsChatEnabled}
            onUpdateAnnouncement={setAnnouncementText}
            onClose={() => setShowAdmin(false)} 
            isMaintenanceMode={isMaintenanceMode}
            onToggleMaintenance={toggleMaintenance}
            cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            onCartClick={() => setIsCartOpen(true)}
          />
        )}

        {showProfile && currentUser && <Profile user={currentUser} onUpdate={(u) => { setCurrentUser(u); localStorage.setItem('jester_user', JSON.stringify(u)); }} onClose={() => setShowProfile(false)} />}
        
        <ProductDetail 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
          onBuy={(g) => window.open(`https://t.me/joystickjesters?text=Buy ${g.title}`, '_blank')} 
        />

        <Hero />
        
        <div className="bg-neon-blue py-4 overflow-hidden border-y border-white/10">
          <div className="inline-block animate-marquee uppercase text-dark font-black tracking-[0.6em] text-[10px] whitespace-nowrap">
            CYBER-MONDAY DEALS LIVE NOW — DEPLOYING NEW GAME KEYS — SYSTEM SECURE — INSTANT DELIVERY ACTIVE — JOIN THE COMMUNITY — 
            CYBER-MONDAY DEALS LIVE NOW — DEPLOYING NEW GAME KEYS — SYSTEM SECURE — INSTANT DELIVERY ACTIVE — JOIN THE COMMUNITY — 
          </div>
        </div>

        <GameStore 
          games={games}
          searchQuery={searchQuery} 
          onGameClick={setSelectedGame}
          onAddToCart={() => {}}
          isLoadingImages={isSyncingImages}
        />
        
        <AIRecommender />
        <section className="py-24 bg-dark-surface"><div className="max-w-7xl mx-auto px-4"><ContactForm /></div></section>
      </main>

      <Footer />
      <FloatingButtons onChatOpen={() => setShowChat(true)} isChatEnabled={isChatEnabled || (currentUser?.isAdmin ?? false)} />
      <LiveSales />
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>
    </div>
  );
}

export default App;
