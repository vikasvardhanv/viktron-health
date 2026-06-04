import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Philosophy() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.phil-reveal', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    );
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-4xl mx-auto">
      <h2 className="phil-reveal font-sans text-xl md:text-2xl text-[var(--color-muted-foreground)] font-light leading-relaxed mb-8">
        Most memory care tech focuses on passive tracking and containment.
      </h2>
      <h1 className="phil-reveal font-display text-6xl md:text-[6rem] tracking-tight leading-[0.95] text-[var(--color-foreground)]">
        We focus on <span className="text-[var(--color-accent)] italic">cognitive preservation.</span>
      </h1>
    </div>
  );
}
