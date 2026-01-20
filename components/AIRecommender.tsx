
import React, { useState } from 'react';
import { getGameRecommendations } from '../geminiService';
import { GameRecommendation } from '../types';

const AIRecommender: React.FC = () => {
  const [preference, setPreference] = useState('');
  const [loading, setLoading] = useState(false);
  const [rec, setRec] = useState<GameRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preference.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await getGameRecommendations(preference);
      setRec(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'System glitch. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-recommender" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-2 text-neon-blue">
              <span className="w-2 h-2 bg-neon-blue rounded-full animate-ping"></span>
              <span className="uppercase text-[10px] font-black tracking-[0.4em]">Neural Link Active</span>
            </div>
            <h2 className="text-white font-gaming text-5xl font-black leading-tight italic uppercase">
              Find Your Next <br /><span className="text-neon-purple">Digital Fix</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              Describe your ideal gameplay, atmosphere, or favorite titles. Our proprietary AI engine scans the meta-verse to find the perfect match for your gaming style.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  placeholder="e.g. I love fast-paced shooters with a synthwave vibe and high difficulty..."
                  className="w-full h-32 bg-dark-card text-white border-2 border-white/5 rounded-sm p-6 focus:border-neon-blue outline-none transition-all resize-none font-light placeholder:text-gray-700"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neon-purple text-white py-5 font-black uppercase tracking-[0.3em] text-xs hover:bg-neon-blue hover:text-dark transition-all disabled:opacity-50 neon-border rounded-sm"
              >
                {loading ? 'Initiating Scan...' : 'Run Discovery Protocol'}
              </button>
              {error && <p className="text-neon-pink text-xs italic font-bold">{error}</p>}
            </form>
          </div>

          <div className="lg:w-1/2 w-full">
            {rec ? (
              <div className="bg-dark-card border border-neon-purple/30 p-10 rounded-sm space-y-8 animate-fade-in shadow-[0_0_50px_rgba(188,19,254,0.1)]">
                <div className="flex justify-between items-start border-b border-white/5 pb-6">
                  <div>
                    <h3 className="text-neon-blue font-gaming text-sm uppercase tracking-widest mb-1">{rec.matchingGenre}</h3>
                    <p className="text-white text-xl font-bold italic">"{rec.vibeDescription}"</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-gray-500 text-[8px] uppercase font-black">Est. Entry</span>
                    <span className="text-neon-purple font-gaming font-black">{rec.estimatedPriceRange}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-black">Top Candidates</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {rec.suggestedTitles.map((title, i) => (
                      <div key={i} className="bg-white/5 p-4 border-l-2 border-neon-blue flex justify-between items-center group cursor-pointer hover:bg-neon-blue/10 transition-colors">
                        <span className="text-white font-bold group-hover:text-neon-blue">{title}</span>
                        <svg className="w-4 h-4 text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-dark/50 p-6 rounded-sm border border-white/5">
                  <h4 className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-black mb-3">Analysis reasoning</h4>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{rec.reasoning}</p>
                </div>
              </div>
            ) : (
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-sm p-12 text-center group">
                <div className="w-24 h-24 border-2 border-neon-blue/20 rounded-full flex items-center justify-center mb-8 group-hover:border-neon-blue transition-colors animate-spin-slow">
                  <svg className="w-10 h-10 text-neon-blue opacity-30 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-gray-600 font-gaming uppercase tracking-[0.3em] text-sm">System Standby</h3>
                <p className="text-gray-700 text-xs mt-4">Waiting for user preference matrix...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIRecommender;
