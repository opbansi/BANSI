
import React, { useState, useEffect } from 'react';

interface TopAnnouncementProps {
  text: string;
}

const TopAnnouncement: React.FC<TopAnnouncementProps> = ({ text }) => {
  const [seconds, setSeconds] = useState(5 * 3600 + 42 * 60 + 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="bg-neon-purple w-full py-2.5 relative overflow-hidden flex items-center border-b border-white/10 z-[70]">
      <div className="flex-1 overflow-hidden">
        <div className="inline-block whitespace-nowrap animate-marquee-fast">
          <span className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
            {text} | {text}
          </span>
        </div>
      </div>
      
      {/* Fixed Timer on the right for better UX */}
      <div className="shrink-0 bg-neon-purple/90 backdrop-blur-md px-4 md:px-8 border-l border-white/20 h-full flex items-center z-10">
        <div className="flex items-center space-x-3">
          <span className="text-white/70 text-[9px] font-black uppercase tracking-widest hidden sm:inline">Sale Ends In:</span>
          <span className="text-white font-gaming text-[10px] md:text-sm font-bold tabular-nums">
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TopAnnouncement;
