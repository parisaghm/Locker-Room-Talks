import { useState, useCallback } from "react";
import ScrollArrow from "../ScrollArrow";

const HeroSection = () => {
  const [videoFailed, setVideoFailed] = useState(false);

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  return (
    <section id="hero" className="section-full flex flex-col items-center justify-center relative px-6 py-20">
      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        {/* Pink Dot above title */}
        <div className="mb-6">
          <span className="inline-block w-8 h-8 md:w-10 md:h-10 rounded-full" style={{ backgroundColor: '#a00303' }}></span>
        </div>

        {/* Title block — video visible only inside the text (mask) */}
        <div
          className="relative mb-6 w-full flex justify-center rounded-sm title-video-mask-wrapper"
          style={{
            padding: '0.5rem 0',
            overflow: 'visible',
          }}
        >
          {/* Text for layout and semantics — hidden visually, keeps box size and a11y */}
          <h1
            className="hero-title font-bold tracking-tight px-2"
            style={{
              letterSpacing: '-0.02em',
              visibility: 'hidden',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'visible',
              textOverflow: 'clip',
              lineHeight: 1,
            }}
          >
            Locker Room Talks
          </h1>

          {/* SVG mask definition — text shape only (white = visible); font-size matches title */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hero-title"
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="titleVideoMask">
                <rect width="100%" height="100%" fill="black" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontFamily="'DM Sans', system-ui, sans-serif"
                  fontWeight="800"
                  fontSize="1em"
                  letterSpacing="-0.02em"
                >
                  Locker Room Talks
                </text>
              </mask>
            </defs>
          </svg>

          {/* Video layer — masked so video shows only inside the text */}
          <div
            className="absolute inset-0 z-0 overflow-hidden rounded-sm title-video-mask-layer"
            style={{
              WebkitMaskImage: 'url(#titleVideoMask)',
              maskImage: 'url(#titleVideoMask)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          >
            {!videoFailed ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full"
                aria-hidden
                onError={handleVideoError}
              >
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
              </video>
            ) : null}
            {/* Fallback when video fails */}
            <div
              className="absolute inset-0 w-full h-full rounded-sm"
              style={{
                background: 'linear-gradient(180deg, rgba(250, 248, 245, 0.4) 0%, rgba(240, 238, 235, 0.6) 100%)',
              }}
            />
            {/* Semi-transparent overlay for readability (only when video is showing) */}
            {!videoFailed && (
              <div
                className="absolute inset-0 w-full h-full rounded-sm bg-black"
                style={{ opacity: 0.45 }}
                aria-hidden
              />
            )}
          </div>

        </div>

        {/* Tagline */}
        <p className="tagline mb-8">
          <span className="tagline-bold">Conversations.Unfold.</span>
        </p>

        {/* Small line */}
        <p className="label-text mb-10">Follow the conversation!</p>

        {/* Body text */}
        <div className="space-y-6 mb-10">
          <p className="body-text text-center">
            <strong>Locker Room Talks</strong> is a documentary video-podcast shaped around long-form conversation.
            Each episode brings together voices from different backgrounds living in Finland,
            opening space for thoughtful dialogue shaped by lived experience, cultural context, and reflection.
            Through conversation and carefully curated visual inserts, the series offers perspectives
            worth listening to — not to explain, but to understand. This is not a commentary about immigration.
            It is a space for lived experience, reflection, and exchange. Currently in production. Releasing early 2026.
          </p>
        </div>

        {/* Link label */}
        <a
          href="#about"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Behind this project
        </a>
      </div>

      {/* Scroll Arrow */}
      <ScrollArrow targetId="team" />
    </section>
  );
};

export default HeroSection;
