import React, { useState } from "react";
import PortalGate from "./components/PortalGate";
import AuraGuideConsole from "./components/AuraGuideConsole";
import AuraPathGlasses from "./components/AuraPathGlasses";

function App() {
  const [currentRoute, setCurrentRoute] = useState("home"); // 'home', 'auraguide', 'aurapath'

  return (
    <>
      {/* Background Matrix Grid Overlay */}
      <div className="grid-overlay"></div>

      {/* Global Cinematic Nav Bar */}
      <nav>
        <div className="logo" onClick={() => setCurrentRoute("home")}>
          VIKTRON<span>HEALTH</span>
        </div>
        
        <div className="nav-links">
          <button 
            onClick={() => setCurrentRoute("home")}
            style={{ opacity: currentRoute === "home" ? 1 : 0.6 }}
          >
            Home Gateway
          </button>
          <button 
            onClick={() => setCurrentRoute("auraguide")}
            style={{ opacity: currentRoute === "auraguide" ? 1 : 0.6 }}
          >
            AuraGuide
          </button>
          <button 
            onClick={() => setCurrentRoute("aurapath")}
            style={{ opacity: currentRoute === "aurapath" ? 1 : 0.6 }}
          >
            AuraPath HUD
          </button>
        </div>

        <div className="system-status">
          <span className="status-dot"></span> SECURE EDGE CORE
        </div>
      </nav>

      {/* Dynamic Route Handler */}
      {currentRoute === "home" && (
        <PortalGate onNavigate={(route) => setCurrentRoute(route)} />
      )}

      {currentRoute === "auraguide" && (
        <AuraGuideConsole onBack={() => setCurrentRoute("home")} />
      )}

      {currentRoute === "aurapath" && (
        <AuraPathGlasses onBack={() => setCurrentRoute("home")} />
      )}

      {/* Global Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            VIKTRON<span>HEALTH</span>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Viktron Health Inc. All rights reserved. Precision Dementia Care.
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
