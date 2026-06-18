import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function TreeGrowth() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Create a master timeline pinned to this section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2000', // Forces a long 2000px scroll interaction
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // 1. Seed grows into a sapling
    tl.to('.tree-element', { scale: 2, y: -50, duration: 2 })
      .to('.text-1', { opacity: 1, y: 0, duration: 1 }, '-=1.5')
      
    // 2. Sapling grows into a large tree
      .to('.tree-element', { scale: 5, y: -150, duration: 3 })
      .to('.text-1', { opacity: 0, y: -20, duration: 1 }, '-=2')
      .to('.text-2', { opacity: 1, y: 0, duration: 1 }, '-=1')

    // 3. Tree expands to fill screen, final text reveals
      .to('.tree-element', { scale: 12, opacity: 0.2, duration: 4 })
      .to('.text-2', { opacity: 0, y: -20, duration: 1 }, '-=3')
      .to('.text-3', { opacity: 1, scale: 1.2, duration: 2 }, '-=2');

  }, { scope: containerRef });

  return (
    <section ref={sectionRef} className="h-screen w-full bg-[var(--sage-pale)] flex items-center justify-center overflow-hidden relative">
      <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
        
        {/* Visual Tree Representation (Replace SVG with your actual tree asset) */}
        <div className="tree-element absolute bottom-0 flex flex-col items-center origin-bottom z-0">
          <div className="w-4 h-4 bg-[var(--moss)] rounded-full mb-2"></div>
          <div className="w-1 h-12 bg-[var(--forest)]"></div>
        </div>

        {/* Narrative Text */}
        <div className="z-10 text-center font-display text-[var(--forest)] px-4">
          <h2 className="text-1 opacity-0 translate-y-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-4xl md:text-5xl w-full">
            Among the lush forests of Sigiriya...
          </h2>
          
          <h2 className="text-2 opacity-0 translate-y-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-4xl md:text-5xl w-full">
            we built more than a hostel.
          </h2>
          
          <h1 className="text-3 opacity-0 translate-y-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-6xl md:text-7xl font-bold text-[var(--forest)] w-full">
            We created an <span className="italic text-[var(--moss)]">experience.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}