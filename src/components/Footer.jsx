export default function Footer() {
  return (
    <footer className="bg-[#0A130A] text-white/60 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-forest-sage">Sigiriya</p>
              <h3 className="font-display text-3xl font-bold text-white">Tree House & Villa</h3>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              A unique jungle stay near Sigiriya Rock and Pidurangala. Hosted by Rohan & Prasadi with warmth, local knowledge, and unforgettable hospitality.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="font-mono text-xs">9.3 on Booking.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Explore</h4>
            <ul className="space-y-3 text-sm">
              {['Experience', 'Rooms', 'Gallery', 'Packages', 'Location'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-forest-sage transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-forest-sage mt-0.5">📍</span>
                <span>No 186, Pidurangala, Sigiriya 21120, Sri Lanka</span>
              </li>
              <li>
                <a href="tel:+94762064712" className="flex items-center gap-2 hover:text-forest-sage transition-colors">
                  <span className="text-forest-sage">📞</span>
                  +94 76 206 4712
                </a>
              </li>
              <li>
                <a
                  href="https://www.booking.com/hotel/lk/sigiri-free-view-tree-house.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-forest-sage transition-colors"
                >
                  <span className="text-forest-sage">🌐</span>
                  Book on Booking.com
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6">
              <p className="text-xs font-mono text-forest-sage mb-2 tracking-wider uppercase">Reception</p>
              <p className="text-sm">Check-in: 2:00 PM – 11:30 PM</p>
              <p className="text-sm">Check-out: by 11:00 AM</p>
              <p className="text-xs mt-2 text-forest-sage">24/7 Front Desk</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs">
            © {new Date().getFullYear()} Sigiriya Free View Tree House & Villa. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-forest-sage animate-pulse" />
            <span className="font-mono text-xs text-forest-sage">Available for bookings</span>
          </div>
          <p className="font-mono text-xs">
            Cash payments only · No smoking · Pets not allowed
          </p>
        </div>
      </div>
    </footer>
  );
}
