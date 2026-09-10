import { useState, useCallback, useRef, useEffect } from "react";
import ScrollArrow from "../ScrollArrow";

const HeroSection = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
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
            width="302"
            height="247"
            viewBox="0 0 302 247"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Locker Room Talks Logo"
            className="w-16 h-auto sm:w-24 md:w-32 lg:w-40"
            preserveAspectRatio="xMidYMid meet"
          >
            {/*
              Two mirrored quotation-mark figures. `hero-figure` cycles colour
              on the group rather than the shapes, so each figure's head and
              body move together; `--trail` puts the second half a cycle
              behind so the two never match. The `fill` attributes are the
              reduced-motion fallback, where the animation is dropped.
            */}
            <g fill="#343739" className="hero-figure">
              <circle cx="68.5" cy="35.5" r="35.5" />
              <path d="M132 87L63 87C28.2 87 0 116 0 150C0 216.5 61.6 246.5 133 246.5C108 231.5 81.5 198 83 185.5L111 185.5Q120.3 185.5 132 168.5Z" />
            </g>
            <g
              fill="#53C29E"
              className="hero-figure hero-figure--trail"
              transform="translate(302 0) scale(-1 1)"
            >
              <circle cx="68.5" cy="35.5" r="35.5" />
              <path d="M132 87L63 87C28.2 87 0 116 0 150C0 216.5 61.6 246.5 133 246.5C108 231.5 81.5 198 83 185.5L111 185.5Q120.3 185.5 132 168.5Z" />
            </g>
          </svg>
        </div>

        {/* Title block with video mask */}
        <div className="relative mb-6 px-4">
          {/*
            The real page heading. The title people see is a <video> clipped by
            an SVG text mask, and mask text is not in the DOM, so the accessible
            and crawlable heading has to live here. `sr-only` is position:absolute
            with a 1px clip, so it adds no layout and changes nothing visually.
            Keep the text identical to what the mask renders below.
          */}
          <h1 className="sr-only">Locker Room Talks</h1>

          {/*
            Measuring ruler only — sized by getBoundingClientRect() above to
            drive the video mask. It needs REAL layout dimensions, so it cannot
            use sr-only; leave visibility:hidden and position:absolute as they
            are. aria-hidden keeps it from being announced twice.
          */}
          <span
            ref={textRef}
            aria-hidden="true"
            className="hero-title font-bold tracking-tight leading-none text-center"
            style={{
              display: "block",
              letterSpacing: "-0.02em",
              margin: 0,
              whiteSpace: "nowrap",
              lineHeight: 1,
              visibility: "hidden",
              position: "absolute",
            }}
          >
            Locker Room Talks
          </span>

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
              /* Visual fallback when the video cannot play. The real <h1> is
                 the sr-only one above, so this is decorative. */
              <span
                aria-hidden="true"
                className="hero-title font-bold tracking-tight leading-none text-center"
                style={{
                  display: "block",
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
              </span>
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
