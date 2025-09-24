import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Public folder paths (leading slash)
 // Public folder paths (leading slash)
const VIDEO_SRC = '/Videos/Iot_Compressed.mp4';
const VIDEO_POSTER = '/images/video-poster.jpg';


  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sage-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20">
              <Zap className="w-3 h-3 mr-1" />
              AI WEBSITE DEVELOPMENT
            </div>

            {/* Headline */}
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center">
                Request a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              {/* Secondary CTA: opens the raw MP4 in a new tab (no in-page play/pause state) */}
              <a
                href={VIDEO_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <p className="text-sm text-sage-text mb-4">Trusted by leading research institutions</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-sage-text font-semibold">MIT</div>
                <div className="text-sage-text font-semibold">Stanford</div>
                <div className="text-sage-text font-semibold">CERN</div>
                <div className="text-sage-text font-semibold">NIH</div>
              </div>
            </div>
          </div>

          {/* Right Column - Large Video (autoplay, muted, loop) */}
          <div className="relative flex items-center justify-center">
            {/* Central Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[44rem] h-[44rem] bg-gradient-to-r from-sage-accent/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
            </div>

            <div
              className={`relative z-10 transition-all duration-700 ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {/* Video container — bigger size: max width 900px, responsive */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl w-full max-w-[700px]">
                {/* Autoplaying, muted, looping video from public/videos */}
                <video
  src={VIDEO_SRC}
  poster={VIDEO_POSTER}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  controls={false}
  className="w-full h-auto object-cover block"
  aria-label="Demo video"
>
  Your browser does not support the video tag.
</video>

              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-sage-accent/10 rounded-full animate-float delay-1000" />
            <div className="absolute bottom-8 left-8 w-12 h-12 bg-blue-400/10 rounded-full animate-float delay-2000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
