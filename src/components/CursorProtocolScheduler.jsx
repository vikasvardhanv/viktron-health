import React, { useState, useEffect } from 'react';
import { Calendar, Check, MousePointer, ShieldCheck, ArrowRight } from 'lucide-react';

const DAYS = [
  { short: "S", full: "Sun", date: "24", active: false },
  { short: "M", full: "Mon", date: "25", active: false },
  { short: "T", full: "Tue", date: "26", active: false },
  { short: "W", full: "Wed", date: "27", active: true, label: "Cognitive Calibration" },
  { short: "T", full: "Thu", date: "28", active: false },
  { short: "F", full: "Fri", date: "29", active: false },
  { short: "S", full: "Sat", date: "30", active: false }
];

export default function CursorProtocolScheduler() {
  const [selectedDay, setSelectedDay] = useState(3); // Wednesday by default
  const [isSaved, setIsSaved] = useState(false);
  const [cursorPhase, setCursorPhase] = useState(0); // 0: enter, 1: hover day, 2: click day, 3: hover save, 4: click save, 5: done

  useEffect(() => {
    // Loop through animated cursor sequence every 7 seconds
    const interval = setInterval(() => {
      // Step 1: Cursor moves to Wednesday
      setCursorPhase(1);
      setTimeout(() => {
        // Step 2: Cursor clicks Wednesday
        setCursorPhase(2);
        setSelectedDay(3);
        setTimeout(() => {
          // Step 3: Cursor moves to Save button
          setCursorPhase(3);
          setTimeout(() => {
            // Step 4: Cursor clicks Save
            setCursorPhase(4);
            setIsSaved(true);
            setTimeout(() => {
              setCursorPhase(0);
              setTimeout(() => {
                setIsSaved(false);
              }, 1200);
            }, 1000);
          }, 800);
        }, 600);
      }, 700);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-card p-7 md:p-9 flex flex-col justify-between h-[480px] bg-white relative overflow-hidden group">
      {/* Animated SVG Cursor overlay */}
      <div 
        className="absolute z-30 pointer-events-none transition-all duration-700 ease-out flex items-center gap-1.5"
        style={{
          left: cursorPhase === 1 || cursorPhase === 2 
            ? '52%' 
            : cursorPhase === 3 || cursorPhase === 4 
            ? '68%' 
            : '15%',
          top: cursorPhase === 1 || cursorPhase === 2 
            ? '48%' 
            : cursorPhase === 3 || cursorPhase === 4 
            ? '78%' 
            : '20%',
          opacity: cursorPhase > 0 ? 1 : 0,
          transform: cursorPhase === 2 || cursorPhase === 4 ? 'scale(0.85)' : 'scale(1)'
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="drop-shadow-md text-[var(--color-clay)]"
        >
          <path 
            d="M4.5 3.5L18.5 13.5L12 14.5L9.5 20.5L4.5 3.5Z" 
            fill="var(--color-clay)" 
            stroke="#FFFFFF" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
        </svg>
        <span className="bg-[var(--color-clay)] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-sm">
          Caregiver Copilot
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-moss)] animate-pulse" />
            Artifact 03 // Cursor Protocol Scheduler
          </span>
          <h3 className="font-sans font-bold text-xl md:text-2xl mt-1 text-[var(--color-foreground)] tracking-tight">
            Weekly Memory Protocol
          </h3>
        </div>
        <div className="w-9 h-9 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-moss)]">
          <Calendar size={18} />
        </div>
      </div>

      {/* Interactive Weekly Grid */}
      <div className="my-auto py-2">
        <div className="text-xs font-mono text-[var(--color-muted-foreground)] mb-3 flex items-center justify-between">
          <span>SCHEDULE CALIBRATION CYCLE</span>
          <span className="text-[var(--color-clay)] font-semibold">Active Cycle 04</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day, idx) => {
            const isSelected = selectedDay === idx;
            return (
              <button
                key={day.full}
                onClick={() => setSelectedDay(idx)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${
                  isSelected 
                    ? 'bg-[var(--color-moss)] text-white border-[var(--color-moss)] shadow-md scale-105' 
                    : 'bg-[var(--color-cream-subtle)] text-[var(--color-foreground)] border-[var(--color-border)] hover:border-[var(--color-moss)]'
                }`}
              >
                <span className={`text-[11px] font-mono uppercase ${isSelected ? 'text-[var(--color-mint)] font-bold' : 'text-[var(--color-muted-foreground)]'}`}>
                  {day.short}
                </span>
                <span className="text-sm font-bold mt-1">
                  {day.date}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isSelected ? 'bg-[var(--color-mint)]' : 'bg-transparent'}`} />
              </button>
            );
          })}
        </div>

        {/* Selected Day Details */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[var(--color-cream-subtle)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[var(--color-foreground)]">
              {DAYS[selectedDay].full} Oct {DAYS[selectedDay].date} — Memory Consolidation
            </div>
            <div className="text-[11px] font-mono text-[var(--color-muted-foreground)] mt-0.5">
              Target: Arthur Pendelton • 15 Min Face Re-alignment
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-900/10 text-emerald-800 text-[10px] font-mono font-bold">
            CONFIRMED
          </span>
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--color-muted-foreground)]">
          HL7 FHIR Care Synchronized
        </span>
        <button
          onClick={() => {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
          }}
          className={`btn-magnetic px-5 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 ${
            isSaved 
              ? 'bg-[var(--color-mint)] text-emerald-950 shadow-md' 
              : 'bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white shadow-sm'
          }`}
        >
          {isSaved ? (
            <span className="flex items-center gap-1.5">
              <Check size={14} /> Protocol Committed
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              Commit Protocol <ArrowRight size={14} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
