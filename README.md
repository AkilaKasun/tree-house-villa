Markdown
#  Tree House Hostel Sigiriya

A premium, award-winning style frontend landing page for a boutique jungle hostel and villa located in Sigiriya, Sri Lanka. 

Built with React and highly optimized for performance, this project features cinematic parallax effects, buttery-smooth scrolling, and advanced GSAP scrub animations to create a fully immersive "jungle" user experience.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

##  Key Features & Animations

This project moves away from standard static templates by utilizing timeline-based scroll interactions:

* **Cinematic Hero:** Deep multi-layer parallax background that slides downward while the content scrolls upward over a frosted glassmorphic overlay.
* **Smooth Scrolling:** Integrated `@studio-freight/lenis` (now `lenis/react`) for native feeling, interpolated smooth scrolling that syncs perfectly with GSAP's internal ticker.
* **Sticky "Deck of Cards" Rooms:** Uses native CSS `sticky` positioning and GSAP `filter: blur()` to create a depth-of-field stacking effect as users scroll through accommodations.
* **Opposing Parallax Gallery:** A massive 3-column masonry grid where the outer columns scroll up and the center column scrolls down.
* **3D Flip-Card Packages:** Interactive pricing cards using Tailwind's `[transform-style:preserve-3d]` and `rotateY(180deg)` for buttery smooth front-to-back flipping.
* **Scroll-Scrubbed Angled Marquee:** A -3 degree tilted infinite image marquee physically tied to the user's scroll wheel speed, layered over giant hollow stroke text.
* **Responsive Orbital Reviews:** A `Math.cos/sin` calculated circular orbit of review cards on Desktop that elegantly gracefully degrades into a staggered vertical stack on Mobile.
* **Animated SVG Journey:** A dynamic map line that draws itself on scroll, popping up location markers in exact synchronization with the path's progress.

## 🛠 Tech Stack

* **Framework:** React 18+ (Vite)
* **Styling:** Tailwind CSS (Custom CSS Variables mapping)
* **Animation Engine:** GSAP (GreenSock)
* **Scroll Triggers:** GSAP `ScrollTrigger` & `@gsap/react` `useGSAP` hook
* **Smooth Scroll:** React Lenis
* **Icons:** React Icons (`react-icons/fi`, `react-icons/tb`, `react-icons/md`)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/tree-house-sigiriya.git](https://github.com/your-username/tree-house-sigiriya.git)
   cd tree-house-sigiriya
Install dependencies:

Bash
npm install
Ensure the core animation libraries are present:

Bash
npm install gsap @gsap/react lenis react-icons
Start the development server:

Bash
npm run dev
🏗 Project Structure
The project utilizes a modular component architecture to keep the GSAP timelines scoped and easily maintainable.

Plaintext
src/
├── components/
│   ├── PageLoader.jsx       # Initial loading sequence
│   ├── Navbar.jsx           # Glassmorphic sticky top navigation
│   ├── Hero.jsx             # Deep parallax entry section
│   ├── TreeGrowth.jsx       # 1990px pinned storytelling scroll
│   ├── JungleExperience.jsx # Horizontal pinning scroll
│   ├── Rooms.jsx            # Sticky stacking layout
│   ├── Gallery.jsx          # Opposing column parallax
│   ├── Packages.jsx         # 3D Flip cards
│   ├── Marquee.jsx          # Angled scroll-scrubbed image rows
│   ├── Reviews.jsx          # Circular rotating layout
│   ├── Location.jsx         # SVG path drawing animation
│   ├── BookingCTA.jsx       # Final conversion section
│   └── Footer.jsx           
├── App.jsx                  # Main layout wrapper & ReactLenis root
├── index.css                # Global styles & Custom Color Palette
└── main.jsx                 # React DOM entry
🎨 Theming & Colors
The UI relies heavily on a custom, calming nature-inspired palette defined in index.css:

--forest: #2C4A3B (Deep typography & dark backgrounds)

--moss: #4A6741 (Mid-tone accents)

--sage: #7A9E7E (Primary brand color, buttons)

--sage-light: #A8C5A0 (Glowing text, subtitles)

--sage-pale: #E3EAD8 (Light green card backgrounds)

--cream: #FDFBF7 (Section backgrounds)

--warm-white: #FAF9F6 (Main body)

📱 Responsiveness
Every component utilizes gsap.matchMedia() within the useGSAP hook to ensure complex, GPU-heavy animations (like the rotating review orbit and 3-column parallax) only run on desktop devices, while mobile users receive elegant, staggered fade-ins to prevent layout breakage and battery drain.

Designed & Engineered for Tree House Hostel, Sigiriya.