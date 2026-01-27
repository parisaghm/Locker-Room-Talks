import ScrollArrow from "../ScrollArrow";

const HeroSection = () => {
  return (
    <section id="hero" className="section-full flex flex-col items-center justify-center relative px-6 py-20">
      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        {/* Pink Dot above title */}
        <div className="mb-6">
          <span className="inline-block w-8 h-8 md:w-10 md:h-10 rounded-full" style={{ backgroundColor: '#a00303' }}></span>
        </div>

        {/* Title with elegant gradient background */}
        <div className="relative mb-6 inline-block">
          {/* Minimal background element behind title - documentary style */}
          <div 
            className="absolute inset-0 -z-10 rounded-sm"
            style={{
              background: 'linear-gradient(180deg, rgba(250, 248, 245, 0.4) 0%, rgba(240, 238, 235, 0.6) 100%)',
              padding: '0.5rem 1rem',
              margin: '-0.5rem -1rem',
              backdropFilter: 'blur(2px)',
            }}
          />
          
          {/* Title with elegant gold gradient text */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none whitespace-nowrap px-4"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 25%, #d4af37 50%, #b8941f 75%, #d4af37 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'gradient-shift 8s ease infinite',
              letterSpacing: '-0.02em',
            }}
          >
            Locker Room Talks
          </h1>
        </div>

        {/* Tagline */}
        <p className="tagline mb-8">
          <span className="tagline-bold">Conversations.unfold.</span>
        </p>

        {/* Small line */}
        <p className="label-text mb-10">Follow the conversation!</p>

        {/* Body text */}
        <div className="space-y-6 mb-10">
          <p className="body-text text-center">
            Locker Room Talks is a documentary video-podcast shaped around long-form conversation. 
            Each episode brings together voices from different backgrounds living in Finland, 
            opening space for thoughtful dialogue shaped by lived experience, cultural context, and reflection. 
            Through conversation and carefully curated visual inserts, the series offers perspectives 
            worth listening to — not to explain, but to understand.
          </p>

          <p className="body-text text-center italic">
            This is not a commentary about immigration. It is a space for lived experience, 
            reflection, and exchange.
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
