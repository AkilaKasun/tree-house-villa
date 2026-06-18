import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Premium Icons
import { FaStar } from 'react-icons/fa';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// Reliable, high-resolution Unsplash images for the jungle vibe
const HERO_BG = 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1920&q=85';

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const scrollArrowRef = useRef(null);

  useGSAP(() => {
    // --- 1. INITIAL LOAD ANIMATION ---
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.hero-badge',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero-text-reveal',
      { y: 80, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' },
      '-=0.4'
    )
    .fromTo('.hero-cta',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-footer',
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      '-=0.5'
    );

    // Bouncing scroll indicator
    gsap.to(scrollArrowRef.current, {
      y: 15,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // --- 2. CINEMATIC SCROLL ANIMATION ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1, // Smooth scrubbing
      }
    });

    // Background zooms in and blurs slightly to create depth
    scrollTl.to(bgRef.current, { 
      scale: 1.15, 
      filter: 'blur(8px)',
      ease: 'none' 
    }, 0);

    // Content pushes up, shrinks slightly, and fades out
    scrollTl.to(contentRef.current, { 
      yPercent: -40, 
      scale: 0.9,
      opacity: 0, 
      ease: 'none' 
    }, 0);

  }, { scope: sectionRef });

  return (
    // section height is 200vh to allow room for the scroll scrub animation
    <section ref={sectionRef} className="relative h-[150vh] bg-black font-sans" id="home">
      
      {/* STICKY CONTAINER - Holds the view in place while scrolling down */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Cinematic Background Image */}
        <div ref={bgRef} className="absolute inset-0 w-full h-full origin-center">
          <img
            src={HERO_BG}
            alt="Sigiriya Jungle Canopy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Premium Gradients for Text Readability & Mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C4A3B]/60 via-[#2C4A3B]/30 to-black/90 z-10" />
        
        {/* Subtle Noise Texture overlay */}
        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* --- MAIN CONTENT --- */}
        <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20 flex flex-col items-center md:items-start text-center md:text-left">
          
          {/* Glassmorphic Rating Badge */}
          <div className="hero-badge mb-8 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="flex gap-1 text-[#C9A84C]">
              <FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} />
            </div>
            <div className="w-px h-4 bg-white/30 mx-1"></div>
            <span className="font-sans text-xs font-bold text-white tracking-widest uppercase">9.5/10 Wonderful</span>
          </div>

          {/* Typography */}
          <div className="perspective-[1000px]">
            <p className="hero-text-reveal font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-[#A8C5A0] font-bold mb-4">
              Sigiriya, Sri Lanka
            </p>
          </div>
          
          <div className="perspective-[1000px] overflow-hidden">
            <h1 className="hero-text-reveal font-display text-6xl md:text-8xl lg:text-[8rem] font-bold text-white leading-[0.95] drop-shadow-2xl">
              Sleep Above
            </h1>
          </div>
          <div className="perspective-[1000px] overflow-hidden mb-8">
            <h1 className="hero-text-reveal font-display text-6xl md:text-8xl lg:text-[8rem] font-bold leading-[0.95]">
              <span className="italic font-light text-[#E3EAD8] drop-shadow-2xl">The Jungle.</span>
            </h1>
          </div>

          <div className="perspective-[1000px]">
            <p className="hero-text-reveal font-sans text-lg md:text-xl text-white/80 max-w-xl mb-12 leading-relaxed font-light">
              Wake up to birdsong, morning mist, and the ancient silhouette of Sigiriya Rock just 1.3 km from your window.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <a
              href="https://www.booking.com/hotel/lk/sigiri-free-view-tree-house.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta flex items-center gap-3 px-8 py-4 rounded-full bg-[#A8C5A0] text-[#2C4A3B] font-bold tracking-wide hover:scale-105 hover:shadow-[0_0_20px_rgba(168,197,160,0.4)] transition-all duration-300"
            >
              Book Your Stay
              <FiArrowRight size={18} />
            </a>
            <a 
              href="#rooms" 
              className="hero-cta px-8 py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Explore the Villa ↓
            </a>
          </div>

        </div>

        {/* --- FOOTER ELEMENTS --- */}
        <div className="hero-footer absolute bottom-10 left-0 w-full px-6 flex justify-between items-end z-20 max-w-7xl mx-auto left-1/2 -translate-x-1/2">
          
          {/* Location Details (Hidden on small screens for cleaner UI) */}
          <div className="hidden md:flex items-center gap-3 text-white/60 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <FiMapPin size={16} className="text-[#A8C5A0]" />
            <span className="font-sans text-xs tracking-widest uppercase">No 186, Pidurangala, Sigiriya</span>
          </div>

          {/* Scroll Hint */}
          <div className="flex flex-col items-center gap-3 mx-auto md:mx-0 md:ml-auto">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#A8C5A0] font-bold">Scroll to Explore</span>
            <div ref={scrollArrowRef} className="w-[2px] h-12 bg-gradient-to-b from-[#A8C5A0] to-transparent" />
          </div>
          
        </div>
      </div>
    </section>
  );
}