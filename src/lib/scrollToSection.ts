/**
 * Homepage section navigation.
 *
 * Compact section spacing is a layout concern. Arrow / menu navigation is a
 * separate viewport-positioning concern: we scroll to an intentional offset
 * instead of stretching sections with extra margin.
 */

export type SectionScrollMetrics = {
  elementTop: number;
  elementHeight: number;
  headingOffset: number;
  viewportHeight: number;
  documentHeight: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

/** Optical reading position for a section heading, as a fraction of the viewport. */
const HEADING_FOCUS_RATIO = 0.38;

/**
 * How far the following section may enter the viewport. Kept smaller than a
 * typical section heading offset (~100px) so the next heading stays off-screen.
 */
const MAX_NEXT_PEEK_PX = 48;

export function calculateSectionScrollTop({
  elementTop,
  elementHeight,
  headingOffset,
  viewportHeight,
  documentHeight,
}: SectionScrollMetrics): number {
  const maxScroll = Math.max(0, documentHeight - viewportHeight);

  if (elementHeight >= viewportHeight) {
    return Math.round(clamp(elementTop, 0, maxScroll));
  }

  const endAlign = elementTop + elementHeight - viewportHeight;
  const startAlign = elementTop;
  const headingAlign = elementTop + headingOffset - viewportHeight * HEADING_FOCUS_RATIO;
  const latestAllowed = endAlign + MAX_NEXT_PEEK_PX;

  const target = clamp(headingAlign, endAlign, Math.min(latestAllowed, startAlign));

  return Math.round(clamp(target, 0, maxScroll));
}

function readSectionMetrics(element: HTMLElement): SectionScrollMetrics {
  const rect = element.getBoundingClientRect();
  const heading = element.querySelector<HTMLElement>("h1, h2");
  const headingOffset = heading
    ? heading.getBoundingClientRect().top - rect.top
    : 0;

  return {
    elementTop: window.scrollY + rect.top,
    elementHeight: rect.height,
    headingOffset,
    viewportHeight: window.innerHeight,
    documentHeight: Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    ),
  };
}

/** Smooth-scroll the viewport so `sectionId` is the clear visual focus. */
export function scrollToSection(sectionId: string): void {
  const id = sectionId.replace(/^#/, "");
  const element = document.getElementById(id);
  if (!element) return;

  window.scrollTo({
    top: calculateSectionScrollTop(readSectionMetrics(element)),
    behavior: "smooth",
  });
}
