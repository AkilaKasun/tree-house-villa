import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: 'Tree House Living',
    desc: 'Sleep in a real jungle treehouse surrounded by ancient trees. Wake up to the sounds of nature.',
    emoji: '🌴',
    color: '#5E7C5A',
    img: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=600&q=80&auto=format&fit=crop',
    tag: 'Signature Stay',
  },
  {
    id: 2,
    title: 'Safari Adventures',
    desc: 'Owner-led jeep safaris into Minneriya & Kaudulla national parks. Expert elephant spotting.',
    emoji: '🦁',
    color: '#8B6914',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80&auto=format&fit=crop',
    tag: 'Must Do',
  },
  {
    id: 3,
    title: 'Pidurangala Sunrise',
    desc: '3.9 km away. Hike before dawn for panoramic views of Sigiriya Rock glowing in golden light.',
    emoji: '🌅',
    color: '#C9A84C',
    img: 'https://images.unsplash.com/photo-1566555370-0af84e3001ef?w=600&q=80&auto=format&fit=crop',
    tag: 'Sunrise Hike',
  },
  {
    id: 4,
    title: 'Local Cuisine',
    desc: 'Cooking classes with Presida. Homemade Sri Lankan breakfast with juice, fruits, and daily variety.',
    emoji: '🍛',
    color: '#5E7C5A',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop',
    tag: 'Farm to Table',
  },
  {
    id: 5,
    title: 'Sigiriya Rock',
    desc: 'Just 1.3 km away. Climb the ancient fortress and marvel at 5th century frescoes and mirror wall.',
    emoji: '🗿',
    color: '#A8C3A0',
    img: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=600&q=80&auto=format&fit=crop',
    tag: 'UNESCO Site',
  },
  {
    id: 6,
    title: 'Village Cycling',
    desc: 'Rent bikes and explore hidden village roads, paddy fields, and local temples at your own pace.',
    emoji: '🚲',
    color: '#3D5C3A',
    img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80&auto=format&fit=crop',
    tag: 'Active',
  },
];

export default function JungleExperience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const cards = track.querySelectorAll('.exp-card');

      // Calculate horizontal scroll distance
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Each card pops in as it enters
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0.3, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${i * 120} top`,
              end: `top+=${i * 120 + 200} top`,
              scrub: 1,
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-forest-deep overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Header - fixed inside section */}
      <div className="absolute top-12 left-6 right-6 z-10 max-w-7xl mx-auto flex justify-between items-start pointer-events-none">
        <div>
          <p className="section-label text-forest-sage mb-3">The Experience</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Your Jungle<br />
            <span className="text-gradient">Adventure Awaits</span>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-white/40 mt-4">
          <span className="font-mono text-xs tracking-widest">SCROLL TO EXPLORE</span>
          <svg className="w-8 h-4" fill="none" stroke="currentColor" viewBox="0 0 32 16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M0 8h28M22 2l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="flex items-center h-full">
        <div
          ref={trackRef}
          className="horizontal-scroll-container gap-6 px-6 pt-32 pb-10"
          style={{ paddingLeft: '6rem' }}
        >
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="exp-card flex-shrink-0 w-[340px] md:w-[400px] glass-card overflow-hidden group cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={exp.img}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
                <span
                  className="absolute top-4 left-4 font-mono text-xs px-3 py-1.5 rounded-full text-white/90 tracking-wider"
                  style={{ background: `${exp.color}CC` }}
                >
                  {exp.tag}
                </span>
                <span className="absolute bottom-4 right-4 text-3xl">{exp.emoji}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-white mb-3">{exp.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{exp.desc}</p>

                <div className="mt-6 flex items-center gap-2 text-forest-sage text-sm font-medium group-hover:gap-4 transition-all duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Number indicator */}
              <div className="absolute top-4 right-4">
                <span className="font-mono text-xs text-white/20">0{i + 1}</span>
              </div>
            </div>
          ))}

          {/* End card — CTA */}
          <div className="flex-shrink-0 w-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-forest-primary/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-forest-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </div>
              <p className="font-display text-2xl text-white mb-4">Ready?</p>
              <a
                href="https://www.booking.com/hotel/lk/sigiri-free-view-tree-house.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
