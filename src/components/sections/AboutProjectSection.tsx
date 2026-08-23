import ScrollArrow from "../ScrollArrow";

const AboutProjectSection = () => {
  return (
    <section id="about" className="page-section home-content-section">
      <div className="section-container">
        <header className="text-center section-heading-block">
          <h2 className="heading-lg break-words">
            About the project<span className="dot-yellow"></span>
          </h2>
        </header>

        <div className="space-y-4 sm:space-y-6">
          <p className="body-text text-center break-words">
            <strong>Locker Room Talks</strong> started with a simple, honest question: after you migrate, when do you feel at home again? Moving to a new country means beginning from zero—rebuilding not only your life but also your sense of self. In each episode, we talk with internationals in Finland about their joys, struggles, and everything in between. We believe migration changes everyone—the ones who arrive and the ones who welcome. This is not a commentary about immigration. It's a space for lived experience, reflection, and exchange. Currently in production. Releasing early 2026.
          </p>
        </div>

        <div className="section-scroll-group">
          <ScrollArrow targetId="contact" />
        </div>
      </div>
    </section>
  );
};

export default AboutProjectSection;
