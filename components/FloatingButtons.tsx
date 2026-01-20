
import React from 'react';

interface FloatingButtonsProps {
  onChatOpen: () => void;
  isChatEnabled: boolean;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onChatOpen, isChatEnabled }) => {
  return (
    <div className="fixed bottom-[120px] right-4 md:right-10 z-[150] flex flex-col items-center space-y-4">
      {/* Instagram Button */}
      <a
        href="https://instagram.com/joystickjester.shop"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-11 h-11 md:w-16 md:h-16 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-xl md:rounded-2xl shadow-[0_5px_15px_rgba(220,39,67,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10 hover:rotate-6"
      >
        <svg className="w-5 h-5 md:w-9 md:h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>

      {/* Telegram Button */}
      <a
        href="https://t.me/joystickjesters"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-11 h-11 md:w-16 md:h-16 bg-neon-blue rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10 hover:-rotate-6"
      >
        <svg className="w-5 h-5 md:w-9 md:h-9 text-dark" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.762 5.319-1.056 6.891-.125.669-.371.893-.61.915-.52.047-.913-.344-1.416-.674-.787-.518-1.231-.839-1.996-1.343-.883-.582-.311-.901.193-1.423.131-.137 2.416-2.215 2.46-2.404.006-.023.011-.11-.054-.168-.065-.058-.16-.039-.229-.023-.098.022-1.658 1.053-4.68 3.104-.443.303-.844.451-1.203.443-.393-.008-1.149-.222-1.712-.404-.69-.224-1.238-.342-1.19-.723.025-.199.3-.404.823-.614 3.221-1.402 5.369-2.328 6.444-2.778 3.065-1.285 3.703-1.508 4.119-1.515z"/>
        </svg>
      </a>

      {/* Chat Button */}
      <button
        onClick={onChatOpen}
        className={`group relative flex items-center justify-center w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10 ${isChatEnabled ? 'bg-neon-purple shadow-[0_0_15px_rgba(108,92,231,0.4)]' : 'bg-gray-800 grayscale cursor-not-allowed opacity-50'}`}
      >
        <svg className="w-5 h-5 md:w-9 md:h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {!isChatEnabled && <span className="absolute -top-1 -right-1 bg-neon-pink text-[6px] font-black px-1 rounded-full uppercase">Locked</span>}
      </button>
    </div>
  );
};

export default FloatingButtons;
