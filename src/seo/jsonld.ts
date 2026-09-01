/**
 * Pure schema.org node builders. No React, no DOM, no assets.
 * Every field emitted here must be backed by real content — never invent data.
 */
import type { JournalArticle } from "@/data/journalArticles";
import { getArticleBody, getArticleDescription } from "@/data/journalArticles";
import {
  CONTACT_EMAIL,
  LOGO_PATH,
  LOGO_SIZE,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_ORIGIN,
  absoluteUrl,
  canonicalFor,
} from "./site";

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const LOGO_ID = `${SITE_ORIGIN}/#logo`;

export function organizationNode(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: absoluteUrl(LOGO_PATH),
      width: LOGO_SIZE,
      height: LOGO_SIZE,
      caption: SITE_NAME,
    },
    image: { "@id": LOGO_ID },
    sameAs: [...SAME_AS],
  };
}

export function webSiteNode(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LOCALE,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export interface Crumb {
  name: string;
  path?: string;
}

/** Per Google, the final crumb carries no `item`. */
export function breadcrumbNode(
  pagePath: string,
  trail: Crumb[]
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalFor(pagePath)}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.path !== undefined ? { item: canonicalFor(crumb.path) } : {}),
    })),
  };
}

export function collectionPageNode(
  pagePath: string,
  name: string,
  description: string,
  type: "CollectionPage" | "ImageGallery" = "CollectionPage",
  mainEntity?: Record<string, unknown>
): Record<string, unknown> {
  return {
    "@type": type,
    "@id": `${canonicalFor(pagePath)}#page`,
    url: canonicalFor(pagePath),
    name,
    description,
    inLanguage: SITE_LOCALE,
    isPartOf: { "@id": WEBSITE_ID },
    ...(mainEntity ? { mainEntity } : {}),
  };
}

export function itemListNode(
  articles: JournalArticle[]
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    itemListElement: articles.map((article, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonicalFor(`/journal/${article.slug}`),
      name: article.title,
    })),
  };
}

/** Counts words across every text-bearing content block. */
export function countWords(article: JournalArticle): number {
  const chunks: string[] = [];
  for (const block of getArticleBody(article)) {
    switch (block.type) {
      case "paragraph":
      case "standfirst":
      case "heading":
        chunks.push(block.text);
        break;
      case "pullquote":
        if ("text" in block && block.text) chunks.push(block.text);
        if ("lines" in block && block.lines) chunks.push(...block.lines);
        break;
      case "list":
        chunks.push(...block.items);
        break;
      case "short-line-sequence":
        chunks.push(...block.lines);
        break;
      case "paragraph-with-link":
        chunks.push(block.before, block.linkText, block.after);
        break;
      default:
        break;
    }
  }
  return chunks
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Article node for a real, published story.
 *
 * Only call this when `article.publishedAt` exists — that ISO date is the
 * structural gate separating real articles from the placeholder entries, which
 * carry only a human-readable `date` string.
 */
export function articleNode(
  article: JournalArticle,
  image: { url: string; width?: number; height?: number }
): Record<string, unknown> {
  const path = `/journal/${article.slug}`;
  const url = canonicalFor(path);
  const published = article.publishedAt as string;

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: url,
    url,
    headline: article.title,
    ...(article.subtitle ? { alternativeHeadline: article.subtitle } : {}),
    description: getArticleDescription(article),
    articleSection: article.category,
    inLanguage: SITE_LOCALE,
    wordCount: countWords(article),
    datePublished: published,
    dateModified: published,
    ...(article.author
      ? { author: { "@type": "Person", name: article.author } }
      : {}),
    publisher: { "@id": ORGANIZATION_ID },
    image: {
      "@type": "ImageObject",
      url: image.url,
      ...(image.width ? { width: image.width } : {}),
      ...(image.height ? { height: image.height } : {}),
      ...(article.imageAlt ? { caption: article.imageAlt } : {}),
      ...(article.photographer ? { creditText: article.photographer } : {}),
    },
  };
}
