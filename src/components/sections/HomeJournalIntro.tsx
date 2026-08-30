import ScrollArrow from "../ScrollArrow";
import LatestJournalSection from "./LatestJournalSection";

const HomeJournalIntro = () => {
  return (
    <section id="journal" className="page-section home-content-section">
      <div className="section-container">
        <header className="text-center section-heading-block">
          <h2 className="heading-lg mb-4 break-words">
            journal<span className="dot-teal"></span>
          </h2>
          <p className="body-text max-w-[700px] mx-auto text-center">
            Where the podcast slows down. Long-form writing on migration, belonging, and the quiet business of building a life between two places.
          </p>
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
