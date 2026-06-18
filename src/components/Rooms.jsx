import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Premium minimalist icons
import { FiWifi, FiWind, FiCoffee, FiMaximize } from 'react-icons/fi';
import { MdOutlineBalcony, MdOutlineBathtub } from 'react-icons/md';
import { TbBed } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    name: 'The Tree House',
    type: 'Signature Suite',
    price: 'From $45/night',
    desc: 'Sleep elevated above the jungle floor. Wooden interior, private balcony, garden views, and the sound of birds as your alarm.',
    features: [
      { icon: <TbBed size={18} />, text: 'King Bed' },
      { icon: <MdOutlineBalcony size={18} />, text: 'Private Balcony' },
      { icon: <FiWind size={18} />, text: 'Air Conditioning' },
      { icon: <FiWifi size={18} />, text: 'Free High-Speed WiFi' }
    ],
    img: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=900&q=85',
    rating: '9.8',
    accent: '#2C4A3B', // Forest
  },
  {
    name: 'Garden Villa',
    type: 'Family Retreat',
    price: 'From $65/night',
    desc: 'Spacious villa with lush garden access. Perfect for families, featuring a beautiful terrace and long views toward Sigiriya Rock at sunrise.',
    features: [
      { icon: <TbBed size={18} />, text: '2 King Beds' },
      { icon: <MdOutlineBathtub size={18} />, text: 'Private Bathroom' },
      { icon: <FiMaximize size={18} />, text: 'Spacious Terrace' },
      { icon: <FiCoffee size={18} />, text: 'Tea/Coffee Maker' }
    ],
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85',
    rating: '9.5',
    accent: '#C9A84C', // Gold
  },
  {
    name: 'Chalet Room',
    type: 'Standard Double',
    price: 'From $35/night',
    desc: 'Cozy, clean, and comfortable. Features traditional Sri Lankan décor, a spotless bathroom, and the legendary hospitality of Rohan & Prasadi.',
    features: [
      { icon: <TbBed size={18} />, text: 'Queen Bed' },
      { icon: <MdOutlineBathtub size={18} />, text: 'En-suite Bath' },
      { icon: <FiWind size={18} />, text: 'Air Conditioning' },
      { icon: <FiWifi size={18} />, text: 'Free WiFi' }
    ],
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
    rating: '9.3',
    accent: '#7A9E7E', // Sage
  },
];

export default function Rooms() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.room-card');

    // Header Reveal
    gsap.fromTo('.rooms-header > *',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // 3D Deck Stacking Effect
    cards.forEach((card, index) => {
      // We only shrink the card if there is another card coming AFTER it
      if (index < cards.length - 1) {
        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          filter: 'blur(6px)', // Creates a beautiful depth-of-field effect
          scrollTrigger: {
            trigger: nextCard,
            start: 'top bottom', // Start shrinking when the top of the NEXT card hits the bottom of the screen
            end: 'top 15%',      // Finish shrinking when the NEXT card locks into its sticky position
            scrub: true,
          }
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--warm-white)] pt-24 pb-32 font-sans" id="rooms">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- HEADER --- */}
        <div className="rooms-header text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-[var(--sage)] opacity-60"></div>
            <p className="text-[var(--sage)] font-bold tracking-[0.3em] text-xs uppercase">Accommodations</p>
            <div className="w-12 h-px bg-[var(--sage)] opacity-60"></div>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-[var(--forest)]">
            Your Home <br className="md:hidden" />
            <span className="italic font-light text-[var(--sage)]">in the Trees</span>
          </h2>
        </div>

        {/* --- STICKY CARD CONTAINER --- */}
        {/* Adding extra padding bottom so you can scroll past the last card */}
        <div className="relative w-full pb-[10vh]">
          
          {rooms.map((room, i) => (
            <div
              key={i}
              // 'sticky top-20' is the magic native CSS that locks it to the screen perfectly on mobile and desktop
              className="room-card sticky top-[10vh] w-full min-h-[80vh] md:min-h-0 md:h-[75vh] mb-12 md:mb-24 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(44,74,59,0.2)] bg-white border border-[var(--sage-pale)] flex flex-col md:flex-row transform-gpu origin-top"
              style={{ zIndex: i + 1 }}
            >
              
              {/* LEFT HALF: Image Area */}
              <div className="relative w-full md:w-1/2 h-[45%] md:h-full bg-black overflow-hidden group">
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                
                {/* Gradient overlays for the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 md:bg-gradient-to-r md:from-transparent md:to-black/40" />
                
                {/* Top Tags */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-white/30">
                    {room.type}
                  </span>
                </div>

                {/* Rating Overlay */}
                <div className="absolute bottom-6 left-6 glass-card px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <span className="font-display text-xl text-white font-bold tracking-wide">
                    {room.rating} <span className="text-sm font-sans font-light text-white/80">/ 10</span>
                  </span>
                </div>
              </div>

              {/* RIGHT HALF: Content Area */}
              <div className="w-full md:w-1/2 h-[55%] md:h-full p-8 md:p-12 flex flex-col justify-between bg-white overflow-y-auto">
                
                <div>
                  <div className="flex items-end justify-between mb-4">
                    <h3 className="font-display text-4xl md:text-5xl font-bold text-[var(--forest)] leading-tight">
                      {room.name}
                    </h3>
                  </div>
                  
                  <p className="text-[var(--sage)] font-bold tracking-widest uppercase text-sm mb-6">
                    {room.price}
                  </p>

                  <p className="text-[var(--stone)] text-base md:text-lg leading-relaxed mb-8 font-light">
                    {room.desc}
                  </p>

                  {/* Feature Grid with React Icons */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8">
                    {room.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3 text-[var(--forest)]">
                        <div className="w-8 h-8 rounded-full bg-[var(--sage-pale)] flex items-center justify-center text-[var(--moss)]">
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium opacity-80">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-6 border-t border-[var(--sage-pale)]">
                  <a
                    href="https://www.booking.com/hotel/lk/sigiri-free-view-tree-house.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    style={{ backgroundColor: room.accent }}
                  >
                    Check Availability
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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