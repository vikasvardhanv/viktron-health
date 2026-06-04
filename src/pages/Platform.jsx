import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Platform() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.plat-reveal', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col gap-32">
      <div className="max-w-4xl pt-12">
        <h1 className="plat-reveal font-display text-5xl md:text-[5rem] tracking-tight leading-[0.95] mb-6 text-[var(--color-foreground)]">
          The Care Ecosystem
        </h1>
        <p className="plat-reveal text-lg md:text-xl text-[var(--color-muted-foreground)] leading-relaxed font-light">
          Two distinct form factors operating on one unified, privacy-first intelligence layer. Designed for the patient. Built for the caregiver.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="plat-reveal bento-card p-10 min-h-[600px] flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center mb-8">
              <span className="font-mono text-xs">01</span>
            </div>
            <h2 className="font-display text-4xl mb-4">AuraPath Smart Glasses</h2>
            <p className="text-[var(--color-muted-foreground)] mb-8 leading-relaxed">
              AuraPath utilizes local optical sensors to match facial vectors in under 0.4 seconds. It then whispers relationship context—like "Your daughter, Sarah"—directly into the ear via bone-conduction, restoring social fluidity without breaking eye contact.
            </p>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></div>Sub-second facial recognition</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></div>Whisper-quiet bone conduction</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></div>Live environmental hazard alerts</li>
            </ul>
          </div>
          
          <div className="mt-12 h-48 w-full bg-[var(--color-muted)] rounded-xl border border-[var(--color-border)] relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
             <svg className="w-32 h-16 text-[var(--color-foreground)]" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M10 15 H40 C50 15 50 25 60 25 H90" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
               <circle cx="45" cy="15" r="3" fill="var(--color-accent)" stroke="none" />
             </svg>
          </div>
        </div>

        <div className="plat-reveal bento-card p-10 min-h-[600px] flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center mb-8">
              <span className="font-mono text-xs">02</span>
            </div>
            <h2 className="font-display text-4xl mb-4">AuraGuide Copilot</h2>
            <p className="text-[var(--color-muted-foreground)] mb-8 leading-relaxed">
              An intuitive mobile dashboard built for family caregivers. It integrates real-time vitals, medication interaction checks, and clinical protocols, functioning as an active medical co-pilot right in your pocket.
            </p>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-foreground)]"></div>Direct HL7 FHIR EHR integration</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-foreground)]"></div>Real-time medication checks</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-foreground)]"></div>Voice-first caregiver interactions</li>
            </ul>
          </div>

          <div className="mt-12 h-48 w-full bg-[var(--color-muted)] rounded-xl border border-[var(--color-border)] relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
             <div className="w-24 h-32 border-2 border-[var(--color-foreground)] rounded-xl bg-white shadow-sm flex flex-col p-2 gap-2 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-4 bg-[var(--color-muted)] rounded"></div>
                <div className="w-3/4 h-2 bg-[var(--color-border)] rounded mt-2"></div>
                <div className="w-1/2 h-2 bg-[var(--color-border)] rounded"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
