import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  ArrowRight, 
  Brain, 
  ShieldCheck, 
  Activity,
  ChevronRight,
  Stethoscope,
  Eye
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);

  return (
    <div ref={mainRef} className="relative w-full bg-[var(--color-obsidian)] text-[var(--color-ivory)] selection:bg-[var(--color-champagne)] selection:text-black">
      <div className="noise-overlay"></div>
      
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <CTA />
      <Footer />
    </div>
  );
}

function Navbar() {
  const navRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: "top -50",
      end: 99999,
      toggleClass: {
        className: 'bg-[var(--color-obsidian)]/80 backdrop-blur-xl border-white/10 py-3',
        targets: navRef.current
      }
    });
  });

  return (
    <div className="fixed top-0 left-0 w-full z-40 px-6 pt-6 pointer-events-none flex justify-center">
      <nav ref={navRef} className="pointer-events-auto flex items-center justify-between w-full max-w-5xl rounded-full border border-transparent py-4 px-8 transition-all duration-300">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[var(--color-champagne)]" />
          <span className="font-bold tracking-tight text-lg">Viktron Health</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Platform</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#protocol" className="hover:text-white transition-colors">Methodology</a>
        </div>
        <button className="btn-magnetic bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2 text-sm font-semibold">
          <span className="relative z-10">Sign In</span>
        </button>
      </nav>
    </div>
  );
}

function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".hero-text-1", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
    )
    .fromTo(".hero-text-2", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=1.0"
    )
    .fromTo(".hero-desc", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    .fromTo(".hero-cta", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative h-[100dvh] w-full flex items-end pb-24 px-6 md:px-12 lg:px-24">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?q=80&w=2069&auto=format&fit=crop" 
          alt="Abstract Medical Technology" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)] via-[var(--color-obsidian)]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-obsidian)] via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-data text-[var(--color-champagne)] mb-6 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-champagne)] animate-pulse"></span>
          DEMENTIA CARE AI SUITE
        </div>
        
        <h1 className="leading-[1.1] mb-8">
          <span className="hero-text-1 block font-inter font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl uppercase">
            Cognitive Dignity meets
          </span>
          <span className="hero-text-2 block text-drama text-5xl md:text-7xl lg:text-8xl mt-2 text-[var(--color-champagne)]">
            Clinical Precision.
          </span>
        </h1>
        
        <p className="hero-desc text-white/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
          Restoring cognitive agency through clinical AI co-pilots and wearable memory prosthetics. Purpose-built for family caregivers and medical professionals.
        </p>

        <div className="hero-cta">
          <button className="btn-magnetic bg-[var(--color-champagne)] text-black px-8 py-4 text-sm font-bold uppercase tracking-wider group">
            <span className="btn-sliding-bg bg-white/30"></span>
            <span className="relative z-10 flex items-center gap-3">
              Request Pilot Deployment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-obsidian)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Functional Artifacts</h2>
          <p className="text-white/50 max-w-xl text-lg">Every module is engineered as an active agent, working continuously to close the gap between patient vulnerability and clinical safety.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DiagnosticShuffler />
          <TelemetryTypewriter />
          <CursorProtocolScheduler />
        </div>
      </div>
    </section>
  );
}

function DiagnosticShuffler() {
  const container = useRef(null);
  const [cards, setCards] = useState([
    "FHIR Vitals Sync",
    "Symptom Vectors",
    "Medication Check"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={container} className="bg-[var(--color-slate)]/20 border border-white/5 rounded-[2.5rem] p-8 flex flex-col h-[400px]">
      <div className="mb-auto">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-[var(--color-champagne)]" />
          <h3 className="font-bold text-lg">AuraGuide Copilot</h3>
        </div>
        <p className="text-sm text-white/60">Real-time clinical diagnostics linking FHIR vitals to edge NPU.</p>
      </div>
      
      <div className="relative h-48 w-full mt-8 flex justify-center">
        {cards.map((label, idx) => {
          const isTop = idx === 0;
          const yOffset = idx * 16;
          const scale = 1 - (idx * 0.05);
          const opacity = 1 - (idx * 0.3);
          
          return (
            <div 
              key={label}
              className="absolute w-full max-w-[240px] bg-[var(--color-slate)] border border-white/10 rounded-2xl p-4 flex items-center justify-between transition-all duration-700 shadow-xl"
              style={{
                transform: `translateY(${yOffset}px) scale(${scale})`,
                opacity: opacity,
                zIndex: 10 - idx,
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              <span className="text-xs font-mono font-medium">{label}</span>
              <div className={`w-2 h-2 rounded-full ${isTop ? 'bg-[var(--color-champagne)]' : 'bg-white/20'}`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TelemetryTypewriter() {
  const [text, setText] = useState("");
  const fullText = "AuraPath initialized. Face vector matched < 0.4s. Whispering relationship to user. Hazard detected at 2m. Rerouting...";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        setTimeout(() => { i = 0; }, 4000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[var(--color-slate)]/20 border border-white/5 rounded-[2.5rem] p-8 flex flex-col h-[400px]">
      <div className="mb-auto">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-5 h-5 text-[var(--color-champagne)]" />
          <h3 className="font-bold text-lg">AuraPath Glasses</h3>
        </div>
        <p className="text-sm text-white/60">Wearable memory prosthetic smart glasses with HUD integration.</p>
      </div>
      
      <div className="bg-black/40 rounded-2xl p-6 mt-8 h-48 border border-white/5 relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-[0.65rem] text-[var(--color-champagne)] font-mono uppercase tracking-widest">
          <div className="w-1.5 h-1.5 bg-[var(--color-champagne)] rounded-full animate-pulse"></div>
          Live Feed
        </div>
        <div className="text-sm font-mono text-white/80 leading-relaxed">
          <span className="text-[var(--color-champagne)]">{'>'} </span>
          {text}
          <span className="w-2 h-4 inline-block align-middle ml-1 bg-[var(--color-champagne)] animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}

function CursorProtocolScheduler() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, defaults: { ease: "power2.inOut" } });
    
    // Animate cursor
    tl.set(".protocol-cursor", { x: 0, y: 0, opacity: 0 })
      .to(".protocol-cursor", { opacity: 1, duration: 0.3 })
      .to(".protocol-cursor", { x: 120, y: 60, duration: 0.8 })
      // Click simulation
      .to(".protocol-cursor", { scale: 0.8, duration: 0.1 })
      .to(".protocol-node-active", { backgroundColor: "var(--color-champagne)", color: "#000", duration: 0.1 }, "<")
      .to(".protocol-cursor", { scale: 1, duration: 0.1 })
      // Move to Save
      .to(".protocol-cursor", { x: 200, y: 140, duration: 0.7, delay: 0.2 })
      .to(".protocol-cursor", { scale: 0.8, duration: 0.1 })
      .to(".protocol-btn-active", { scale: 0.95, opacity: 0.8, duration: 0.1 }, "<")
      .to(".protocol-cursor", { scale: 1, opacity: 0, duration: 0.2 })
      .to(".protocol-btn-active", { scale: 1, opacity: 1, duration: 0.1 }, "<")
      .to(".protocol-node-active", { backgroundColor: "transparent", color: "inherit", duration: 0.4 }, "+=1");
  }, { scope: container });

  return (
    <div ref={container} className="bg-[var(--color-slate)]/20 border border-white/5 rounded-[2.5rem] p-8 flex flex-col h-[400px] relative overflow-hidden">
      <div className="mb-auto z-10">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-[var(--color-champagne)]" />
          <h3 className="font-bold text-lg">Privacy-First AI</h3>
        </div>
        <p className="text-sm text-white/60">Zero cloud delays. Offline neural processing for absolute safety.</p>
      </div>
      
      <div className="mt-8 flex-1 relative z-0">
        <div className="grid grid-cols-4 gap-2 mb-6 opacity-40">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className={`h-8 rounded-lg border border-white/10 flex items-center justify-center text-xs font-mono ${i === 5 ? 'protocol-node-active' : ''}`}>
              {i === 5 ? 'NPU' : '---'}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-12">
          <div className="protocol-btn-active bg-white/10 border border-white/20 text-xs px-4 py-2 rounded-full font-mono">
            Deploy Edge
          </div>
        </div>
        
        {/* SVG Cursor */}
        <div className="protocol-cursor absolute top-0 left-0 w-6 h-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] z-20 pointer-events-none" style={{ transformOrigin: "top left" }}>
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="1">
            <path d="M4 2L20 12L12 14L15 22L12 23L9 15L3 19Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Philosophy() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: true
      }
    });

    tl.fromTo(".phil-bg", { y: -50 }, { y: 50, ease: "none" });

    gsap.fromTo(".phil-word-1", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".phil-sentence-1", start: "top 80%" } }
    );

    gsap.fromTo(".phil-word-2", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".phil-sentence-2", start: "top 75%" } }
    );
  }, { scope: container });

  return (
    <section ref={container} id="philosophy" className="relative py-48 px-6 md:px-12 lg:px-24 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=2127&auto=format&fit=crop" 
          alt="Dark Texture" 
          className="phil-bg w-full h-[120%] object-cover opacity-30 -mt-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-obsidian)] via-transparent to-[var(--color-obsidian)]"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <h2 className="phil-sentence-1 text-2xl md:text-4xl text-white/50 font-inter font-medium leading-tight">
          {"Most healthcare tech focuses on: ".split(" ").map((w,i) => <span key={i} className="phil-word-1 inline-block mr-2">{w}</span>)}
          <br/>
          {"passive data dashboards.".split(" ").map((w,i) => <span key={i} className="phil-word-1 inline-block mr-2">{w}</span>)}
        </h2>
        
        <h2 className="phil-sentence-2 text-4xl md:text-6xl lg:text-7xl font-inter font-bold leading-[1.1] uppercase">
          {"We focus on: ".split(" ").map((w,i) => <span key={i} className="phil-word-2 inline-block mr-3">{w}</span>)}
          <br className="hidden md:block"/>
          <span className="text-drama text-[var(--color-champagne)] normal-case text-5xl md:text-8xl lg:text-9xl mt-4 block">
            {"active cognitive restoration.".split(" ").map((w,i) => <span key={i} className="phil-word-2 inline-block mr-3">{w}</span>)}
          </span>
        </h2>
      </div>
    </section>
  );
}

function Protocol() {
  const container = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.protocol-card');
    
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.9,
          filter: "blur(10px)",
          opacity: 0.3,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 80%",
            end: "top 20%",
            scrub: true
          }
        });
      }
    });

    // Sub-animations for graphics
    gsap.to(".helix-spin", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".scanner-line", {
      y: 120,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to(".pulse-wave", {
      strokeDashoffset: -100,
      duration: 3,
      repeat: -1,
      ease: "none"
    });

  }, { scope: container });

  const steps = [
    {
      num: "01",
      title: "Secure Sync",
      desc: "HL7 FHIR integration for seamless EHR telemetry. Pulling clinical context without exposing PII.",
      Graphic: () => (
        <svg className="w-full h-full text-[var(--color-champagne)] helix-spin" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="40" strokeOpacity="0.2" />
          <circle cx="50" cy="50" r="25" strokeOpacity="0.4" />
          <path d="M50 10 V90 M10 50 H90" strokeDasharray="4 4" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Edge Processing",
      desc: "Local Neural Processing Unit (NPU) execution for instant diagnostics. No cloud dependency. No latency.",
      Graphic: () => (
        <div className="relative w-full h-full flex flex-wrap gap-1 p-2">
          {Array(36).fill(0).map((_, i) => (
            <div key={i} className="w-[15%] h-[15%] rounded-sm bg-[var(--color-champagne)]/10 border border-[var(--color-champagne)]/20"></div>
          ))}
          <div className="scanner-line absolute top-0 left-0 w-full h-[2px] bg-[var(--color-champagne)] shadow-[0_0_10px_var(--color-champagne)]"></div>
        </div>
      )
    },
    {
      num: "03",
      title: "Behavioral Output",
      desc: "Bone-conduction and haptic guidance delivery. Whisper-quiet cognitive support right at the ear.",
      Graphic: () => (
        <svg className="w-full h-full text-[var(--color-champagne)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <path className="pulse-wave" d="M0 50 H30 L40 20 L60 80 L70 50 H100" strokeDasharray="200" strokeDashoffset="0" />
        </svg>
      )
    }
  ];

  return (
    <section ref={container} id="protocol" className="py-24 bg-[var(--color-obsidian)] relative">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-sm font-jetbrains uppercase tracking-[0.3em] text-[var(--color-champagne)] mb-12 text-center">System Protocol</h2>
        
        <div className="relative">
          {steps.map((step, i) => (
            <div 
              key={step.num}
              className={`protocol-card sticky top-32 w-full h-[60vh] md:h-[50vh] bg-[var(--color-slate)] border border-white/5 rounded-[3rem] p-8 md:p-16 mb-24 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl`}
              style={{ zIndex: i }}
            >
              <div className="flex-1">
                <div className="text-data text-white/30 mb-6">STEP {step.num}</div>
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">{step.title}</h3>
                <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-md">{step.desc}</p>
              </div>
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/10 bg-black/50 p-8 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <step.Graphic />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 px-6 bg-[var(--color-obsidian)] border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-drama text-[var(--color-champagne)] text-5xl md:text-7xl mb-8">Initiate Deployment.</h2>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Partner with Viktron Health to establish high-fidelity cognitive assurance frameworks in your clinics, memory centers, and home care environments.
        </p>
        
        <button className="btn-magnetic bg-[var(--color-ivory)] text-black px-10 py-5 text-sm font-bold uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(250,248,245,0.15)] group">
          <span className="relative z-10 flex items-center gap-3">
            Request Clinical Pilot
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#050508] pt-24 pb-8 px-6 md:px-12 lg:px-24 rounded-t-[4rem] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-6 h-6 text-[var(--color-champagne)]" />
            <span className="font-bold tracking-tight text-2xl text-white">Viktron Health</span>
          </div>
          <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-8">
            The next generation of memory prosthetics and clinical AI. Restoring cognitive agency at the edge.
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><a href="#" className="hover:text-[var(--color-champagne)] transition-colors">AuraGuide Copilot</a></li>
            <li><a href="#" className="hover:text-[var(--color-champagne)] transition-colors">AuraPath Glasses</a></li>
            <li><a href="#" className="hover:text-[var(--color-champagne)] transition-colors">Edge NPU Security</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><a href="#" className="hover:text-[var(--color-champagne)] transition-colors">Research Papers</a></li>
            <li><a href="#" className="hover:text-[var(--color-champagne)] transition-colors">Clinical Trials</a></li>
            <li><a href="#" className="hover:text-[var(--color-champagne)] transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30">
        <p>© {new Date().getFullYear()} Viktron Health Inc.</p>
        <p>CONFIDENTIAL & PROPRIETARY</p>
      </div>
    </footer>
  );
}
