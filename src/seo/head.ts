/**
 * Renders a RouteSeo into the `<head>` fragment that scripts/seo-build.mjs
 * bakes into each prerendered page.
 *
 * Every element carries `data-seo` so applyToDocument can find and replace the
 * whole set on client-side navigation.
 */
import { SITE_NAME, SITE_LOCALE } from "./site";
import type { RouteSeo } from "./types";

export function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Serializes JSON-LD for inline embedding. Escaping `<` prevents a `</script>`
 * sequence inside any content string from closing the tag early.
 */
export function serializeJsonLd(nodes: unknown[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  }).replace(/</g, "\\u003c");
}

/** Flat list of the meta/link tags for a route, as {tag, attrs} pairs. */
export function headTagsFor(
  seo: RouteSeo
): Array<{ tag: string; attrs: Record<string, string> }> {
  const tags: Array<{ tag: string; attrs: Record<string, string> }> = [];

  const meta = (
    kind: "name" | "property",
    key: string,
    content: string
  ): void => {
    tags.push({ tag: "meta", attrs: { [kind]: key, content } });
  };

  meta("name", "description", seo.description);
  meta(
    "name",
    "robots",
    seo.robots === "noindex"
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  );
  meta("name", "author", SITE_NAME);

  tags.push({ tag: "link", attrs: { rel: "canonical", href: seo.canonical } });

  meta("property", "og:type", seo.ogType);
  meta("property", "og:site_name", SITE_NAME);
  meta("property", "og:locale", SITE_LOCALE);
  meta("property", "og:title", seo.title);
  meta("property", "og:description", seo.description);
  meta("property", "og:url", seo.canonical);
  meta("property", "og:image", seo.ogImage.url);
  meta("property", "og:image:alt", seo.ogImage.alt);
  if (seo.ogImage.width) {
    meta("property", "og:image:width", String(seo.ogImage.width));
  }
  if (seo.ogImage.height) {
    meta("property", "og:image:height", String(seo.ogImage.height));
  }

  if (seo.article) {
    meta("property", "article:published_time", seo.article.publishedTime);
    meta("property", "article:modified_time", seo.article.modifiedTime);
    meta("property", "article:author", seo.article.author);
    meta("property", "article:section", seo.article.section);
  }

  meta("name", "twitter:card", "summary_large_image");
  meta("name", "twitter:title", seo.title);
  meta("name", "twitter:description", seo.description);
  meta("name", "twitter:image", seo.ogImage.url);
  meta("name", "twitter:image:alt", seo.ogImage.alt);

  return tags;
}

/** The full head fragment, including <title> and the JSON-LD block. */
export function renderHeadTags(seo: RouteSeo, indent = "\t\t"): string {
  const lines: string[] = [
    `${indent}<title data-seo>${escapeText(seo.title)}</title>`,
  ];

  for (const { tag, attrs } of headTagsFor(seo)) {
    const rendered = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
      .join(" ");
    lines.push(`${indent}<${tag} ${rendered} data-seo />`);
  }

  if (seo.jsonLd.length > 0) {
    lines.push(
      `${indent}<script type="application/ld+json" data-seo>${serializeJsonLd(
        seo.jsonLd
      )}</script>`
    );
  }

  return lines.join("\n");
}
