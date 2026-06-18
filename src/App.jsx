import { useState, useCallback, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react'; // Use the official wrapper
import 'lenis/dist/lenis.css'; // Don't forget the CSS!

import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TreeStory from './components/TreeStory';
import JungleExperience from './components/JungleExperience';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import Marquee from './components/Marquee';
import Packages from './components/Packages';
import Reviews from './components/Reviews';
import Location from './components/Location';
import BookingCTA from './components/BookingCTA';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const glowRef = useRef(null);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Safely handle the cursor glow effect inside React's lifecycle
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
        glowRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    // Wrap everything in ReactLenis for global smooth scrolling
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true, wheelMultiplier: 1.1 }}>
      <PageLoader onComplete={handleLoadComplete} />

      <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />

        <main>
          {/* 1. Cinematic Hero */}
          <Hero />

          {/* 2. Tree Growth Story — Pin scroll */}
          {/* <TreeStory /> */}

          {/* 3. Horizontal Jungle Experience — Pin scroll */}
          {/* <JungleExperience /> */}

          {/* 4. Room Showcase — vertical stack */}
          <Rooms />

          {/* 5. Floating Gallery */}
          <Gallery />

          {/* 6. Packages */}
          <Packages />

          {/* 7. Infinite Image Marquee */}
          <Marquee />

          {/* 8. Reviews + Stats */}
          <Reviews />

          {/* 9. Location & Journey Map */}
          <Location />

          {/* 10. Starry Night Booking CTA */}
          <BookingCTA />
        </main>

        <Footer />
      </div>

      {/* Cursor glow effect using a React ref */}
      <div
        ref={glowRef}
        className="fixed w-64 h-64 rounded-full pointer-events-none z-50 mix-blend-soft-light opacity-0 hidden md:block transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(168,195,160,0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </ReactLenis>
  );
}

export default App;