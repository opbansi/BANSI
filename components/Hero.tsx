
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 14400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative min-h-[95vh] w-full flex items-center pt-20 overflow-hidden bg-dark">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-neon-purple/10 blur-[180px] animate-pulse"></div>
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920" 
          alt="Futuristic Gaming" 
          className="w-full h-full object-cover opacity-[0.08] grayscale mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-blue/10 animate-scan pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="inline-flex items-center space-x-4 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-pink"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-neon-pink glitch" data-text="TOP DEALS OF THE DAY">TOP DEALS OF THE DAY</span>
            <span className="text-gray-700">|</span>
            <span className="text-[11px] font-gaming text-white font-bold tabular-nums tracking-widest">{formatTime(timeLeft)}</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-white font-gaming text-7xl md:text-8xl leading-[0.85] font-black tracking-tighter uppercase italic drop-shadow-2xl">
              LEVEL UP YOUR <br />
              <span className="glitch text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" data-text="LIBRARY FOR $1.">LIBRARY FOR $1.</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl border-l-2 border-neon-blue pl-6 py-2">
              Instant cryptographic delivery of AAA titles. The lowest price sector for the modern gaming vanguard. Deploying keys globally at joystickjester.shop.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <a 
              href="#store" 
              className="px-14 py-5 bg-neon-blue text-dark font-black uppercase tracking-[0.4em] text-[11px] hover:bg-white transition-all shadow-[0_0_40px_rgba(0,210,255,0.4)] rounded-2xl transform hover:-translate-y-1 active:scale-95 text-center"
            >
              Shop Now
            </a>
            <div className="flex items-center space-x-5 px-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-dark bg-dark-card overflow-hidden shadow-lg transform hover:scale-110 transition-transform">
                    <img src={`https://i.pravatar.cc/150?img=${i + 12}`} alt="user" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[11px] text-white font-black uppercase tracking-widest">12K+ ACTIVE OPERATORS</p>
                <p className="text-[9px] text-neon-blue font-bold uppercase tracking-widest">REAL-TIME CONNECTIVITY</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-12 pt-12 border-t border-white/10">
            {[
              { label: 'Security', val: 'AES-256 SSL', color: 'neon-purple' },
              { label: 'Network', val: 'Low Latency', color: 'neon-blue' },
              { label: 'Uptime', val: '99.9% UPTIME', color: 'neon-pink' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className={`text-[9px] font-black text-${stat.color} uppercase tracking-[0.3em] mb-2`}>{stat.label}</span>
                <span className="text-xs text-white font-bold tracking-widest">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative group p-8">
          <div className="absolute inset-0 bg-neon-purple/10 blur-[120px] group-hover:bg-neon-blue/20 transition-all duration-1000 rounded-full animate-pulse"></div>
          
          <div className="relative">
            <div className="absolute -inset-1 bg-neon-blue opacity-10 group-hover:opacity-30 blur-sm rounded-3xl transition-opacity"></div>
            <div className="relative bg-dark-card border border-white/10 p-5 rounded-[2.5rem] transform rotate-2 hover:rotate-0 transition-all duration-700 shadow-3xl overflow-hidden group-hover:shadow-[0_0_50px_rgba(108,92,231,0.2)]">
              <div className="relative h-[450px] overflow-hidden rounded-[2rem]">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Featured Deal" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-10 right-10 bg-neon-pink text-white px-8 py-3 rounded-2xl text-2xl font-gaming font-black italic shadow-2xl animate-glitch-bounce">
                  -98% OFF
                </div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex flex-col space-y-4">
                    <span className="text-neon-blue font-gaming text-xs uppercase tracking-[0.5em] font-black">LEGENDARY PROTOCOL</span>
                    <h3 className="text-white font-gaming text-3xl font-black uppercase italic leading-none drop-shadow-xl">ULTIMATE <br />GAME ACCESS</h3>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-white font-gaming text-4xl font-black text-neon-blue">$1.00</span>
                      <span className="text-gray-500 line-through text-xs font-bold">$59.99</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        @keyframes glitch-bounce {
          0%, 100% { transform: scale(1) skew(0); }
          50% { transform: scale(1.1) skew(-5deg); }
        }
        .animate-glitch-bounce {
          animation: glitch-bounce 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
