import ScrollArrow from "../ScrollArrow";
import pencilInfinity from "@/assets/pencil-infinity.png";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${pencilInfinity})`,
        backgroundPosition: 'bottom left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full">
        {/* Content positioned to the right */}
        <div className="min-h-screen flex items-center justify-end">
          <div className="max-w-lg py-16">
          <h2 className="heading-lg mb-8">
            about<span className="dot-pink"></span>
          </h2>

          <p className="body-text mb-8">
            <strong>Locker Room Talks</strong> is a documentary video-podcast shaped around long-form conversation. 
            Each episode brings together voices from different backgrounds living in Finland, 
            opening space for thoughtful dialogue shaped by lived experience, cultural context, and reflection. 
            Through conversation and carefully curated visual inserts, the series offers perspectives 
            worth listening to — not to explain, but to understand. This is not a commentary about immigration. 
            It is a space for lived experience, reflection, and exchange. Currently in production. Releasing early 2026.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-12">
            <a href="#" className="link-arrow">
              documentary style <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="link-arrow">
              long-form <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="link-arrow">
              visual inserts <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="link-arrow">
              lived experience <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          </div>
        </div>
      </div>

      <ScrollArrow targetId="team" />
    </section>
  );
};

export default AboutSection;
