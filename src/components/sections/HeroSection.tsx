import { useState, useCallback, useRef, useEffect } from "react";
import ColorDot from "../ColorDot";
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
          <ColorDot size={70} />
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
