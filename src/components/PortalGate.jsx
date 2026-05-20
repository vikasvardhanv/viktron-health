import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Activity, ShieldAlert, Cpu, Heart, CheckCircle2, Navigation, Sparkles, AlertTriangle } from "lucide-react";
import FlowArt, { FlowSection } from "./ui/story-scroll";
import auraguideImg from "../assets/auragide.png";
import aurapathGlassesImg from "../assets/aurapath_glasses.png";

export default function PortalGate({ onNavigate }) {
  const containerRef = useRef(null);

  // Card cursor track tilt mechanics
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight glow CSS variables
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Normalize coordinates (-0.5 to 0.5)
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    const maxTilt = 8;

    gsap.to(card, {
      rotateX: -normY * maxTilt,
      rotateY: normX * maxTilt,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3
    });

    const img = card.querySelector(".portal-img");
    if (img) {
      gsap.to(img, {
        x: normX * 15,
        y: normY * 15,
        scale: 1.04,
        ease: "power2.out",
        duration: 0.3
      });
    }
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.7
    });

    const img = card.querySelector(".portal-img");
    if (img) {
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "power3.out",
        duration: 0.7
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <FlowArt aria-label="Viktron Dementia Care Suite Gateway">
        
        {/* SLIDE 1: Cinematic Gateway Hero */}
        <FlowSection aria-label="Viktron Gateway" style={{ backgroundColor: "#040603", color: "#F2F5F0" }}>
          <div className="flex flex-col h-full justify-between py-6">
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-lime)] text-xs font-bold uppercase tracking-[0.25em]">
                01 — Precision Care Suite
              </span>
              <span className="system-status text-[0.7rem] px-3 py-1 rounded-full border border-[rgba(217,228,181,0.15)] flex items-center gap-2">
                <span className="status-dot"></span> SECURE EDGE CORE
              </span>
            </div>

            <div className="my-auto max-w-4xl">
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.9] uppercase tracking-tight text-white">
                Precision
                <br />
                Intelligence.
                <br />
                <span className="text-[var(--accent-lime)] drop-shadow-[0_0_20px_rgba(217,228,181,0.12)]">Restoring Dignity.</span>
              </h1>
              <div className="my-[3vh] w-24 h-[1px] bg-[var(--accent-lime)] opacity-60"></div>
              <p className="max-w-[65ch] text-[clamp(1rem,1.8vw,1.35rem)] font-normal leading-relaxed text-[var(--text-muted)]">
                Viktron Health introduces a new paradigm in neurological care. By blending agentic clinical AI co-pilots with wearable memory prosthetics, we preserve cognitive agency, support caregivers, and guide bedside diagnostics.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-auto cursor-pointer animate-pulse text-[rgba(242,245,240,0.5)] hover:text-white transition-colors duration-300">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Scroll to explore technology</span>
              <ArrowRight size={14} className="rotate-90" />
            </div>
          </div>
        </FlowSection>

        {/* SLIDE 2: AuraGuide Co-pilot */}
        <FlowSection aria-label="AuraGuide Clinical Copilot" style={{ backgroundColor: "#070c04", color: "#F2F5F0" }}>
          <div className="flex flex-col h-full justify-between py-6">
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-lime)] text-xs font-bold uppercase tracking-[0.25em]">
                02 — Clinical Copilot
              </span>
              <span className="system-status text-[0.7rem] px-3 py-1 rounded-full border border-[rgba(217,228,181,0.15)] flex items-center gap-2">
                <span className="status-dot"></span> HL7 FHIR SYNC
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
              <div className="lg:col-span-7 max-w-2xl">
                <span className="card-tag">AuraGuide Suite</span>
                <h1 className="text-[clamp(2.5rem,6vw,4.8rem)] font-extrabold leading-[0.9] uppercase tracking-tight text-white my-3">
                  AuraGuide
                  <br />
                  Clinical AI
                </h1>
                <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed text-[var(--text-muted)] mb-6">
                  The world's first agentic bedside co-pilot. AuraGuide securely links fragmented EPIC and Cerner patient vitals with local, zero-latency NPU edge computing, serving up clinical diagnostics in real-time.
                </p>

                <div className="specs-row mb-8">
                  <span className="spec-pill">On-Device NPU Execution</span>
                  <span className="spec-pill">Epic/Cerner FHIR Link</span>
                  <span className="spec-pill">Biometric Pulse Analytics</span>
                </div>

                <div className="portal-cta-group">
                  <button 
                    className="card-explore-btn hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    onClick={() => onNavigate("auraguide")}
                  >
                    Explore Dashboard Terminal
                  </button>
                  <a 
                    href="https://auraguide.viktronhealth.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="portal-cta flex items-center justify-center bg-white text-black hover:bg-[var(--accent-lime)] hover:text-black w-11 h-11 rounded-full transition-all duration-300"
                    title="Redirect to auraguide.viktronhealth.com"
                  >
                    <ArrowRight size={18} className="-rotate-45" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div 
                  className="portal-card w-full max-w-[400px] h-[360px] flex flex-col justify-center items-center rounded-2xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.06)] shadow-2xl relative overflow-hidden"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="card-image-box">
                    <img src={auraguideImg} alt="AuraGuide Hub" className="portal-img max-h-[220px]" />
                  </div>
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center z-10">
                    <span className="text-[0.65rem] uppercase tracking-wider text-neutral-400">Clinical Node</span>
                    <span className="text-xs font-semibold text-white">Hub-V3.1</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-auto text-[rgba(242,245,240,0.5)]">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Scroll to see AuraPath</span>
              <ArrowRight size={14} className="rotate-90" />
            </div>
          </div>
        </FlowSection>

        {/* SLIDE 3: AuraPath Smart Glasses HUD */}
        <FlowSection aria-label="AuraPath Smart Glasses" style={{ backgroundColor: "#030a0d", color: "#F2F5F0" }}>
          <div className="flex flex-col h-full justify-between py-6">
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-cyan)] text-xs font-bold uppercase tracking-[0.25em]">
                03 — Memory Prosthetic
              </span>
              <span className="system-status text-[0.7rem] px-3 py-1 rounded-full border border-[rgba(157,226,236,0.15)] flex items-center gap-2 text-[var(--accent-cyan)]">
                <span className="status-dot" style={{ backgroundColor: "#9de2ec", boxShadow: "0 0 10px #9de2ec" }}></span> BLE SYNC ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
              <div className="lg:col-span-7 max-w-2xl">
                <span className="card-tag" style={{ color: "var(--accent-cyan)" }}>AuraPath Wearables</span>
                <h1 className="text-[clamp(2.5rem,6vw,4.8rem)] font-extrabold leading-[0.9] uppercase tracking-tight text-white my-3">
                  AuraPath
                  <br />
                  Smart Glasses
                </h1>
                <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed text-[var(--text-muted)] mb-6">
                  A revolutionary lightweight social prosthetic for memory assistance. AuraPath smart glasses instantly recall names (&lt;0.4s), whisper relationships via bone conduction, scan medication packets, and deliver guided spatial orientation.
                </p>

                <div className="specs-row mb-8">
                  <span className="spec-pill">Face Vector Matching &lt;0.4s</span>
                  <span className="spec-pill">Bone-Conduction Audio</span>
                  <span className="spec-pill">Haptic Hazard Guidance</span>
                </div>

                <div className="portal-cta-group">
                  <button 
                    className="card-explore-btn hover:shadow-[0_0_20px_rgba(157,226,236,0.2)]"
                    onClick={() => onNavigate("aurapath")}
                    style={{ borderColor: "var(--accent-cyan)" }}
                  >
                    Explore HUD Glasses Feed
                  </button>
                  <a 
                    href="https://aurapath.viktronhealth.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="portal-cta flex items-center justify-center bg-white text-black hover:bg-[var(--accent-cyan)] hover:text-black w-11 h-11 rounded-full transition-all duration-300"
                    title="Redirect to aurapath.viktronhealth.com"
                  >
                    <ArrowRight size={18} className="-rotate-45" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div 
                  className="portal-card w-full max-w-[400px] h-[360px] flex flex-col justify-center items-center rounded-2xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.06)] shadow-2xl relative overflow-hidden"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="card-image-box">
                    <img src={aurapathGlassesImg} alt="AuraPath Smart Glasses" className="portal-img max-h-[220px]" />
                  </div>
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center z-10">
                    <span className="text-[0.65rem] uppercase tracking-wider text-neutral-400">Wearable Device</span>
                    <span className="text-xs font-semibold text-white">Glass-G2</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-auto text-[rgba(242,245,240,0.5)]">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Scroll to see Security</span>
              <ArrowRight size={14} className="rotate-90" />
            </div>
          </div>
        </FlowSection>

        {/* SLIDE 4: Bento Specifications (Technical Fabric) */}
        <FlowSection aria-label="Technical Fabric" style={{ backgroundColor: "#091209", color: "#F2F5F0" }}>
          <div className="flex flex-col h-full justify-between py-6">
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-lime)] text-xs font-bold uppercase tracking-[0.25em]">
                04 — Technical Fabric
              </span>
              <span className="system-status text-[0.7rem] px-3 py-1 rounded-full border border-[rgba(217,228,181,0.15)] flex items-center gap-2">
                <span className="status-dot"></span> ENCRYPTED BEDSIDE LAYER
              </span>
            </div>

            <div className="my-auto">
              <div className="mb-8">
                <span className="card-tag">Absolute Patient Safety</span>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase tracking-tight text-white mt-2">
                  Dignity Engineered with Precision
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(217,228,181,0.15)] rounded-2xl p-6 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(217,228,181,0.06)] flex items-center justify-center text-[var(--accent-lime)] mb-4">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2">Social ID Core</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Instantly identifies loved ones and friends, whispering names via haptic bone conduction to restore natural dialog flow.
                  </p>
                </div>

                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(217,228,181,0.15)] rounded-2xl p-6 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(217,228,181,0.06)] flex items-center justify-center text-[var(--accent-lime)] mb-4">
                    <Cpu size={20} />
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2">Privacy-First AI</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Zero cloud delays or risks. Facial vectors and logs process locally on secure offline neural processor units.
                  </p>
                </div>

                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(217,228,181,0.15)] rounded-2xl p-6 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(217,228,181,0.06)] flex items-center justify-center text-[var(--accent-lime)] mb-4">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2">Prescription Checker</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Real-time computer vision packaging scans cross-reference dosages to confirm correct medical adherence instantly.
                  </p>
                </div>

                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(217,228,181,0.15)] rounded-2xl p-6 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(217,228,181,0.06)] flex items-center justify-center text-[var(--accent-lime)] mb-4">
                    <Navigation size={20} />
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2">Hazard Assist</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Uses local geofencing and active haptic corridor guide core to safely steer disoriented patients back to safety limits.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-auto text-[rgba(242,245,240,0.5)]">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Scroll to get started</span>
              <ArrowRight size={14} className="rotate-90" />
            </div>
          </div>
        </FlowSection>

        {/* SLIDE 5: Deploy the Dementia Care Revolution */}
        <FlowSection aria-label="Join the Revolution" style={{ backgroundColor: "#000000", color: "#F2F5F0" }}>
          <div className="flex flex-col h-full justify-between py-6">
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-lime)] text-xs font-bold uppercase tracking-[0.25em]">
                05 — Deploy Suite
              </span>
              <span className="system-status text-[0.7rem] px-3 py-1 rounded-full border border-[rgba(217,228,181,0.15)] flex items-center gap-2">
                <span className="status-dot"></span> CLINICAL INTAKE ACTIVE
              </span>
            </div>

            <div className="my-auto max-w-3xl">
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.9] uppercase tracking-tight text-white">
                Ready to
                <br />
                Begin the
                <br />
                <span className="text-[var(--accent-lime)] drop-shadow-[0_0_20px_rgba(217,228,181,0.12)]">Revolution?</span>
              </h1>
              <div className="my-[3vh] w-24 h-[1px] bg-[var(--accent-lime)] opacity-60"></div>
              <p className="max-w-[60ch] text-[clamp(1rem,1.8vw,1.35rem)] font-normal leading-relaxed text-[var(--text-muted)] mb-8">
                Partner with Viktron Health to establish high-fidelity cognitive assurance frameworks in your clinics, memory centers, and home care environments. Restore confidence and bedside security.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  className="px-8 py-4 bg-[var(--accent-lime)] text-black text-xs font-bold uppercase tracking-wider rounded-full hover:scale-105 hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(217,228,181,0.2)]"
                  onClick={() => alert("Thank you for your interest! Intake forms are now open at clinical-intake@viktronhealth.com")}
                >
                  Request Clinical Pilot Deployment
                </button>
                <button 
                  className="px-8 py-4 border border-[rgba(255,255,255,0.15)] hover:border-white text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300"
                  onClick={() => window.open("https://viktronhealth.com/research-papers", "_blank")}
                >
                  Read Research Papers
                </button>
              </div>
            </div>

            <div className="mt-auto text-xs text-[var(--text-muted)] tracking-wider">
              © {new Date().getFullYear()} Viktron Health Inc. All rights reserved.
            </div>
          </div>
        </FlowSection>

      </FlowArt>
    </div>
  );
}
