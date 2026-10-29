import React, { useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Eye, Cpu, Volume2, ShieldCheck, Heart, Sparkles, 
  ArrowRight, Activity, Battery, Bluetooth, CheckCircle2, Lock
} from 'lucide-react';

import glassesImg from '../assets/aurapath_glasses.png';
import guideImg from '../assets/auragide.png';

const TECH_SPECS = [
  { category: "Optics & Display", spec: "Micro-OLED Waveguide Array", detail: "60 FPS refresh rate • 1,200 nits peak outdoor brightness • 84° FOV" },
  { category: "Neural Processing", spec: "Hailo-8 Edge AI Processor", detail: "26 TOPS raw compute • 8-bit quantized models • 0.38s vector match latency" },
  { category: "Acoustics & Voice", spec: "Dual Bone-Conduction Actuators", detail: "18dB intimate whisper threshold • Temporal bone resonance • Zero ear-canal occlusion" },
  { category: "Biometric Sensing", spec: "Multi-Spectral Physiological Cluster", detail: "Continuous SpO2 • Pulse rate monitoring • 6-axis spatial IMU for gait & fall triage" },
  { category: "Chassis & Ergonomics", spec: "Aerospace Titanium Unibody", detail: "38 grams total frame weight • Prescription lens compatible • IP54 moisture rating" },
  { category: "Battery & Power", spec: "Dual Cell Lithium-Polymer", detail: "18 hours continuous active scanning • Fast magnetic charging (80% in 35 mins)" },
  { category: "Security & Privacy", spec: "Hardware Root-of-Trust Enclave", detail: "100% offline air-gapped vectorization • AES-256 bedside link • Zero raw video storage" },
  { category: "EHR Interoperability", spec: "HL7 FHIR v4.0.1 API Bridge", detail: "Direct synchronization with EPIC Systems, Cerner Millenium, AthenaHealth" }
];

export default function Platform() {
  const container = useRef(null);
  const { openDemoModal } = useOutletContext() || { openDemoModal: () => {} };

  useGSAP(() => {
    gsap.fromTo(
      '.plat-reveal', 
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power3.out" }
    );
  }, { scope: container });

  return (
    <div ref={container} className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 flex flex-col gap-24">
      {/* Platform Header */}
      <div className="max-w-4xl mx-auto pt-6 flex flex-col items-center text-center">
        <div className="plat-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-cream-subtle)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-clay)] mb-6 uppercase tracking-wider">
          <Sparkles size={14} /> Hardware & Software Ecosystem
        </div>
        <h1 className="plat-reveal font-sans font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.98] mb-6 text-[var(--color-foreground)]">
          The Two Pillars of <br />
          <span className="font-serif italic font-normal text-[var(--color-moss)]">
            Cognitive Dignity
          </span>
        </h1>
        <p className="plat-reveal text-base md:text-xl text-[var(--color-muted-foreground)] leading-relaxed font-normal max-w-2xl">
          Two synchronized form factors operating on one unified, zero-cloud intelligence layer. Designed for the patient. Built for the caregiver.
        </p>
      </div>

      {/* 2-Column Hardware / Software Feature Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* CARD 01: AuraPath Smart Glasses */}
        <div className="plat-reveal bento-card p-8 md:p-12 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[var(--color-moss)] text-white flex items-center justify-center">
                  <Eye size={20} />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-clay)] font-bold">Pillar 01</span>
                  <h2 className="font-sans font-bold text-2xl md:text-3xl text-[var(--color-foreground)]">AuraPath Smart Glasses</h2>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-muted-foreground)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                AIMB-G2 TITANIUM
              </span>
            </div>

            <p className="text-[var(--color-muted-foreground)] text-sm md:text-base mb-8 leading-relaxed">
              AuraPath utilizes local optical sensors to match facial vectors in under 0.4 seconds. It then whispers relationship context—like <em className="text-[var(--color-foreground)] font-serif italic">"Your daughter, Sarah"</em>—directly into the ear via bone-conduction, restoring social fluidity without breaking eye contact.
            </p>

            <div className="space-y-4 text-xs font-mono mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-mint)]" />
                <span>0.38s Optical vector match latency</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-clay)]" />
                <span>Whisper-quiet bone conduction (18dB threshold)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-moss)]" />
                <span>Dual obstacle & wander deviation hazard alert</span>
              </div>
            </div>
          </div>

          {/* Product Image Frame */}
          <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-cream-subtle)] p-6 flex items-center justify-center relative min-h-[260px] group-hover:border-[var(--color-moss)] transition-colors">
            <img 
              src={glassesImg} 
              alt="AuraPath Smart Glasses" 
              className="max-h-56 object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* CARD 02: AuraGuide Copilot */}
        <div className="plat-reveal bento-card p-8 md:p-12 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[var(--color-clay)] text-white flex items-center justify-center">
                  <Cpu size={20} />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-moss)] font-bold">Pillar 02</span>
                  <h2 className="font-sans font-bold text-2xl md:text-3xl text-[var(--color-foreground)]">AuraGuide Clinical Copilot</h2>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-muted-foreground)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                HL7 FHIR v4.0.1
              </span>
            </div>

            <p className="text-[var(--color-muted-foreground)] text-sm md:text-base mb-8 leading-relaxed">
              An intuitive bedside & mobile console built for clinical care teams and family members. It integrates real-time telemetry, medication interaction checks, and wandering alerts, functioning as an active medical co-pilot right in your pocket.
            </p>

            <div className="space-y-4 text-xs font-mono mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-mint)]" />
                <span>Direct bi-directional EPIC & Cerner EHR integration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-clay)]" />
                <span>Real-time medication OCR cross-referencing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-moss)]" />
                <span>Voice-first AI triage & corridor safety alerts</span>
              </div>
            </div>
          </div>

          {/* Product Image Frame */}
          <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-cream-subtle)] p-6 flex items-center justify-center relative min-h-[260px] group-hover:border-[var(--color-clay)] transition-colors">
            <img 
              src={guideImg} 
              alt="AuraGuide Caregiver Console" 
              className="max-h-56 object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      <div className="plat-reveal rounded-[2.5rem] bg-white border border-[var(--color-border)] p-8 md:p-12 shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border)] mb-8 flex-wrap gap-4">
          <div>
            <span className="font-mono text-xs uppercase text-[var(--color-clay)] font-bold">
              Engineering Matrix
            </span>
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-[var(--color-foreground)] mt-1">
              Technical Architecture Specifications
            </h3>
          </div>
          <Link
            to="/lab"
            className="btn-magnetic px-6 py-2.5 rounded-full bg-[var(--color-moss)] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <span>Test In Sandbox</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-muted-foreground)]">
                <th className="pb-3 uppercase tracking-wider">Subsystem</th>
                <th className="pb-3 uppercase tracking-wider">Specification</th>
                <th className="pb-3 uppercase tracking-wider">Clinical Capability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]/60">
              {TECH_SPECS.map((item, idx) => (
                <tr key={idx} className="hover:bg-[var(--color-cream-subtle)] transition-colors">
                  <td className="py-4 font-bold text-[var(--color-moss)]">{item.category}</td>
                  <td className="py-4 font-semibold text-[var(--color-foreground)]">{item.spec}</td>
                  <td className="py-4 text-[var(--color-muted-foreground)] font-sans">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action CTA */}
      <div className="plat-reveal rounded-[2.5rem] bg-[#141A17] text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="font-sans font-bold text-2xl md:text-3xl tracking-tight mb-2">
            Experience both systems in our interactive simulator.
          </h3>
          <p className="text-white/70 text-sm max-w-xl font-light">
            Test the live facial recognition HUD and caregiver clinical console directly in your browser.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            to="/lab"
            className="btn-magnetic px-7 py-3.5 rounded-full bg-[var(--color-clay)] text-white text-xs font-mono font-bold uppercase tracking-wider"
          >
            Launch Simulator
          </Link>
          <button
            onClick={openDemoModal}
            className="btn-magnetic px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/20"
          >
            Request Demo
          </button>
        </div>
      </div>
    </div>
  );
}
