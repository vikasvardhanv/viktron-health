import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Activity, ArrowRight, ExternalLink } from 'lucide-react';
import DemoModal from './DemoModal';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname } = useLocation();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useLayoutEffect(() => {
    // Kill all ScrollTriggers BEFORE the route change renders new content
    ScrollTrigger.getAll().forEach(st => {
      try { st.kill(); } catch (_) { /* already destroyed */ }
    });
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col font-sans selection:bg-[var(--color-clay)] selection:text-white">
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Island Navbar */}
      <Navbar 
        isScrolled={isScrolled} 
        onRequestDemo={() => setIsDemoModalOpen(true)} 
      />

      {/* Main Outlet */}
      <main className="flex-1 w-full pt-20">
        <Outlet context={{ openDemoModal: () => setIsDemoModalOpen(true) }} />
      </main>

      {/* Cinematic Footer */}
      <Footer onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* Global Clinical Intake Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}

function Navbar({ isScrolled, onRequestDemo }) {
  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div 
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between px-6 md:px-8 py-3 rounded-full max-w-[1100px] w-full ${
          isScrolled 
            ? 'bg-white/85 backdrop-blur-xl border border-[var(--color-border)] shadow-[0_8px_30px_rgba(46,64,54,0.08)]' 
            : 'bg-white/50 backdrop-blur-md border border-[var(--color-border)]/60 shadow-sm'
        }`}
      >
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/viktron-health-logo.png" 
            alt="Viktron Health" 
            className="w-8 h-8 object-contain group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base md:text-lg tracking-tight text-[var(--color-foreground)] leading-tight">
              Viktron
            </span>
            <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-muted-foreground)]">
              Health Inc.
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[var(--color-muted-foreground)]">
          <Link to="/" className="hover:text-[var(--color-foreground)] transition-colors">
            Home
          </Link>
          <a href="/#simulator-suite" className="hover:text-[var(--color-foreground)] transition-colors">
            Interactive Lab
          </a>
          <Link to="/platform" className="hover:text-[var(--color-foreground)] transition-colors">
            Platform
          </Link>
          <Link to="/methodology" className="hover:text-[var(--color-foreground)] transition-colors">
            Methodology
          </Link>
          <Link to="/philosophy" className="hover:text-[var(--color-foreground)] transition-colors">
            Philosophy
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRequestDemo}
            className="btn-magnetic bg-[var(--color-moss)] hover:bg-[var(--color-moss-dark)] text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-sm"
          >
            Request Demo
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onRequestDemo }) {
  return (
    <footer className="w-full mt-24 bg-[#101713] text-[#F4F1EB] rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-[#202E26] pt-16 pb-12 px-6 md:px-16 z-20 relative shadow-2xl">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Manifesto (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/viktron-health-logo.png" alt="Viktron Health" className="w-9 h-9 object-contain" />
                <span className="font-sans font-bold text-2xl text-white tracking-tight">Viktron Health</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-md font-light mb-6">
                Pioneering non-invasive cognitive prosthetic hardware and clinical AI copilots. Built to preserve identity, dignity, and relationship continuity for patients facing cognitive decline.
              </p>
            </div>

            {/* Live System Operational Indicator */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-mint)] shadow-[0_0_8px_#3DB894] animate-pulse" />
              <span className="font-mono text-xs text-white/90">
                SYSTEM OPERATIONAL // NPU SILICON ENCLAVE ARMED
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Columns (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div>
              <div className="text-[var(--color-mint)] font-bold uppercase tracking-widest mb-4">
                Architecture
              </div>
              <ul className="space-y-3 text-white/60">
                <li><Link to="/platform" className="hover:text-white transition-colors">AuraPath Smart Glasses</Link></li>
                <li><Link to="/platform" className="hover:text-white transition-colors">AuraGuide Clinical Copilot</Link></li>
                <li><a href="/#simulator-suite" className="hover:text-white transition-colors">Interactive Experience Lab</a></li>
                <li><Link to="/methodology" className="hover:text-white transition-colors">Zero-Cloud NPU Security</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-[var(--color-clay)] font-bold uppercase tracking-widest mb-4">
                Institutional
              </div>
              <ul className="space-y-3 text-white/60">
                <li><button onClick={onRequestDemo} className="hover:text-white transition-colors text-left">Clinical Pilot Intake</button></li>
                <li><Link to="/methodology" className="hover:text-white transition-colors">EHR / FHIR Integration</Link></li>
                <li><Link to="/philosophy" className="hover:text-white transition-colors">Ethics & Dignity Policy</Link></li>
                <li><a href="mailto:clinical-intake@viktronhealth.com" className="hover:text-white transition-colors">Medical Advisory Board</a></li>
              </ul>
            </div>

            <div>
              <div className="text-[var(--color-mint)] font-bold uppercase tracking-widest mb-4">
                Compliance & Legal
              </div>
              <ul className="space-y-3 text-white/60">
                <li><a href="/aurapath/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Privacy Policy <ExternalLink size={11} /></a></li>
                <li><a href="/aurapath/support" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Support & Deletion <ExternalLink size={11} /></a></li>
                <li><span className="text-white/40">HIPAA BAA Compliant</span></li>
                <li><span className="text-white/40">Google ML Kit Telemetry Disclosed</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} Viktron Health Inc. All rights reserved. Registered Clinical Entity.
          </div>
          <div className="flex items-center gap-6">
            <span>AuraPath™</span>
            <span>AuraGuide™</span>
            <span>Zero-Cloud Optical Vectoring</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
