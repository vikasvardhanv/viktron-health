import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Cpu, Battery, Volume2, Sparkles, ArrowDown } from 'lucide-react';
import glassesHero from '../assets/aurapath_glasses.png';

gsap.registerPlugin(ScrollTrigger);

const EXPLODED_PARTS = [
  {
    label: 'Optical Waveguide Array',
    heading: 'See without being seen.',
    body: 'A transparent micro-OLED waveguide projects contextual relationship cues directly into the wearer\'s field of view at 60fps with sub-0.4s facial recognition latency.',
    partName: 'Optical Waveguide Array',
    partDesc: 'Micro-OLED waveguide projection',
    dotX: 64,
    dotY: 35,
    labelX: 72,
    labelY: 18,
    icon: Eye
  },
  {
    label: 'Hailo-8 NPU Silicon',
    heading: 'Think on the edge.',
    body: 'The on-device neural engine runs an 8-bit quantized inference graph for face vectors, hazard detection, and FHIR vitals triage — zero raw video leaves the titanium frame.',
    partName: 'Hailo-8 NPU Silicon',
    partDesc: '8-bit quantized offline inference',
    dotX: 34,
    dotY: 61,
    labelX: 12,
    labelY: 65,
    icon: Cpu
  },
  {
    label: 'Multi-Spectral Biometrics',
    heading: 'Sense everything. Charge nothing.',
    body: 'A multi-spectral sensor cluster pairs with an 18-hour continuous lithium-polymer cell. Optical sensing, proximity, and pulse oximetry run all day without thermal hotspots.',
    partName: 'Sensor & Power Module',
    partDesc: 'Multi-spectral sensing + 18h autonomy',
    dotX: 63,
    dotY: 66,
    labelX: 72,
    labelY: 72,
    icon: Battery
  },
  {
    label: 'Bone Conduction Temple',
    heading: 'Wear it. Forget it.',
    body: 'Dual bone-conduction transducers whisper cues like "Your daughter, Sarah" through temporal bone resonance. 38g titanium alloy chassis eliminates social stigma.',
    partName: 'Titanium Temple Assembly',
    partDesc: 'Titanium frame + bone-conduction driver',
    dotX: 20,
    dotY: 30,
    labelX: 12,
    labelY: 22,
    icon: Volume2
  },
];

export default function ExplodedScrubSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section) return;

      const videoDuration = (video && video.duration) || 1.9;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1800',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Scrub video
      if (video) {
        tl.to(video, {
          currentTime: videoDuration * 0.95,
          ease: 'none',
          duration: 1,
        }, 0);
      }

      // Animate callout parts
      const partCount = EXPLODED_PARTS.length;
      const partDuration = 0.9 / partCount;

      EXPLODED_PARTS.forEach((part, i) => {
        const base = i * partDuration;
        const enterEnd = base + partDuration * 0.35;
        const holdEnd = enterEnd + partDuration * 0.4;
        const exitEnd = holdEnd + partDuration * 0.25;

        const textEl = section.querySelector(`.scroll-text-${i}`);
        const labelEl = section.querySelector(`.part-label-${i}`);

        if (textEl) {
          // If it's the first card, start visible on entrance
          if (i === 0) {
            tl.fromTo(
              textEl,
              { opacity: 1, yPercent: 0 },
              { opacity: 0, yPercent: -30, duration: exitEnd - holdEnd, ease: 'power2.in' },
              holdEnd
            );
          } else {
            tl.fromTo(
              textEl,
              { opacity: 0, yPercent: 40 },
              { opacity: 1, yPercent: 0, duration: enterEnd - base, ease: 'power3.out' },
              base
            );
            tl.to(
              textEl,
              { opacity: 0, yPercent: -30, duration: exitEnd - holdEnd, ease: 'power2.in' },
              holdEnd
            );
          }
        }

        if (labelEl) {
          if (i === 0) {
            tl.fromTo(
              labelEl,
              { opacity: 1, scale: 1 },
              { opacity: 0, scale: 0.95, duration: exitEnd - holdEnd, ease: 'power2.in' },
              holdEnd
            );
          } else {
            tl.fromTo(
              labelEl,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: enterEnd - base, ease: 'back.out(1.4)' },
              base
            );
            tl.to(
              labelEl,
              { opacity: 0, scale: 0.95, duration: exitEnd - holdEnd, ease: 'power2.in' },
              holdEnd
            );
          }
        }
      });
    }, sectionRef);

    return () => {
      try {
        ctx.revert();
      } catch (_) {}
    };
  }, []);

  return (
    <section ref={sectionRef} className="scroll-scrub-section relative w-full min-h-screen bg-[#111A15] text-[#F4F1EB] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="scroll-scrub-video absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-90 contrast-120"
        style={{ pointerEvents: 'none' }}
      >
        <source src="/test101.mp4" type="video/mp4" />
      </video>

      {/* Fallback image if video not loaded */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <img src={glassesHero} alt="AuraPath Frame" className="max-w-xl max-h-[450px] object-contain filter drop-shadow-2xl" />
      </div>

      {/* Inward Radial Mask */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 20%, #111A15 100%)'
        }}
      />

      {/* HTML Callout Cards */}
      {EXPLODED_PARTS.map((part, i) => (
        <div
          key={`callout-${i}`}
          className={`part-label-${i} absolute z-20 hidden md:flex flex-col gap-1 p-3 px-4 rounded-xl bg-black/75 backdrop-blur-md border border-[var(--color-clay)]/50 shadow-xl transition-all ${
            i === 0 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: `${part.labelX}%`,
            top: `${part.labelY}%`,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-clay)] animate-pulse" />
            <span className="text-xs font-bold text-white font-sans">{part.partName}</span>
          </div>
          <span className="text-[10px] font-mono text-[var(--color-clay)] uppercase tracking-wider">{part.partDesc}</span>
        </div>
      ))}

      {/* Center Text Narrative Blocks */}
      {EXPLODED_PARTS.map((part, i) => (
        <div 
          key={`text-${i}`} 
          className={`scroll-text-${i} absolute z-30 max-w-2xl text-center flex flex-col items-center gap-4 px-6 ${
            i === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-mint)]/15 border border-[var(--color-mint)]/40 text-[var(--color-mint)] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={12} /> {part.label}
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            {part.heading}
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed font-light max-w-xl">
            {part.body}
          </p>
        </div>
      ))}

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/50 font-mono text-[11px] uppercase tracking-widest animate-pulse pointer-events-none">
        <span>Scroll to inspect internal silicon</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
