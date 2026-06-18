import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Premium Icons
import { FaStar } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { name: 'Seth', country: '🇺🇸 USA', rating: 10, text: 'Breakfast was a TON of food — so much variety! The family is incredibly helpful with logistics.', stay: 'Tree House Room', avatar: 'S' },
  { name: 'Kathryn', country: '🇺🇸 USA', rating: 10, text: 'Owner runs safaris himself. Chalet room has good AC and was spotless.', stay: 'Chalet Room', avatar: 'K' },
  { name: 'Teddy', country: '🇺🇸 USA', rating: 9, text: 'So fun to sleep in the tree house. Waking up to the sounds of birds was magical.', stay: 'Tree House', avatar: 'T' },
  { name: 'Madeline', country: '🇦🇺 AUS', rating: 10, text: 'Cooking class with Presida was the best food of our trip. Incredible stay.', stay: 'Villa', avatar: 'M' },
  { name: 'Joanne', country: '🇨🇭 CHE', rating: 10, text: 'Organized great safari tours nearby. Food was delicious and hosts were kind.', stay: 'Family Room', avatar: 'J' },
  { name: 'Phil', country: '🇦🇺 AUS', rating: 10, text: 'Amazing knowledge of the area. Comfortable beds and a lovely terrace.', stay: 'Villa', avatar: 'P' },
];

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} size={12} className={i < count / 2 ? 'text-[#C9A84C]' : 'text-white/20'} />
      ))}
    </div>
  );
}

// Reusable component for the inner content of a review card
function ReviewContent({ r }) {
  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#7A9E7E] flex items-center justify-center font-display text-lg font-bold text-white flex-shrink-0 shadow-inner">
          {r.avatar}
        </div>
        <div>
          <p className="font-display text-lg text-white font-bold leading-none mb-1">{r.name}</p>
          <p className="font-sans text-[10px] text-[#A8C3A0] tracking-wider uppercase">{r.country}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <Stars count={r.rating} />
      </div>

      <p className="font-sans text-white/80 text-sm md:text-base leading-relaxed italic mb-4">
        "{r.text}"
      </p>

      <p className="font-sans text-[10px] text-[#A8C3A0]/60 tracking-widest uppercase border-t border-white/10 pt-4 mt-auto">
        Stayed in: {r.stay}
      </p>
    </>
  );
}

export default function Reviews() {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);

  useGSAP(() => {
    // 1. Number Counters (Runs on all screen sizes)
    const stats = [
      { el: '.stat-reviews', target: 253, suffix: '+' },
      { el: '.stat-rating', target: 9.5, suffix: '', decimals: 1 },
      { el: '.stat-years', target: 5, suffix: '+' },
    ];

    stats.forEach(({ el, target, suffix, decimals = 0 }) => {
      const element = document.querySelector(el);
      if (!element) return;
      const counter = { val: 0 };

      gsap.to(counter, {
        val: target,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        onUpdate: () => {
          element.textContent = decimals
            ? counter.val.toFixed(decimals) + suffix
            : Math.round(counter.val) + suffix;
        },
      });
    });

    // 2. Header Reveal (Runs on all screen sizes)
    gsap.fromTo('.reviews-header > *',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // 3. RESPONSIVE ANIMATIONS using MatchMedia
    let mm = gsap.matchMedia();

    // DESKTOP & TABLET (Circular Orbit)
    mm.add("(min-width: 768px)", () => {
      // Rotate the entire circle
      gsap.to(circleRef.current, {
        rotation: -180,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Counter-rotate the cards so text stays upright
      gsap.to('.desktop-orbit-card', {
        rotation: 180,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    });

    // MOBILE (Vertical Staggered Stack)
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo('.mobile-review-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.mobile-reviews-container',
            start: 'top 85%',
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#2C4A3B] overflow-hidden" id="reviews">
      
      {/* Background Topographic Texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* --- STATS HEADER --- */}
        <div className="reviews-header grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 md:mb-32 text-center md:text-left items-center border-b border-white/10 pb-12">
          <div>
            <div className="stat-reviews font-display text-5xl md:text-7xl font-bold text-white mb-2">0+</div>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#A8C3A0] uppercase font-bold">Verified Reviews</p>
          </div>
          <div className="md:text-center">
            <div className="stat-rating font-display text-5xl md:text-7xl font-bold text-[#C9A84C] mb-2 drop-shadow-[0_0_15px_rgba(201,168,76,0.4)]">0</div>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#A8C3A0] uppercase font-bold">Booking.com Score</p>
          </div>
          <div className="md:text-right">
            <div className="stat-years font-display text-5xl md:text-7xl font-bold text-white mb-2">0+</div>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#A8C3A0] uppercase font-bold">Years Hosting</p>
          </div>
        </div>

        {/* --- DESKTOP VIEW: ROTATING REVIEWS CIRCLE --- */}
        <div className="hidden md:flex relative w-full h-[800px] items-center justify-center mt-10">
          
          {/* Central Anchor Text */}
          <div className="absolute z-20 text-center pointer-events-none">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#A8C3A0] font-bold mb-4">What Guests Say</p>
            <h2 className="font-display text-6xl font-bold text-white leading-tight">
              Rated <br/>
              <span className="italic font-light text-[#E3EAD8]">Wonderful</span>
            </h2>
          </div>

          {/* The Orbiting Container */}
          <div ref={circleRef} className="absolute w-[1100px] h-[1100px] rounded-full border border-white/5 flex items-center justify-center">
            
            {/* Position the review cards around the circle */}
            {reviews.map((r, i) => {
              const angle = (i * (360 / reviews.length)) * (Math.PI / 180);
              const radius = 550; // Half of the 1100px width
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={i}
                  className="desktop-orbit-card absolute w-[350px] p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors cursor-default flex flex-col"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <ReviewContent r={r} />
                </div>
              );
            })}
          </div>
        </div>

        {/* --- MOBILE VIEW: VERTICAL STACK --- */}
        <div className="md:hidden mobile-reviews-container flex flex-col gap-6">
          <div className="text-center mb-8">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#A8C3A0] font-bold mb-2">What Guests Say</p>
            <h2 className="font-display text-4xl font-bold text-white">
              Rated <span className="italic font-light text-[#E3EAD8]">Wonderful</span>
            </h2>
          </div>

          {reviews.map((r, i) => (
            <div 
              key={i} 
              className="mobile-review-card w-full p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 shadow-xl flex flex-col"
            >
              <ReviewContent r={r} />
            </div>
          ))}
        </div>

        {/* --- CTA --- */}
        <div className="relative z-20 mt-16 md:mt-32 text-center">
          <a
            href="https://www.booking.com/hotel/lk/sigiri-free-view-tree-house.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-full bg-white text-[#2C4A3B] font-bold tracking-wide hover:scale-105 hover:bg-[#E3EAD8] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Read All 253 Reviews
            <FiArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}