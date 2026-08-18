import { describe, expect, it } from "vitest";
import { calculateSectionScrollTop } from "./scrollToSection";

/** Measured at 1440×900 from the compact homepage layout. */
const DESKTOP = {
  viewportHeight: 900,
  documentHeight: 6200,
  about: { elementTop: 900, elementHeight: 548, headingOffset: 100 },
  journal: { elementTop: 1448, elementHeight: 968, headingOffset: 100 },
  journalHeadingTop: 1548,
  heroTitleBottom: 544,
};

describe("calculateSectionScrollTop", () => {
  it("pins a tall section to the top of the viewport", () => {
    expect(
      calculateSectionScrollTop({
        ...DESKTOP.journal,
        viewportHeight: DESKTOP.viewportHeight,
        documentHeight: DESKTOP.documentHeight,
      }),
    ).toBe(DESKTOP.journal.elementTop);
  });

  it("frames a short About section without revealing the Journal heading", () => {
    const top = calculateSectionScrollTop({
      ...DESKTOP.about,
      viewportHeight: DESKTOP.viewportHeight,
      documentHeight: DESKTOP.documentHeight,
    });

    const aboutTopInView = DESKTOP.about.elementTop - top;
    const aboutBottomInView = aboutTopInView + DESKTOP.about.elementHeight;
    const journalHeadingInView = DESKTOP.journalHeadingTop - top;

    expect(top).toBeGreaterThanOrEqual(DESKTOP.heroTitleBottom);
    expect(aboutTopInView).toBeGreaterThan(0);
    expect(aboutBottomInView).toBeGreaterThan(DESKTOP.viewportHeight * 0.85);
    expect(journalHeadingInView).toBeGreaterThanOrEqual(DESKTOP.viewportHeight);
  });

  it("does not use start-alignment for a short section", () => {
    const top = calculateSectionScrollTop({
      ...DESKTOP.about,
      viewportHeight: DESKTOP.viewportHeight,
      documentHeight: DESKTOP.documentHeight,
    });

    expect(top).toBeLessThan(DESKTOP.about.elementTop);
  });

  it("clamps to the start of the document", () => {
    expect(
      calculateSectionScrollTop({
        elementTop: 0,
        elementHeight: 400,
        headingOffset: 80,
        viewportHeight: 900,
        documentHeight: 900,
      }),
    ).toBe(0);
  });

  it("clamps to the maximum scroll for a short final section", () => {
    expect(
      calculateSectionScrollTop({
        elementTop: 800,
        elementHeight: 200,
        headingOffset: 40,
        viewportHeight: 900,
        documentHeight: 1000,
      }),
    ).toBe(100);
  });
});
