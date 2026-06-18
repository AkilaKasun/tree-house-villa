import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Progress bar fill
    tl.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: 'power2.inOut', transformOrigin: 'left center' }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 },
      0.3
    )
    // Exit
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.3,
      onComplete,
    });

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0A130A 0%, #1D2A1D 100%)' }}
    >
      {/* SVG Tree */}
      <svg viewBox="0 0 120 160" className="w-24 mb-8 opacity-80">
        <rect x="54" y="80" width="12" height="80" rx="6" fill="#8B6914"/>
        <ellipse cx="60" cy="65" rx="45" ry="45" fill="#3D5C3A"/>
        <ellipse cx="60" cy="50" rx="35" ry="35" fill="#5E7C5A"/>
        <ellipse cx="60" cy="35" rx="25" ry="25" fill="#A8C3A0"/>
        <rect x="48" y="28" width="24" height="16" rx="3" fill="#8B6914"/>
        <polygon points="48,28 60,14 72,28" fill="#C9A84C"/>
      </svg>

      <div ref={textRef} className="text-center mb-8">
        <p className="font-mono text-xs tracking-[0.4em] uppercase text-forest-sage mb-2">
          Sigiriya, Sri Lanka
        </p>
        <h1 className="font-display text-2xl font-bold text-white">
          Tree House & Villa
        </h1>
      </div>

      {/* Progress */}
      <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #5E7C5A, #A8C3A0)', transformOrigin: 'left' }}
        />
      </div>

      <p className="font-mono text-xs text-white/30 mt-4 tracking-widest">Loading your jungle escape...</p>
    </div>
  );
}
