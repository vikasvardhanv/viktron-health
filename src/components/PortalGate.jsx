import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PortalGate({ onNavigate }) {
  const containerRef = useRef(null);
  const ambientGlowLimeRef = useRef(null);
  const ambientGlowEmeraldRef = useRef(null);

  useEffect(() => {
    // GSAP Cinematic Entrance Timeline
    const introTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial States
    gsap.set(".portal-title-area span", { y: 20, opacity: 0 });
    gsap.set(".portal-title-area h1", { y: 30, opacity: 0, filter: "blur(5px)" });
    gsap.set(".card-auraguide", { x: -80, opacity: 0, rotateY: -15 });
    gsap.set(".card-aurapath", { x: 80, opacity: 0, rotateY: 15 });
    gsap.set(".portal-img", { scale: 0.8, opacity: 0 });
    gsap.set(".scroll-indicator", { y: 20, opacity: 0 });
    gsap.set(".bento-card", { y: 30, opacity: 0 });

    // Play Entrance
    introTimeline
      .to(".portal-title-area span", { y: 0, opacity: 1, duration: 0.8 })
      .to(".portal-title-area h1", { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 }, "-=0.6")
      .to([".card-auraguide", ".card-aurapath"], {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.8")
      .to(".portal-img", {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.5)"
      }, "-=1.0")
      .to(".scroll-indicator", { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");

    // Ambient floating image loop
    gsap.to(".portal-img", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Global cursor track for backlighting spotlights
    const handleGlobalMouseMove = (e) => {
      const { clientX: mouseX, clientY: mouseY } = e;

      gsap.to(ambientGlowLimeRef.current, {
        x: mouseX - window.innerWidth / 3,
        y: mouseY - window.innerHeight / 3,
        duration: 2.2,
        ease: "power2.out"
      });

      gsap.to(ambientGlowEmeraldRef.current, {
        x: mouseX - (window.innerWidth * 2) / 3,
        y: mouseY - (window.innerHeight * 2) / 3,
        duration: 2.2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);

    // Simple scroll reveal for bento grid
    const handleScroll = () => {
      const bentoGrid = document.querySelector(".bento-grid");
      if (bentoGrid) {
        const rect = bentoGrid.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          gsap.to(".bento-card", {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.0,
            ease: "power3.out"
          });
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initially if already in view

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Card cursor track tilt mechanics
  const handleCardMouseMove = (e, cardClass) => {
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
    const maxTilt = 10;

    gsap.to(card, {
      rotateX: -normY * maxTilt,
      rotateY: normX * maxTilt,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.3
    });

    const img = card.querySelector(".portal-img");
    if (img) {
      gsap.to(img, {
        x: normX * 20,
        y: normY * 20,
        scale: 1.05,
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

  const handleScrollToBento = () => {
    const bento = document.getElementById("innovation");
    if (bento) {
      window.scrollTo({
        top: bento.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div ref={containerRef}>
      {/* Background ambient spotlight glows */}
      <div ref={ambientGlowLimeRef} className="ambient-glow glow-lime"></div>
      <div ref={ambientGlowEmeraldRef} className="ambient-glow glow-emerald"></div>

      <main className="portal-wrapper">
        <div className="portal-title-area">
          <span>Dementia Care AI Suite</span>
          <h1>Precision Intelligence.<br />Restoring Dignity.</h1>
        </div>

        {/* Product selector selector */}
        <div className="portal-container">
          
          {/* AuraGuide Card */}
          <div 
            className="portal-card card-auraguide"
            onMouseMove={(e) => handleCardMouseMove(e, "auraguide")}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="card-top">
              <span className="card-tag">Clinical Intelligence</span>
              <h2>AURAGUIDE</h2>
              <p>The world's first agentic clinical co-pilot. AuraGuide transforms fragmented patient data into actionable bedside intelligence.</p>
              <div className="specs-row">
                <span className="spec-pill">On-Device NPU</span>
                <span className="spec-pill">Epic/Cerner Integration</span>
                <span className="spec-pill">HL7 FHIR Sync</span>
              </div>
            </div>

            <div className="card-image-box">
              <img src="assets/auragide.png" alt="AuraGuide Clinical Copilot" className="portal-img" />
            </div>

            <div className="card-bottom">
              <div className="card-details">
                <span className="detail-label">Deployment</span>
                <span className="detail-value">Clinical Hub v3.1</span>
              </div>
              <div className="portal-cta-group">
                <button 
                  className="card-explore-btn" 
                  onClick={() => onNavigate("auraguide")}
                  aria-label="Explore AuraGuide Console"
                >
                  Explore Dashboard
                </button>
                <a 
                  href="https://auraguide.viktronhealth.com" 
                  target="_blank" 
                  className="portal-cta" 
                  rel="noopener noreferrer"
                  aria-label="Redirect to auraguide.viktronhealth.com"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* AuraPath Card */}
          <div 
            className="portal-card card-aurapath"
            onMouseMove={(e) => handleCardMouseMove(e, "aurapath")}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="card-top">
              <span className="card-tag">Memory Prosthetic</span>
              <h2>AURAPATH</h2>
              <p>A "Social Prosthetic" for dementia care. AuraPath glasses restore dignity and independence to those with memory loss.</p>
              <div className="specs-row">
                <span className="spec-pill">Face Recall &lt;0.4s</span>
                <span className="spec-pill">Bone-Conduction Audio</span>
                <span className="spec-pill">Haptic Guide Core</span>
              </div>
            </div>

            <div className="card-image-box">
              <img src="assets/aurapath_glasses.png" alt="AuraPath Smart Glasses" className="portal-img" />
            </div>

            <div className="card-bottom">
              <div className="card-details">
                <span className="detail-label">Hardware System</span>
                <span className="detail-value">AuraGlass-G2</span>
              </div>
              <div className="portal-cta-group">
                <button 
                  className="card-explore-btn" 
                  onClick={() => onNavigate("aurapath")}
                  aria-label="Explore AuraPath Glasses Console"
                >
                  Explore Dashboard
                </button>
                <a 
                  href="https://aurapath.viktronhealth.com" 
                  target="_blank" 
                  className="portal-cta" 
                  rel="noopener noreferrer"
                  aria-label="Redirect to aurapath.viktronhealth.com"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="scroll-indicator" onClick={handleScrollToBento}>
          <span>Explore Innovation</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </main>

      {/* Bento specifications */}
      <section className="bento-section" id="innovation">
        <div className="bento-header">
          <span>Technical Fabric</span>
          <h2>Architected for Absolute Safety</h2>
        </div>

        <div className="bento-grid">
          <div className="bento-card bento-large">
            <h3>Social Identification Engine</h3>
            <p>Instantly identifies family and friends, whispering their names and relationships via bone-conduction audio. Restores identity and natural conversational flow without screens or social friction.</p>
          </div>
          
          <div className="bento-card">
            <h3>Privacy-First Local AI</h3>
            <p>Zero cloud latency. All audio descriptions and facial vectors are processed entirely on-device via a secure offline neural processor unit, offering complete data privacy.</p>
          </div>
          
          <div className="bento-card">
            <h3>Label Verification Core</h3>
            <p>Advanced real-time computer vision scans medication packaging and details. Runs instant edge checks to cross-reference prescriptions and verify correct dosages.</p>
          </div>
          
          <div className="bento-card bento-large">
            <h3>Autonomous Safe Navigation</h3>
            <p>Seamless spatial intelligence uses edge geofencing and active haptics to gently guide patients back home if disorientation occurs, alerting designated clinicians and caregivers instantly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
