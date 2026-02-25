import { useState, useCallback, useRef, useEffect } from "react";
import ScrollArrow from "../ScrollArrow";

const HeroSection = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setTextDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section relative w-full h-[100svh] flex flex-col items-center justify-center px-6 py-8 overflow-hidden"
    >
      {/* Dot + Title (NOT constrained by max-w-3xl) */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="mb-6">
          <svg
            width="90"
            height="52"
            viewBox="0 0 90 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Locker Room Talks Logo"
            className="w-32 h-auto sm:w-36 md:w-44 lg:w-52"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M45.1818 7.99902C45.1818 21 42.6435 44.3949 8.12256 43.9949"
              stroke="#000000"
              strokeOpacity="0.8"
              strokeWidth="13.5"
              strokeLinecap="round"
            />
            <ellipse
              cx="13.1992"
              cy="12.9985"
              rx="13.1992"
              ry="12.9985"
              className="hero-dot"
              fill="#D45A5A"
              fillOpacity="0.5"
            />
            <path
              d="M45.3735 8.02441C45.3735 21 47.3565 45.395 81.8774 44.995"
              stroke="#000000"
              strokeOpacity="0.5"
              strokeWidth="13.5"
              strokeLinecap="round"
            />
            <ellipse
              cx="13.1992"
              cy="12.9985"
              rx="13.1992"
              ry="12.9985"
              transform="matrix(-1 0 0 1 90 0.999512)"
              className="hero-dot"
              fill="#D45A5A"
            />
            <defs>
              <linearGradient
                id="paint0_linear_21_2"
                x1="51.7641"
                y1="20.454"
                x2="86.6226"
                y2="50.2449"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A10203" />
                <stop offset="1" stopColor="#A10203" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title block with video mask */}
        <div className="relative mb-6 px-4">
          {/* Hidden text to measure dimensions */}
          <h1
            ref={textRef}
            className="hero-title font-bold tracking-tight leading-none text-center"
            style={{
              letterSpacing: "-0.02em",
              margin: 0,
              whiteSpace: "nowrap",
              lineHeight: 1,
              visibility: "hidden",
              position: "absolute",
            }}
          >
            Locker Room Talks
          </h1>

          {/* Video masked to text shape */}
          <div
            className="relative"
            style={{
              width: textDimensions.width || "auto",
              height: textDimensions.height || "auto",
            }}
          >
            {!videoFailed && textDimensions.width > 0 ? (
              <div
                style={{
                  position: "relative",
                  width: textDimensions.width,
                  height: textDimensions.height,
                  WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='${textDimensions.width}' height='${textDimensions.height}'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='central' font-family='Gilroy-Bold, DM Sans, system-ui, sans-serif' font-weight='800' font-size='${textDimensions.height * 0.9}px' letter-spacing='-0.02em' fill='white'>Locker Room Talks</text></svg>`
                  )}")`,
                  maskImage: `url("data:image/svg+xml,${encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='${textDimensions.width}' height='${textDimensions.height}'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='central' font-family='Gilroy-Bold, DM Sans, system-ui, sans-serif' font-weight='800' font-size='${textDimensions.height * 0.9}px' letter-spacing='-0.02em' fill='white'>Locker Room Talks</text></svg>`
                  )}")`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  style={{ minWidth: "100%", minHeight: "100%" }}
                  onError={handleVideoError}
                >
                  <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>
                {/* Overlay for better text contrast */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            ) : (
              <h1
                className="hero-title font-bold tracking-tight leading-none text-center"
                style={{
                  letterSpacing: "-0.02em",
                  margin: 0,
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d2d 25%, #4a4a4a 50%, #2d2d2d 75%, #1a1a2e 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  animation: "gradient-shift 8s ease infinite",
                }}
              >
                Locker Room Talks
              </h1>
            )}
          </div>
        </div>

        {/* Tagline (constrained like before) */}
        <div className="max-w-3xl mx-auto">
          <p className="tagline">
            <span className="tagline-ideas">Conversations.</span>
            <span className="tagline-built">Unfold.</span>
          </p>
        </div>
      </div>

      {/* Bottom group */}
      <div className="hero-bottom-group absolute bottom-8 md:bottom-12 left-0 right-0 flex flex-col items-center gap-3">
        <span className="text-sm md:text-base text-muted-foreground cursor-default">
          Explore our purpose
        </span>
        <ScrollArrow targetId="about" />
      </div>
    </section>
  );
};

export default HeroSection;
