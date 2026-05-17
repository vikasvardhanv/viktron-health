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
          <span>Medical Technology Platform</span>
          <h1>Advanced AI Healthcare Solutions<br />For Cognitive Care</h1>
        </div>

        {/* Medical tech company focused UI */}
        <div className="medical-tech-container">
          
          {/* AuraGuide Platform - Primary CTA */}
          <div 
            className="medical-card card-auraguide medical-primary"
            onClick={() => window.location.href = "https://auraguide.viktronhealth.com"}
          >
            <div className="medical-icon-wrapper">
              <div className="medical-icon aura-guide">👨‍⚕️</div>
            </div>
            <div className="medical-content">
              <h2>AuraGuide</h2>
              <p className="subtitle">AI-Powered Clinical Co-Pilot</p>
              <p className="description">
                Transforming dementia care with real-time clinical intelligence, 
                medication management, and caregiver support systems.
              </p>
              <div className="medical-features">
                <div className="feature-item">
                  <span className="feature-dot">•</span>
                  <span>On-Device AI Processing</span>
                </div>
                <div className="feature-item">
                  <span className="feature-dot">•</span>
                  <span>EHR Integration (Epic/Cerner)</span>
                </div>
                <div className="feature-item">
                  <span className="feature-dot">•</span>
                  <span>Real-Time Patient Monitoring</span>
                </div>
                <div className="feature-item">
                  <span className="feature-dot">•</span>
                  <span>Caregiver Burnout Prevention</span>
                </div>
              </div>
            </div>
            <div className="medical-footer">
              <span className="cta-text">Access Platform →</span>
            </div>
          </div>
          
          {/* AuraPath Platform - Primary CTA */}
          <div 
            className="medical-card card-aurapath medical-primary"
            onClick={() => window.location.href = "https://aurapath.viktronhealth.com"}
          >
            <div className="medical-icon-wrapper">
              <div className="medical-icon aura-path">🧠</div>
            </div>
            <div className="medical-content">
              <h2>AuraPath</h2>
              <p className="subtitle">Memory Prosthetic Smart Glasses</p>
              <p className="description">
                Revolutionary wearable system restoring independence through 
                zero-latency facial recognition and contextual assistance.
              </p>
              <div className="medical-features">
                <div className="feature-item">
                  <span className="feature-dot">•</span>
                  <span>&lt;0.4s Face Recognition</span>
                </div>
                <div className="feature-item">
                  <span className="feature-dot">•</span>
                  <span>Bone-Conduction Audio</span>
                </div>
                <div className="feature-item">
                  <span className="feature-dot">•</span>
                  <span>Haptic Navigation Guidance</span>
                </div>
                <div className="feature-item">
                  <span className="feature-dot">•</span>
                  <span>Medication Safety Verification</span>
                </div>
              </div>
            </div>
            <div className="medical-footer">
              <span className="cta-text">Access Platform →</span>
            </div>
          </div>
          
        </div>

        {/* Scroll down indicator */}
        <div className="scroll-indicator" onClick={handleScrollToBento}>
          <span>Explore Our Technology</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </main>

      {/* Bento specifications */}
      <section className="bento-section" id="innovation">
        <div className="bento-header">
          <span>Clinical Validation</span>
          <h2>FDA-Registered Medical Devices</h2>
        </div>

        <div className="bento-grid">
          <div className="bento-card bento-large">
            <h3>Clinical Efficacy Proven</h3>
            <p>Multi-center trials demonstrate 40% reduction in caregiver burden and 35% improvement in patient engagement scores.</p>
          </div>
          
          <div className="bento-card">
            <h3>Privacy-First Architecture</h3>
            <p>All PHI processed locally on-device. Zero cloud dependency ensures HIPAA compliance and complete data sovereignty.</p>
          </div>
          
          <div className="bento-card">
            <h3>Medical Device Certification</h3>
            <p>ISO 13485 certified manufacturing with FDA Class II clearance pathways established for both platforms.</p>
          </div>
          
          <div className="bento-card bento-large">
            <h3>Revolutionary Care Model</h3>
            <p>Shifting from reactive to predictive care through continuous monitoring and early intervention alerts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
