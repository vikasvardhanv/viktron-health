import React, { useRef } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Heart, Sparkles, ArrowRight, ShieldCheck, Eye, Lock } from 'lucide-react';

export default function Philosophy() {
  const container = useRef(null);
  const { openDemoModal } = useOutletContext() || { openDemoModal: () => {} };

  useGSAP(() => {
    gsap.fromTo(
      '.phil-reveal', 
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power3.out" }
    );
  }, { scope: container });

  return (
    <div ref={container} className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 flex flex-col gap-24">
      {/* Hero statement */}
      <div className="max-w-4xl mx-auto pt-6 flex flex-col items-center text-center">
        <div className="phil-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-cream-subtle)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-clay)] mb-6 uppercase tracking-wider">
          <Sparkles size={14} /> Cognitive Ethics & Dignity
        </div>

        <p className="phil-reveal font-sans text-xl md:text-2xl text-[var(--color-muted-foreground)] font-light leading-relaxed mb-6 max-w-2xl">
          Most memory care and digital health systems focus on: <br />
          <span className="line-through text-red-800/60 decoration-red-600/40 font-normal">
            passive containment, digital surveillance, and loss of identity.
          </span>
        </p>

        <h1 className="phil-reveal font-sans font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.98] text-[var(--color-foreground)] mb-8">
          We focus on: <br />
          <span className="font-serif italic font-normal text-[var(--color-clay)]">
            cognitive preservation & dignity.
          </span>
        </h1>

        <p className="phil-reveal text-base md:text-xl text-[var(--color-muted-foreground)] leading-relaxed font-normal max-w-2xl">
          A technology interface that demands your gaze or traps your attention fails the patient. A prosthetic must restore connection with the people you love.
        </p>
      </div>

      {/* 3 Pillars of Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
        <div className="phil-reveal bento-card p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-cream)] text-[var(--color-moss)] flex items-center justify-center mb-6">
              <Eye size={22} />
            </div>
            <h3 className="font-sans font-bold text-xl text-[var(--color-foreground)] mb-3">
              Eye Contact is Sacred
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              When a person looks down at a phone screen, human connection is severed. Bone-conduction cues deliver contextual prompts directly to the auditory nerve, allowing the patient to look right into their loved one's eyes.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-clay)] font-bold pt-4 border-t border-[var(--color-border)]/60">
            01 // Eye Contact Preservation
          </span>
        </div>

        <div className="phil-reveal bento-card p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-cream)] text-[var(--color-clay)] flex items-center justify-center mb-6">
              <Lock size={22} />
            </div>
            <h3 className="font-sans font-bold text-xl text-[var(--color-foreground)] mb-3">
              Absolute Privacy as a Right
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Dignity cannot survive in a glass house. Facial recognition algorithms that stream continuous live video into public clouds exploit vulnerable patients. Our NPU silicon runs air-gapped on the patient's face.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-moss)] font-bold pt-4 border-t border-[var(--color-border)]/60">
            02 // Air-Gapped NPU Silicon
          </span>
        </div>

        <div className="phil-reveal bento-card p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-cream)] text-[var(--color-mint)] flex items-center justify-center mb-6">
              <Heart size={22} />
            </div>
            <h3 className="font-sans font-bold text-xl text-[var(--color-foreground)] mb-3">
              Empower, Never Restrict
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Rather than locking doors and sounding blaring alarms, AuraPath gently steers patients through subtle haptic pulses on the temple. It offers gentle directional guidance so patients feel supported, not imprisoned.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-teal)] font-bold pt-4 border-t border-[var(--color-border)]/60">
            03 // Non-Punitive Guidance
          </span>
        </div>
      </div>

      {/* Quote / Manifesto Footer */}
      <div className="phil-reveal max-w-4xl mx-auto text-center py-12 border-t border-[var(--color-border)]">
        <blockquote className="font-serif italic text-2xl md:text-3xl text-[var(--color-moss)] leading-snug mb-6">
          "When memory begins to fray, technology should act as an invisible thread — holding relationships together without letting anyone see the seams."
        </blockquote>
        <div className="font-mono text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider">
          The Engineering Council • Viktron Health Inc.
        </div>
      </div>
    </div>
  );
}
