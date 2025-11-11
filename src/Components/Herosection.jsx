import React, { useState, useEffect, useRef, useCallback } from "react";
// GSAP লাইবেরি install করো: npm install gsap
// তারপর import করো:
import { gsap } from "gsap";
// Optional: Parallax effect-এর জন্য ScrollTrigger plugin (npm install gsap@latest)
import { ScrollTrigger } from "gsap/ScrollTrigger";
// GSAP register করো যদি ScrollTrigger use করো
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Herosection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayDelay = 7000; // Slowed down: 7 seconds

  // স্লাইড ডেটা: সব image রাখা হয়েছে + shortTitle for nav text
  const slides = [
    {
      type: "image",
      mediaUrl:
        "https://i.pinimg.com/736x/bd/a5/e2/bda5e2a411b87e0dc47feec461adb919.jpg", // Sustainable Farming photo
      title: "High Quality Fresh Organic Foods",
      subtitle: "Discover the magic of sustainable agriculture.",
      welcome: "Welcome to Agrite",
      shortTitle: "Organic & Healthy", // Nav text like image
    },
    {
      type: "image",
      mediaUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/051/805/106/small/tractor-spraying-pesticides-copy-space-free-space-for-text-farm-field-with-young-sprouts-background-rural-landscape-photo.jpg", // Farm to Table Delivery photo
      title: "Organic Food Delivery",
      subtitle: "From Our Farm to Your Table, Fresh & Fast.",
      welcome: "Welcome to Agrite",
      shortTitle: "Agriculture Leader", // Nav text like image
    },
    {
      type: "image",
      mediaUrl:
        "https://t4.ftcdn.net/jpg/03/57/54/77/360_F_357547735_aTZvm1ec8Uzgsd1aTukmFiOw4iXX2aKS.jpg", // Eco Products Nature photo
      title: "Natural & Eco Products",
      subtitle: "Sustainably Sourced Goods for a Better Tomorrow.",
      welcome: "Welcome to Agrite",
      shortTitle: "Natural & Eco Products", // Nav text like image
    },
  ];

  // প্রতিটি স্লাইড এবং টেক্সট কন্টেইনারকে GSAP দিয়ে টার্গেট করার জন্য Refs
  const slideRefs = useRef([]);
  const contentRefs = useRef([]);

  // Preload images for better performance
  useEffect(() => {
    slides.forEach((slide) => {
      if (slide.type === "image") {
        const img = new Image();
        img.src = slide.mediaUrl;
      }
    });
  }, []);

  // --- GSAP ট্রানজিশন লজিক (Slowed down transitions) ---
  useEffect(() => {
    // অ্যাক্টিভ স্লাইড বাদে বাকি সব স্লাইডকে অপাসিটি 0-তে সেট করা + zoom transition (slower)
    slideRefs.current.forEach((el, i) => {
      if (!el) return;

      // স্লাইড ট্রানজিশন: Fade + subtle zoom for modern feel (duration increased to 1.8s)
      gsap.to(el, {
        opacity: i === activeIndex ? 1 : 0,
        duration: 1.8, // Slower slide change
        zIndex: i === activeIndex ? 10 : 1,
        scale: i === activeIndex ? 1 : 1.05, // Non-active slides slightly zoomed out
        ease: "power2.inOut",
      });

      // Active slide-এ top white border add (GSAP দিয়ে animate, slower)
      if (i === activeIndex) {
        gsap.to(el, { borderTop: "3px solid white", duration: 0.8 }); // Slower border animation
      } else {
        gsap.to(el, { borderTop: "none", duration: 0.5 });
      }

      // শুধুমাত্র বর্তমান অ্যাক্টিভ স্লাইডের টেক্সট অ্যানিমেট (Staggered + Parallax hint, timings slowed, from top)
      if (i === activeIndex && contentRefs.current[i]) {
        const content = contentRefs.current[i];
        if (!content) return;

        // Reset previous animations
        gsap.set(content.children, { clearProps: "all" });

        // টেক্সটকে অ্যানিমেট করার জন্য একটি টাইমলাইন (Staggered Fade-up + scale, from top)
        const tl = gsap
          .timeline({ defaults: { duration: 1.0, ease: "power3.out" } }) // Duration increased
          .fromTo(
            content.children[0],
            { y: -30, opacity: 0, scale: 0.95 }, // From top
            { y: 0, opacity: 1, scale: 1 },
            0.2 // Slightly delayed start
          ) // Welcome text
          .fromTo(
            content.children[1],
            { y: -40, opacity: 0, scale: 0.9 }, // From top
            { y: 0, opacity: 1, scale: 1 },
            0.5 // Increased stagger
          ) // Title
          .fromTo(
            content.children[2],
            { y: -30, opacity: 0, scale: 0.95 }, // From top
            { y: 0, opacity: 1, scale: 1 },
            0.8 // Increased stagger
          ) // Subtitle
          .fromTo(
            content.children[3],
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8 },
            1.1 // Increased stagger
          ); // Button

        // Optional Parallax effect on scroll (if ScrollTrigger available)
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.create({
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              gsap.to(content, { y: -self.progress * 100, ease: "none" }); // Subtle upward parallax
            },
          });
        }
      }
    });

    // নেভিগেশন নম্বর অ্যানিমেট (Enhanced with glow, slower)
    const navIndicators = document.querySelectorAll(".nav-number");
    gsap.to(navIndicators, { scale: 1, opacity: 0.5, duration: 0.5 }); // Slower
    gsap.to(navIndicators[activeIndex], {
      scale: 1.2,
      opacity: 1,
      textShadow: "0 0 10px rgba(255,255,255,0.8)", // Glow effect
      duration: 0.5, // Slower
    });
  }, [activeIndex]);

  // --- অটো-প্লে লজিক (Auto-play always on, no pause on hover/scroll) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoplayDelay);

    return () => {
      clearInterval(interval);
    };
  }, [autoplayDelay]);

  // No pause handlers (always playing)

  // Navigation handlers (dots only)
  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // Keyboard navigation (Accessibility)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // কাস্টম স্টাইলিং (Updated: Progress bar removed, increased bottom padding)
  const style = `
    .hero-container {
      width: 100%;
      height: 100vh;
      overflow: hidden;
      padding-bottom: 100px; /* Increased bottom padding */
    }
    .text-shadow {
        text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
    }
    /* Navigation like image: No bg, just transparent with increased spacing */
    .nav-container {
      position: absolute;
      bottom: 20px; /* Adjusted for padding */
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      display: flex;
      align-items: center;
      background: transparent; /* No background */
      padding: 0;
    }
    .nav-item {
      text-align: center;
      margin: 0 30px; /* Increased spacing between items */
      cursor: pointer;
      user-select: none;
      transition: all 0.3s ease;
    }
    .nav-number {
      display: block;
      color: #fff; /* Yellowish white like image */
      opacity: 0.7;
      font-weight: bold;
      font-size: 1.5rem;
      padding-top: 5px;
    }
    .nav-text {
      display: block;
      color: #fff;
      opacity: 0.6;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 2px;
    }
    .nav-item:hover .nav-number,
    .nav-item:hover .nav-text {
        opacity: 0.9;
    }
    .nav-item.active .nav-number {
        opacity: 1;
        transform: scale(1.1);
        text-shadow: 0 0 10px rgba(255,255,255,0.8);
    }
    .nav-item.active .nav-text {
        opacity: 0.8;
    }
    /* Active slide-এ top white border (CSS fallback, GSAP handles animation) */
    .hero-slide.active {
      border-top: 3px solid white;
    }
    .discover-button {
        transition: all 0.3s ease;
    }
    .discover-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    /* Progress bar removed */
    /* GSAP-এর জন্য, টেক্সটের প্রাথমিক opacity 0 সেট করতে হবে */
    .gsap-content-wrapper > * {
        opacity: 0;
    }
    /* Responsive improvements */
    @media (max-width: 768px) {
      .nav-number { font-size: 1.2rem; }
      .nav-text { font-size: 0.7rem; }
      .nav-item { margin: 0 15px; } /* Less space on mobile */
      .hero-container { padding-bottom: 60px; } /* Less padding on mobile */
    }
  `;

  return (
    <div className="bg-gray-900 min-h-screen">
      <style>{style}</style>

      {/* প্রধান স্লাইডার কনটেইনার */}
      <div
        className="hero-container relative"
        role="region"
        aria-label="Hero slider"
      >
        {/* প্রতিটি স্লাইড রেন্ডার করা হচ্ছে */}
        {slides.map((s, index) => (
          <div
            key={index}
            // Ref যোগ করা হলো যাতে GSAP একে টার্গেট করতে পারে
            ref={(el) => (slideRefs.current[index] = el)}
            className={`absolute inset-0 w-full h-full hero-slide ${
              index === activeIndex ? "active" : ""
            }`}
            // প্রাথমিক স্টাইল: সব স্লাইড opacity 0 থাকবে, শুধুমাত্র প্রথমটা opacity 1
            style={{
              opacity: index === activeIndex ? 1 : 0,
              zIndex: index === activeIndex ? 10 : 1,
            }}
            aria-hidden={index !== activeIndex}
            aria-label={`Slide ${index + 1}: ${s.title}`}
          >
            {/* মিডিয়া ব্যাকগ্রাউন্ড (Image only) */}
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={s.mediaUrl}
              alt={`Background for ${s.title}`}
              loading="lazy"
            />

            {/* অন্ধকার ওভারলে (Darker: /60) */}
            <div className="absolute inset-0 bg-black/60 z-20" />

            {/* কনটেন্ট লেয়ার */}
            <div className="relative z-30 flex flex-col items-center justify-center h-full text-center p-4 md:p-12 text-white">
              <div
                className="max-w-4xl gsap-content-wrapper"
                // Ref যোগ করা হলো যাতে GSAP টেক্সট কনটেন্ট টার্গেট করতে পারে
                ref={(el) => (contentRefs.current[index] = el)}
              >
                {/* Welcome টেক্সট */}
                <p className="text-base md:text-lg font-medium tracking-widest uppercase mb-4 text-shadow opacity-90">
                  {s.welcome}
                </p>
                {/* প্রধান শিরোনাম */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-shadow">
                  {s.title}
                </h1>
                {/* সাবটাইটেল */}
                <p className="text-lg md:text-2xl font-light mb-10 text-shadow">
                  {s.subtitle}
                </p>
                {/* Discover More বাটন (No > arrow SVG) */}
                <a
                  href="#discover"
                  className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg uppercase text-sm discover-button"
                >
                  <span>Discover More</span>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* কাস্টম নেভিগেশন (Image-এর মতো no bg, increased space সাথে 01 + text) */}
        <div className="nav-container">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`nav-item ${i === activeIndex ? "active" : ""}`}
              onClick={() => goToSlide(i)}
              role="button"
              tabIndex={0}
              aria-label={`Go to slide ${i + 1}`}
              onKeyDown={(e) => e.key === "Enter" && goToSlide(i)}
            >
              <span className="nav-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="nav-text">{s.shortTitle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Herosection;
