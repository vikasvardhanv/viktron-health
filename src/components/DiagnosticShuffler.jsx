import React, { useState, useEffect } from 'react';
import { Eye, Volume2, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

const SHUFFLER_CARDS = [
  {
    id: 1,
    title: "0.38s Facial Vectoring",
    tag: "AuraPath Optical Engine",
    metric: "0.38s",
    metricLabel: "Inference Latency",
    desc: "Offline optical sensors vectorize facial landmarks instantly, matching loved ones and caregivers without streaming footage.",
    icon: Eye,
    accent: "var(--color-moss)",
    badgeColor: "bg-emerald-900/10 text-emerald-800 border-emerald-900/20"
  },
  {
    id: 2,
    title: "Whisper Bone Conduction",
    tag: "Acoustic Haptic Core",
    metric: "18dB",
    metricLabel: "Whisper Threshold",
    desc: "Relationship prompts like 'Sarah, your daughter' are conducted directly through the temporal bone, preserving eye contact and dignity.",
    icon: Volume2,
    accent: "var(--color-clay)",
    badgeColor: "bg-amber-900/10 text-amber-800 border-amber-900/20"
  },
  {
    id: 3,
    title: "Zero-Cloud Enclave Shield",
    tag: "On-Device NPU Security",
    metric: "100%",
    metricLabel: "Air-Gapped Privacy",
    desc: "100% of biometric vectors, voice profiles, and daily routines stay on local silicon. Zero cloud transmission of raw video.",
    icon: ShieldCheck,
    accent: "var(--color-teal)",
    badgeColor: "bg-teal-900/10 text-teal-800 border-teal-900/20"
  }
];

export default function DiagnosticShuffler() {
  const [cards, setCards] = useState(SHUFFLER_CARDS);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCards(prev => {
        const copy = [...prev];
        const last = copy.pop();
        copy.unshift(last);
        return copy;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleManualCycle = () => {
    setCards(prev => {
      const copy = [...prev];
      const last = copy.pop();
      copy.unshift(last);
      return copy;
    });
  };

  return (
    <div 
      className="bento-card p-7 md:p-9 flex flex-col justify-between h-[480px] bg-white cursor-pointer select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleManualCycle}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-clay)] animate-pulse" />
            Artifact 01 // Diagnostic Shuffler
          </span>
          <h3 className="font-sans font-bold text-xl md:text-2xl mt-1 text-[var(--color-foreground)] tracking-tight">
            AuraPath Optical HUD
          </h3>
        </div>
        <button 
          aria-label="Cycle card"
          className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:border-[var(--color-foreground)] transition-colors"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Shuffling Card Stack Container */}
      <div className="relative w-full h-[250px] my-auto flex items-center justify-center">
        {cards.map((card, idx) => {
          // Dynamic styling based on position in stack
          const isTop = idx === 0;
          const isMiddle = idx === 1;
          const isBottom = idx === 2;

          const translateY = isTop ? 0 : isMiddle ? 16 : 30;
          const scale = isTop ? 1 : isMiddle ? 0.94 : 0.88;
          const opacity = isTop ? 1 : isMiddle ? 0.75 : 0.45;
          const zIndex = 30 - idx * 10;

          const IconComponent = card.icon;

          return (
            <div
              key={card.id}
              className="absolute inset-x-0 mx-auto w-full max-w-[380px] p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-subtle)] shadow-md transition-all duration-700"
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                zIndex,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: card.accent }}
                  >
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-foreground)] leading-tight">{card.title}</h4>
                    <span className="text-[10px] font-mono text-[var(--color-muted-foreground)]">{card.tag}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold font-mono" style={{ color: card.accent }}>{card.metric}</div>
                  <div className="text-[9px] font-mono uppercase text-[var(--color-muted-foreground)]">{card.metricLabel}</div>
                </div>
              </div>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]/60 text-xs font-mono text-[var(--color-muted-foreground)]">
        <span>Click or hover to pause stack</span>
        <span className="text-[var(--color-clay)] font-semibold">Continuous NPU Loop</span>
      </div>
    </div>
  );
}
