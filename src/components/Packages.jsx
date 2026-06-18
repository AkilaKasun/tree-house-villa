import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Premium minimalist icons
import { FiSun, FiCamera, FiStar, FiUsers, FiCheck } from 'react-icons/fi';
import { TbMountain, TbBike } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'Sunrise Pidurangala',
    tagline: 'The most memorable morning of your trip',
    price: '$25',
    duration: 'Half Day',
    includes: ['Professional Guide', 'Transport to Rock', 'Breakfast on Return', 'Photography Spots'],
    icon: <FiSun size={28} />,
    color: '#C9A84C', // Gold
    image: 'https://images.unsplash.com/photo-1566555370-0af84e3001ef?w=600&q=80',
  },
  {
    name: 'Jungle Safari',
    tagline: 'Expert-led safari by your host Rohan',
    price: '$45',
    duration: 'Full Day',
    includes: ['Jeep Safari', 'Elephant Spotting', 'National Park Entry', 'Packed Lunch'],
    icon: <FiCamera size={28} />,
    color: '#A8C5A0', // Sage Light
    popular: true,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80',
  },
  {
    name: 'Sigiriya Royale',
    tagline: 'Step into ancient history',
    price: '$35',
    duration: 'Half Day',
    includes: ['Sigiriya Rock Climb', 'Museum Visit', 'Local Guide', 'Water & Snacks'],
    icon: <TbMountain size={28} />,
    color: '#E3EAD8', // Sage Pale
    image: 'https://images.unsplash.com/photo-1546708770-599a3abdf230?w=600&q=80',
  },
  {
    name: 'Village Immersion',
    tagline: 'Live like a local for a day',
    price: '$30',
    duration: 'Full Day',
    includes: ['Cooking Class with Prasadi', 'Bike Rental', 'Village Walk', 'Local Lunch'],
    icon: <TbBike size={28} />,
    color: '#A8C5A0', 
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80',
  },
  {
    name: 'Starlight Package',
    tagline: 'Romantic nights under jungle stars',
    price: '$85',
    duration: '2 Nights',
    includes: ['Tree House Room', 'Safari Tour', 'Sunrise Hike', 'Airport Transfer'],
    icon: <FiStar size={28} />,
    color: '#C9A84C',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
  },
  {
    name: 'Family Adventure',
    tagline: 'Memories for the whole family',
    price: '$120',
    duration: '3 Days',
    includes: ['Family Villa', 'Safari', 'Rock Climbing', 'Cooking Class', 'Cycling Tour'],
    icon: <FiUsers size={28} />,
    color: '#E3EAD8',
    image: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=600&q=80',
  },
];

export default function Packages() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    // 1. Cinematic Background Parallax
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 2. Header Reveal
    gsap.fromTo('.packages-header > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    // 3. Staggered Entrance for the Grid Cards
    gsap.fromTo('.flip-card-container',
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.packages-grid',
          start: 'top 80%',
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full pb-32 pt-24 bg-black font-sans" id="packages">
      
      {/* --- CINEMATIC PARALLAX BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-[130%] -top-[15%] z-0 pointer-events-none overflow-hidden">
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1572445271230-a78c84f32491?w=1920&q=80"
          alt="Dark Jungle Leaves"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--warm-white)] via-black/80 to-[var(--forest)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="packages-header text-center mb-20 mt-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[var(--sage-light)] opacity-50"></div>
            <p className="text-[var(--sage-light)] font-bold tracking-[0.3em] text-xs uppercase">Curated Adventures</p>
            <div className="w-12 h-px bg-[var(--sage-light)] opacity-50"></div>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Experience <span className="italic font-light text-[var(--sage-light)]">More</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
            Hover or tap to explore packages personally crafted by Rohan & Prasadi — your hosts who know the hidden secrets of Sigiriya better than anyone.
          </p>
        </div>

        {/* --- 3D FLIP CARD GRID --- */}
        <div className="packages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            
            // The 3D Perspective Container
            <div key={i} className="flip-card-container group h-[450px] w-full [perspective:1000px] cursor-pointer">
              
              {/* The Inner Card (Flips on Hover) */}
              <div className="relative h-full w-full rounded-[2.5rem] transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl">

                {/* --- FRONT OF CARD --- */}
                <div className="absolute inset-0 h-full w-full rounded-[2.5rem] [backface-visibility:hidden] overflow-hidden bg-black">
                  
                  {/* Background Image */}
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Dark Vignette Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50"></div>

                  {/* Most Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-[#C9A84C] to-[#E3C575] text-black px-4 py-1.5 rounded-full font-bold text-[10px] tracking-widest shadow-lg">
                      POPULAR
                    </div>
                  )}

                  {/* Center Content (Icon & Title) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center mt-12">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-md border border-white/20 transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${pkg.color}30`, color: '#FFFFFF' }}
                    >
                      {pkg.icon}
                    </div>
                    <h3 className="font-display text-4xl font-bold text-white drop-shadow-lg leading-tight mb-2">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-8 left-0 w-full text-center">
                    <p className="text-[var(--sage-light)] text-xs tracking-[0.2em] uppercase font-bold">
                      Flip for Details ⟳
                    </p>
                  </div>
                </div>

                {/* --- BACK OF CARD --- */}
                {/* rotateY(180deg) hides it until the container flips */}
                <div className="absolute inset-0 h-full w-full rounded-[2.5rem] [transform:rotateY(180deg)] [backface-visibility:hidden] border border-white/10 flex flex-col p-8"
                     style={{ backgroundColor: 'rgba(44, 74, 59, 0.95)', backdropFilter: 'blur(20px)' }}>
                  
                  <div className="flex items-end justify-between mb-6 pb-6 border-b border-white/10">
                    <div>
                      <p className="text-[var(--sage-light)] text-xs tracking-widest uppercase font-semibold mb-1">{pkg.duration}</p>
                      <h3 className="font-display text-2xl font-bold text-white leading-none">{pkg.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-3xl font-bold text-white">{pkg.price}</span>
                    </div>
                  </div>

                  <p className="text-white/90 text-sm font-light italic mb-6">
                    "{pkg.tagline}"
                  </p>
                  
                  {/* Includes List */}
                  <div className="flex-grow">
                    <p className="text-[var(--sage-light)] text-[10px] tracking-widest uppercase font-bold mb-4">What's Included:</p>
                    <ul className="space-y-3">
                      {pkg.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <FiCheck className="text-[var(--sage-light)] mt-0.5 flex-shrink-0" size={14} />
                          <span className="text-white/80 font-medium text-sm leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Button */}
                  <a
                    href="https://www.booking.com/hotel/lk/sigiri-free-view-tree-house.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-full bg-white text-[var(--forest)] font-bold tracking-wide text-center hover:bg-[var(--sage-pale)] transition-colors mt-auto text-sm"
                  >
                    Book Experience
                  </a>

                </div>
              </div>
            </div>

          ))}
        </div>

      </div>
    </section>
  );
}