import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Generate stars
const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  duration: 1.5 + Math.random() * 2,
}));

export default function BookingCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered star twinkle
      stars.forEach((star) => {
        gsap.to(`.star-${star.id}`, {
          opacity: Math.random() * 0.7 + 0.3,
          scale: 1.5,
          duration: star.duration,
          delay: star.delay,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      });

      // Moon slow drift
      gsap.to('.cta-moon', {
        y: -20,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Content reveal
      gsap.fromTo('.cta-content > *',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A130A 0%, #1D2A1D 40%, #2D4A2D 100%)',
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`star-${star.id} absolute rounded-full bg-white`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div
        className="cta-moon absolute top-16 right-24 w-20 h-20 rounded-full opacity-80"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #F5F1E8, #C9A84C)',
          boxShadow: '0 0 40px #C9A84C40, 0 0 80px #C9A84C20',
        }}
      />

      {/* Silhouette trees */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none">
        <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
          {/* Tree silhouettes */}
          <path d="M0 200 L0 120 L20 80 L40 120 L40 200Z" fill="#1D2A1D"/>
          <path d="M30 200 L30 100 L55 50 L80 100 L80 200Z" fill="#1A261A"/>
          <path d="M100 200 L100 130 L120 90 L140 130 L140 200Z" fill="#1D2A1D"/>
          <path d="M200 200 L200 110 L235 55 L270 110 L270 200Z" fill="#152015"/>
          <path d="M320 200 L320 125 L345 80 L370 125 L370 200Z" fill="#1D2A1D"/>
          <path d="M500 200 L500 100 L540 40 L580 100 L580 200Z" fill="#152015"/>
          <path d="M650 200 L650 120 L675 70 L700 120 L700 200Z" fill="#1D2A1D"/>
          <path d="M800 200 L800 105 L840 50 L880 105 L880 200Z" fill="#152015"/>
          <path d="M950 200 L950 130 L975 85 L1000 130 L1000 200Z" fill="#1D2A1D"/>
          <path d="M1100 200 L1100 110 L1140 55 L1180 110 L1180 200Z" fill="#152015"/>
          <path d="M1300 200 L1300 125 L1325 80 L1350 125 L1350 200Z" fill="#1D2A1D"/>
          <path d="M1380 200 L1380 100 L1410 50 L1440 100 L1440 200Z" fill="#152015"/>
          {/* Ground */}
          <rect x="0" y="190" width="1440" height="10" fill="#0A130A"/>
        </svg>
      </div>

      {/* Jungle fog at bottom */}
      <div
        className="absolute bottom-32 left-0 right-0 h-32 fog-drift pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(29,42,29,0.4), transparent)',
          filter: 'blur(8px)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="cta-content">
          <p className="section-label text-forest-sage mb-6">Reserve Your Stay</p>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Your Jungle<br />
            Adventure<br />
            <span className="text-gradient">Starts Here.</span>
          </h2>

          <p className="font-body text-white/60 text-lg max-w-xl mx-auto mb-4">
            No 186, Pidurangala, Sigiriya 21120 · Sri Lanka
          </p>

          <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
            <span className="glass-card px-4 py-2 text-sm text-white/80 font-mono" style={{ background: 'rgba(255,255,255,0.08)' }}>
              From $7.50 / night
            </span>
            <span className="glass-card px-4 py-2 text-sm text-white/80 font-mono" style={{ background: 'rgba(255,255,255,0.08)' }}>
              ★ 9.3 Wonderful
            </span>
            <span className="glass-card px-4 py-2 text-sm text-white/80 font-mono" style={{ background: 'rgba(255,255,255,0.08)' }}>
              253 Reviews
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.booking.com/hotel/lk/sigiri-free-view-tree-house.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-10 py-5"
            >
              Book on Booking.com
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="tel:+94762064712"
              className="inline-flex items-center gap-3 px-10 py-5 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Rohan
            </a>
          </div>

          {/* Hosts intro */}
          <div className="mt-16 inline-flex items-center gap-4 glass-card px-8 py-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(168,195,160,0.2)' }}>
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-forest-primary flex items-center justify-center text-white font-display text-lg font-bold border-2 border-forest-deep">R</div>
              <div className="w-12 h-12 rounded-full bg-gold/70 flex items-center justify-center text-forest-deep font-display text-lg font-bold border-2 border-forest-deep">P</div>
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">Rohan & Prasadi</p>
              <p className="text-white/50 text-sm">Your hosts, ready to welcome you 🌿</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
