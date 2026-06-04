import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════════════════════════
   EXPLODED VIEW PARTS — Mapped to actual components visible in
   the test101.mp4 video. Positions are in percentage of the
   viewport, calculated from pixel analysis of the fully-exploded
   frame of the video (1280×720).
   ════════════════════════════════════════════════════════════════ */
const EXPLODED_PARTS = [
  {
    label: 'Optical Display Array',
    heading: 'See without being seen.',
    body: 'A transparent micro-OLED waveguide projects contextual cues directly into the wearer\'s field of view. Facial vectors, waypoint prompts, and caregiver alerts — rendered at 60fps with zero perceptible latency.',
    partName: 'Optical Display Array',
    partDesc: 'Micro-OLED waveguide projection',
    dotX: 64,
    dotY: 35,
    labelX: 80,
    labelY: 14,
  },
  {
    label: 'Neural Processing Unit',
    heading: 'Think on the edge.',
    body: 'The on-device neural engine runs a quantized 8-bit inference graph for facial recognition, ambient anomaly detection, and FHIR-compliant vital triage — all in under 200ms, with zero outbound network calls.',
    partName: 'Neural Processing Unit',
    partDesc: '8-bit quantized on-device inference',
    dotX: 34,
    dotY: 61,
    labelX: 8,
    labelY: 68,
  },
  {
    label: 'Sensor & Battery',
    heading: 'Sense everything. Charge nothing.',
    body: 'A multi-spectral sensor cluster pairs with an all-day lithium-polymer cell. Ambient light, proximity, and pulse oximetry run continuously — the battery outlasts the shift.',
    partName: 'Sensor & Battery Module',
    partDesc: 'Multi-spectral sensing + all-day power',
    dotX: 63,
    dotY: 66,
    labelX: 80,
    labelY: 76,
  },
  {
    label: 'Temple Arm',
    heading: 'Wear it. Forget it.',
    body: 'The temple arm houses the bone-conduction transducer and flex PCB in a titanium alloy frame weighing under 38g. No pressure points. No stigma. Just cognition restored.',
    partName: 'Temple Arm Assembly',
    partDesc: 'Titanium frame + bone-conduction driver',
    dotX: 16,
    dotY: 39,
    labelX: 4,
    labelY: 30,
  },
  {
    label: 'Hinge Mechanism',
    heading: 'Precision in every fold.',
    body: 'A dual-axis micro-hinge with detented positions at 15°, 30°, and 45°. Designed for 50,000 fold cycles with zero play — the only moving part, and it never loosens.',
    partName: 'Hinge Mechanism',
    partDesc: 'Dual-axis detented micro-hinge',
    dotX: 44,
    dotY: 54,
    labelX: 38,
    labelY: 42,
  },
];

export default function Home() {
  const heroContainer = useRef(null);
  const scrollVideoRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  // Hero entrance animations
  useGSAP(() => {
    gsap.fromTo('.hero-reveal',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.3 }
    );
  }, { scope: heroContainer });

  // Scroll-driven video scrub
  useEffect(() => {
    const video = scrollVideoRef.current;
    const section = scrollSectionRef.current;
    if (!video || !section) return;

    let ctx = null;

    const buildTimeline = () => {
      const duration = video.duration || 2;

      // Kill any previous ScrollTrigger from this component
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });

      ctx = gsap.context(() => {
        // Use 5x viewport height for 5 parts — more scroll room
        const scrollDistance = window.innerHeight * 5;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollDistance}px`,
            pin: true,
            scrub: 1.5,
          },
        });

        // Video scrub: play through the full exploded animation
        tl.fromTo(video, { currentTime: 0 }, { currentTime: duration, ease: 'none' }, 0);

        // Each part gets its own enter/hold/exit window
        const partCount = EXPLODED_PARTS.length;
        const partDuration = 0.85 / partCount; // total animation space per part
        const enterFrac = 0.4;  // fraction of partDuration for enter
        const holdFrac = 0.35;  // fraction for hold
        const exitFrac = 0.25;  // fraction for exit

        EXPLODED_PARTS.forEach((part, i) => {
          const base = 0.08 + i * partDuration;
          const enterEnd = base + partDuration * enterFrac;
          const holdEnd = enterEnd + partDuration * holdFrac;
          const exitEnd = holdEnd + partDuration * exitFrac;

          const textEl = section.querySelector(`.scroll-text-${i}`);
          const labelEl = section.querySelector(`.part-label-${i}`);
          const lineEl = section.querySelector(`.part-line-${i}`);
          const dotEl = section.querySelector(`.part-dot-${i}`);

          if (!textEl) return;

          // Text block: slide up and fade in, hold, slide up and fade out
          tl.fromTo(textEl,
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: enterEnd - base, ease: 'power3.out' },
            base
          );
          tl.to(textEl,
            { yPercent: -40, opacity: 0, duration: exitEnd - holdEnd, ease: 'power3.in' },
            holdEnd
          );

          // Callout label: fade + slide in, then fade out
          if (labelEl) {
            tl.fromTo(labelEl,
              { opacity: 0, y: 20, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: enterEnd - base, ease: 'back.out(1.4)' },
              base + 0.02
            );
            tl.to(labelEl,
              { opacity: 0, y: -15, scale: 0.95, duration: exitEnd - holdEnd, ease: 'power2.in' },
              holdEnd
            );
          }

          // Connecting line: draw from dot to label
          if (lineEl) {
            tl.fromTo(lineEl,
              { attr: { 'stroke-dashoffset': 200 }, opacity: 0 },
              { attr: { 'stroke-dashoffset': 0 }, opacity: 1, duration: 0.1, ease: 'power2.out' },
              base + 0.01
            );
            tl.to(lineEl,
              { opacity: 0, duration: exitEnd - holdEnd, ease: 'power2.in' },
              holdEnd
            );
          }

          // Dot: pop in and shrink out
          if (dotEl) {
            tl.fromTo(dotEl,
              { opacity: 0, attr: { r: 0 } },
              { opacity: 1, attr: { r: 0.8 }, duration: 0.06, ease: 'back.out(2.5)' },
              base
            );
            tl.to(dotEl,
              { opacity: 0, attr: { r: 0.3 }, duration: exitEnd - holdEnd },
              holdEnd
            );
          }
        });

        // Scroll hint fades early
        const scrollHint = section.querySelector('.scroll-hint');
        if (scrollHint) {
          tl.to(scrollHint, { opacity: 0, duration: 0.1 }, 0.05);
        }
      });
    };

    if (video.readyState >= 1) {
      buildTimeline();
    } else {
      video.addEventListener('loadedmetadata', buildTimeline, { once: true });
    }

    return () => {
      if (ctx) {
        try {
          // Scroll to top first so the pinned section is released cleanly
          window.scrollTo(0, 0);
          ctx.revert();
        } catch (_) {
          // GSAP context revert can fail if DOM nodes are already removed
          // Force-kill any remaining ScrollTriggers as fallback
          ScrollTrigger.getAll().forEach(st => {
            try { st.kill(); } catch (_2) { /* ignore */ }
          });
        }
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div ref={heroContainer} className="flex flex-col" style={{ marginTop: '-8rem' }}>
        <section className="hero-video-section">
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
              Clinical Edge Inference
            </div>

            <h1 className="hero-reveal hero-headline">
              Cognitive dignity
              <span className="inline-image-pill">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
                  className="w-full h-full object-cover grayscale opacity-80"
                  alt="Clinical imagery"
                />
              </span>
              built for the edge.
            </h1>

            <p className="hero-reveal hero-subtitle">
              AuraGuide and AuraPath establish a high-fidelity cognitive assurance framework.
              Sub-second facial vectoring and FHIR-compliant vital processing — entirely on-device.
            </p>

            <div className="hero-reveal">
              <Link to="/platform" className="hero-cta">
                Explore Architecture
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          SCROLL-DRIVEN EXPLODED VIEW
          Uses test101.mp4 — a 1.9s exploded device animation.
          As you scroll, the video scrubs frame-by-frame, revealing
          each part of the device with labeled callouts.
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

        {/* SVG overlay for labeled part callouts with connecting lines */}
        <svg className="scroll-labels-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {EXPLODED_PARTS.map((part, i) => (
            <g key={`callout-svg-${i}`}>
              <circle
                className={`part-dot-${i}`}
                cx={part.dotX}
                cy={part.dotY}
                r="0"
                fill="var(--color-accent)"
                opacity="0"
              />
              <line
                className={`part-line-${i}`}
                x1={part.dotX}
                y1={part.dotY}
                x2={part.labelX + (part.labelX < 50 ? 3 : -3)}
                y2={part.labelY + 4}
                stroke="var(--color-accent)"
                strokeWidth="0.1"
                strokeDasharray="200"
                strokeDashoffset="200"
                opacity="0"
              />
            </g>
          ))}
        </svg>

        {/* HTML callout labels — positioned absolutely over the video */}
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

        {/* Text sections that rive through on scroll */}
        {EXPLODED_PARTS.map((part, i) => (
          <div key={`text-${i}`} className={`scroll-text-${i} scroll-text-block`}>
            <span className="scroll-text-label">{part.label}</span>
            <h2 className="scroll-text-heading">{part.heading}</h2>
            <p className="scroll-text-body">{part.body}</p>
          </div>
        ))}

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span>Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <h2 className="feature-heading">
          We replaced the cloud with a neural processing unit.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bento-card p-10 flex flex-col justify-end min-h-[450px] bg-[var(--color-muted)] overflow-hidden relative group">
            <div className="absolute inset-0 z-0 opacity-40 transition-transform duration-1000 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover grayscale mix-blend-multiply"
                alt="Tech"
              />
            </div>
            <div className="relative z-10 bg-[var(--color-surface)]/95 backdrop-blur-md p-6 rounded-2xl max-w-md border border-[var(--color-border)] shadow-sm">
              <h3 className="font-medium text-xl mb-2 text-[var(--color-foreground)]">Whisper-Quiet Delivery</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Contextual relationships delivered via bone-conduction audio, preserving natural social fluidity without breaking eye contact.
              </p>
            </div>
          </div>

          <div className="bento-card p-8 flex flex-col justify-between min-h-[450px]">
            <div className="w-12 h-12 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 flex items-center justify-center">
              <span className="font-mono text-xs text-[var(--color-accent)] font-bold">HL7</span>
            </div>
            <div>
              <h3 className="font-medium text-xl mb-2 text-[var(--color-foreground)]">Clinical OS Dashboard</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Direct synchronization with leading EHR platforms for caregivers. Zero patient data leakage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}