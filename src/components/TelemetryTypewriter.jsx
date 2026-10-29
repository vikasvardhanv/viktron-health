import React, { useState, useEffect } from 'react';
import { Activity, Terminal, ShieldAlert, CheckCircle2 } from 'lucide-react';

const TELEMETRY_MESSAGES = [
  "FHIR::Observation(Caregiver_HeartRate) -> 74 BPM [STABLE]",
  "NPU::VectorMatch(Face_ID#883) -> 'Daughter Sarah' [0.38s latency]",
  "PHARM::SafetyCheck(Donepezil 10mg) -> Adherence Verified [0 Interactions]",
  "BLE::AuraGlassG2 -> Haptic Guidance Pulse Sent [Left Temple 80%]",
  "GEO::SafeCorridor(Arthur_Location) -> Active in Living Room Zone",
  "FHIR::Encounter(EHR_Sync) -> Bi-directional EPIC Bridge Verified"
];

export default function TelemetryTypewriter() {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [logHistory, setLogHistory] = useState([
    { id: 1, time: "09:41:12", text: "FHIR Telemetry Synced with Bedside Unit" },
    { id: 2, time: "09:41:18", text: "Arthur cognitive fatigue index: 0.12 (Low)" }
  ]);

  useEffect(() => {
    const currentFullText = TELEMETRY_MESSAGES[currentMsgIndex];
    let typingSpeed = isDeleting ? 25 : 55;

    if (!isDeleting && charIndex === currentFullText.length) {
      // Pause at the end before clearing and adding to log history
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      // Append completed message to history
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      setLogHistory(prev => [
        { id: Date.now(), time: timeStr, text: currentFullText },
        ...prev.slice(0, 3)
      ]);
      setCurrentMsgIndex((prev) => (prev + 1) % TELEMETRY_MESSAGES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(currentFullText.substring(0, isDeleting ? charIndex - 1 : charIndex + 1));
      setCharIndex(prev => isDeleting ? prev - 1 : prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentMsgIndex]);

  return (
    <div className="bento-card p-7 md:p-9 flex flex-col justify-between h-[480px] bg-[#141A17] text-[#F4F1EB]">
      {/* Header with Live Pulsing Dot */}
      <div className="flex items-start justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-mint)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] shadow-[0_0_8px_#3DB894] animate-pulse" />
            Artifact 02 // Telemetry Typewriter
          </span>
          <h3 className="font-sans font-bold text-xl md:text-2xl mt-1 text-white tracking-tight">
            AuraGuide FHIR Feed
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[var(--color-mint)]">
          <Activity size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
          <span>99.98% UPTIME</span>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="my-auto font-mono text-xs md:text-sm bg-black/40 border border-white/10 rounded-2xl p-5 shadow-inner">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-white/40 text-[11px]">
          <span className="flex items-center gap-2">
            <Terminal size={13} className="text-[var(--color-mint)]" />
            live_edge_stream.ts
          </span>
          <span className="text-white/30">NPU://CORE0_THREAD</span>
        </div>

        {/* Live typing active line */}
        <div className="min-h-[52px] flex items-center text-[var(--color-mint)] font-medium leading-relaxed">
          <span>&gt; {displayedText}</span>
          <span className="w-2 h-4 ml-1 bg-[var(--color-clay)] animate-pulse inline-block align-middle" />
        </div>

        {/* Recent logs */}
        <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
          {logHistory.map(item => (
            <div key={item.id} className="text-[11px] text-white/50 flex items-center gap-2">
              <span className="text-white/30 font-mono">[{item.time}]</span>
              <span className="truncate">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-white/60">
        <span>Zero-Cloud Raw Vector Stream</span>
        <span className="flex items-center gap-1.5 text-[var(--color-mint)]">
          <CheckCircle2 size={13} /> Encrypted at Bedside
        </span>
      </div>
    </div>
  );
}
