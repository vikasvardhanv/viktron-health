import React, { useRef, useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Eye, Play, Sparkles } from 'lucide-react';

import DiagnosticShuffler from '../components/DiagnosticShuffler';
import TelemetryTypewriter from '../components/TelemetryTypewriter';
import CursorProtocolScheduler from '../components/CursorProtocolScheduler';
import InteractiveSimulatorSuite from '../components/InteractiveSimulatorSuite';
import ProtocolStack from '../components/ProtocolStack';
import ManifestoSection from '../components/ManifestoSection';
import ClinicalPricingSection from '../components/ClinicalPricingSection';
import ExplodedScrubSection from '../components/ExplodedScrubSection';
import FilmShowcaseSection from '../components/FilmShowcaseSection';
import FilmModal from '../components/FilmModal';

export default function Home() {
  const { openDemoModal } = useOutletContext() || { openDemoModal: () => {} };
  const heroContainer = useRef(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false);

  useEffect(() => {
    // Reset scroll restoration so user lands at top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );
    }, heroContainer);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroContainer} className="flex flex-col w-full">
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
            className={`hero-video ${heroVideoReady ? 'hero-video--loaded' : 'opacity-20'}`}
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
            <button
              onClick={() => setIsFilmModalOpen(true)}
              className="btn-magnetic px-8 py-4 rounded-full bg-[var(--color-moss)] hover:bg-[var(--color-moss-dark)] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <Play size={15} fill="currentColor" />
              <span>Watch Film (0:20)</span>
            </button>

            <a 
              href="#simulator-suite" 
              className="btn-magnetic px-8 py-4 rounded-full bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <Eye size={15} />
              <span>Interactive Simulator</span>
            </a>

            <button 
              onClick={openDemoModal}
              className="btn-magnetic px-8 py-4 rounded-full bg-white/90 hover:bg-white border border-[var(--color-border)] text-[var(--color-foreground)] text-xs font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
            >
              <span>Request Demo</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURED PRODUCT FILM SHOWCASE
          Real-time video showing Margaret recognizing granddaughter Emily
          ════════════════════════════════════════════════════════════════ */}
      <FilmShowcaseSection />

      {/* ════════════════════════════════════════════════════════════════
          SCROLL-DRIVEN EXPLODED DEVICE VIEW
          Uses test101.mp4 — scrubbing frame-by-frame with callout pins
          ════════════════════════════════════════════════════════════════ */}
      <ExplodedScrubSection />

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

      {/* Film Lightbox Modal */}
      <FilmModal isOpen={isFilmModalOpen} onClose={() => setIsFilmModalOpen(false)} />
    </div>
  );
}
