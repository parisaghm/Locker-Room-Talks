/**
 * The Journal's standing introduction, rendered under the "journal." heading in
 * two places: the homepage section (HomeJournalIntro) and the /journal page.
 * It lives here so the copy has a single home — the two used to hold their own
 * copies of the sentence and drifted apart when one was edited.
 *
 * Type comes from `.body-text`, the same class as the Team section description
 * (TeamSection.tsx), centered by the parent header's `text-center` — so font,
 * size, weight, colour, and line-height stay identical to Team by construction.
 *
 * Two deliberate departures from Team's class list: the long paragraph runs to a
 * 49rem measure rather than Team's `max-w-2xl` (42rem), and carries `mt-4 sm:mt-5`
 * for the small gap under the opener. Both are box metrics, not typography.
 */
const JournalIntroCopy = () => {
  return (
    <>
      <p className="body-text max-w-2xl mx-auto break-words">
        Where the podcast slows down.
      </p>
      <p className="body-text max-w-[49rem] mx-auto break-words mt-4 sm:mt-5">
        Stories of those we know less. The excitement of arriving. The realities
        that follow. The identities, cultures, struggles, and connections carried
        along the way. Stories told not only to understand migration, but to
        understand one another and the Finland we are building together.
      </p>
    </>
  );
};

export default JournalIntroCopy;
