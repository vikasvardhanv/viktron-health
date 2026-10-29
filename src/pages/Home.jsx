import React, { useRef, useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Eye, Cpu, ShieldCheck, Sparkles, Volume2, Activity } from 'lucide-react';

import DiagnosticShuffler from '../components/DiagnosticShuffler';
import TelemetryTypewriter from '../components/TelemetryTypewriter';
import CursorProtocolScheduler from '../components/CursorProtocolScheduler';
import InteractiveSimulatorSuite from '../components/InteractiveSimulatorSuite';
import ProtocolStack from '../components/ProtocolStack';
import ManifestoSection from '../components/ManifestoSection';
import ClinicalPricingSection from '../components/ClinicalPricingSection';

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
    labelX: 78,
    labelY: 15,
  },
  {
    label: 'Neural Processing Unit',
    heading: 'Think on the edge.',
    body: 'The on-device Hailo-8 neural engine runs an 8-bit quantized inference graph for face vectors, hazard detection, and FHIR vitals triage — zero raw video leaves the titanium frame.',
    partName: 'Hailo-8 NPU Silicon',
    partDesc: '8-bit quantized offline inference',
    dotX: 34,
    dotY: 61,
    labelX: 8,
    labelY: 65,
  },
  {
    label: 'Sensor & Battery',
    heading: 'Sense everything. Charge nothing.',
    body: 'A multi-spectral sensor cluster pairs with an 18-hour continuous lithium-polymer cell. Optical sensing, proximity, and pulse oximetry run all day without thermal hotspots.',
    partName: 'Sensor & Power Module',
    partDesc: 'Multi-spectral sensing + 18h autonomy',
    dotX: 63,
    dotY: 66,
    labelX: 78,
    labelY: 75,
  },
  {
    label: 'Bone Conduction Arm',
    heading: 'Wear it. Forget it.',
    body: 'Dual bone-conduction transducers whisper cues like "Your daughter, Sarah" through temporal bone resonance. 38g titanium alloy chassis eliminates social stigma.',
    partName: 'Titanium Temple Assembly',
    partDesc: 'Titanium frame + bone-conduction driver',
    dotX: 16,
    dotY: 30,
    labelX: 8,
    labelY: 20,
  },
];

export default function Home() {
  const { openDemoModal } = useOutletContext() || { openDemoModal: () => {} };
  const heroContainer = useRef(null);
  const scrollSectionRef = useRef(null);
  const scrollVideoRef = useRef(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance reveal
      gsap.fromTo(
        '.hero-reveal',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );

      // Scroll-driven Exploded View scrubbing with test101.mp4
      const section = scrollSectionRef.current;
      const video = scrollVideoRef.current;
      if (!section || !video) return;

      const initScrub = () => {
        const videoDuration = video.duration || 1.9;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=2500',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Scrub video currentTime
        tl.to(video, {
          currentTime: videoDuration * 0.95,
          ease: 'none',
          duration: 1,
        }, 0);

        // Sequence exploded callouts
        const partCount = EXPLODED_PARTS.length;
        const partDuration = 0.85 / partCount;

        EXPLODED_PARTS.forEach((part, i) => {
          const base = 0.08 + i * partDuration;
          const enterEnd = base + partDuration * 0.4;
          const holdEnd = enterEnd + partDuration * 0.35;
          const exitEnd = holdEnd + partDuration * 0.25;

          const textEl = section.querySelector(`.scroll-text-${i}`);
          const labelEl = section.querySelector(`.part-label-${i}`);
          const lineEl = section.querySelector(`.part-line-${i}`);
          const dotEl = section.querySelector(`.part-dot-${i}`);

          if (textEl) {
            tl.fromTo(
              textEl,
              { yPercent: 40, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: enterEnd - base, ease: 'power3.out' },
              base
            );
            tl.to(
              textEl,
              { yPercent: -30, opacity: 0, duration: exitEnd - holdEnd, ease: 'power3.in' },
              holdEnd
            );
          }

          if (labelEl) {
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

          if (lineEl) {
            tl.fromTo(
              lineEl,
              { attr: { 'stroke-dashoffset': 200 }, opacity: 0 },
              { attr: { 'stroke-dashoffset': 0 }, opacity: 0.8, duration: enterEnd - base, ease: 'power2.out' },
              base
            );
            tl.to(
              lineEl,
              { opacity: 0, duration: exitEnd - holdEnd, ease: 'power2.in' },
              holdEnd
            );
          }

          if (dotEl) {
            tl.fromTo(
              dotEl,
              { attr: { r: 0 }, opacity: 0 },
              { attr: { r: 0.8 }, opacity: 1, duration: 0.05, ease: 'power2.out' },
              base
            );
            tl.to(
              dotEl,
              { opacity: 0, duration: exitEnd - holdEnd, ease: 'power2.in' },
              holdEnd
            );
          }
        });
      };

      if (video.readyState >= 1) {
        initScrub();
      } else {
        video.addEventListener('loadedmetadata', initScrub, { once: true });
      }
    }, heroContainer);

    return () => {
      try {
        ctx.revert();
      } catch (_) {
        ScrollTrigger.getAll().forEach(st => {
          try { st.kill(); } catch (_2) {}
        });
      }
    };
  }, []);

  return (
    <div ref={heroContainer} className="flex flex-col w-full overflow-hidden">
      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION — "The Opening Shot"
          Full-bleed video background with heavy inward gradient mask,
          high scale contrast typography, and immediate action buttons.
          ════════════════════════════════════════════════════════════════ */}
      <section className="hero-video-section -mt-20">
        <div className="hero-video-wrapper">
          <video
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setHeroVideoReady(true)}
            className={`hero-video ${heroVideoReady ? 'hero-video--loaded' : ''}`}
          >
            <source src="/High_quality_exploded_enginee.mp4" type="video/mp4" />
          </video>
          <div className="hero-mask-gradient" aria-hidden="true" />
        </div>

        <div className="hero-content">
          <div className="hero-reveal hero-badge">
            <span className="hero-badge-dot" />
            <span>Clinical Edge Inference // AuraPath & AuraGuide</span>
          </div>

          <div className="hero-reveal flex justify-center mb-6">
            <img 
              src="/viktron-health-logo.png" 
              alt="Viktron Health" 
              className="w-16 h-16 object-contain drop-shadow-md" 
            />
          </div>

          <h1 className="hero-reveal hero-headline font-sans">
            Cognitive dignity
            <span className="inline-image-pill">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
                className="w-full h-full object-cover grayscale opacity-80"
                alt="Clinical setting"
              />
            </span>
            <span className="hero-headline-drama font-serif">
              built for the edge.
            </span>
          </h1>

          <p className="hero-reveal hero-subtitle">
            AuraGuide and AuraPath establish a zero-cloud cognitive assurance framework.
            Sub-0.4s facial vectoring and FHIR-compliant vital processing — entirely on-device to preserve personal dignity and eye contact.
          </p>

          <div className="hero-reveal flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#simulator-suite" 
              className="btn-magnetic px-8 py-4 rounded-full bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <Eye size={15} />
              <span>Launch Interactive Simulator</span>
            </a>

            <button 
              onClick={openDemoModal}
              className="btn-magnetic px-8 py-4 rounded-full bg-white/90 hover:bg-white border border-[var(--color-border)] text-[var(--color-foreground)] text-xs font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
            >
              <span>Request Clinical Demo</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SCROLL-DRIVEN EXPLODED DEVICE VIEW
          Uses test101.mp4 — scrubbing frame-by-frame with callout pins
          ════════════════════════════════════════════════════════════════ */}
      <section ref={scrollSectionRef} className="scroll-scrub-section">
        <video
          ref={scrollVideoRef}
          muted
          playsInline
          preload="auto"
          className="scroll-scrub-video"
          style={{ pointerEvents: 'none' }}
        >
          <source src="/test101.mp4" type="video/mp4" />
        </video>

        <div className="scroll-scrub-mask" aria-hidden="true" />

        {/* SVG Callout Lines & Dots */}
        <svg className="scroll-labels-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {EXPLODED_PARTS.map((part, i) => (
            <g key={`callout-svg-${i}`}>
              <circle
                className={`part-dot-${i}`}
                cx={part.dotX}
                cy={part.dotY}
                r="0"
                fill="var(--color-clay)"
                opacity="0"
              />
              <line
                className={`part-line-${i}`}
                x1={part.dotX}
                y1={part.dotY}
                x2={part.labelX + (part.labelX < 50 ? 3 : -3)}
                y2={part.labelY + 4}
                stroke="var(--color-clay)"
                strokeWidth="0.12"
                strokeDasharray="200"
                strokeDashoffset="200"
                opacity="0"
              />
            </g>
          ))}
        </svg>

        {/* HTML Callout Cards */}
        {EXPLODED_PARTS.map((part, i) => (
          <div
            key={`callout-${i}`}
            className={`part-label-${i} scroll-part-label`}
            style={{
              left: `${part.labelX}%`,
              top: `${part.labelY}%`,
            }}
          >
            <span className="scroll-part-label-name">{part.partName}</span>
            <span className="scroll-part-label-desc">{part.partDesc}</span>
          </div>
        ))}

        {/* Text narrative blocks that rive through on scroll */}
        {EXPLODED_PARTS.map((part, i) => (
          <div key={`text-${i}`} className={`scroll-text-${i} scroll-text-block`}>
            <span className="scroll-text-label">{part.label}</span>
            <h2 className="scroll-text-heading">{part.heading}</h2>
            <p className="scroll-text-body">{part.body}</p>
          </div>
        ))}

        {/* Scroll hint indicator */}
        <div className="scroll-hint">
          <span>Scroll to explore device</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURES — 3 INTERACTIVE FUNCTIONAL ARTIFACTS
          1. Diagnostic Shuffler (AuraPath Glasses)
          2. Telemetry Typewriter (AuraGuide FHIR Feed)
          3. Cursor Protocol Scheduler (Memory Schedule Grid)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="max-w-3xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-clay)] mb-2 block">
            Functional Micro-UIs // Interactive Artifacts
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-[var(--color-foreground)] tracking-tight">
            We replaced the cloud with a neural processing unit.
          </h2>
          <p className="text-[var(--color-muted-foreground)] mt-3 text-base md:text-lg">
            Experience our three operational micro-interfaces running local optical inference, FHIR stream auditing, and protocol synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DiagnosticShuffler />
          <TelemetryTypewriter />
          <CursorProtocolScheduler />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          LIVE INTERACTIVE SIMULATOR SUITE
          The complete in-browser digital instrument:
          AuraPath Smart Glasses POV + AuraGuide Clinical Copilot Console
          ════════════════════════════════════════════════════════════════ */}
      <InteractiveSimulatorSuite />

      {/* ════════════════════════════════════════════════════════════════
          PHILOSOPHY — "THE MANIFESTO"
          Contrasting dark section with organic textures and
          uncompromising dignity statements.
          ════════════════════════════════════════════════════════════════ */}
      <ManifestoSection />

      {/* ════════════════════════════════════════════════════════════════
          PROTOCOL — "STICKY STACKING ARCHIVE"
          3 pinned stacking cards with custom animated SVG canvases
          ════════════════════════════════════════════════════════════════ */}
      <ProtocolStack />

      {/* ════════════════════════════════════════════════════════════════
          CLINICAL DEPLOYMENT & PRICING
          3-tier clinical package grid with popup intake modal triggers
          ════════════════════════════════════════════════════════════════ */}
      <ClinicalPricingSection onSelectTier={openDemoModal} />

      {/* ════════════════════════════════════════════════════════════════
          FINAL CALL TO ACTION BANNER
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="rounded-[3rem] bg-[var(--color-moss)] text-white p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-mint)] font-bold mb-3 block">
              Begin Institutional Onboarding
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight mb-4">
              Ready to restore cognitive agency in your care facility?
            </h2>
            <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
              Schedule an in-person or virtual hardware demonstration with our clinical engineering team. Test the titanium glasses and EHR copilot on your existing patient workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 flex-shrink-0">
            <button
              onClick={openDemoModal}
              className="btn-magnetic px-8 py-4 rounded-full bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <span>Schedule Clinical Demonstration</span>
              <ArrowRight size={15} />
            </button>
            <a
              href="mailto:clinical-intake@viktronhealth.com"
              className="btn-magnetic px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider"
            >
              Email Medical Team
            </a>
          </div>

          {/* Ambient Decorative Rings */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[var(--color-mint)]/10 blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
