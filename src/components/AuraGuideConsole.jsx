import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Activity, ShieldAlert, Cpu, Heart, CheckCircle2 } from "lucide-react";

export default function AuraGuideConsole({ onBack }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "AuraGuide Co-pilot active. Patient Arthur Pendelton is synced via secure EPIC HL7 FHIR link. Biometric indicators are stable. How can I assist you with clinical analysis today?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [logs, setLogs] = useState([]);
  const logsContainerRef = useRef(null);

  // Simulated live logs generator
  useEffect(() => {
    const initialLogs = [
      { id: 1, time: "16:49:15", type: "success", msg: "EPIC Systems HL7 Connection Established" },
      { id: 2, time: "16:49:22", type: "info", msg: "Secure Edge NPU Thread Initialized (Zero-Latency mode)" },
      { id: 3, time: "16:49:38", type: "success", msg: "AuraPath BLE Sync Active (AIMB-G2 smart glasses)" },
      { id: 4, time: "16:50:02", type: "info", msg: "FHIR Telemetry Synced - Vitals stream nominal" }
    ];
    setLogs(initialLogs);

    const logPhrases = [
      { type: "info", msg: "Analyzing patient facial vector stream - Arthur recognized Sarah (Daughter)" },
      { type: "success", msg: "Label check complete - Medication 'Donepezil 10mg' verified against database" },
      { type: "info", msg: "ECG data analysis: Normal Sinus Rhythm confirmed by clinical co-pilot" },
      { type: "warning", msg: "Haptic guidance trigger: Arthur deviated from path (guided back successfully)" },
      { type: "info", msg: "Vitals check: Heart rate stabilized at 72 BPM. Core cognitive fatigue: nominal" },
      { type: "success", msg: "Geofence boundary check: Arthur is within safe zone parameters" }
    ];

    const logInterval = setInterval(() => {
      const phrase = logPhrases[Math.floor(Math.random() * logPhrases.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      
      setLogs((prev) => [
        ...prev,
        { id: Date.now(), time: timeStr, type: phrase.type, msg: phrase.msg }
      ]);
    }, 4500);

    return () => clearInterval(logInterval);
  }, []);

  // Auto scroll logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Dynamic Clinical AI responses
    setTimeout(() => {
      let aiResponseText = "";
      const text = inputText.toLowerCase();

      if (text.includes("vital") || text.includes("heart") || text.includes("health")) {
        aiResponseText = "Patient Arthur Pendelton's current vitals show complete stability. Heart rate is 74 BPM (Normal Sinus Rhythm), oxygen saturation is 98%, and cognitive load is recorded at 42% (Optimal baseline). Safe range alerts remain un-triggered.";
      } else if (text.includes("medication") || text.includes("drug") || text.includes("pill")) {
        aiResponseText = "Medication verification log shows: Donepezil 10mg verified at 10:15 AM today via AuraPath smart glasses' optical recognition engine. Cross-referenced against safety database: 100% match. Next dose is scheduled for 8:00 PM.";
      } else if (text.includes("wandering") || text.includes("map") || text.includes("location") || text.includes("saf")) {
        aiResponseText = "Spatial telemetry: Arthur is currently walking in the garden zone. Wandering intervention active. Home base haptic beacons are active, and geofence status is fully Secure. No corrective haptics are currently required.";
      } else {
        aiResponseText = `Arthur's active record indicates high levels of safety and dignity. AuraPath glasses are currently syncing real-time facial templates (latency 0.38s). Edge-NPU is reporting complete local encryption. Is there a specific diagnostic profile or HL7 chart you would like to run?`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponseText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="dashboard-wrapper">
      <button className="dashboard-back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Gateway
      </button>

      <div className="console-container">
        
        {/* LEFT COLUMN: Telemetry & Graph charts */}
        <div className="dashboard-main-card">
          <div className="console-header-section">
            <div>
              <h2><Activity size={24} color="#D9E4B5" /> Clinical Telemetry Center</h2>
              <span className="console-subtitle">Arthur Pendelton | Clinical AI Sync Interface</span>
            </div>
            <div className="epic-badge">
              <Cpu size={14} /> EPIC FHIR V3.1 Synced
            </div>
          </div>

          {/* Patient profile stats */}
          <div className="patient-profile-bar">
            <div className="profile-stat">
              <span className="profile-label">Vitals Status</span>
              <span className="profile-value" style={{ color: "#a8f090" }}>Stable</span>
            </div>
            <div className="profile-stat">
              <span className="profile-label">Cognitive Fatigue</span>
              <span className="profile-value">Moderate (42%)</span>
            </div>
            <div className="profile-stat">
              <span className="profile-label">Medication Verification</span>
              <span className="profile-value">100% Match</span>
            </div>
            <div className="profile-stat">
              <span className="profile-label">Active Connection</span>
              <span className="profile-value" style={{ color: "#9de2ec" }}>AuraGlass-G2</span>
            </div>
          </div>

          {/* Vitals charts */}
          <div className="vitals-grid">
            {/* Cardiac chart */}
            <div className="vital-card">
              <div className="vital-top">
                <span className="vital-title"><Heart size={14} color="#D9E4B5" /> Cardiac Pulse Telemetry</span>
                <span className="system-status" style={{ border: "none", background: "none", padding: 0 }}>
                  <span className="status-dot"></span> 74 bpm
                </span>
              </div>
              <div className="vital-graph-box">
                <svg width="100%" height="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
                  <path 
                    className="vital-pulse-path" 
                    d="M 0,30 L 30,30 L 40,30 L 50,5 C 51,2 52,2 53,55 C 54,58 55,58 56,25 L 65,30 L 75,30 L 105,30 L 115,30 L 125,5 C 126,2 127,2 128,55 C 129,58 130,58 131,25 L 140,30 L 150,30 L 180,30 L 190,30 L 200,5 C 201,2 202,2 203,55 C 204,58 205,58 206,25 L 215,30 L 225,30 L 255,30 L 265,30 L 275,5 C 276,2 277,2 278,55 C 279,58 280,58 281,25 L 290,30 L 300,30"
                  />
                </svg>
              </div>
            </div>

            {/* Cognitive load chart */}
            <div className="vital-card vital-card-cyan">
              <div className="vital-top">
                <span className="vital-title"><Cpu size={14} color="#9de2ec" /> Cognitive Load Sensor</span>
                <span className="system-status" style={{ border: "none", background: "none", padding: 0, color: "#9de2ec" }}>
                  <span className="status-dot" style={{ background: "#87e0ff", boxShadow: "0 0 10px #87e0ff" }}></span> Normal
                </span>
              </div>
              <div className="vital-graph-box">
                <svg width="100%" height="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
                  <path 
                    className="vital-pulse-path" 
                    d="M 0,30 Q 15,20 30,40 T 60,20 T 90,45 T 120,15 T 150,35 T 180,20 T 210,40 T 240,15 T 270,35 T 300,25"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Event log terminal */}
          <div className="system-log-feed">
            <div className="log-title">Secure Edge-AI Telemetry Logs</div>
            <div ref={logsContainerRef} style={{ height: "120px", overflowY: "auto" }}>
              {logs.map((log) => (
                <div key={log.id} className="log-entry">
                  <span className="log-timestamp">[{log.time}]</span>
                  <span className={`log-message ${log.type}`}>
                    {log.type === "success" && "✔ "}
                    {log.type === "warning" && "⚠ [ALERT] "}
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Chat Assistant panel */}
        <div className="ai-copilot-panel">
          <div className="copilot-header">
            <ShieldAlert size={20} color="#D9E4B5" />
            <div>
              <h3>AuraGuide Copilot Assistant</h3>
              <span className="detail-label" style={{ fontSize: "0.6rem" }}>Offline Encrypted NPU</span>
            </div>
          </div>

          <div className="copilot-chat-history">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble ai" style={{ display: "flex", gap: "4px", padding: "10px 18px" }}>
                <span className="status-dot" style={{ animationDelay: "0.2s" }}></span>
                <span className="status-dot" style={{ animationDelay: "0.4s" }}></span>
                <span className="status-dot" style={{ animationDelay: "0.6s" }}></span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-container">
            <input 
              type="text" 
              className="chat-text-input" 
              placeholder="Ask about Arthur's vitals, geofence, or medication..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
