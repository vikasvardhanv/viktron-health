import React, { useState } from 'react';
import { Eye, Cpu, Battery, Volume2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

const HARDWARE_PARTS = [
  {
    id: "optics",
    label: "01 / Optical Waveguide",
    title: "Transparent Micro-OLED Waveguide",
    subtitle: "See without being seen.",
    desc: "A custom optical prism projects contextual prompts like 'Sarah, your daughter' directly into the patient's visual axis at 60fps. Ambient brightness sensors dynamically adjust luminance for crystal clarity in indoor rooms and bright outdoor gardens.",
    specs: "60 FPS • 1,200 Nits Peak • 84° FOV",
    icon: Eye,
    color: "var(--color-mint)",
    dotX: "64%",
    dotY: "38%"
  },
  {
    id: "npu",
    label: "02 / Neural Processing Unit",
    title: "Hailo-8 AI Silicon Core",
    subtitle: "Think on the edge.",
    desc: "The on-device Hailo-8 processor computes 26 TOPS of 8-bit quantized neural inference. High-dimensional facial embeddings and corridor hazard vectors are matched in under 0.38 seconds without an internet connection.",
    specs: "26 TOPS • 0.38s Latency • Air-Gapped",
    icon: Cpu,
    color: "var(--color-clay)",
    dotX: "34%",
    dotY: "60%"
  },
  {
    id: "sensors",
    label: "03 / Multi-Spectral Sensors",
    title: "Biometric & Environmental Cluster",
    subtitle: "Sense everything. Charge nothing.",
    desc: "Combines pulse oximetry, skin temperature, 6-axis IMU spatial tracking, and a high-efficiency 18-hour lithium polymer cell. The glasses monitor cognitive fatigue and gait stability without overheating.",
    specs: "18-Hour Autonomy • 6-Axis IMU • SpO2 Sync",
    icon: Battery,
    color: "var(--color-teal)",
    dotX: "62%",
    dotY: "66%"
  },
  {
    id: "temple",
    label: "04 / Bone Conduction Arm",
    title: "Titanium Temple Transducer",
    subtitle: "Wear it. Forget it.",
    desc: "Dual bone-conduction actuators conduct acoustic pulses directly into the temporal bone at 18dB whisper thresholds. Engineered into a 38-gram aerospace titanium frame with zero ear-canal occlusion.",
    specs: "38 Grams • 18dB Threshold • Titanium Alloy",
    icon: Volume2,
    color: "var(--color-mint)",
    dotX: "20%",
    dotY: "30%"
  }
];

export default function ExplodedHardwareShowcase() {
  const [selectedPart, setSelectedPart] = useState(HARDWARE_PARTS[0]);

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
      <div className="rounded-[3rem] bg-[#0E1512] border border-[#22352B] p-8 md:p-14 text-[#F4F1EB] shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[var(--color-mint)]/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--color-mint)] mb-4 uppercase tracking-wider">
            <Sparkles size={14} /> Internal Hardware Architecture
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Anatomy of the cognitive prosthetic.
          </h2>
          <p className="text-white/70 mt-3 text-sm md:text-base leading-relaxed font-light">
            Every component is engineered into a featherweight 38g titanium frame to ensure patients look and feel entirely natural.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: Video & Interactive Pin Canvas (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl">
              {/* Background Exploded Device Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-75 filter brightness-90 contrast-110"
              >
                <source src="/test101.mp4" type="video/mp4" />
              </video>

              {/* Inward Radial Mask */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 20%, #0E1512 100%)'
                }}
              />

              {/* Interactive Target Callout Pins */}
              {HARDWARE_PARTS.map((part) => {
                const isSelected = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group transition-transform"
                    style={{ left: part.dotX, top: part.dotY }}
                    aria-label={part.title}
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-[var(--color-clay)]' : 'bg-[var(--color-mint)]'
                      }`} />
                      <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white shadow-md ${
                        isSelected ? 'bg-[var(--color-clay)] scale-125' : 'bg-[var(--color-mint)]'
                      }`} />
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-4 z-20 font-mono text-[11px] text-white/60 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
                Click pins to inspect hardware layers
              </div>
            </div>
          </div>

          {/* RIGHT: Selected Hardware Layer Intel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--color-mint)] font-bold tracking-widest uppercase">
                  {selectedPart.label}
                </span>
                <span className="font-mono text-[10px] text-white/50 border border-white/15 px-2.5 py-0.5 rounded-full">
                  {selectedPart.specs}
                </span>
              </div>

              <h3 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight mb-1">
                {selectedPart.title}
              </h3>
              <div className="font-serif italic text-[var(--color-clay)] text-base mb-4">
                "{selectedPart.subtitle}"
              </div>

              <p className="text-white/75 text-xs md:text-sm leading-relaxed font-light mb-6">
                {selectedPart.desc}
              </p>

              {/* Selector Tabs for Hardware */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                {HARDWARE_PARTS.map((part) => {
                  const isSelected = selectedPart.id === part.id;
                  const IconComp = part.icon;
                  return (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      className={`p-2.5 rounded-xl border text-left font-mono text-[11px] transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[var(--color-clay)] border-[var(--color-clay)] text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <IconComp size={14} />
                      <span className="truncate">{part.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
