
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState<User>({ ...user });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("Profile synchronization complete. Neural node updated."));
    }
  };

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const animeBoy = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJicnJmcmZyeXlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyJnB0PWEmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/3o7TKVUn7iM8FMEU24/giphy.gif";
  const animeGirl = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJicnJmcmZyeXlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyJnB0PWEmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/Ievv14yC8rXIA/giphy.gif";
  const animeOther = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJicnJmcmZyeXlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyeHlyJnB0PWEmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/13fS0y9y4k59Sw/giphy.gif";

  const getAnimeAvatar = () => {
    if (formData.gender === 'Female') return animeGirl;
    if (formData.gender === 'Other') return animeOther;
    return animeBoy;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 animate-anime-reveal">
      <div className="absolute inset-0 bg-dark/95 backdrop-blur-3xl" onClick={onClose}></div>
      
      {/* Anime Background Animation Overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none overflow-hidden">
        <img src={getAnimeAvatar()} alt="bg-anime" className="w-full h-full object-cover grayscale mix-blend-screen animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark"></div>
      </div>

      <div className="relative bg-dark-card/90 backdrop-blur-3xl border border-white/10 w-full max-w-5xl h-full sm:h-auto sm:max-h-[95vh] sm:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col md:flex-row scroll-container no-scrollbar transition-transform duration-500">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white p-3 z-40 bg-white/5 rounded-2xl transition-all">
           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5} /></svg>
        </button>

        {/* Left Profile Summary Panel */}
        <div className="md:w-5/12 p-8 sm:p-14 flex flex-col items-center text-center space-y-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 relative">
          <div className="relative group">
            <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-3xl border-4 border-neon-blue overflow-hidden shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-all duration-700 hover:scale-105">
              {formData.profilePic ? (
                <img src={formData.profilePic} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-dark flex items-center justify-center">
                  <span className="text-7xl font-gaming text-neon-blue italic">{formData.username[0].toUpperCase()}</span>
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-dark/70 rounded-3xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <input type="file" className="hidden" accept="image/*" onChange={handlePicUpload} />
                <div className="flex flex-col items-center gap-2">
                   <svg className="w-10 h-10 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeWidth={2.5}/></svg>
                   <span className="text-[9px] text-white font-black uppercase tracking-widest">Update Photo</span>
                </div>
              </label>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-white font-gaming text-3xl font-black uppercase italic tracking-tighter drop-shadow-2xl">{formData.username}</h3>
            <div className="flex items-center gap-3 px-6 py-1.5 bg-neon-purple/20 rounded-full border border-neon-purple/30">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <p className="text-white text-[9px] font-black uppercase tracking-[0.3em]">NODE_CONNECTED</p>
            </div>
          </div>

          <div className="w-full p-6 bg-dark/40 rounded-3xl border border-white/5 shadow-inner hidden md:block">
            <img src={getAnimeAvatar()} alt="side-anime" className="w-24 h-24 mx-auto rounded-full border-2 border-neon-blue shadow-2xl mb-4 object-cover" />
            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black italic">PROTOCOL_SYNC: SUCCESS</p>
          </div>
        </div>

        {/* Form Details Section */}
        <div className="flex-1 p-8 sm:p-14 md:p-20 overflow-y-auto no-scrollbar">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <h2 className="text-white font-gaming text-3xl font-black uppercase italic tracking-tighter">My <span className="text-neon-purple">Vault</span></h2>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`w-full sm:w-auto px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${isEditing ? 'bg-green-500 text-dark' : 'bg-neon-blue text-dark hover:bg-white active:scale-95'}`}
            >
              {isEditing ? 'SYNC CHANGES' : 'EDIT PROFILE'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] text-gray-500 uppercase font-black tracking-widest ml-4">Neural Tag</label>
              <input 
                disabled={!isEditing}
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-dark/50 border border-white/10 p-4 rounded-2xl outline-none focus:border-neon-purple text-white text-xs uppercase font-black tracking-widest disabled:opacity-30 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] text-gray-500 uppercase font-black tracking-widest ml-4">Secure Link (Email)</label>
              <input 
                disabled={!isEditing}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-dark/50 border border-white/10 p-4 rounded-2xl outline-none focus:border-neon-purple text-white text-xs font-bold tracking-widest disabled:opacity-30 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] text-gray-500 uppercase font-black tracking-widest ml-4">Origin Date (DOB)</label>
              <input 
                type="date"
                disabled={!isEditing}
                value={formData.dob}
                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-dark/50 border border-white/10 p-4 rounded-2xl outline-none focus:border-neon-purple text-white text-xs uppercase font-black tracking-widest disabled:opacity-30 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] text-gray-500 uppercase font-black tracking-widest ml-4">Gender Node</label>
              <select 
                disabled={!isEditing}
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full bg-dark/50 border border-white/10 p-4 rounded-2xl outline-none focus:border-neon-purple text-white text-xs uppercase font-black tracking-widest disabled:opacity-30 transition-all appearance-none shadow-inner"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Custom</option>
              </select>
            </div>
          </div>

          <div className="mt-10 space-y-2">
            <label className="text-[9px] text-gray-500 uppercase font-black tracking-widest ml-4">Neural Bio (Manifest)</label>
            <textarea 
              disabled={!isEditing}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              placeholder="Describe your gaming journey..."
              className="w-full bg-dark/50 border border-white/10 p-6 rounded-[2rem] outline-none focus:border-neon-blue text-white text-xs font-medium leading-relaxed disabled:opacity-30 resize-none transition-all shadow-inner"
            />
          </div>

          <div className="mt-12 p-8 bg-white/5 border border-white/5 rounded-[2rem] flex items-center justify-between backdrop-blur-md">
            <div>
              <p className="text-white text-[10px] font-black uppercase tracking-widest">Asset Integrity</p>
              <p className="text-gray-500 text-[8px] uppercase font-bold tracking-[0.2em]">ENCRYPTION_LAYER: ARMORED</p>
            </div>
            <div className="text-right">
              <p className="text-neon-blue text-[10px] font-black uppercase tracking-widest">NODE_SECURED</p>
              <p className="text-gray-600 text-[8px] font-mono">{user.id.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;
