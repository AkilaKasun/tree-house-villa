import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storyBeats = [
  { text: 'Among the lush forests of Sigiriya...', sub: 'In the heart of Sri Lanka\'s Cultural Triangle' },
  { text: 'We built more than a hostel.', sub: 'A sanctuary where jungle meets luxury' },
  { text: 'We created an experience.', sub: 'Where 253 guests found something unforgettable' },
];

export default function TreeStory() {
  const sectionRef = useRef(null);
  const treeRef = useRef(null);
  const trunkRef = useRef(null);
  const canopyRef = useRef(null);
  const rootsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Trunk grows up
      tl.fromTo(trunkRef.current,
        { scaleY: 0, transformOrigin: 'bottom center' },
        { scaleY: 1, duration: 2 }
      );

      // Canopy expands
      tl.fromTo(canopyRef.current,
        { scale: 0, opacity: 0, transformOrigin: 'bottom center' },
        { scale: 1, opacity: 1, duration: 2 },
        '-=0.5'
      );

      // Roots spread
      tl.fromTo(rootsRef.current,
        { scale: 0, transformOrigin: 'top center' },
        { scale: 1, duration: 1.5 },
        '-=3'
      );

      // Story texts appear one by one
      storyBeats.forEach((_, i) => {
        tl.fromTo(`.story-beat-${i}`,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          i === 0 ? '-=1' : '-=0.5'
        );
        if (i < storyBeats.length - 1) {
          tl.to(`.story-beat-${i}`, { opacity: 0, y: -40, duration: 0.8 }, `+=0.5`);
        }
      });

      // Final reveal — all amenities
      tl.fromTo('.amenity-pill',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.4 },
        '-=0.5'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const amenities = [
    '🌿 Jungle Setting', '📶 Free WiFi', '🍳 Breakfast', '🚗 Free Parking',
    '🦁 Safari Tours', '🌅 Rock Views', '🚲 Bike Rental', '🌙 24/7 Reception',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream"
      style={{ height: '400vh' }}
      id="experience"
    >
      {/* Pinned content */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left: SVG Tree Animation */}
          <div ref={treeRef} className="flex justify-center relative">
            <svg viewBox="0 0 300 500" className="w-64 md:w-80" fill="none">
              {/* Roots */}
              <g ref={rootsRef}>
                <path d="M150 460 Q120 490 80 500" stroke="#5E7C5A" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
                <path d="M150 460 Q180 490 220 500" stroke="#5E7C5A" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
                <path d="M150 460 Q135 480 110 495" stroke="#A8C3A0" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
                <path d="M150 460 Q165 480 190 495" stroke="#A8C3A0" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
              </g>

              {/* Trunk */}
              <rect
                ref={trunkRef}
                x="138" y="200" width="24" height="260" rx="12"
                fill="#8B6914"
                style={{ transformOrigin: '150px 460px' }}
              />

              {/* Branches */}
              <path d="M150 280 Q100 240 70 200" stroke="#8B6914" strokeWidth="10" strokeLinecap="round"/>
              <path d="M150 300 Q200 260 230 220" stroke="#8B6914" strokeWidth="8" strokeLinecap="round"/>
              <path d="M150 320 Q90 300 60 280" stroke="#8B6914" strokeWidth="6" strokeLinecap="round"/>
              <path d="M150 310 Q210 295 240 270" stroke="#8B6914" strokeWidth="5" strokeLinecap="round"/>

              {/* Canopy */}
              <g ref={canopyRef}>
                <ellipse cx="150" cy="160" rx="110" ry="100" fill="#5E7C5A" opacity="0.9"/>
                <ellipse cx="90" cy="200" rx="75" ry="65" fill="#3D5C3A" opacity="0.8"/>
                <ellipse cx="210" cy="195" rx="70" ry="60" fill="#4A6E47" opacity="0.8"/>
                <ellipse cx="150" cy="120" rx="85" ry="75" fill="#6B8E67" opacity="0.85"/>
                <ellipse cx="150" cy="100" rx="60" ry="55" fill="#A8C3A0" opacity="0.7"/>

                {/* Tree house on top */}
                <rect x="120" y="85" width="60" height="40" rx="4" fill="#8B6914" opacity="0.9"/>
                <polygon points="120,85 150,60 180,85" fill="#C9A84C" opacity="0.9"/>
                <rect x="137" y="100" width="14" height="25" rx="2" fill="#5E7C5A"/>
                {/* Window */}
                <rect x="126" y="90" width="12" height="12" rx="2" fill="#F5F1E8" opacity="0.8"/>
                <rect x="162" y="90" width="12" height="12" rx="2" fill="#F5F1E8" opacity="0.8"/>
                {/* Flag */}
                <line x1="150" y1="60" x2="150" y2="35" stroke="#5E7C5A" strokeWidth="2"/>
                <polygon points="150,35 165,42 150,49" fill="#A8C3A0"/>
              </g>

              {/* Leaf particles */}
              {[...Array(8)].map((_, i) => (
                <circle
                  key={i}
                  cx={60 + i * 25}
                  cy={100 + (i % 3) * 30}
                  r={4 + (i % 3)}
                  fill="#A8C3A0"
                  opacity="0.5"
                  className="leaf-float"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </svg>
          </div>

          {/* Right: Story Text */}
          <div className="relative">
            <p className="section-label mb-8">Our Story</p>

            {storyBeats.map((beat, i) => (
              <div
                key={i}
                className={`story-beat-${i} absolute inset-0`}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest-deep leading-tight mb-6">
                  "{beat.text}"
                </blockquote>
                <p className="body-text">{beat.sub}</p>
              </div>
            ))}

            {/* Placeholder for height */}
            <div className="opacity-0 pointer-events-none">
              <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest-deep leading-tight mb-6">
                "We created an experience."
              </blockquote>
              <p className="body-text">placeholder</p>
            </div>

            {/* Amenity Pills (appear at end) */}
            <div className="mt-12 flex flex-wrap gap-2">
              {amenities.map((item, i) => (
                <span
                  key={i}
                  className="amenity-pill inline-flex items-center gap-1.5 px-4 py-2 bg-forest-mist rounded-full text-sm text-forest-primary font-medium border border-forest-sage/30"
                  style={{ opacity: 0 }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
