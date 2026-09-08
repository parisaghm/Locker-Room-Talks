import ScrollArrow from "../ScrollArrow";
import JournalIntroCopy from "../journal/JournalIntroCopy";
import LatestJournalSection from "./LatestJournalSection";

const HomeJournalIntro = () => {
  return (
    <section id="journal" className="page-section home-content-section">
      <div className="section-container">
        {/*
          The Journal intro runs long — four sentences against the one or two
          every other section's heading block carries — so the shared
          `--section-gap-heading` (32px at its ceiling) leaves the feature
          crowded up against the last line. These utilities sit in Tailwind's
          utilities layer and so override the components-layer default for this
          section alone, leaving Team, Gallery, About and Contact untouched.
          Gap after the intro copy: 56px / 64px / 88px.
        */}
        <header className="text-center section-heading-block mb-14 md:mb-16 lg:mb-[5.5rem]">
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
