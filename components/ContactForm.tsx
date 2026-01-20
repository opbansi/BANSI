
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-dark-card border border-white/5 p-8 md:p-16 relative overflow-hidden rounded-sm max-w-4xl mx-auto shadow-2xl">
      <div className="absolute top-0 right-0 w-24 h-24 bg-neon-blue/5 blur-3xl"></div>
      
      {submitted ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full border-2 border-neon-blue flex items-center justify-center neon-border shadow-[0_0_20px_rgba(0,243,255,0.3)]">
            <svg className="w-10 h-10 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-gaming font-black uppercase italic tracking-tighter">Transmission Sent</h3>
          <p className="text-gray-500 font-light">Your intel has been received by the high command.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-black hover:text-white transition-colors"
          >
            Send New Transmission
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Operator Tag</label>
              <input required type="text" placeholder="Ghost_Rider_01" className="w-full bg-dark/50 border border-white/10 p-4 focus:border-neon-purple outline-none transition-all text-white placeholder:text-gray-800" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Secure Email</label>
              <input required type="email" placeholder="operator@vanguard.io" className="w-full bg-dark/50 border border-white/10 p-4 focus:border-neon-purple outline-none transition-all text-white placeholder:text-gray-800" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Transmission Priority</label>
            <select className="w-full bg-dark/50 border border-white/10 p-4 focus:border-neon-purple outline-none transition-all text-gray-400 appearance-none">
              <option className="bg-dark">Support / Technical Intel</option>
              <option className="bg-dark">Flash Sale Feedback</option>
              <option className="bg-dark">Game Recommendation Request</option>
              <option className="bg-dark">Community Partnership</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Message Payload</label>
            <textarea required rows={4} placeholder="Begin transmission..." className="w-full bg-dark/50 border border-white/10 p-4 focus:border-neon-purple outline-none transition-all text-white placeholder:text-gray-800 resize-none"></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-neon-blue text-dark font-black uppercase tracking-[0.4em] text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)]"
          >
            Launch Transmission
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
