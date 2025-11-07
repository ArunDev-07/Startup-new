// File: src/components/Hero.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const VIDEO_SRC = '/Videos/Iot_Compressed.mp4';
const VIDEO_POSTER = '/images/video-poster.jpg';

const Hero: React.FC = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const mm = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mm);
    mm.addEventListener?.('change', handler);
    return () => mm.removeEventListener?.('change', handler);
  }, []);

  // Try to play the muted video programmatically.
  // Keep controls OFF on all viewports as requested.
  useEffect(() => {
    const play = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (e) {
          // Some browsers still prevent play without interaction; silently ignore.
        }
      }
    };
    play();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden">
      {/* Decorative backgrounds (reduced on small screens) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block absolute top-1/4 right-1/4 w-96 h-96 bg-sage-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="hidden md:block absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="space-y-8 px-4 sm:px-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20">
              <Zap className="w-3 h-3 mr-1" />
              AI WEBSITE DEVELOPMENT
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Build your science
                <br />
                with <span className="gradient-text">intelligence</span>
              </h1>

              <p className="text-lg lg:text-xl text-sage-text max-w-2xl">
                Our AI-powered website development platform empowers global
                research institutions with intelligent web solutions to easily gather, analyze,
                and present their scientific data reliably, at lightning speed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center">
                Request a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <a href={VIDEO_SRC} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo (opens raw file)
              </a>
            </div>

            <div className="pt-8">
              <p className="text-sm text-sage-text mb-4">Trusted by leading research institutions</p>
              <div className="flex flex-wrap items-center gap-4 opacity-80 text-sm font-semibold text-sage-text">
                <div>MIT</div>
                <div>Stanford</div>
                <div>CERN</div>
                <div>NIH</div>
              </div>
            </div>
          </div>

          {/* Right column - video */}
          <div className="relative flex items-center justify-center px-4 sm:px-0">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="hidden lg:block w-[44rem] h-[44rem] bg-gradient-to-r from-sage-accent/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className={`relative z-10 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="relative rounded-lg overflow-hidden shadow-2xl w-full max-w-[700px]">
                {/* Video always present; controls intentionally removed */}
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  poster={VIDEO_POSTER}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  controls={false}
                  className="w-full h-auto object-cover block"
                  aria-label="Demo video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="absolute top-8 right-8 w-16 h-16 bg-sage-accent/10 rounded-full animate-float hidden lg:block" />
            <div className="absolute bottom-8 left-8 w-12 h-12 bg-blue-400/10 rounded-full animate-float hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;






