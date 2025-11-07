import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Responsive ThreeSectionPage
 * - Improved responsive behavior for small/medium/large screens
 * - Mobile-first stacking: content appears above media on small screens
 * - Desktop layout follows imageRight flags (image left/content right or vice versa)
 * - Responsive typography and image/video sizing
 * - Play/Pause overlay for the video to improve UX on devices that block autoplay
 * - Lazy loading for images; accessible labels and focusable CTA buttons
 *
 * Notes:
 * - Keep your static assets in `public/Images` and `public/Videos` (or convert to imports)
 * - Install dependencies if needed: `npm i framer-motion lucide-react`
 */

const sections = [
  {
    id: "one",
    eyebrow: "FEATURED",
    title: "Accelerate your research workflows",
    copy:
      "Turn raw data into publication-ready outputs with interactive dashboards, automated pipelines, and reproducible exports.",
    cta: { href: "/contact", label: "Request a Demo" },
    image: "/Images/home1.png",
    imageAlt: "Dashboard example",
    imageRight: false // image left, content right on desktop
  },
  {
    id: "two",
    eyebrow: "COLLABORATION",
    title: "Collaborate securely at scale",
    copy:
      "Fine-grained access controls, versioning, and sharing tools that let teams work together without friction.",
    cta: { href: "/pricing", label: "See Pricing" },
    image: "/Images/home2-poster.jpg", // poster fallback when video can't autoplay
    imageAlt: "Collaboration example",
    imageRight: true // content left, video right on desktop
  },
  {
    id: "three",
    eyebrow: "PUBLISH",
    title: "Publish with confidence",
    copy:
      "Export publication-ready figures, DOIs, and reproducible datasets so your work is easy to cite and share.",
    cta: { href: "/case-studies", label: "View Case Studies" },
    image: "/Images/home3.png",
    imageAlt: "Publication example",
    imageRight: false // image left, content right on desktop
  }
];

const VIDEO_SRC_SECOND = "/Videos/home2.mp4";
const VIDEO_POSTER_SECOND = "/Images/home2-poster.jpg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } }
};

/** Lightweight video player with play/pause overlay */
const VideoPlayer: React.FC<{
  src: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
}> = ({ src, poster, className = "", ariaLabel }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    // Attempt to play muted (many browsers allow muted autoplay)
    const tryAutoPlay = async () => {
      const v = ref.current;
      if (!v) return;
      v.muted = true;
      v.playsInline = true;
      try {
        await v.play();
        setPlaying(!v.paused);
        setCanPlay(true);
      } catch {
        // autoplay blocked; fall back to poster with play button
        setPlaying(false);
        setCanPlay(false);
      }
    };
    tryAutoPlay();
  }, []);

  const toggle = async () => {
    const v = ref.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
        setPlaying(true);
      } else {
        v.pause();
        setPlaying(false);
      }
    } catch {
      // ignore play errors
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        className="w-full h-full object-cover block"
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
      />
      {/* Overlay controls - visible when autoplay is blocked or always shown small */}
      <button
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={toggle}
        className="absolute z-20 right-3 bottom-3 flex items-center gap-2 rounded-full bg-black/40 hover:bg-black/50 text-white px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sage-accent"
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        <span className="hidden sm:inline">{playing ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
};

const ThreeSectionPage: React.FC = () => {
  return (
    <div className="bg-[#0b0b0b] text-white">
      {sections.map((s, idx) => (
        <motion.section
          key={s.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="py-8 md:py-12 lg:py-16"
        >
          <div className="container-custom">
            {/* Grid: single column on mobile, 12-column grid on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
              {/* Content column - on mobile it will be order-1, media order-2 */}
              <motion.div
                variants={itemVariants}
                className={`md:col-span-6 lg:col-span-6 px-4 sm:px-0 order-1 ${s.imageRight ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="max-w-2xl mx-auto md:mx-0">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-3">
                    {s.eyebrow}
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3">
                    {s.title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg text-sage-text mb-4">{s.copy}</p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link
                      to={s.cta.href}
                      className="btn-primary inline-flex items-center justify-center w-full sm:w-auto px-4 py-3"
                    >
                      {s.cta.label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>

                    <a
                      href="#contact"
                      className="btn-secondary inline-flex items-center justify-center w-full sm:w-auto px-4 py-3"
                    >
                      Contact Sales
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Media column */}
              <motion.div
                variants={itemVariants}
                className={`md:col-span-6 lg:col-span-6 px-4 sm:px-0 order-2 ${s.imageRight ? "lg:order-2" : "lg:order-1"}`}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="rounded-lg overflow-hidden shadow-xl bg-gradient-to-b from-black/20 via-transparent to-black/10"
                >
                  <div className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96">
                    {s.id === "two" ? (
                      <VideoPlayer
                        src={VIDEO_SRC_SECOND}
                        poster={VIDEO_POSTER_SECOND}
                        className="w-full h-full"
                        ariaLabel="Collaboration demo video"
                      />
                    ) : (
                      <img
                        src={s.image}
                        alt={s.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover block"
                        onError={(e) => {
                          // Hide broken images gracefully; replace with a neutral background color
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    )}

                    {/* subtle gradient overlay for polish */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* floating badge */}
                    <div className="absolute left-3 bottom-3">
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/6 text-white border border-white/8 backdrop-blur-sm">
                        <span className="font-semibold">{s.eyebrow}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default ThreeSectionPage;
