import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 9 Images total to fill 3 perfectly balanced columns
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1546708770-599a3abdf230?w=800&q=80', alt: 'Sigiriya Rock', height: 'h-[400px]' },
  { src: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&q=80', alt: 'Tree House', height: 'h-[500px]' },
  { src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', alt: 'Elephants Safari', height: 'h-[350px]' },
  { src: 'https://images.unsplash.com/photo-1566555370-0af84e3001ef?w=800&q=80', alt: 'Pidurangala Sunrise', height: 'h-[450px]' },
  { src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', alt: 'Sri Lankan Food', height: 'h-[350px]' },
  { src: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=800&q=80', alt: 'Jungle Path', height: 'h-[550px]' },
  { src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', alt: 'Village Cycling', height: 'h-[400px]' },
  { src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80', alt: 'Nature Details', height: 'h-[450px]' },
  { src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80', alt: 'Forest Canopy', height: 'h-[350px]' },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    // Background Parallax (Works on all screen sizes)
    gsap.to(bgRef.current, {
      yPercent: 20, // Slowly glides downwards
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // We use MatchMedia to ensure complex parallax only happens on larger screens.
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // DESKTOP ANIMATIONS
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', 
          end: 'bottom top',   
          scrub: 1,            // 1 second smoothing
        }
      });

      // Left column moves UP rapidly
      tl.to('.col-1', { yPercent: -30, ease: 'none' }, 0);
      // Middle column moves DOWN
      tl.to('.col-2', { yPercent: 25, ease: 'none' }, 0);
      // Right column moves UP even faster
      tl.to('.col-3', { yPercent: -40, ease: 'none' }, 0);

      // Fade and blur the center title as you scroll deep into the gallery
      gsap.to('.sticky-title', {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: true,
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE ANIMATIONS (Smooth Staggered Fade Up)
      gsap.fromTo('.gallery-card', 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    // Replaced solid background with a dark base to support the overlay
    <section ref={sectionRef} id="gallery" className="relative w-full h-[180vh] bg-black overflow-hidden">
      
      {/* --- NEW: CINEMATIC BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none">
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80"
          alt="Deep Jungle Canopy"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Dark gradient overlay so the gallery images pop and remain the focal point */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C4A3B]/90 via-[#2C4A3B]/40 to-black/95"></div>
      </div>

      {/* 1. STICKY CENTER TITLE */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-20 px-6 sticky-title">
        <div className="bg-[var(--sage-pale)]/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full mb-6 shadow-2xl">
          <p className="text-[var(--sage-light)] tracking-[0.3em] uppercase text-xs font-bold">Visual Journey</p>
        </div>
        <h2 className="font-display text-6xl md:text-8xl lg:text-[8rem] font-bold text-white text-center drop-shadow-2xl leading-[0.9]">
          Lost in the <br />
          <span className="italic font-light text-[var(--sage)]">Jungle</span>
        </h2>
      </div>

      {/* 2. PARALLAX COLUMNS CONTAINER */}
      <div className="absolute top-0 left-0 w-full h-full z-10 px-4 md:px-10 py-32 pointer-events-auto">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 h-full">
          
          {/* COLUMN 1 (Goes UP) */}
          <div className="col-1 flex flex-col gap-6 md:gap-10 md:mt-24">
            {galleryImages.slice(0, 3).map((img, i) => (
              <ImageCard key={`c1-${i}`} img={img} />
            ))}
          </div>

          {/* COLUMN 2 (Goes DOWN) */}
          <div className="col-2 flex flex-col gap-6 md:gap-10 md:-mt-32">
            {galleryImages.slice(3, 6).map((img, i) => (
              <ImageCard key={`c2-${i}`} img={img} />
            ))}
          </div>

          {/* COLUMN 3 (Goes UP Fast) */}
          <div className="col-3 flex flex-col gap-6 md:gap-10 md:mt-48">
            {galleryImages.slice(6, 9).map((img, i) => (
              <ImageCard key={`c3-${i}`} img={img} />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}

/** * Reusable Image Card Component 
 * Handles the beautiful hover effects and UI overlay 
 */
function ImageCard({ img }) {
  return (
    <div className={`gallery-card group relative w-full ${img.height} rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer bg-white/5 border border-white/10`}>
      {/* Image with slow zoom on hover */}
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      
      {/* Dark gradient that appears on hover to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Label that slides up on hover */}
      <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-white font-display text-2xl font-bold tracking-wide">{img.alt}</p>
        <div className="w-10 h-1 bg-[var(--sage)] mt-3"></div>
      </div>
    </div>
  );
}