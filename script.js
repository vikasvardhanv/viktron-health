// Wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // GSAP Cinematic Entrance Sequence
  const introTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

  // 1. Initial State Setups
  gsap.set("nav", { y: -80, opacity: 0 });
  gsap.set(".portal-title-area span", { y: 20, opacity: 0 });
  gsap.set(".portal-title-area h1", { y: 30, opacity: 0, filter: "blur(5px)" });
  gsap.set(".card-auraguide", { x: -80, opacity: 0, rotateY: -15 });
  gsap.set(".card-aurapath", { x: 80, opacity: 0, rotateY: 15 });
  gsap.set(".portal-img", { scale: 0.8, opacity: 0 });
  gsap.set(".scroll-indicator", { y: 20, opacity: 0 });

  // 2. Play Entrance Sequence
  introTimeline
    .to("nav", { y: 0, opacity: 1, duration: 1.2 })
    .to(".portal-title-area span", { y: 0, opacity: 1, duration: 0.8 }, "-=0.8")
    .to(".portal-title-area h1", { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 }, "-=0.6")
    .to([".card-auraguide", ".card-aurapath"], {
      x: 0,
      opacity: 1,
      rotateY: 0,
      duration: 1.6,
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

  // Ambient Floating Highlight Loop for Images
  gsap.to(".portal-img", {
    y: -10,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Dynamic Mouse Tracking (Spotlight Glow & Parallax 3D Tilt)
  const cards = document.querySelectorAll(".portal-card");
  const ambientGlowLime = document.querySelector(".glow-lime");
  const ambientGlowEmerald = document.querySelector(".glow-emerald");

  // Track global mouse position for ambient backgrounds
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Smoothly shift the ambient spotlights towards the cursor
    gsap.to(ambientGlowLime, {
      x: mouseX - window.innerWidth / 3,
      y: mouseY - window.innerHeight / 3,
      duration: 2.5,
      ease: "power2.out"
    });

    gsap.to(ambientGlowEmerald, {
      x: mouseX - (window.innerWidth * 2) / 3,
      y: mouseY - (window.innerHeight * 2) / 3,
      duration: 2.5,
      ease: "power2.out"
    });
  });

  // Apply individual card 3D tilt effects
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      
      // Calculate relative x and y inside the card (from 0 to width/height)
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for radial spotlight glow inside the card
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      // Normalize position (-0.5 to 0.5)
      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;

      // Maximum degrees to tilt
      const maxTilt = 12;

      // Tilt the card
      gsap.to(card, {
        rotateX: -normY * maxTilt,
        rotateY: normX * maxTilt,
        transformPerspective: 1200,
        ease: "power2.out",
        duration: 0.3
      });

      // Shift the image slightly in the opposite direction (Parallax effect)
      const img = card.querySelector(".portal-img");
      if (img) {
        gsap.to(img, {
          x: normX * 25,
          y: normY * 25,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.3
        });
      }
    });

    // Reset card transformations on mouse leave
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
        duration: 0.8
      });

      const img = card.querySelector(".portal-img");
      if (img) {
        gsap.to(img, {
          x: 0,
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.8
        });
      }
    });
  });

  // Smooth scroll links
  const scrollIndicator = document.getElementById("scroll-to-innovation");
  const innovationLink = document.querySelector('a[href="#innovation"]');
  const targetSection = document.getElementById("innovation");

  const scrollToSection = (e) => {
    e.preventDefault();
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", scrollToSection);
  }
  if (innovationLink) {
    innovationLink.addEventListener("click", scrollToSection);
  }

  // Bento Cards Entrance Animations on Scroll
  if (window.gsap && window.ScrollTrigger) {
    gsap.from(".bento-item", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 85%"
      }
    });
  } else {
    // Simple fallback if ScrollTrigger isn't loaded (e.g. static pages)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".bento-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = 1;
                item.style.transform = "translateY(0)";
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const grid = document.querySelector(".bento-grid");
    if (grid) {
      const items = grid.querySelectorAll(".bento-item");
      items.forEach((item) => {
        item.style.opacity = 0;
        item.style.transform = "translateY(30px)";
        item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      });
      observer.observe(grid);
    }
  }
});
