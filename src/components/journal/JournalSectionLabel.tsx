interface JournalSectionLabelProps {
  children: string;
}

/**
 * Editorial section marker on the Journal listing: a thin rule with a small
 * turquoise eyebrow sitting on it. Used for "Featured story" and "Latest
 * stories" so the archive reads as a structured publication rather than a run
 * of cards — and so the feature is visibly tied to the stories beneath it.
 */
const JournalSectionLabel = ({ children }: JournalSectionLabelProps) => (
  <h2 className="border-t border-border pt-4 sm:pt-5 mb-8 sm:mb-10 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-accent-teal">
    {children}
  </h2>
);

export default JournalSectionLabel;
