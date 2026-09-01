import ScrollArrow from "../ScrollArrow";
import JournalIntroCopy from "../journal/JournalIntroCopy";
import LatestJournalSection from "./LatestJournalSection";

const HomeJournalIntro = () => {
  return (
    <section id="journal" className="page-section home-content-section">
      <div className="section-container">
        <header className="text-center section-heading-block">
          <h2 className="heading-lg mb-4 break-words">
            journal<span className="dot-teal"></span>
          </h2>
          <JournalIntroCopy />
        </header>

        <LatestJournalSection />

        <div className="section-scroll-group">
          <ScrollArrow targetId="gallery" />
        </div>
      </div>
    </section>
  );
};

export default HomeJournalIntro;
