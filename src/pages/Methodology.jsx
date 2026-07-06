import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Methodology() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.meth-reveal', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );
  }, { scope: container });

  const steps = [
    { num: "01", title: "Secure FHIR Sync", desc: "Direct integration with major EHR platforms ensures care teams have access to accurate, up-to-date medication and vitals logs. Privacy is the absolute foundation." },
    { num: "02", title: "Local Intelligence", desc: "Every clinical decision and facial vector is processed entirely on-device via our Neural Processing Unit architecture. No patient data hits the cloud without explicit consent." },
    { num: "03", title: "Empathetic Output", desc: "Guidance is delivered via whisper-quiet bone conduction, preserving the user's dignity without interrupting natural social flows. The tech gets out of the way of humanity." }
  ];

  return (
    <div ref={container} className="flex flex-col gap-16">
      <div className="max-w-4xl pt-12 flex flex-col items-center text-center">
        <img src="/viktron-health-logo.png" alt="Viktron Health" className="w-10 h-10 object-contain mb-6 meth-reveal" />
        <h1 className="meth-reveal font-display text-5xl md:text-[5rem] tracking-tight leading-[0.95] mb-6 text-[var(--color-foreground)]">
          Implementation Methodology
        </h1>
        <p className="meth-reveal text-lg md:text-xl text-[var(--color-muted-foreground)] leading-relaxed font-light">
          A rigid, three-phase protocol establishing zero-trust local inference pipelines for absolute patient privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="meth-reveal bento-card p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex-1">
              <div className="font-mono text-xs text-[var(--color-muted-foreground)] mb-4">PHASE {step.num}</div>
              <h3 className="font-display text-3xl mb-3">{step.title}</h3>
              <p className="text-[var(--color-muted-foreground)] max-w-xl leading-relaxed">{step.desc}</p>
            </div>
            <div className="w-16 h-16 rounded-full border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 bg-[var(--color-muted)]">
               <span className="font-mono text-sm">{step.num}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
