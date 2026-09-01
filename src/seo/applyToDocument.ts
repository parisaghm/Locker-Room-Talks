/**
 * Browser-side counterpart to head.ts.
 *
 * Removes every `[data-seo]` node from <head> and recreates the full set for
 * the current route. Replacing wholesale rather than upserting matters: a
 * per-tag upsert would leave a stale `robots: noindex` behind after navigating
 * off a placeholder article onto a real one.
 */
import { headTagsFor, serializeJsonLd } from "./head";
import type { RouteSeo } from "./types";

export function applySeoToDocument(seo: RouteSeo): void {
  if (typeof document === "undefined") return;

  const head = document.head;
  head.querySelectorAll("[data-seo]").forEach((node) => {
    // The prerendered <title data-seo> is replaced via document.title below.
    if (node.tagName !== "TITLE") node.remove();
  });

  document.title = seo.title;

  for (const { tag, attrs } of headTagsFor(seo)) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, value);
    }
    element.setAttribute("data-seo", "");
    head.appendChild(element);
  }

  if (seo.jsonLd.length > 0) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo", "");
    script.textContent = serializeJsonLd(seo.jsonLd);
    head.appendChild(script);
  }
}
