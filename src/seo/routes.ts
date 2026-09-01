/**
 * Single source of truth for per-route SEO metadata.
 *
 * Consumed by BOTH:
 *   - the browser, via RouteSeoSync (client-side navigation), and
 *   - scripts/seo-build.mjs, which bakes the tags into static HTML per route.
 * They cannot drift because it is the same module.
 *
 * IMPORT RULE: this file and its dependencies may import only
 * src/data/journalArticles.ts, src/content/journal/*.ts and other src/seo files.
 * Never import src/data/guests.ts, any .tsx, or anything from src/assets/ --
 * the build script loads this through Vite ssrLoadModule(), which uses DEV
 * resolution, so a binary asset would resolve to `/src/assets/x.png` instead of
 * its hashed production URL and bake a broken og:image into every page.
 *
 * Every route in src/App.tsx must have an entry here. A missing entry means no
 * HTML file is prerendered for it, which means a hard 404 in production.
 * src/seo/routes.test.ts enforces this.
 */
import type { JournalArticle } from "@/data/journalArticles";
import {
  getArticleDescription,
  getArticleImageUrl,
  journalArticles,
} from "@/data/journalArticles";
import {
  DEFAULT_OG_IMAGE_PATH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  canonicalFor,
  truncateDescription,
} from "./site";
import {
  articleNode,
  breadcrumbNode,
  collectionPageNode,
  itemListNode,
  organizationNode,
  webSiteNode,
} from "./jsonld";
import type { RouteSeo } from "./types";

/**
 * An article counts as published when it carries an ISO `publishedAt`. The
 * placeholder entries in journalArticles.ts have only a human `date` string, so
 * this gate excludes them structurally -- no hard-coded slug list to maintain.
 * Adding a real article with a publishedAt makes it indexable automatically.
 */
export function isPublished(article: JournalArticle): boolean {
  return typeof article.publishedAt === "string" && article.publishedAt !== "";
}

export const publishedArticles = (): JournalArticle[] =>
  journalArticles.filter(isPublished);

/** Newest publishedAt across real articles; used as sitemap lastmod. */
function latestPublishedAt(): string {
  const dates = publishedArticles()
    .map((a) => a.publishedAt as string)
    .sort();
  return dates[dates.length - 1] ?? "";
}

/** Social card path for an article; generated at 1200x630 by the build script. */
export function ogImagePathFor(slug: string): string {
  return `/og/${slug}.jpg`;
}

/** Source image the build script crops the social card from. */
export function ogSourceFor(article: JournalArticle): string | undefined {
  return getArticleImageUrl(article);
}

const HOME_CRUMB = { name: "Home", path: "/" };
const JOURNAL_CRUMB = { name: "Journal", path: "/journal" };

const defaultOgImage = {
  url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
  alt: `${SITE_NAME} — documentary conversations on migration and belonging`,
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

const JOURNAL_DESCRIPTION =
  "Where the podcast slows down. Stories of those we know less: the excitement of arriving, the realities that follow, and the Finland we are building together.";

const GALLERY_DESCRIPTION =
  "Behind the scenes with Locker Room Talks: moments from the conversations, the guests and the rooms behind the documentary video-podcast in Finland.";

const VOICES_DESCRIPTION =
  "The people behind the conversations. Meet the internationals in Finland who share their joys, struggles and everything in between on Locker Room Talks.";

function homeRoute(): RouteSeo {
  return {
    path: "/",
    title: `${SITE_NAME} | Documentary Conversations on Migration & Belonging`,
    description: SITE_DESCRIPTION,
    canonical: canonicalFor("/"),
    ogType: "website",
    ogImage: defaultOgImage,
    robots: "index",
    jsonLd: [organizationNode(), webSiteNode()],
    sitemap: { lastmod: latestPublishedAt() },
  };
}

function journalRoute(): RouteSeo {
  const published = publishedArticles();
  return {
    path: "/journal",
    title: `Journal — Migration & Belonging in Finland | ${SITE_NAME}`,
    description: JOURNAL_DESCRIPTION,
    canonical: canonicalFor("/journal"),
    ogType: "website",
    ogImage: defaultOgImage,
    robots: "index",
    jsonLd: [
      collectionPageNode(
        "/journal",
        `Journal | ${SITE_NAME}`,
        JOURNAL_DESCRIPTION,
        "CollectionPage",
        itemListNode(published)
      ),
      breadcrumbNode("/journal", [HOME_CRUMB, { name: "Journal" }]),
      organizationNode(),
      webSiteNode(),
    ],
    sitemap: { lastmod: latestPublishedAt() },
  };
}

function galleryRoute(): RouteSeo {
  return {
    path: "/gallery",
    title: `Gallery — Behind the Scenes | ${SITE_NAME}`,
    description: GALLERY_DESCRIPTION,
    canonical: canonicalFor("/gallery"),
    ogType: "website",
    ogImage: defaultOgImage,
    robots: "index",
    jsonLd: [
      collectionPageNode(
        "/gallery",
        `Gallery | ${SITE_NAME}`,
        GALLERY_DESCRIPTION,
        "ImageGallery"
      ),
      breadcrumbNode("/gallery", [HOME_CRUMB, { name: "Gallery" }]),
      organizationNode(),
      webSiteNode(),
    ],
    sitemap: { lastmod: latestPublishedAt() },
  };
}

function voicesRoute(): RouteSeo {
  return {
    path: "/voices",
    title: `Voices — The People in Our Conversations | ${SITE_NAME}`,
    description: VOICES_DESCRIPTION,
    canonical: canonicalFor("/voices"),
    ogType: "website",
    ogImage: defaultOgImage,
    robots: "index",
    jsonLd: [
      collectionPageNode("/voices", `Voices | ${SITE_NAME}`, VOICES_DESCRIPTION),
      breadcrumbNode("/voices", [HOME_CRUMB, { name: "Voices" }]),
      organizationNode(),
      webSiteNode(),
    ],
    sitemap: { lastmod: latestPublishedAt() },
  };
}

function articleRoute(article: JournalArticle): RouteSeo {
  const path = `/journal/${article.slug}`;
  const published = isPublished(article);
  const description = truncateDescription(
    getArticleDescription(article) ?? SITE_DESCRIPTION
  );
  const alt = article.imageAlt ?? article.title;
  const crumbs = [HOME_CRUMB, JOURNAL_CRUMB, { name: article.title }];

  if (!published) {
    // Placeholder copy. Crawlable (so the noindex can actually be read) but
    // kept out of the index, the sitemap, and Article structured data.
    return {
      path,
      title: `${article.title} — ${SITE_NAME}`,
      description,
      canonical: canonicalFor(path),
      ogType: "article",
      ogImage: defaultOgImage,
      robots: "noindex",
      jsonLd: [breadcrumbNode(path, crumbs), webSiteNode()],
      sitemap: false,
    };
  }

  const ogImage = {
    url: absoluteUrl(ogImagePathFor(article.slug)),
    alt,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  };

  return {
    path,
    title: `${article.title} — ${SITE_NAME}`,
    description,
    canonical: canonicalFor(path),
    ogType: "article",
    ogImage,
    robots: "index",
    article: {
      publishedTime: article.publishedAt as string,
      modifiedTime: article.publishedAt as string,
      author: article.author ?? SITE_NAME,
      section: article.category,
    },
    jsonLd: [
      articleNode(article, {
        url: ogImage.url,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
      }),
      breadcrumbNode(path, crumbs),
      organizationNode(),
      webSiteNode(),
    ],
    sitemap: { lastmod: article.publishedAt as string },
  };
}

/** Metadata for the 404 page. Never in the sitemap, never indexed. */
export function notFoundRoute(): RouteSeo {
  return {
    path: "/404",
    title: `Page not found — ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    canonical: canonicalFor("/404"),
    ogType: "website",
    ogImage: defaultOgImage,
    robots: "noindex",
    jsonLd: [],
    sitemap: false,
  };
}

/** Every prerenderable route, in sitemap order. */
export function buildRouteSeo(): RouteSeo[] {
  return [
    homeRoute(),
    journalRoute(),
    voicesRoute(),
    galleryRoute(),
    ...journalArticles.map(articleRoute),
  ];
}

/**
 * Resolves a pathname to its metadata. Total by design -- an unmatched path
 * returns the 404 entry rather than throwing, because this runs inside a React
 * effect on every navigation and a throw would white-screen the app.
 */
export function getRouteSeo(pathname: string): RouteSeo {
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (
    buildRouteSeo().find((route) => route.path === normalized) ?? notFoundRoute()
  );
}
