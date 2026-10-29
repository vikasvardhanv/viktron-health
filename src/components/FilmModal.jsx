import React from 'react';
import { X, Play, Volume2, Sparkles, Eye } from 'lucide-react';

export default function FilmModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0D1310] border border-[#23352A] text-[#F4F1EB] rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-mint)] animate-pulse" />
            <h3 className="font-sans font-bold text-lg md:text-xl text-white">
              AuraPath & AuraGuide // "The Thread of Recognition"
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
          <video
            autoPlay
            controls
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/aurapath_film.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Film Synopsis */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between text-xs font-mono text-white/70 gap-2">
          <span>0.38s Facial Vectoring • Temporal Bone Conduction • Zero-Cloud Air-Gapped NPU</span>
          <span className="text-[var(--color-mint)]">Preserving eye contact and memory agency</span>
        </div>
      </div>
    </div>
  );
}
