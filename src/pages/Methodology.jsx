import React, { useRef } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Cpu, Heart, CheckCircle2, ArrowRight, Lock, Eye, Activity } from 'lucide-react';

export default function Methodology() {
  const container = useRef(null);
  const { openDemoModal } = useOutletContext() || { openDemoModal: () => {} };

  useGSAP(() => {
    gsap.fromTo(
      '.meth-reveal', 
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power3.out" }
    );
  }, { scope: container });

  const steps = [
    {
      num: "01",
      title: "Zero-Trust Local Vectorization",
      tag: "Air-Gapped Privacy Foundation",
      desc: "Every clinical decision and facial vector is processed entirely on-device via our Hailo-8 Neural Processing Unit. Biometric vectors are transformed into mathematical hashes; raw footage never touches network buffers or cloud servers.",
      icon: Lock,
      stats: "0.38s Latency • 100% Offline"
    },
    {
      num: "02",
      title: "Bi-Directional FHIR Telemetry Sync",
      tag: "EHR Interoperability",
      desc: "Direct integration with major clinical EHR platforms (EPIC, Cerner, AthenaHealth) ensures care teams receive verified vitals, medication adherence logs, and hazard alerts in real-time under strict BAA and HIPAA controls.",
      icon: Activity,
      stats: "HL7 FHIR v4.0.1 Compliant"
    },
    {
      num: "03",
      title: "Dignified Non-Invasive Haptic Guidance",
      tag: "Empathetic Human Output",
      desc: "Relationship prompts are conducted via bone-conduction audio at whisper thresholds (18dB). The patient's natural eye contact and social agency remain intact without the social stigma of traditional medical monitoring devices.",
      icon: Heart,
      stats: "Dual Temple Actuators • 38g Frame"
    }
  ];

  return (
    <div ref={container} className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 flex flex-col gap-20">
      <div className="max-w-4xl mx-auto pt-6 flex flex-col items-center text-center">
        <span className="meth-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-cream-subtle)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-clay)] mb-6 uppercase tracking-wider">
          <ShieldCheck size={14} /> Clinical Protocol
        </span>
        <h1 className="meth-reveal font-sans font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.98] mb-6 text-[var(--color-foreground)]">
          Implementation <br />
          <span className="font-serif italic font-normal text-[var(--color-moss)]">
            Methodology
          </span>
        </h1>
        <p className="meth-reveal text-base md:text-xl text-[var(--color-muted-foreground)] leading-relaxed font-normal max-w-2xl">
          A rigid, three-phase protocol establishing zero-trust local inference pipelines for absolute patient privacy and uninterrupted social dignity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto w-full">
        {steps.map((step, i) => {
          const IconComp = step.icon;
          return (
            <div 
              key={i} 
              className="meth-reveal bento-card p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between group hover:border-[var(--color-moss)] transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-[var(--color-clay)] font-bold">PHASE {step.num}</span>
                  <span className="text-xs font-mono text-[var(--color-muted-foreground)]">• {step.tag}</span>
                </div>
                <h3 className="font-sans font-bold text-2xl md:text-3xl text-[var(--color-foreground)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--color-muted-foreground)] leading-relaxed text-sm md:text-base max-w-2xl mb-4">
                  {step.desc}
                </p>
                <div className="font-mono text-xs text-[var(--color-moss)] font-bold">
                  {step.stats}
                </div>
              </div>

              <div className="w-16 h-16 rounded-2xl border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 bg-[var(--color-cream-subtle)] text-[var(--color-moss)] group-hover:bg-[var(--color-moss)] group-hover:text-white transition-colors">
                <IconComp size={26} />
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="meth-reveal max-w-5xl mx-auto w-full rounded-[2.5rem] bg-[var(--color-moss)] text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <h3 className="font-sans font-bold text-2xl md:text-3xl tracking-tight mb-2">
            Implement the protocol in your memory care wing.
          </h3>
          <p className="text-white/70 text-sm max-w-xl font-light">
            Our deployment engineering team provides turn-key on-site training and EHR bridge setup.
          </p>
        </div>
        <button
          onClick={openDemoModal}
          className="btn-magnetic px-8 py-4 rounded-full bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider flex-shrink-0 flex items-center gap-2"
        >
          <span>Request Protocol Review</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
