import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '🌿',
    title: 'Treehouse Experience',
    desc: 'Sleep elevated in the canopy, surrounded by the sounds of the Sri Lankan jungle. A truly singular night.',
  },
  {
    icon: '🍛',
    title: 'Sri Lankan Breakfast',
    desc: 'Homemade daily-changing spreads of fresh hoppers, sambol, fruits, and spiced dishes served at dawn.',
  },
  {
    icon: '🐘',
    title: 'Expert-Led Safaris',
    desc: 'Rohan personally guides guests through Minneriya — early routes that elephants use before crowds arrive.',
  },
  {
    icon: '🏔️',
    title: 'Walk to Sigiriya',
    desc: 'The iconic Lion Rock is just 1.3 km on foot. Set off before sunrise and have the ramp nearly to yourself.',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal per line
      gsap.fromTo('.about-label',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-label', start: 'top 85%' }
        }
      )

      gsap.fromTo('.about-heading span',
        { opacity: 0, y: 50, skewY: 3 },
        {
          opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.about-heading', start: 'top 80%' }
        }
      )

      gsap.fromTo('.about-body',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-body', start: 'top 80%' }
        }
      )

      // Parallax image
      gsap.fromTo(imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // Feature cards stagger
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.features-grid', start: 'top 75%' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-28 md:py-36 overflow-hidden"
      style={{ background: 'var(--warm-white)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid: text + image */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">

          {/* Text */}
          <div>
            <div className="about-label flex items-center gap-3 mb-6">
              <div className="leaf-divider" />
              <span className="text-xs tracking-[0.25em] uppercase font-medium"
                style={{ color: 'var(--sage)' }}>Our Story</span>
            </div>

            <h2 className="about-heading font-display text-4xl md:text-5xl leading-[1.1] mb-8"
              style={{ color: 'var(--forest)' }}>
              <span className="block">A Family Home</span>
              <span className="block italic font-light" style={{ color: 'var(--moss)' }}>Open to the World</span>
            </h2>

            <div className="about-body space-y-4 text-base leading-relaxed"
              style={{ color: 'var(--stone)' }}>
              <p>
                Rohan and Prasadi built this place with their own hands — a treehouse perched
                in ancient jak trees, and a villa hidden behind a garden that grows its own
                herbs for the kitchen.
              </p>
              <p>
                Every morning begins with Prasadi's cooking. Every evening, Rohan is ready
                to draw you a map, book a tuk-tuk, or lead you personally through the
                national parks at first light.
              </p>
            </div>

            <div className="about-body mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['R', 'P'].map(l => (
                  <div key={l} className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
                    style={{ background: l === 'R' ? 'var(--sage)' : 'var(--moss)' }}>{l}</div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--forest)' }}>Rohan &amp; Prasadi</p>
                <p className="text-xs" style={{ color: 'var(--stone)' }}>Your hosts since 2015</p>
              </div>
            </div>
          </div>

          {/* Image with clip */}
          <div className="relative overflow-hidden rounded-2xl" style={{ height: '480px' }}>
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80"
              alt="Treehouse in jungle"
              className="w-full h-full object-cover scale-110"
            />
            {/* Corner accent */}
            <div className="absolute bottom-6 left-6 glass px-4 py-3 rounded-xl">
              <p className="text-white text-sm font-medium">⭐ 9.3 / 10</p>
              <p className="text-white/70 text-xs">253 verified reviews</p>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="features-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title}
              className="feature-card group p-6 rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: 'white', border: '1px solid var(--sage-pale)' }}>
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-display text-base font-semibold mb-2" style={{ color: 'var(--forest)' }}>
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--stone)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
