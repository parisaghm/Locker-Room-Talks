import ScrollArrow from "../ScrollArrow";

const AboutProjectSection = () => {
  return (
    <section id="about" className="h-[100svh] w-full relative flex flex-col justify-center px-6 py-10 md:py-12 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="heading-lg mb-4">
            About the project<span className="dot-teal"></span>
          </h2>
        </div>

        <div className="space-y-6 mb-8 md:mb-8">
          <p className="body-text text-center">
            <strong>Locker Room Talks</strong> is a documentary video-podcast shaped around long-form conversation.
            Each episode brings together voices from different backgrounds living in Finland,
            opening space for thoughtful dialogue shaped by lived experience, cultural context, and reflection.
            Through conversation and carefully curated visual inserts, the series offers perspectives
            worth listening to — not to explain, but to understand. This is not a commentary about immigration.
            It is a space for lived experience, reflection, and exchange. Currently in production. Releasing early 2026.
          </p>
        </div>

        <div className="hero-bottom-group flex flex-col items-center mt-12 md:mt-20">
          <ScrollArrow targetId="team" />
        </div>
      </div>
    </section>
  );
};

export default AboutProjectSection;
