import React, { useState, useEffect } from "react";
import { ArrowLeft, Cpu, Volume2, ShieldAlert, Sparkles, Navigation, Battery, Bluetooth } from "lucide-react";

export default function AuraPathGlasses({ onBack }) {
  const [hudMode, setHudMode] = useState("nav"); // 'nav', 'wander', 'med'
  const [hapticPower, setHapticPower] = useState(80);
  const [alertLogs, setAlertLogs] = useState([
    { time: "16:51:10", msg: "AuraGlass-G2 connected successfully." },
    { time: "16:51:15", msg: "Calibration complete. Latency: 0.38s." }
  ]);

  // Handle adding alerts based on HUD mode
  useEffect(() => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];

    if (hudMode === "wander") {
      setAlertLogs((prev) => [
        ...prev,
        { time: timeStr, msg: "⚠ [CRITICAL] Arthur deviated from garden path! Geofencing armed." },
        { time: timeStr, msg: "🔊 Haptic correction active on left temple." }
      ]);
    } else if (hudMode === "med") {
      setAlertLogs((prev) => [
        ...prev,
        { time: timeStr, msg: "✔ Donepezil 10mg verified. EPIC medication log updated." }
      ]);
    } else {
      setAlertLogs((prev) => [
        ...prev,
        { time: timeStr, msg: "System recalibrated. Vitals nominal." }
      ]);
    }
  }, [hudMode]);

  return (
    <div className="dashboard-wrapper">
      <button className="dashboard-back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Gateway
      </button>

      <div className="hud-layout">
        
        {/* LEFT COLUMN: Smart Glasses HUD simulation screen */}
        <div className="camera-feed-card">
          <div className="console-header-section">
            <div>
              <h2><Cpu size={24} color="#D9E4B5" /> AuraGlass HUD Simulator</h2>
              <span className="console-subtitle">Simulated Field of View (Arthur's Glasses Feed)</span>
            </div>
            <div className="system-status">
              <span className="status-dot"></span> Active HUD Mode
            </div>
          </div>

          <div className="hud-screen-box">
            {/* Scanlines layer */}
            <div className="hud-scan-line"></div>

            {/* Backdrop camera simulation scene */}
            <div className="hud-simulated-feed">
              <div className="hud-simulated-scene">
                
                {/* 1. Global HUD grid overlays */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid rgba(217, 228, 181, 0.08)",
                  backgroundImage: "radial-gradient(rgba(217, 228, 181, 0.03) 1.5px, transparent 1.5px)",
                  backgroundSize: "20px 20px"
                }}></div>

                {/* 2. Top-Left Compass / GPS status */}
                <div className="hud-gps-card">
                  <h4><Navigation size={12} style={{ display: "inline", marginRight: "4px" }} /> Compass Core</h4>
                  <span className="detail-label" style={{ fontSize: "0.6rem" }}>Lat: 34.0522° N | Lon: 118.2437° W</span>
                  <span className="gauge-value" style={{ fontSize: "0.75rem", display: "block" }}>Heading: NE 45°</span>
                </div>

                {/* 3. Top-Right Telemetry levels */}
                <div className="hud-telemetry-gauge">
                  <div className="gauge-row">
                    <span className="gauge-label">Battery</span>
                    <span className="gauge-value" style={{ color: hudMode === "wander" ? "#ff8585" : "#a8f090" }}>
                      {hudMode === "wander" ? "32%" : "88%"}
                    </span>
                  </div>
                  <div className="gauge-row">
                    <span className="gauge-label">Latency</span>
                    <span className="gauge-value">38 ms</span>
                  </div>
                  <div className="gauge-row">
                    <span className="gauge-label">BLE signal</span>
                    <span className="gauge-value">Strong</span>
                  </div>
                </div>

                {/* 4. Adaptive HUD contents depending on Mode */}
                
                {/* MODE A: Navigation Mode */}
                {hudMode === "nav" && (
                  <>
                    {/* Bounding box for Jane */}
                    <div className="hud-target-box" style={{ top: "90px", left: "25%", width: "240px", height: "180px" }}>
                      <span className="target-label">Wife: Jane Pendelton</span>
                      <div className="target-intel">
                        <div>Match: 99.4% Verified</div>
                        <div>Relation: Spouse (Married 52 Years)</div>
                        <div style={{ color: "#a8f090", marginTop: "4px" }}>✔ Safe family contact</div>
                      </div>
                    </div>

                    {/* Navigation Path Guideline overlay */}
                    <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
                      <path 
                        d="M 150 420 L 250 320 L 400 320" 
                        fill="none" 
                        stroke="rgba(217, 228, 181, 0.45)" 
                        strokeWidth="5" 
                        strokeDasharray="10 6"
                        strokeLinecap="round"
                        style={{ animation: "drawPulse 20s linear infinite" }}
                      />
                      <circle cx="400" cy="320" r="6" fill="#D9E4B5" />
                    </svg>
                    <div style={{ position: "absolute", bottom: "30px", right: "40px", fontSize: "0.75rem", color: "var(--accent-lime)", fontWeight: 700 }}>
                      ROUTE HOME ACTIVE
                    </div>
                  </>
                )}

                {/* MODE B: Wandering / Warning Mode */}
                {hudMode === "wander" && (
                  <>
                    {/* Obstacle box */}
                    <div className="hud-target-box" style={{ top: "80px", left: "20%", width: "280px", height: "190px", borderColor: "#ff8585", boxShadow: "0 0 25px rgba(255, 133, 133, 0.3)" }}>
                      <span className="target-label" style={{ background: "#ff8585", color: "#000" }}>STAIRCASE / HAZARD</span>
                      <div className="target-intel" style={{ color: "#ff8585" }}>
                        <div>STAIRCASE EDGE DETECTED</div>
                        <div>Distance: 1.2 Meters</div>
                        <div style={{ fontWeight: 800, marginTop: "4px" }}>🚨 STEP BACK IMMEDIATELY</div>
                      </div>
                    </div>

                    {/* Red blinking emergency HUD label */}
                    <div className="hud-warning-alert">
                      <ShieldAlert size={16} /> DEVIATION WARNING: STEP AWAY FROM STAIRS
                    </div>

                    {/* Corrective path indicator */}
                    <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
                      <path 
                        d="M 300 420 L 300 350 L 450 350" 
                        fill="none" 
                        stroke="#ff8585" 
                        strokeWidth="5" 
                        strokeDasharray="10 6"
                      />
                    </svg>
                  </>
                )}

                {/* MODE C: Medication Mode */}
                {hudMode === "med" && (
                  <>
                    {/* Scanning reticle over medicine */}
                    <div className="hud-target-box" style={{ top: "110px", left: "30%", width: "220px", height: "150px", borderColor: "var(--accent-cyan)", boxShadow: "0 0 25px rgba(157, 226, 236, 0.3)" }}>
                      <span className="target-label" style={{ background: "var(--accent-cyan)", color: "#000" }}>SCANNING MEDICAL LABEL</span>
                      <div className="target-intel" style={{ color: "var(--accent-cyan)" }}>
                        <div>Donepezil Hydrochloride</div>
                        <div>Dosage: 10mg Capsule</div>
                        <div style={{ color: "#a8f090", fontWeight: 800, marginTop: "4px" }}>✔ MATCH VERIFIED</div>
                      </div>
                    </div>

                    <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: 700, background: "rgba(0,0,0,0.5)", padding: "5px 15px", borderRadius: "10px" }}>
                      DOSAGE VERIFIED BY EPIC CLOUD
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Hardware Specs / Controls & Caregiver log */}
        <div className="path-specs-panel">
          <div className="specs-title">
            <Sparkles size={20} color="#D9E4B5" />
            <span>AuraGlass Hardware Suite</span>
          </div>

          <div className="specs-grid">
            <div className="specs-item-card">
              <div className="specs-icon"><Battery size={18} /></div>
              <div className="specs-item-content">
                <h4>Battery Autonomy</h4>
                <p>Equipped with low-power edge silicon, offering 18 hours of continuous video scanning on a single charge.</p>
              </div>
            </div>

            <div className="specs-item-card">
              <div className="specs-icon"><Bluetooth size={18} /></div>
              <div className="specs-item-content">
                <h4>Clinician Link</h4>
                <p>Bluetooth BLE v5.3 synced. Transmits patient distress cues and fall detections in under 100ms.</p>
              </div>
            </div>

            <div className="specs-item-card">
              <div className="specs-icon"><Volume2 size={18} /></div>
              <div className="specs-item-content">
                <h4>Haptic Beacon intensity</h4>
                <p>Current level: {hapticPower}% strength. Adaptive temple feedback guides patients through bone-conduction clicks.</p>
              </div>
            </div>
          </div>

          {/* Caregiver simulation triggers */}
          <div className="caregiver-widget">
            <div className="caregiver-title">
              <span>Caregiver Simulator Controls</span>
              <span className={`caregiver-alert-status ${hudMode === "wander" ? "active" : ""}`}>
                {hudMode === "wander" ? "🚨 Active Wandering Alert" : "✔ System Secure"}
              </span>
            </div>
            
            <div className="widget-buttons" style={{ marginBottom: "1rem" }}>
              <button 
                className={`widget-btn ${hudMode === "nav" ? "btn-alert" : ""}`}
                onClick={() => setHudMode("nav")}
                style={{
                  background: hudMode === "nav" ? "var(--accent-lime)" : "",
                  color: hudMode === "nav" ? "var(--text-dark)" : ""
                }}
              >
                Jane Profile Mode
              </button>
              <button 
                className={`widget-btn ${hudMode === "med" ? "btn-alert" : ""}`}
                onClick={() => setHudMode("med")}
                style={{
                  background: hudMode === "med" ? "var(--accent-cyan)" : "",
                  color: hudMode === "med" ? "var(--text-dark)" : "",
                  borderColor: hudMode === "med" ? "var(--accent-cyan)" : ""
                }}
              >
                Medication Scan Mode
              </button>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <button 
                className={`widget-btn btn-alert`}
                onClick={() => setHudMode("wander")}
                style={{
                  width: "100%",
                  background: hudMode === "wander" ? "#ff8585" : "",
                  color: hudMode === "wander" ? "#000" : ""
                }}
              >
                TRIGGER EMERGENCY WANDERING DEV
              </button>
            </div>

            <div className="system-log-feed" style={{ height: "110px", padding: "0.8rem", fontSize: "0.7rem", marginTop: 0 }}>
              <div className="log-title" style={{ fontSize: "0.6rem", marginBottom: "0.4rem" }}>Glasses Log Streams</div>
              {alertLogs.map((log, index) => (
                <div key={index} className="log-entry" style={{ fontSize: "0.7rem", marginBottom: "0.2rem" }}>
                  <span className="log-timestamp">[{log.time}]</span>
                  <span className="log-message">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
