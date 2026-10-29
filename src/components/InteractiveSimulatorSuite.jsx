import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, Cpu, Volume2, ShieldAlert, Sparkles, Navigation, Battery, 
  Bluetooth, Heart, Activity, CheckCircle2, AlertTriangle, Send, 
  Terminal, ShieldCheck, RefreshCw, Sliders, Smartphone, Laptop
} from 'lucide-react';

export default function InteractiveSimulatorSuite() {
  const [activeTab, setActiveTab] = useState('glasses'); // 'glasses' or 'copilot'
  
  // ── Glasses HUD State ──
  const [hudMode, setHudMode] = useState('family'); // 'family', 'wander', 'med'
  const [hapticPower, setHapticPower] = useState(85);
  const [isSimulatingAudio, setIsSimulatingAudio] = useState(false);
  const [glassesLogs, setGlassesLogs] = useState([
    { time: "10:14:02", msg: "AuraGlass-G2 connected. BLE latency: 12ms." },
    { time: "10:14:05", msg: "Local NPU calibrated. Facial vector engine armed." }
  ]);

  // ── Copilot Console State ──
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      time: '10:14:10',
      text: 'AuraGuide Caregiver Copilot active. Patient Arthur Pendelton (78, MCI) synced via secure HL7 FHIR link. Biometrics nominal. How can I assist you with clinical triage?'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copilotLogs, setCopilotLogs] = useState([
    { id: 1, time: "10:14:01", type: "success", msg: "EPIC Systems HL7 Connection Established" },
    { id: 2, time: "10:14:03", type: "info", msg: "Secure Edge NPU Thread Initialized (Zero-Latency Mode)" },
    { id: 3, time: "10:14:08", type: "success", msg: "AuraPath BLE Sync Active (AIMB-G2 smart glasses)" },
    { id: 4, time: "10:14:12", type: "info", msg: "FHIR Telemetry Synced - Patient vitals stable" }
  ]);

  const logFeedRef = useRef(null);

  // Switch mode helper for glasses
  const handleModeChange = (mode) => {
    setHudMode(mode);
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];

    if (mode === 'wander') {
      setGlassesLogs(prev => [
        { time: timeStr, msg: "⚠ [CRITICAL] Arthur approached threshold boundary! Geofencing armed." },
        { time: timeStr, msg: "🔊 Haptic correction active on left temple." },
        ...prev
      ]);
      setCopilotLogs(prev => [
        { id: Date.now(), time: timeStr, type: "warning", msg: "WANDER ALERT: Arthur deviated from safety corridor" },
        ...prev
      ]);
    } else if (mode === 'med') {
      setGlassesLogs(prev => [
        { time: timeStr, msg: "✔ Donepezil 10mg verified. EPIC medication log updated." },
        ...prev
      ]);
      setCopilotLogs(prev => [
        { id: Date.now(), time: timeStr, type: "success", msg: "PHARM: Donepezil 10mg adherence confirmed" },
        ...prev
      ]);
    } else {
      setGlassesLogs(prev => [
        { time: timeStr, msg: "Facial vector match: Daughter Sarah (0.38s latency, 99.8% confidence)." },
        ...prev
      ]);
    }
  };

  // Quick prompt handler for copilot
  const handleQuickPrompt = (promptText) => {
    if (isTyping) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];

    setMessages(prev => [
      ...prev,
      { sender: 'user', time: timeStr, text: promptText }
    ]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      if (promptText.includes("vitals")) {
        reply = "Patient Arthur Pendelton's current vitals: Heart Rate: 72 BPM (Normal Sinus Rhythm), SpO2: 98%, Core Cognitive Load: 0.12 (Nominal). All physiological biomarkers indicate low acute distress.";
      } else if (promptText.includes("Donepezil") || promptText.includes("medication")) {
        reply = "Donepezil 10mg was verified via AuraPath optical OCR at 09:15 AM today. No adverse drug-drug interactions detected against Arthur's baseline profile. Prescription adherence: 100%.";
      } else if (promptText.includes("wander") || promptText.includes("safety")) {
        reply = "Arthur is currently within the living room safety corridor. Geofencing perimeter is armed. If deviation exceeds 1.5 meters, temple haptics trigger gentle directional guidance.";
      } else {
        reply = "Cognitive prosthetic pipeline is synchronized. Real-time bone-conduction cues are calibrated at 18dB. Bedside FHIR sync is healthy.";
      }

      setMessages(prev => [
        ...prev,
        { sender: 'ai', time: new Date().toTimeString().split(" ")[0], text: reply }
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleSendQuery = (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || isTyping) return;
    const q = inputQuery;
    setInputQuery('');
    handleQuickPrompt(q);
  };

  return (
    <section id="simulator-suite" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-clay)] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-clay)] animate-pulse" />
          Interactive Clinical Experience Lab
        </span>
        <h2 className="font-sans font-bold text-3xl md:text-5xl text-[var(--color-foreground)] tracking-tight leading-tight">
          Test the cognitive prosthetic in real-time.
        </h2>
        <p className="text-[var(--color-muted-foreground)] mt-4 text-base md:text-lg leading-relaxed">
          Switch between Arthur's smart glasses field-of-view HUD and the caregiver's clinical AI copilot console to inspect zero-cloud edge triage.
        </p>

        {/* Tab Switcher Pills */}
        <div className="mt-8 p-1.5 rounded-full bg-[var(--color-muted)] border border-[var(--color-border)] flex items-center gap-2 shadow-inner">
          <button
            onClick={() => setActiveTab('glasses')}
            className={`btn-magnetic px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'glasses'
                ? 'bg-[var(--color-moss)] text-white shadow-md'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Eye size={15} /> 01 / AuraPath Smart Glasses HUD
            </span>
          </button>

          <button
            onClick={() => setActiveTab('copilot')}
            className={`btn-magnetic px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'copilot'
                ? 'bg-[var(--color-moss)] text-white shadow-md'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Cpu size={15} /> 02 / AuraGuide Caregiver Copilot
            </span>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          TAB 1: AURAPATH SMART GLASSES HUD SIMULATOR
          ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'glasses' && (
        <div className="bg-[#0D1310] border border-[#23332A] rounded-[2.5rem] p-6 md:p-10 shadow-2xl text-[#F4F1EB]">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[var(--color-mint)] shadow-[0_0_10px_#3DB894] animate-pulse" />
                <h3 className="font-sans font-bold text-xl md:text-2xl text-white">
                  AuraGlass Optical HUD Simulator
                </h3>
              </div>
              <p className="text-xs font-mono text-[var(--color-muted-foreground)] mt-1">
                Patient Field of View (Simulated Arthur Pendelton POV) • Frame Rate: 60 FPS
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <Battery size={14} className="text-[var(--color-mint)]" />
                <span>88% (18h Left)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <Bluetooth size={14} className="text-[var(--color-mint)]" />
                <span>BLE 5.3 Active</span>
              </div>
            </div>
          </div>

          {/* Main Grid: HUD Viewport + Controls Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* LEFT: HUD Viewport (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative w-full h-[460px] rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                {/* Live Video Feed through Smart Glasses */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                >
                  <source src="/aurapath_film.mp4" type="video/mp4" />
                </video>

                {/* HUD Scanline & Noise Layer */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(61,184,148,0.15) 0px, transparent 2px, transparent 4px)',
                    backgroundSize: '100% 4px'
                  }}
                />

                {/* Vignette Rim */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

                {/* Glasses Framing Reticle */}
                <div className="absolute inset-6 border border-white/20 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center text-[11px] font-mono text-[var(--color-mint)]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-ping" />
                      OPTICAL VECTOR CORE: ARMED
                    </span>
                    <span>LATENCY: 0.38s</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
                    <span>FOV: 84° • HAILO-8 NPU</span>
                    <span>AIR-GAPPED BED-LINK</span>
                  </div>
                </div>

                {/* ── MODE A: Family Identification ── */}
                {hudMode === 'family' && (
                  <div className="absolute top-[22%] left-[32%] z-20 transition-all duration-500">
                    {/* Bounding Box with Corner Accents */}
                    <div className="w-[190px] h-[210px] border-2 border-[var(--color-mint)] rounded-xl relative shadow-[0_0_25px_rgba(61,184,148,0.35)] animate-pulse">
                      {/* Top Label */}
                      <div className="absolute -top-7 left-0 bg-[var(--color-mint)] text-emerald-950 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-t-md uppercase flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 size={12} /> SARAH PENDELTON
                      </div>

                      {/* Floating Intel Tag */}
                      <div className="absolute -bottom-16 left-0 right-0 bg-black/85 backdrop-blur-md border border-[var(--color-mint)]/40 rounded-lg p-2 text-[10px] font-mono">
                        <div className="text-[var(--color-mint)] font-bold">RELATION: DAUGHTER</div>
                        <div className="text-white/80">Last visit: Yesterday 4:00 PM</div>
                        <div className="text-[var(--color-clay)] mt-0.5 flex items-center gap-1">
                          <Volume2 size={11} /> Whisper: "Here is your daughter, Sarah"
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MODE B: Hazard Deviation / Corridor ── */}
                {hudMode === 'wander' && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
                    <div className="w-[280px] h-[190px] border-2 border-red-500 rounded-xl relative shadow-[0_0_35px_rgba(239,68,68,0.4)] animate-bounce flex flex-col items-center justify-center text-center p-4 bg-red-950/40 backdrop-blur-sm">
                      <ShieldAlert size={32} className="text-red-400 mb-2" />
                      <div className="font-mono text-xs font-bold text-red-300">
                        THRESHOLD DEVIATION
                      </div>
                      <div className="text-[11px] text-white/90 mt-1">
                        Approaching Staircase Edge (1.2m)
                      </div>
                      <div className="mt-2 text-[10px] font-mono font-bold bg-red-500 text-black px-3 py-1 rounded-full uppercase">
                        Left Temple Haptic Active
                      </div>
                    </div>

                    {/* Floor Directional Guidance Arrow */}
                    <div className="absolute bottom-6 flex items-center gap-2 font-mono text-xs text-red-400 font-bold bg-black/70 px-4 py-2 rounded-full border border-red-500/40">
                      <span>GUIDING BACK TO LIVING ROOM CORRIDOR</span>
                    </div>
                  </div>
                )}

                {/* ── MODE C: Medication Barcode Scan ── */}
                {hudMode === 'med' && (
                  <div className="absolute top-[28%] left-[35%] z-20 transition-all duration-500">
                    <div className="w-[220px] h-[170px] border-2 border-[var(--color-teal)] rounded-xl relative shadow-[0_0_30px_rgba(15,110,99,0.5)]">
                      <div className="absolute -top-7 left-0 bg-[var(--color-teal)] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-t-md uppercase flex items-center gap-1.5">
                        <Sparkles size={12} /> PRESCRIPTION OCR SCAN
                      </div>

                      <div className="absolute -bottom-14 left-0 right-0 bg-black/85 backdrop-blur-md border border-[var(--color-teal)]/40 rounded-lg p-2 text-[10px] font-mono">
                        <div className="text-white font-bold">DONEPEZIL HCL 10MG</div>
                        <div className="text-[var(--color-mint)] font-bold">✔ DOSE VERIFIED (ONCE DAILY)</div>
                        <div className="text-white/60">Cross-checked via EPIC EHR link</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Viewport Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/60">Simulate Preset:</span>
                  <button
                    onClick={() => handleModeChange('family')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                      hudMode === 'family'
                        ? 'bg-[var(--color-mint)] text-emerald-950 font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    Family Recognition
                  </button>
                  <button
                    onClick={() => handleModeChange('med')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                      hudMode === 'med'
                        ? 'bg-[var(--color-teal)] text-white font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    Medication OCR
                  </button>
                  <button
                    onClick={() => handleModeChange('wander')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                      hudMode === 'wander'
                        ? 'bg-red-500 text-black font-bold shadow-md animate-pulse'
                        : 'bg-white/5 hover:bg-white/10 text-red-300 border border-red-500/30'
                    }`}
                  >
                    Simulate Wander Deviation
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsSimulatingAudio(true);
                    setTimeout(() => setIsSimulatingAudio(false), 2400);
                  }}
                  className="btn-magnetic px-4 py-1.5 rounded-full bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white text-xs font-mono font-bold flex items-center gap-2"
                >
                  <Volume2 size={14} className={isSimulatingAudio ? 'animate-bounce' : ''} />
                  <span>{isSimulatingAudio ? "Whispering Bone Audio..." : "Test Whisper Audio"}</span>
                </button>
              </div>
            </div>

            {/* RIGHT: Hardware Specs & Live Telemetry (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Slider Panel: Haptic Intensity */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-white/70 flex items-center gap-1.5">
                    <Sliders size={14} className="text-[var(--color-mint)]" />
                    Bone Conduction Decibel Threshold
                  </span>
                  <span className="font-bold text-[var(--color-mint)]">{hapticPower}% (18 dB)</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={hapticPower}
                  onChange={(e) => setHapticPower(Number(e.target.value))}
                  className="w-full accent-[var(--color-mint)] cursor-pointer"
                />
                <p className="text-[11px] text-white/50 mt-2 leading-relaxed">
                  Calibrated to whisper gently without blocking natural ambient sound or conversations.
                </p>
              </div>

              {/* Hardware Spec Cards */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-white/60">Optical Vector Engine</span>
                  <span className="text-[var(--color-mint)] font-bold">512-D Embedding</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-white/60">Privacy Classification</span>
                  <span className="text-emerald-400 font-bold">Air-Gapped NPU</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-white/60">Weight Profile</span>
                  <span className="text-white font-bold">38 Grams (Titanium)</span>
                </div>
              </div>

              {/* Glasses Live Log Stream */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex-1 flex flex-col">
                <div className="text-[11px] font-mono text-[var(--color-mint)] pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} /> Glasses Event Buffer
                  </span>
                  <span className="text-white/40">BUFFER: 32KB</span>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[160px] text-[11px] font-mono text-white/70">
                  {glassesLogs.map((log, idx) => (
                    <div key={idx} className="leading-snug">
                      <span className="text-white/40 mr-2">[{log.time}]</span>
                      <span>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          TAB 2: AURAGUIDE CAREGIVER COPILOT CONSOLE
          ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'copilot' && (
        <div className="bg-[#121A16] border border-[#23382D] rounded-[2.5rem] p-6 md:p-10 shadow-2xl text-[#F4F1EB]">
          {/* Top Bar with Patient Bio */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-moss)] border border-[var(--color-mint)]/40 flex items-center justify-center text-[var(--color-mint)]">
                <Heart size={22} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-xl md:text-2xl text-white">
                  AuraGuide EHR Clinical Copilot
                </h3>
                <p className="text-xs font-mono text-[var(--color-mint)]">
                  Arthur Pendelton • Age 78 • EPIC ID: #983-201-FHIR • Stage 2 MCI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 font-mono text-xs text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                FHIR Bridge Connected
              </span>
            </div>
          </div>

          {/* Vitals Telemetry Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                <span>HEART RATE</span>
                <Heart size={14} className="text-red-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">72 <span className="text-xs font-normal text-white/60">BPM</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1">Normal Sinus Rhythm</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                <span>COGNITIVE FATIGUE</span>
                <Activity size={14} className="text-[var(--color-mint)]" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">0.12 <span className="text-xs font-normal text-white/60">LOW</span></div>
              <div className="text-[10px] font-mono text-[var(--color-mint)] mt-1">Well Rested</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                <span>MED ADHERENCE</span>
                <CheckCircle2 size={14} className="text-[var(--color-teal)]" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">100%</div>
              <div className="text-[10px] font-mono text-white/70 mt-1">Donepezil 10mg Taken</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                <span>SAFETY CORRIDOR</span>
                <ShieldCheck size={14} className="text-[var(--color-clay)]" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">SECURE</div>
              <div className="text-[10px] font-mono text-white/70 mt-1">Living Room Geofence</div>
            </div>
          </div>

          {/* Main Grid: Copilot Chat Console + Live FHIR Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: AI Chat Triage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col h-[480px] bg-black/40 border border-white/10 rounded-3xl p-5 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-white/60">
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[var(--color-mint)]" />
                  Clinical Decision Support Engine
                </span>
                <span>Claude/NPU Ensemble</span>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] font-mono text-white/40 mb-1">
                      {m.sender === 'user' ? 'Caregiver Dr. Vance' : 'AuraGuide Copilot'} • {m.time}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[var(--color-clay)] text-white shadow-md'
                          : 'bg-white/10 text-white/90 border border-white/10'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-xs font-mono text-[var(--color-mint)] flex items-center gap-2">
                    <RefreshCw size={12} className="animate-spin" /> AuraGuide is analyzing patient stream...
                  </div>
                )}
              </div>

              {/* Quick Action Chips */}
              <div className="py-2 flex flex-wrap gap-2 border-t border-white/10">
                <button
                  onClick={() => handleQuickPrompt("Analyze Arthur's morning vitals")}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-white/80 transition-colors"
                >
                  Analyze vitals
                </button>
                <button
                  onClick={() => handleQuickPrompt("Verify Donepezil 10mg adherence")}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-white/80 transition-colors"
                >
                  Medication check
                </button>
                <button
                  onClick={() => handleQuickPrompt("Check Arthur's corridor safety boundary")}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-white/80 transition-colors"
                >
                  Corridor geofence
                </button>
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendQuery} className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask AuraGuide about vitals, reminders, or wandering alerts..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[var(--color-mint)] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="w-10 h-10 rounded-full bg-[var(--color-mint)] hover:bg-[var(--color-mint)]/90 text-emerald-950 flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>

            {/* RIGHT: Live FHIR Telemetry Terminal (5 cols) */}
            <div className="lg:col-span-5 flex flex-col h-[480px] bg-black/60 border border-white/10 rounded-3xl p-5 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-white/60">
                <span className="flex items-center gap-2 text-[var(--color-mint)]">
                  <Terminal size={13} />
                  HL7 FHIR STREAM (EPIC-BRIDGE)
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse" />
              </div>

              <div 
                ref={logFeedRef} 
                className="flex-1 overflow-y-auto space-y-2 py-3 font-mono text-[11px] text-white/70"
              >
                {copilotLogs.map(log => (
                  <div key={log.id} className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
                      <span>[{log.time}]</span>
                      <span className={`uppercase font-bold ${
                        log.type === 'success' ? 'text-[var(--color-mint)]' : log.type === 'warning' ? 'text-red-400' : 'text-blue-300'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <div className="leading-snug text-white/90">{log.msg}</div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>ENCRYPTED SILICON TRANSPORT</span>
                <span className="text-[var(--color-mint)]">ZERO CLOUD DATA LEAK</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
