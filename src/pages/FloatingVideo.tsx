import React, { useEffect, useRef } from "react";
import {  useNavigate } from "react-router-dom";
import "./Video.css";

const FloatingVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const navigate = useNavigate();

  // Hide on contact page
 

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // ignore autoplay restriction errors
      }
    };
    tryPlay();
  }, []);

  const handleClick = () => navigate("/contact");

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] cursor-pointer flex items-center justify-center"
      onClick={handleClick}
      role="button"
      aria-label="Contact us"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
        {/* SVG rotating ring (pointer-events none so clicks go to parent) */}
       <svg
  className="absolute inset-0 w-full h-full ring-svg rotate z-20"
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
  style={{ pointerEvents: "none", overflow: "visible" }}
>
  <defs>
    {/* same path radius=80 -> circumference ≈ 2π*80 ≈ 502.65 */}
    <path id="ringPath" d="M100,20 a80,80 0 1,1 0,160 a80,80 0 1,1 0,-160" />
  </defs>

  {/* Primary text — use textLength to force spacing across the full circumference */}
  <text>
    <textPath
      xlinkHref="#ringPath"
      startOffset="0"
      textLength="502.65"
      lengthAdjust="spacingAndGlyphs"
      className="ring-text"
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        fontWeight: 900,
        fontSize: 15,
        fill: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: '4px',
      }}
    >
      {/* repeat enough copies to ensure continuous flow — spacing will be adjusted by textLength */}
      CONTACT · CONTACT · CONTACT · CONTACT ·
    </textPath>
  </text>

  {/* Optional soft halo duplicate */}
 
</svg>


        {/* Circular video on top */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-lg z-10"
        >
          <source src="/Videos/contact.mp4" type="video/mp4" />
          {/* fallback if user has a webm version */}
          <source src="/Videos/contact.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default FloatingVideo;

