/**
 * Site-wide constants for SEO metadata.
 *
 * IMPORTANT: everything under src/seo/ is loaded by scripts/seo-build.mjs via
 * Vite's ssrLoadModule(), which uses DEV resolution. Never import binary assets
 * (`@/assets/*.png`) into this module graph — they resolve to dev URLs like
 * `/src/assets/x.png` instead of the hashed production path, which would bake
 * broken og:image URLs into every prerendered page.
 */

/** Canonical origin. The apex domain 308-redirects here. No trailing slash. */
export const SITE_ORIGIN = "https://www.lockerroomtalks.net";

export const SITE_NAME = "Locker Room Talks";

export const SITE_DESCRIPTION =
  "Locker Room Talks is a documentary video-podcast and journal exploring migration, belonging, identity and life in Finland through long-form conversations.";

export const SITE_LOCALE = "en";

/** Public contact, as shown in the footer. */
export const CONTACT_EMAIL = "lockerroomtalkmedia@gmail.com";

/**
 * Real, verified profiles for the project. Used in Organization.sameAs to tell
 * Google which "Locker Room Talk(s)" entity this site belongs to — the name is
 * contested by several unrelated shows, so these are the strongest signal that
 * this site owns it.
 *
 * Only add a URL here after confirming it is an official profile OF the
 * project. Individual episode watch URLs do not belong in sameAs: asserting
 * that a video is the organisation is wrong, and bad nodes get the whole graph
 * ignored. Those live as ordinary links in src/data/guests.ts instead.
 */
export const APPLE_PODCASTS_URL =
  "https://podcasts.apple.com/us/podcast/locker-room-talks/id1896566745";

/** Verified via the YouTube oEmbed author_url for the project's own uploads. */
export const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@LockerRoomTalksOfficial";

export const SAME_AS: readonly string[] = [
  YOUTUBE_CHANNEL_URL,
  APPLE_PODCASTS_URL,
];

/** Square brand icon, used for Organization.logo. */
export const LOGO_PATH = "/favicon-512x512.png";
export const LOGO_SIZE = 512;

/** Fallback social card, generated at 1200x630 by scripts/seo-build.mjs. */
export const DEFAULT_OG_IMAGE_PATH = "/og/default.jpg";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Longest meta description Google will render before truncating. */
export const MAX_DESCRIPTION = 160;

/**
 * Trims a description to fit a search snippet, cutting on a word boundary.
 * Article standfirsts run to 300+ characters; left whole, Google truncates them
 * mid-word at an arbitrary point.
 */
export function truncateDescription(
  text: string,
  max = MAX_DESCRIPTION
): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(
    /[\s,;:.\u2014-]+$/,
    ""
  )}\u2026`;
}

/** Turns a root-relative path into an absolute canonical-host URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Canonical URL for a route path. No trailing slash except the homepage. */
export function canonicalFor(path: string): string {
  if (path === "/" || path === "") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`.replace(
    /\/+$/,
    ""
  );
}
