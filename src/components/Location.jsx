import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Using elegant, modern React Icons
import { FiMapPin, FiCompass, FiSun } from 'react-icons/fi';
import { MdOutlineFlight, MdMuseum, MdOutlineLandscape } from 'react-icons/md';
import { TbBuildingMonument, TbTrees } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const stops = [
  { label: 'Sigiriya Airport', sub: '10 km away', icon: <MdOutlineFlight size={22} />, y: 15 },
  { label: 'Dambulla', sub: '19 km · Cave Temple', icon: <MdMuseum size={22} />, y: 32 },
  { label: 'Sigiriya Rock', sub: '1.3 km · UNESCO Site', icon: <TbBuildingMonument size={22} />, y: 52 },
  { label: 'Pidurangala Rock', sub: '3.9 km · Sunrise Hike', icon: <MdOutlineLandscape size={22} />, y: 68 },
  { label: 'Tree House & Villa', sub: 'Your Destination', icon: <FiMapPin size={22} />, y: 85 },
];

const nearby = [
  { place: 'Sigiriya Rock', dist: '1.3 km', icon: <TbBuildingMonument size={20} /> },
  { place: 'Sigiriya Museum', dist: '2.4 km', icon: <MdMuseum size={20} /> },
  { place: 'Pidurangala Rock', dist: '3.9 km', icon: <MdOutlineLandscape size={20} /> },
  { place: 'Sigiriya Wewa Lake', dist: '1.4 km', icon: <TbTrees size={20} /> },
];

export default function Location() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();
    
    // Hide the path initially
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    // Hide all stops initially
    gsap.set('.stop-dot', { scale: 0 });
    gsap.set('.stop-text-right', { x: -30, opacity: 0 });
    gsap.set('.stop-text-left', { x: 30, opacity: 0 });

    // Create a MASTER timeline attached to the scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 70%',
        scrub: 1, // Smooth scrubbing
      }
    });

    // 1. Draw the line over a duration of 1 (represents 0% to 100% of the timeline)
    tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);

    // 2. Synchronize the stops perfectly with the line
    stops.forEach((stop, i) => {
      // If stop is at 15% (y: 15), it triggers at 0.15s on the 1s timeline
      const triggerTime = stop.y / 100; 

      // Pop the dot
      tl.to(`.stop-dot-${i}`, 
        { scale: 1, duration: 0.1, ease: 'back.out(2)' }, 
        triggerTime
      );

      // Slide in the text
      const textClass = i % 2 === 0 ? '.stop-text-left' : '.stop-text-right';
      tl.to(`.stop-${i} ${textClass}`, 
        { x: 0, opacity: 1, duration: 0.15, ease: 'power2.out' }, 
        triggerTime
      );
    });

    // Left Content reveal (Independent of the map timeline)
    gsap.fromTo('.location-info > *',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-[var(--warm-white)] relative overflow-hidden" id="location">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: INFORMATION PANEL --- */}
          <div className="location-info">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[var(--sage)] opacity-50"></div>
              <p className="text-[var(--sage)] font-bold tracking-[0.2em] text-xs uppercase">Location & Getting Here</p>
            </div>
            
            <h2 className="font-display text-5xl md:text-6xl font-bold text-[var(--forest)] mb-6 leading-tight">
              Find Your Way <br />
              <span className="italic font-light text-[var(--moss)]">To Paradise</span>
            </h2>
            
            <p className="text-[var(--stone)] text-lg mb-10 leading-relaxed max-w-md">
              Nestled at No. 186, Pidurangala, Sigiriya — completely surrounded by nature, yet just minutes from Sri Lanka's most iconic historical sites.
            </p>

            {/* Address Glass Card */}
            <div className="p-8 rounded-3xl bg-white shadow-[0_10px_40px_-15px_rgba(44,74,59,0.1)] border border-[var(--sage-pale)] mb-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--sage-pale)] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[var(--sage-light)] transition-colors duration-500"></div>
              
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[var(--forest)] flex items-center justify-center flex-shrink-0 text-[var(--sage-pale)] shadow-lg">
                  <FiCompass size={24} />
                </div>
                <div>
                  <p className="font-display font-bold text-xl text-[var(--forest)] mb-1">No 186, Pidurangala</p>
                  <p className="text-[var(--stone)] text-sm mb-4">Sigiriya 21120, Sri Lanka</p>
                  <a
                    href="https://search.brave.com/search?q=tree+house+sigiriya&map_src=i"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--sage-pale)] text-[var(--forest)] text-sm font-semibold hover:bg-[var(--sage)] hover:text-white transition-all duration-300"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Nearby Attractions Grid */}
            <h3 className="font-display text-2xl font-bold text-[var(--forest)] mb-5">Nearby Attractions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearby.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--sage-pale)] border border-[var(--sage)]/20 hover:border-[var(--sage)] transition-colors duration-300">
                  <div className="text-[var(--forest)] p-2 bg-white rounded-lg shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--forest)]">{item.place}</p>
                    <p className="font-sans text-xs text-[var(--moss)] font-medium mt-0.5">{item.dist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: ANIMATED JOURNEY MAP --- */}
          <div className="relative w-full flex justify-center">
            
            <div className="relative w-full max-w-md rounded-[2.5rem] p-8 border border-[var(--sage-pale)] bg-white shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>

              {/* Premium Topographic SVG Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='2' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0' in='noise' result='coloredNoise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              ></div>

              {/* Central Map Tracker Line SVG */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute left-1/2 -translate-x-1/2 w-4 h-[85%] top-[7.5%]">
                {/* Background dashed line (Track) */}
                <line x1="50" y1="0" x2="50" y2="100" stroke="var(--sage-pale)" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Foreground drawing line */}
                <line 
                  ref={pathRef}
                  x1="50" y1="0" x2="50" y2="100" 
                  stroke="var(--forest)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
              </svg>

              {/* Dynamically Placed Stops */}
              <div className="relative w-full h-full mt-[5%]">
                {stops.map((stop, i) => (
                  <div
                    key={i}
                    className={`stop-${i} absolute w-full flex items-center`}
                    style={{ top: `${stop.y}%`, transform: 'translateY(-50%)' }}
                  >
                    {i % 2 === 0 ? (
                      /* Stop Text on the Left */
                      <div className="w-full flex items-center justify-center relative">
                        <div className="stop-text-left absolute right-[55%] flex flex-col items-end text-right w-48 pr-4">
                          <div className={`p-2 rounded-xl mb-2 ${i === stops.length - 1 ? 'bg-[var(--forest)] text-[var(--sage-pale)]' : 'bg-[var(--sage-pale)] text-[var(--forest)]'}`}>
                            {stop.icon}
                          </div>
                          <p className={`text-sm font-bold ${i === stops.length - 1 ? 'text-[var(--forest)] text-base' : 'text-[var(--forest)]'}`}>{stop.label}</p>
                          <p className="text-xs text-[var(--stone)] mt-1">{stop.sub}</p>
                        </div>
                        {/* The animated Dot */}
                        <div className={`stop-dot stop-dot-${i} w-5 h-5 rounded-full border-4 border-white shadow-md z-10 ${i === stops.length - 1 ? 'bg-[var(--forest)] w-6 h-6' : 'bg-[var(--sage)]'}`} />
                      </div>
                    ) : (
                      /* Stop Text on the Right */
                      <div className="w-full flex items-center justify-center relative">
                        {/* The animated Dot */}
                        <div className={`stop-dot stop-dot-${i} w-5 h-5 rounded-full border-4 border-white shadow-md z-10 ${i === stops.length - 1 ? 'bg-[var(--forest)] w-6 h-6' : 'bg-[var(--sage)]'}`} />
                        
                        <div className="stop-text-right absolute left-[55%] flex flex-col items-start text-left w-48 pl-4">
                          <div className={`p-2 rounded-xl mb-2 ${i === stops.length - 1 ? 'bg-[var(--forest)] text-[var(--sage-pale)]' : 'bg-[var(--sage-pale)] text-[var(--forest)]'}`}>
                            {stop.icon}
                          </div>
                          <p className={`text-sm font-bold ${i === stops.length - 1 ? 'text-[var(--forest)] text-base' : 'text-[var(--forest)]'}`}>{stop.label}</p>
                          <p className="text-xs text-[var(--stone)] mt-1">{stop.sub}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}