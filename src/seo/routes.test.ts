import { describe, expect, it } from "vitest";
import {
  getAdjacentArticles,
  getRelatedArticles,
  journalArticles,
  publishedJournalArticles,
} from "@/data/journalArticles";
import {
  buildRouteSeo,
  getRouteSeo,
  isPublished,
  notFoundRoute,
  publishedArticles,
} from "./routes";
import { headTagsFor, renderHeadTags, serializeJsonLd } from "./head";
import { MAX_DESCRIPTION, SITE_ORIGIN, truncateDescription } from "./site";
import type { RouteSeo } from "./types";

const routes = buildRouteSeo();
const byPath = (path: string): RouteSeo => {
  const route = routes.find((r) => r.path === path);
  if (!route) throw new Error(`no route for ${path}`);
  return route;
};

const PLACEHOLDER_SLUGS = [
  "home-is-a-conversation",
  "the-weight-of-a-new-language",
  "belonging-between-two-places",
  "behind-the-mic",
  "the-table-we-share",
  "what-the-locker-room-taught-us",
  "winter-and-the-art-of-staying",
  "conversations-that-refuse-to-end",
];

const PUBLISHED_SLUGS = [
  "what-does-it-mean-to-belong",
  "what-happens-to-us-when-we-leave-home",
];

describe("route coverage", () => {
  /**
   * Guards the failure mode that made every URL except "/" a hard 404: a route
   * exists in App.tsx but has no SEO entry, so no HTML file is prerendered for
   * it. Add a route to App.tsx -> add it here.
   */
  it("covers exactly the routes declared in App.tsx", () => {
    expect(new Set(routes.map((r) => r.path))).toEqual(
      new Set([
        "/",
        "/journal",
        "/voices",
        "/gallery",
        ...journalArticles.map((a) => `/journal/${a.slug}`),
      ])
    );
  });

  it("has one entry per article and no duplicates", () => {
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(routes).toHaveLength(4 + journalArticles.length);
  });
});

describe("indexing policy", () => {
  it("indexes exactly the six real pages", () => {
    expect(
      routes.filter((r) => r.robots === "index").map((r) => r.path).sort()
    ).toEqual(
      [
        "/",
        "/gallery",
        "/journal",
        "/voices",
        ...PUBLISHED_SLUGS.map((s) => `/journal/${s}`),
      ].sort()
    );
  });

  it("noindexes every placeholder article and keeps it out of the sitemap", () => {
    for (const slug of PLACEHOLDER_SLUGS) {
      const route = byPath(`/journal/${slug}`);
      expect(route.robots, slug).toBe("noindex");
      expect(route.sitemap, slug).toBe(false);
      expect(route.article, slug).toBeUndefined();
    }
  });

  it("emits no Article node for placeholders", () => {
    for (const slug of PLACEHOLDER_SLUGS) {
      const types = byPath(`/journal/${slug}`).jsonLd.map(
        (n) => (n as { "@type": string })["@type"]
      );
      expect(types, slug).not.toContain("Article");
    }
  });

  it("derives published state from publishedAt, not a hard-coded list", () => {
    expect(journalArticles.filter(isPublished).map((a) => a.slug).sort()).toEqual(
      [...PUBLISHED_SLUGS].sort()
    );
  });

  it("never indexes the 404 page", () => {
    expect(notFoundRoute().robots).toBe("noindex");
    expect(notFoundRoute().sitemap).toBe(false);
  });
});

describe("internal link graph", () => {
  /**
   * Published stories must never link out to placeholder copy: it wastes crawl
   * budget and points readers at filler text.
   */
  it("never surfaces a placeholder as a related story", () => {
    for (const slug of PUBLISHED_SLUGS) {
      const related = getRelatedArticles(slug).map((a) => a.slug);
      expect(related, slug).not.toContain(slug);
      for (const placeholder of PLACEHOLDER_SLUGS) {
        expect(related, `${slug} -> ${placeholder}`).not.toContain(placeholder);
      }
    }
  });

  it("never surfaces a placeholder as previous/next", () => {
    for (const slug of PUBLISHED_SLUGS) {
      const { previous, next } = getAdjacentArticles(slug);
      for (const neighbour of [previous, next]) {
        if (!neighbour) continue;
        expect(PLACEHOLDER_SLUGS, `${slug} -> ${neighbour.slug}`).not.toContain(
          neighbour.slug
        );
      }
    }
  });

  it("keeps one shared definition of published", () => {
    expect(publishedJournalArticles.map((a) => a.slug).sort()).toEqual(
      [...PUBLISHED_SLUGS].sort()
    );
    expect(publishedArticles()).toBe(publishedJournalArticles);
  });
});

describe("sitemap", () => {
  const inSitemap = routes.filter((r) => r.sitemap !== false);

  it("contains exactly six URLs", () => {
    expect(inSitemap).toHaveLength(6);
  });

  it("carries a content-derived lastmod, never a build timestamp", () => {
    for (const route of inSitemap) {
      const { lastmod } = route.sitemap as { lastmod: string };
      expect(lastmod, route.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("uses each article's own publishedAt", () => {
    expect(byPath("/journal/what-does-it-mean-to-belong").sitemap).toEqual({
      lastmod: "2026-08-26",
    });
  });
});

describe("canonical URLs", () => {
  it("always uses the www origin", () => {
    for (const route of [...routes, notFoundRoute()]) {
      expect(route.canonical, route.path).toMatch(
        new RegExp(`^${SITE_ORIGIN.replace(/[.]/g, "\\.")}`)
      );
    }
  });

  it("has no trailing slash except on the homepage", () => {
    expect(byPath("/").canonical).toBe(`${SITE_ORIGIN}/`);
    for (const route of routes.filter((r) => r.path !== "/")) {
      expect(route.canonical.endsWith("/"), route.path).toBe(false);
    }
  });

  it("never emits the bare apex host", () => {
    for (const route of routes) {
      expect(route.canonical).not.toMatch(/https:\/\/lockerroomtalks\.net/);
    }
  });
});

describe("titles and descriptions", () => {
  it("are unique across indexable routes", () => {
    const indexable = routes.filter((r) => r.robots === "index");
    expect(new Set(indexable.map((r) => r.title)).size).toBe(indexable.length);
    expect(new Set(indexable.map((r) => r.description)).size).toBe(
      indexable.length
    );
  });

  it("fit search result limits", () => {
    for (const route of routes) {
      expect(route.title.length, `title: ${route.path}`).toBeGreaterThanOrEqual(
        15
      );
      expect(route.title.length, `title: ${route.path}`).toBeLessThanOrEqual(70);
      expect(
        route.description.length,
        `description: ${route.path}`
      ).toBeGreaterThanOrEqual(50);
      expect(
        route.description.length,
        `description: ${route.path}`
      ).toBeLessThanOrEqual(MAX_DESCRIPTION);
    }
  });

  it("names the brand on every page", () => {
    for (const route of routes) {
      expect(route.title, route.path).toContain("Locker Room Talks");
    }
  });

  it("leads the homepage title with the brand", () => {
    expect(byPath("/").title.startsWith("Locker Room Talks")).toBe(true);
  });

  it("truncates on a word boundary", () => {
    const long = `${"word ".repeat(60)}end`;
    const result = truncateDescription(long);
    expect(result.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
    expect(result.endsWith("…")).toBe(true);
    expect(result).not.toMatch(/\s…$/);
    expect(truncateDescription("short enough")).toBe("short enough");
  });
});

describe("Open Graph images", () => {
  it("are absolute and never leak a dev asset URL", () => {
    for (const route of routes) {
      expect(route.ogImage.url, route.path).toMatch(/^https:\/\//);
      expect(route.ogImage.url, route.path).not.toContain("/src/");
      expect(route.ogImage.url, route.path).not.toContain("localhost");
    }
  });

  it("gives each published article its own card", () => {
    for (const slug of PUBLISHED_SLUGS) {
      expect(byPath(`/journal/${slug}`).ogImage.url).toBe(
        `${SITE_ORIGIN}/og/${slug}.jpg`
      );
    }
  });

  it("declares 1200x630 so cards render landscape", () => {
    for (const route of routes) {
      expect(route.ogImage.width, route.path).toBe(1200);
      expect(route.ogImage.height, route.path).toBe(630);
      expect(route.ogImage.alt.length, route.path).toBeGreaterThan(0);
    }
  });
});

describe("structured data", () => {
  it("describes the organisation and website on the homepage", () => {
    const types = byPath("/").jsonLd.map(
      (n) => (n as { "@type": string })["@type"]
    );
    expect(types).toEqual(["Organization", "WebSite"]);
  });

  it("claims only real, verified profiles in sameAs", () => {
    const org = byPath("/").jsonLd[0] as { sameAs: string[] };
    expect(org.sameAs).toEqual([
      "https://podcasts.apple.com/us/podcast/locker-room-talks/id1896566745",
    ]);
  });

  it("gives published articles a complete Article node", () => {
    for (const slug of PUBLISHED_SLUGS) {
      const article = byPath(`/journal/${slug}`).jsonLd[0] as Record<
        string,
        unknown
      >;
      expect(article["@type"], slug).toBe("Article");
      expect(article.headline, slug).toBeTruthy();
      expect(article.description, slug).toBeTruthy();
      expect(article.datePublished, slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.author, slug).toMatchObject({ "@type": "Person" });
      expect(article.publisher, slug).toBeTruthy();
      expect(article.image, slug).toMatchObject({ "@type": "ImageObject" });
      expect(article.mainEntityOfPage, slug).toContain(SITE_ORIGIN);
      expect(article.wordCount as number, slug).toBeGreaterThan(500);
    }
  });

  it("omits the item on the final breadcrumb, per Google", () => {
    const crumbs = byPath("/journal/what-does-it-mean-to-belong").jsonLd.find(
      (n) => (n as { "@type": string })["@type"] === "BreadcrumbList"
    ) as { itemListElement: Array<Record<string, unknown>> };
    const last = crumbs.itemListElement[crumbs.itemListElement.length - 1];
    expect(last.item).toBeUndefined();
    expect(crumbs.itemListElement[0].item).toBe(`${SITE_ORIGIN}/`);
  });

  it("lists only published articles on the journal index", () => {
    const collection = byPath("/journal").jsonLd[0] as {
      mainEntity: { itemListElement: Array<{ url: string }> };
    };
    expect(collection.mainEntity.itemListElement).toHaveLength(2);
    for (const item of collection.mainEntity.itemListElement) {
      expect(PLACEHOLDER_SLUGS.some((s) => item.url.includes(s))).toBe(false);
    }
  });

  it("escapes < so content can never close the script tag early", () => {
    const json = serializeJsonLd([{ note: "</script><script>alert(1)</script>" }]);
    expect(json).not.toContain("</script");
    expect(JSON.parse(json.replace(/\\u003c/g, "<"))).toBeTruthy();
  });
});

describe("head rendering", () => {
  it("emits canonical, robots and og:url for every route", () => {
    for (const route of routes) {
      const tags = headTagsFor(route);
      const canonical = tags.find((t) => t.attrs.rel === "canonical");
      expect(canonical?.attrs.href, route.path).toBe(route.canonical);
      expect(
        tags.find((t) => t.attrs.name === "robots")?.attrs.content,
        route.path
      ).toContain(route.robots === "noindex" ? "noindex" : "index");
      expect(
        tags.find((t) => t.attrs.property === "og:url")?.attrs.content,
        route.path
      ).toBe(route.canonical);
    }
  });

  it("marks every tag with data-seo so navigation can replace them", () => {
    const html = renderHeadTags(byPath("/journal"));
    const tagCount = (html.match(/<(meta|link|script|title)\b/g) ?? []).length;
    const seoCount = (html.match(/data-seo/g) ?? []).length;
    expect(seoCount).toBe(tagCount);
  });

  it("escapes quotes and ampersands in attributes", () => {
    const html = renderHeadTags(byPath("/journal"));
    expect(html).toContain("Migration &amp; Belonging");
  });
});

describe("getRouteSeo", () => {
  it("resolves known paths", () => {
    expect(getRouteSeo("/journal").title).toBe(byPath("/journal").title);
  });

  it("ignores a trailing slash", () => {
    expect(getRouteSeo("/journal/").path).toBe("/journal");
  });

  it("falls back to the 404 entry instead of throwing", () => {
    // A throw here would white-screen the app on every unmatched URL.
    for (const garbage of ["/nope", "/journal/does-not-exist", "//", "/a/b/c"]) {
      expect(() => getRouteSeo(garbage)).not.toThrow();
      expect(getRouteSeo(garbage).robots).toBe("noindex");
    }
  });

  it("still resolves the homepage", () => {
    expect(getRouteSeo("/").path).toBe("/");
  });
});
