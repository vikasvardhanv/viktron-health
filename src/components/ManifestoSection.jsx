import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-text',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => {
      try {
        ctx.revert();
      } catch (_) {}
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-16 bg-[#0E1512] text-[#F4F1EB] overflow-hidden my-24 border-y border-[#1E2B24]"
    >
      {/* Background Organic Ambient Texture */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1600&auto=format&fit=crop")'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1512] via-transparent to-[#0E1512] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="manifesto-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--color-mint)] mb-8 uppercase tracking-widest">
          <Sparkles size={13} /> The Viktron Manifesto
        </div>

        {/* Statement 1: Industry Contrast */}
        <p className="manifesto-text font-sans text-lg md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed mb-6">
          Most digital memory care systems focus on <span className="text-white/80 line-through decoration-[var(--color-clay)]">centralized surveillance, patient tracking, and passive confinement</span>.
        </p>

        {/* Statement 2: Differentiated Breakthrough */}
        <h2 className="manifesto-text font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white max-w-3xl">
          We focus on: <span className="text-[var(--color-clay)]">edge-native cognitive prosthetics</span> that preserve human dignity and eye contact.
        </h2>

        <div className="manifesto-text mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left font-mono text-xs text-white/70">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[var(--color-mint)] font-bold mb-1">01 / DIGNITY FIRST</div>
            <p className="text-[11px] leading-relaxed text-white/60 font-sans">
              Guidance must whisper, never shout. The tech gets out of the way so personal connections endure.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[var(--color-clay)] font-bold mb-1">02 / AIR-GAPPED PRIVACY</div>
            <p className="text-[11px] leading-relaxed text-white/60 font-sans">
              Biometric vectors never leave the patient's bedside or titanium glasses. True zero-trust silicon.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[var(--color-mint)] font-bold mb-1">03 / CLINICAL CONTINUITY</div>
            <p className="text-[11px] leading-relaxed text-white/60 font-sans">
              Seamless synchronization with EHR systems empowers care teams with actionable safety data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
