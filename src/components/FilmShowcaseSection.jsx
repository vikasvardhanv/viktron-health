import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Eye, ShieldCheck, Heart } from 'lucide-react';

export default function FilmShowcaseSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
      <div className="rounded-[3rem] bg-[#0E1512] border border-[#22352B] p-8 md:p-14 text-[#F4F1EB] shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[var(--color-mint)]/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Narrative (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--color-mint)] mb-6 uppercase tracking-wider">
                <Sparkles size={14} /> The Story of Recognition
              </span>

              <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight mb-6">
                When memory frays, eye contact must endure.
              </h2>

              <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-8">
                Watch how AuraPath titanium smart glasses whisper relationship context to Margaret in under 0.4 seconds—allowing her to instantly recognize her granddaughter Emily without looking away or checking a phone.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs text-white/80 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-mint)]" />
                <span>0.38s Optical vector match: "Emily — Granddaughter"</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-clay)]" />
                <span>18dB Whispered bone conduction prompt</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>100% Air-Gapped NPU Privacy Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Video Showcase Player (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/aurapath_film.mp4" type="video/mp4" />
              </video>

              {/* Minimalist Player Controls Overlay */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <span className="font-mono text-xs text-white/80">
                    AuraPath Film // 0:20 Run
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
