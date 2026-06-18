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

  // Triple the array to ensure the screen is fully filled during the scroll drag
  const row1Images = [...marqueeImages, ...marqueeImages, ...marqueeImages];
  const row2Images = [...marqueeImages].reverse();
  const row2Doubled = [...row2Images, ...row2Images, ...row2Images];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Responsive GSAP Settings
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      // Top Row moves Left to Right as you scroll down
      gsap.to('.marquee-row-1', {
        // Move less distance on mobile so it doesn't blur past too fast
        xPercent: isMobile ? -15 : -30, 
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Bottom Row moves Right to Left
      gsap.fromTo('.marquee-row-2', 
        { xPercent: isMobile ? -15 : -30 }, 
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

      // Giant background text parallax 
      gsap.to('.bg-outline-text', {
        y: isMobile ? 80 : 150, // Less vertical movement on mobile
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Header entrance animation
      gsap.fromTo('.marquee-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    // overflow-hidden prevents the rotated element from causing horizontal scrollbars
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-black overflow-hidden flex flex-col justify-center min-h-screen">
      
      {/* --- GIANT BACKGROUND TEXT --- */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0 overflow-hidden">
        <h1 
          className="bg-outline-text font-display font-bold text-transparent whitespace-nowrap" 
          style={{ 
            // Adjusted clamp for better mobile text sizing
            fontSize: 'clamp(5rem, 20vw, 25rem)', 
            WebkitTextStroke: '2px var(--sage-light)',
            lineHeight: 1
          }}
        >
          SIGIRIYA
        </h1>
      </div>

      <div className="relative z-10 w-full mb-12 md:mb-16 px-6">
        <div className="marquee-header text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 md:w-10 h-px bg-[var(--sage-light)] opacity-50"></div>
            <p className="text-[var(--sage-light)] font-bold tracking-[0.3em] text-[10px] uppercase">Visual Journey</p>
            <div className="w-8 md:w-10 h-px bg-[var(--sage-light)] opacity-50"></div>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Every Moment, <br className="md:hidden" />
            <span className="italic font-light text-[var(--sage)]">Captured</span>
          </h2>
        </div>
      </div>

      {/* --- THE SCROLLING MARQUEES --- */}
      {/* We increase the scale slightly on mobile (scale-[1.15]) to hide the rotated edges */}
      <div className="relative z-10 w-full scale-[1.15] md:scale-110 -rotate-6 md:-rotate-2 flex flex-col gap-4 md:gap-10">
        
        {/* TOP ROW */}
        <div className="flex overflow-hidden">
          <div className="marquee-row-1 flex gap-4 md:gap-10 w-max">
            {row1Images.map((img, i) => (
              <MarqueeCard key={`row1-${i}`} img={img} />
            ))}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex overflow-hidden">
          <div className="marquee-row-2 flex gap-4 md:gap-10 w-max">
            {row2Doubled.map((img, i) => (
              <MarqueeCard key={`row2-${i}`} img={img} />
            ))}
          </div>
        </div>

      </div>

      {/* Subtle fade edges to blend into the black background */}
      <div className="absolute inset-y-0 left-0 w-2/12 md:w-1/12 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-2/12 md:w-1/12 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

    </section>
  );
}

/** * Reusable Card Component with Glassmorphic Hover 
 * Adjusted sizing using tailwind responsive prefixes
 */
function MarqueeCard({ img }) {
  return (
    <div className="relative flex-shrink-0 w-52 h-32 md:w-[400px] md:h-[250px] rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl bg-[var(--forest)]">
      <img
        src={img.src}
        alt={img.label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
      
      {/* Interactive Vignette/Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 md:opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
      
      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-end justify-between md:translate-y-4 group-hover:translate-y-0 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="font-display text-xl md:text-3xl font-bold text-white tracking-wide leading-none">{img.label}</span>
        
        {/* Hidden on very small screens to save space, visible on medium+ */}
        <div className="hidden md:flex w-8 h-8 rounded-full bg-[var(--sage)]/30 backdrop-blur-md items-center justify-center border border-white/20">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  );
}