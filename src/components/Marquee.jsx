import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const marqueeImages = [
  { src: 'https://images.unsplash.com/photo-1546708770-599a3abdf230?w=600&q=80', label: 'Sigiriya Rock' },
  { src: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=600&q=80', label: 'Tree House' },
  { src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', label: 'Safari' },
  { src: 'https://images.unsplash.com/photo-1566555370-0af84e3001ef?w=600&q=80', label: 'Sunrise' },
  { src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', label: 'Cuisine' },
  { src: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=600&q=80', label: 'Nature' },
  { src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80', label: 'Village' },
  { src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80', label: 'Forest' },
];

export default function Marquee() {
  const sectionRef = useRef(null);

  // We triple the array to ensure the screen is fully filled during the scroll drag
  const row1Images = [...marqueeImages, ...marqueeImages, ...marqueeImages];
  const row2Images = [...marqueeImages].reverse();
  const row2Doubled = [...row2Images, ...row2Images, ...row2Images];

  useGSAP(() => {
    // 1. Top Row moves Left to Right as you scroll down
    gsap.to('.marquee-row-1', {
      xPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5, // 1.5s smoothing on the scrub
      }
    });

    // 2. Bottom Row moves Right to Left (starts off-center and moves to 0)
    gsap.fromTo('.marquee-row-2', 
      { xPercent: -30 }, 
      {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      }
    );

    // 3. Giant background text parallax (moves opposite to the scroll)
    gsap.to('.bg-outline-text', {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 4. Header entrance animation
    gsap.fromTo('.marquee-header > *',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-32 bg-black overflow-hidden flex flex-col justify-center min-h-screen">
      
      {/* --- GIANT BACKGROUND TEXT --- */}
      {/* Uses standard CSS Webkit text stroke for the premium hollow outline look */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0 overflow-hidden">
        <h1 
          className="bg-outline-text font-display font-bold text-transparent whitespace-nowrap" 
          style={{ 
            fontSize: 'clamp(8rem, 20vw, 25rem)', 
            WebkitTextStroke: '2px var(--sage-light)',
            lineHeight: 1
          }}
        >
          SIGIRIYA
        </h1>
      </div>

      <div className="relative z-10 w-full mb-16 px-6">
        <div className="marquee-header text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-px bg-[var(--sage-light)] opacity-50"></div>
            <p className="text-[var(--sage-light)] font-bold tracking-[0.3em] text-[10px] uppercase">Visual Journey</p>
            <div className="w-10 h-px bg-[var(--sage-light)] opacity-50"></div>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Every Moment, <span className="italic font-light text-[var(--sage)]">Captured</span>
          </h2>
        </div>
      </div>

      {/* --- THE SCROLLING MARQUEES --- */}
      {/* Container is scaled up and rotated for that aggressive, dynamic award-winning look */}
      <div className="relative z-10 w-full scale-110 -rotate-3 md:-rotate-2 flex flex-col gap-6 md:gap-10">
        
        {/* TOP ROW */}
        <div className="flex overflow-hidden">
          <div className="marquee-row-1 flex gap-6 md:gap-10 w-max">
            {row1Images.map((img, i) => (
              <MarqueeCard key={`row1-${i}`} img={img} />
            ))}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex overflow-hidden">
          <div className="marquee-row-2 flex gap-6 md:gap-10 w-max">
            {row2Doubled.map((img, i) => (
              <MarqueeCard key={`row2-${i}`} img={img} />
            ))}
          </div>
        </div>

      </div>

      {/* Subtle fade edges to blend into the black background */}
      <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

    </section>
  );
}

/** 
 * Reusable Card Component with Glassmorphic Hover 
 */
function MarqueeCard({ img }) {
  return (
    <div className="relative flex-shrink-0 w-64 h-40 md:w-[400px] md:h-[250px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl bg-[var(--forest)]">
      <img
        src={img.src}
        alt={img.label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
      
      {/* Interactive Vignette/Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
      
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide leading-none">{img.label}</span>
        <div className="w-8 h-8 rounded-full bg-[var(--sage)]/30 backdrop-blur-md flex items-center justify-center border border-white/20">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  );
}