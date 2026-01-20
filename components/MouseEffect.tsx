
import React, { useEffect, useState, useRef } from 'react';

const MouseEffect: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-dark">
      {/* Background Interactive Highlight */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(108, 92, 231, 0.08), transparent 80%)`
        }}
      />
      
      {/* Moving Starfield */}
      <div 
        className="absolute inset-[-100px] transition-transform duration-500 ease-out opacity-20"
        style={{ 
          transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)`
        }}
      >
        {[...Array(120)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 110 + '%',
              left: Math.random() * 110 + '%',
              backgroundColor: i % 5 === 0 ? '#6c5ce7' : i % 3 === 0 ? '#00d2ff' : '#ffffff',
              boxShadow: i % 4 === 0 ? '0 0 10px rgba(108, 92, 231, 0.8)' : 'none',
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.03] transition-transform duration-1000 ease-out"
        style={{ 
          backgroundImage: 'linear-gradient(#6c5ce7 1px, transparent 1px), linear-gradient(90deg, #6c5ce7 1px, transparent 1px)', 
          backgroundSize: '80px 80px',
          transform: `translate(${mousePos.x * -0.01}px, ${mousePos.y * -0.01}px) rotate(${mousePos.x * 0.001}deg)`
        }}
      />

      <style>{`
        @keyframes twinkle {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MouseEffect;
