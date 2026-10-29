import React, { useRef } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Eye, Cpu, ShieldCheck, ArrowRight, Activity, Terminal } from 'lucide-react';
import InteractiveSimulatorSuite from '../components/InteractiveSimulatorSuite';

export default function InteractiveLab() {
  const container = useRef(null);
  const { openDemoModal } = useOutletContext() || { openDemoModal: () => {} };

  useGSAP(() => {
    gsap.fromTo(
      '.lab-reveal',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power3.out" }
    );
  }, { scope: container });

  return (
    <div ref={container} className="w-full flex flex-col bg-[#0B120E] text-[#F4F1EB] min-h-screen -mt-20 pt-28 pb-20">
      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-12 flex flex-col items-center text-center">
        <div className="lab-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--color-mint)] mb-6 uppercase tracking-wider">
          <Sparkles size={14} /> Clinical Sandbox Environment
        </div>

        <h1 className="lab-reveal font-sans font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.98] mb-6 text-white max-w-4xl">
          The Interactive <br />
          <span className="font-serif italic font-normal text-[var(--color-mint)]">
            Experience Lab
          </span>
        </h1>

        <p className="lab-reveal text-base md:text-xl text-white/70 leading-relaxed font-light max-w-2xl">
          Test both sides of our cognitive ecosystem in real-time: the patient-facing AuraPath smart glasses HUD and the caregiver-facing AuraGuide clinical EHR copilot.
        </p>

        <div className="lab-reveal flex items-center gap-6 mt-8 font-mono text-xs text-white/50">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse" />
            Live Video Feed Active
          </span>
          <span>•</span>
          <span>Hailo-8 NPU Emulation: 0.38s Latency</span>
          <span>•</span>
          <span>HL7 FHIR Bridge: Connected</span>
        </div>
      </div>

      {/* Main Interactive Simulator Suite */}
      <div className="w-full">
        <InteractiveSimulatorSuite />
      </div>

      {/* Lab Verification Protocol Checklist */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-12 w-full">
        <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-8 md:p-12">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8 flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs uppercase text-[var(--color-clay)] font-bold">
                Clinical Onboarding Checklist
              </span>
              <h3 className="font-sans font-bold text-2xl text-white mt-1">
                Sandbox Verification Criteria
              </h3>
            </div>
            <button
              onClick={openDemoModal}
              className="btn-magnetic px-6 py-3 rounded-full bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <span>Request Sandbox Hardware</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-white/80">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
              <div className="text-[var(--color-mint)] font-bold mb-2 flex items-center gap-2">
                <CheckCircleIcon /> 01 / Sub-0.4s Vector Match
              </div>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Optical sensors vectorize facial landmarks locally. Verified under 0.38 seconds without transmitting video frames.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
              <div className="text-[var(--color-mint)] font-bold mb-2 flex items-center gap-2">
                <CheckCircleIcon /> 02 / Whisper Bone Haptics
              </div>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Audio cues whisper through temporal bone resonance at 18dB. Eye contact is never broken during conversations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
              <div className="text-[var(--color-mint)] font-bold mb-2 flex items-center gap-2">
                <CheckCircleIcon /> 03 / HL7 FHIR Interoperability
              </div>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Bi-directional sync updates nursing records with verified medication intake and corridor wandering notifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <span className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-400 text-[10px]">
      ✔
    </span>
  );
}
