import ScrollArrow from "../ScrollArrow";

const AboutProjectSection = () => {
  return (
    <section id="about" className="min-h-0 md:min-h-[100svh] w-full max-w-full min-w-0 relative flex flex-col justify-start md:justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 overflow-x-hidden">
      <div className="max-w-3xl mx-auto w-full min-w-0">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="heading-lg mb-4 break-words">
            About the project<span className="dot-teal"></span>
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <p className="body-text text-center break-words">
            <strong>Locker Room Talks</strong> started with a simple, honest question: after you migrate, when do you feel at home again? Moving to a new country means beginning from zero—rebuilding not only your life but also your sense of self. In each episode, we talk with internationals in Finland about their joys, struggles, and everything in between. We believe migration changes everyone—the ones who arrive and the ones who welcome. This is not a commentary about immigration. It's a space for lived experience, reflection, and exchange. Currently in production. Releasing early 2026.
          </p>
        </div>

        <div id="about-arrow" className="hero-bottom-group flex flex-col items-center mt-8 sm:mt-12 md:mt-20">
          <ScrollArrow targetId="team" />
        </div>
      </div>
    </section>
  );
};

export default AboutProjectSection;
