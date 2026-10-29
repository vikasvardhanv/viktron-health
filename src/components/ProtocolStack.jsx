import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Eye, Activity, ShieldCheck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProtocolStack() {
  const stackContainerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

      // Sticky Stacking Animation
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top+=100",
            endTrigger: cards[i + 1],
            end: "top top+=100",
            pin: true,
            pinSpacing: false,
            scrub: true,
            onUpdate: (self) => {
              // As the next card approaches, scale down and blur current card
              const progress = self.progress;
              gsap.to(card, {
                scale: 1 - progress * 0.08,
                opacity: 1 - progress * 0.4,
                filter: `blur(${progress * 10}px)`,
                duration: 0.1,
                overwrite: "auto"
              });
            }
          });
        } else {
          // Last card pinned briefly
          ScrollTrigger.create({
            trigger: card,
            start: "top top+=100",
            end: "+=400",
            pin: true,
            pinSpacing: true
          });
        }
      });
    }, stackContainerRef);

    return () => {
      try {
        ctx.revert();
      } catch (_) {
        // Fallback kill
      }
    };
  }, []);

  return (
    <section ref={stackContainerRef} className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-clay)] mb-2 inline-block">
          Protocol Architecture // Stacking Archive
        </span>
        <h2 className="font-sans font-bold text-3xl md:text-5xl text-[var(--color-foreground)] tracking-tight">
          Three layers of absolute cognitive assurance.
        </h2>
        <p className="text-[var(--color-muted-foreground)] mt-3 text-base md:text-lg">
          Zero-cloud optical vectorization, real-time spatial haptic guidance, and bidirectional EHR synchronization.
        </p>
      </div>

      <div className="space-y-16">
        {/* CARD 01: Local Vectorization */}
        <div
          ref={card1Ref}
          className="w-full min-h-[500px] rounded-[2.5rem] bg-[#1B2520] border border-[#2D3E35] p-8 md:p-14 text-[#F4F1EB] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[var(--color-mint)] font-bold tracking-widest uppercase">
              Phase 01 // Local Silicon Layer
            </span>
            <h3 className="font-sans font-bold text-3xl md:text-4xl text-white mt-3 mb-4 tracking-tight">
              Zero-Trust Offline Vectorization
            </h3>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-6 font-light">
              Facial landmarks and spatial boundaries are mapped into high-dimensional embedding vectors directly on the Hailo-8 NPU in under 0.4 seconds. Raw video frames never persist to storage or transit across public networks.
            </p>
            <div className="flex items-center gap-6 font-mono text-xs text-[var(--color-mint)]">
              <span>LATENCY: 0.38 SECONDS</span>
              <span>EMBEDDING: 512-DIMENSIONAL</span>
            </div>
          </div>

          {/* SVG Canvas Animation: Rotating Concentric Double Helix / Geometric Motif */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_24s_linear_infinite]">
              <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(61,184,148,0.2)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(61,184,148,0.3)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(204,88,51,0.4)" strokeWidth="1" strokeDasharray="6 3" />
              <g className="animate-[spin_12s_linear_infinite_reverse]" style={{ transformOrigin: 'center' }}>
                <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(61,184,148,0.5)" strokeWidth="1.5" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(61,184,148,0.5)" strokeWidth="1.5" />
                <circle cx="100" cy="20" r="4" fill="var(--color-mint)" />
                <circle cx="100" cy="180" r="4" fill="var(--color-mint)" />
                <circle cx="20" cy="100" r="4" fill="var(--color-clay)" />
                <circle cx="180" cy="100" r="4" fill="var(--color-clay)" />
              </g>
              <circle cx="100" cy="100" r="16" fill="var(--color-mint)" fillOpacity="0.2" stroke="var(--color-mint)" strokeWidth="2" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-mono text-[10px] text-[var(--color-mint)] font-bold">NPU CORE</span>
            </div>
          </div>
        </div>

        {/* CARD 02: Spatial Haptic Guidance */}
        <div
          ref={card2Ref}
          className="w-full min-h-[500px] rounded-[2.5rem] bg-[#141C18] border border-[#26372E] p-8 md:p-14 text-[#F4F1EB] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[var(--color-clay)] font-bold tracking-widest uppercase">
              Phase 02 // Spatial Haptic Layer
            </span>
            <h3 className="font-sans font-bold text-3xl md:text-4xl text-white mt-3 mb-4 tracking-tight">
              Directional Guidance & Hazard Shield
            </h3>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-6 font-light">
              Dual bone-conduction transducers gently cue patient orientation. When wander thresholds or physical drop-offs (stairs, curbs) are detected, temple-specific pulses guide the patient back into safe corridors.
            </p>
            <div className="flex items-center gap-6 font-mono text-xs text-[var(--color-clay)]">
              <span>HAPTIC BANDWIDTH: 18dB</span>
              <span>GEOFENCE RADIUS: ADAPTIVE</span>
            </div>
          </div>

          {/* SVG Canvas Animation: Scanning Horizontal Laser Across Grid of Dots */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center flex-shrink-0 bg-black/40 rounded-3xl border border-white/10 overflow-hidden p-6">
            <div className="grid grid-cols-6 grid-rows-6 gap-5 w-full h-full place-items-center opacity-40">
              {Array.from({ length: 36 }).map((_, idx) => (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/60" />
              ))}
            </div>
            {/* Animated Laser Line */}
            <div 
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-clay)] to-transparent shadow-[0_0_12px_#CC5833]"
              style={{
                animation: 'scanLaser 3s ease-in-out infinite alternate'
              }}
            />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[var(--color-clay)]">
              HAZARD SCAN: ACTIVE
            </div>
          </div>
        </div>

        {/* CARD 03: EHR Sync */}
        <div
          ref={card3Ref}
          className="w-full min-h-[500px] rounded-[2.5rem] bg-[#0E1512] border border-[#203026] p-8 md:p-14 text-[#F4F1EB] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[var(--color-mint)] font-bold tracking-widest uppercase">
              Phase 03 // Clinical Telemetry Layer
            </span>
            <h3 className="font-sans font-bold text-3xl md:text-4xl text-white mt-3 mb-4 tracking-tight">
              Bi-Directional HL7 FHIR Bridge
            </h3>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-6 font-light">
              Automatic synchronization with leading EHR suites (EPIC, Cerner, AthenaHealth). Vitals, medication adherence logs, and wandering triggers update clinician dashboards in real-time with end-to-end encryption.
            </p>
            <div className="flex items-center gap-6 font-mono text-xs text-[var(--color-mint)]">
              <span>STANDARDS: HL7 FHIR v4.0.1</span>
              <span>ENCRYPTION: AES-256 BED-LINK</span>
            </div>
          </div>

          {/* SVG Canvas Animation: Pulsing EKG Waveform Path */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center flex-shrink-0 bg-black/40 rounded-3xl border border-white/10 overflow-hidden p-4">
            <svg viewBox="0 0 300 120" className="w-full h-full">
              <path
                d="M 10 60 L 60 60 L 75 30 L 90 90 L 105 10 L 120 110 L 135 60 L 180 60 L 195 40 L 210 80 L 225 60 L 290 60"
                fill="none"
                stroke="var(--color-mint)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="400"
                strokeDashoffset="400"
                style={{
                  animation: 'drawEKG 3s ease-in-out infinite'
                }}
              />
            </svg>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[var(--color-mint)] flex items-center gap-1.5">
              <Activity size={12} className="animate-pulse" />
              <span>72 BPM • NORMAL SINUS</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanLaser {
          0% { top: 10%; }
          100% { top: 90%; }
        }
        @keyframes drawEKG {
          0% { stroke-dashoffset: 400; opacity: 0.2; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -400; opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
