import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    // Kill all ScrollTriggers BEFORE the route change renders new content.
    // useLayoutEffect fires synchronously after DOM mutation but BEFORE
    // the browser paints — this ensures pinned sections are released
    // before React starts unmounting the old page component.
    ScrollTrigger.getAll().forEach(st => {
      try { st.kill(); } catch (_) { /* already destroyed */ }
    });
    // Scroll to top after killing pins (avoids stuck fixed-position sections)
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative w-full min-h-screen flex flex-col font-sans selection:bg-[var(--color-accent)] selection:text-white">
      <div className="noise"></div>
      <Navbar />
      <main className="flex-1 w-full pt-32 md:pt-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/viktron-health-logo.png" alt="Viktron Health" className="w-8 h-8 object-contain group-hover:opacity-80 transition-opacity" />
          <span className="font-medium tracking-tight text-xl">Viktron</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-[var(--color-muted-foreground)]">
          <Link to="/platform" className="hover:text-[var(--color-foreground)] transition-colors">Platform</Link>
          <Link to="/philosophy" className="hover:text-[var(--color-foreground)] transition-colors">Philosophy</Link>
          <Link to="/methodology" className="hover:text-[var(--color-foreground)] transition-colors">Methodology</Link>
        </nav>
        <Link to="/platform" className="bg-[var(--color-foreground)] text-[var(--color-surface)] hover:bg-[var(--color-foreground)]/90 px-6 py-2.5 rounded-full text-sm font-medium transition-transform active:scale-95 shadow-sm">
          Request Demo
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-16 mt-auto z-10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <img src="/viktron-health-logo.png" alt="Viktron Health" className="w-6 h-6 object-contain" />
            <span className="font-medium tracking-tight text-lg">ViktronHealth</span>
          </Link>
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            Clinical AI copilots and memory prosthetics designed for edge inference. We restore cognitive agency securely, without cloud dependencies.
          </p>
        </div>

        <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-4">
            <span className="font-medium text-[var(--color-foreground)]">Ecosystem</span>
            <Link to="/platform" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">AuraGuide</Link>
            <Link to="/platform" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">AuraPath</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-medium text-[var(--color-foreground)]">Company</span>
            <Link to="/philosophy" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">Philosophy</Link>
            <Link to="/methodology" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">Methodology</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}