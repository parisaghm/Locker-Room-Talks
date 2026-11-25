import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { asmaraRiazArticle } from "@/content/journal/asmara-riaz";
import { hopeMakaraArticle } from "@/content/journal/hope-makara";
import { mariiJuhtArticle } from "@/content/journal/marii-juht";
import {
  featuredJournalArticle,
  getAdjacentArticles,
  getArticleBody,
  getArticleBySlug,
  getArticleDescription,
  getArticleImageUrl,
  getArticleReadingTime,
  getArticleSubtitle,
  getRelatedArticles,
  journalArticles,
  publishedJournalArticles,
} from "@/data/journalArticles";
import { buildRouteSeo, getRouteSeo, ogSourceFor } from "@/seo/routes";
import { renderHeadTags } from "@/seo/head";
import { SITE_ORIGIN } from "@/seo/site";

const SLUG = "what-if-integration-is-not-the-end-of-the-story";
const PATH = `/journal/${SLUG}`;
const CANONICAL = `${SITE_ORIGIN}${PATH}`;
const IMAGE_DIR = "/images/journal/marii-juht";

const ROOT = path.resolve(__dirname, "../../..");
const content = mariiJuhtArticle.content ?? [];

/** Reads width/height from a JPEG's SOF marker, without a native dependency. */
function jpegSize(file: string): { width: number; height: number } {
  const buf = fs.readFileSync(file);
  let offset = 2;
  while (offset < buf.length) {
    if (buf[offset] !== 0xff) throw new Error(`bad marker in ${file}`);
    const marker = buf[offset + 1];
    const length = buf.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  throw new Error(`no SOF marker in ${file}`);
}

const publicFile = (src: string) => path.join(ROOT, "public", src.replace(/^\//, ""));

describe("Marii Juht journal article: registry", () => {
  it("is registered once and resolves from its slug", () => {
    expect(mariiJuhtArticle.slug).toBe(SLUG);
    expect(journalArticles.filter((a) => a.slug === SLUG)).toHaveLength(1);
    expect(getArticleBySlug(SLUG)).toBe(mariiJuhtArticle);
  });

  it("is published, and comes after the existing stories in publishing order", () => {
    expect(mariiJuhtArticle.publishedAt).toBe("2026-11-25");
    expect(publishedJournalArticles.map((a) => a.slug)).toEqual([
      hopeMakaraArticle.slug,
      asmaraRiazArticle.slug,
      SLUG,
    ]);
  });

  it("leaves Hope Makara as the featured story", () => {
    expect(mariiJuhtArticle.featured).toBeUndefined();
    expect(featuredJournalArticle).toBe(hopeMakaraArticle);
  });

  it("carries the confirmed metadata and nothing invented", () => {
    expect(mariiJuhtArticle.title).toBe(
      "What If Integration Is Not the End of the Story?"
    );
    expect(getArticleSubtitle(mariiJuhtArticle)).toBe(
      "Marii Juht Hakak on leaving Estonia, finding herself across countries, and why a place can matter without becoming forever."
    );
    expect(mariiJuhtArticle.category).toBe("Migration");
    expect(mariiJuhtArticle.author).toBe("Farnaz Farahdel");
    // No photographer is recorded for these photographs.
    expect(mariiJuhtArticle.photographer).toBeUndefined();
    expect(mariiJuhtArticle.date).toBe("November 2026");
    expect(getArticleReadingTime(mariiJuhtArticle)).toBe("14 min read");
    // The excerpt is the story's own opening paragraph, not new copy.
    expect(content[0]).toEqual({
      type: "paragraph",
      text: mariiJuhtArticle.excerpt,
    });
    expect(getArticleDescription(mariiJuhtArticle)).toBe(mariiJuhtArticle.excerpt);
  });
});

describe("Marii Juht journal article: content", () => {
  it("renders the document as structured blocks, without a standfirst", () => {
    const body = getArticleBody(mariiJuhtArticle);
    expect(mariiJuhtArticle.standfirst).toBeUndefined();
    expect(body).toEqual(content);
    expect(body.some((block) => "html" in block)).toBe(false);
  });

  it("keeps the document's block order and counts", () => {
    const counts = content.reduce<Record<string, number>>((acc, block) => {
      acc[block.type] = (acc[block.type] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts).toEqual({
      paragraph: 126,
      heading: 8,
      pullquote: 4,
      "after-conversation": 1,
    });
    expect(content[0].type).toBe("paragraph");
    expect(content.at(-1)?.type).toBe("after-conversation");
  });

  it("carries all eight section headings in order", () => {
    const headings = content
      .filter((block) => block.type === "heading")
      .map((block) => (block as { text: string; level: number }));

    expect(headings.every((h) => h.level === 2)).toBe(true);
    expect(headings.map((h) => h.text)).toEqual([
      "A love-driven migration",
      "Learning to be still",
      "Finland changed the way she saw Estonia",
      "Finding people in a country that values solitude",
      "If Finland were a person",
      "From talking about diversity to living it",
      "The route she stopped following",
      "Would she choose Finland again?",
    ]);
  });

  it("places each pull quote where the document does", () => {
    const textAt = (index: number) =>
      (content[index] as { text?: string }).text ?? "";
    const quotes = content
      .map((block, index) => ({ block, index }))
      .filter(({ block }) => block.type === "pullquote")
      .map(({ block, index }) => ({
        quote: (block as { text: string }).text,
        before: textAt(index - 1).slice(0, 40),
        after: textAt(index + 1).slice(0, 40),
      }));

    expect(quotes).toEqual([
      {
        quote: "“You don’t have to pretend.”",
        before: "Marii compares belonging to a puzzle. Th",
        after: "Home is more complicated.",
      },
      {
        quote:
          "“Sometimes you need to go away to actually reconnect or realise what you have.”",
        before: "Estonia has not become an inevitable des",
        after: "There is family there. There is a langua",
      },
      {
        quote: "“Let your craziness out.”",
        before: "Her criticism of Finland often sounds le",
        after: "From talking about diversity to living i",
      },
      {
        quote:
          "“I think we also need to help Finnish people to also integrate into diverse workplaces.”",
        before: "For Marii, cross-cultural communication ",
        after: "Marii would start teaching it early, at ",
      },
    ]);
  });

  it("keeps the document's wording, spelling and quotations", () => {
    const blob = JSON.stringify(content);
    for (const passage of [
      "I had this feeling that I’m like in the wrong country",
      "I call it a “love-driven migration,” and she agrees.",
      "“I felt like I have drunken, like, a Red Bull or something,” she says.",
      "“Calm is the right word.”",
      "Laulupidu",
      "“Sit in a city and observe”.",
      // The running text differs from the pull quote ("in the" / "into"); both
      // are kept as the document has them.
      "“I think we also need to help Finnish people to also integrate in the diverse workplaces.”",
      "“I would 100% make the same choice.”",
      "unrecognisable",
      "organisations",
      "neighbourhoods",
      "knowing yourself well enough to recognise when it may be time to move again.",
    ]) {
      expect(blob, passage).toContain(passage);
    }
  });

  it("closes the body with the document's final line", () => {
    const paragraphs = content.filter((block) => block.type === "paragraph");
    expect((paragraphs.at(-1) as { text: string }).text).toBe(
      "It is knowing a place well enough to take the shortcut home, knowing the people with whom you do not have to pretend, and knowing yourself well enough to recognise when it may be time to move again."
    );
  });
});

describe("Marii Juht journal article: After the Conversation", () => {
  const closing = content.at(-1);

  it("uses both photographs and the verified transcription", () => {
    expect(closing).toEqual({
      type: "after-conversation",
      label: "After the Conversation",
      image: {
        src: `${IMAGE_DIR}/marii-writing-in-notebook.jpg`,
        alt: expect.stringContaining("Marii Juht Hakak"),
        monochrome: false,
      },
      noteImage: {
        src: `${IMAGE_DIR}/handwritten-note.jpg`,
        alt: expect.stringContaining("handwritten note"),
        caption: "From Marii, after our conversation.",
        monochrome: false,
      },
      note: {
        lines: [
          "Locker Room Talks",
          "Thank you for an amazing experience and welcoming me so warmly to your home. Thank you for your interest and for sharing this important conversation. May this be a start to a journey filled with magical conversations and beautiful guests. Be curious, be bold and be true to yourself.",
        ],
        signature: "Marii",
      },
    });
  });

  it("does not carry over the document's “From Hope” caption", () => {
    expect(JSON.stringify(content)).not.toContain("From Hope");
  });
});

describe("Marii Juht journal article: images", () => {
  const closing = content.at(-1) as {
    image: { src: string; alt: string };
    noteImage: { src: string; alt: string };
  };
  const images = [
    { src: getArticleImageUrl(mariiJuhtArticle) as string, alt: mariiJuhtArticle.imageAlt },
    closing.image,
    closing.noteImage,
  ];

  it("uses the landscape portrait of the two women as hero and listing image", () => {
    expect(getArticleImageUrl(mariiJuhtArticle)).toBe(
      `${IMAGE_DIR}/marii-juht-hakak-and-farnaz-farahdel.jpg`
    );
    expect(mariiJuhtArticle.imageUrl).toBe(mariiJuhtArticle.featuredImage);
    expect(ogSourceFor(mariiJuhtArticle)).toBe(mariiJuhtArticle.featuredImage);
    expect(mariiJuhtArticle.imageAlt).toBe(
      "Farnaz Farahdel and Marii Juht Hakak standing together against a white brick wall"
    );
  });

  it("references only files that exist, with descriptive names and alt text", () => {
    for (const image of images) {
      expect(image.src.startsWith(`${IMAGE_DIR}/`), image.src).toBe(true);
      expect(path.basename(image.src), image.src).not.toMatch(/^\d+\.jpg$/);
      expect(fs.existsSync(publicFile(image.src)), image.src).toBe(true);
      expect((image.alt ?? "").length, image.src).toBeGreaterThan(30);
    }
  });

  it("ships the original, uncropped photographs", () => {
    expect(jpegSize(publicFile(images[0].src))).toEqual({ width: 2560, height: 1707 });
    expect(jpegSize(publicFile(images[1].src))).toEqual({ width: 1707, height: 2560 });
    expect(jpegSize(publicFile(images[2].src))).toEqual({ width: 1086, height: 1448 });
  });
});

describe("Marii Juht journal article: navigation", () => {
  it("is Asmara's next story and has no next story of its own", () => {
    expect(getAdjacentArticles(asmaraRiazArticle.slug).next).toBe(mariiJuhtArticle);
    expect(getAdjacentArticles(SLUG)).toEqual({
      previous: asmaraRiazArticle,
      next: undefined,
    });
  });

  it("surfaces in related stories, Migration first", () => {
    expect(getRelatedArticles(SLUG)).toEqual([asmaraRiazArticle, hopeMakaraArticle]);
    expect(getRelatedArticles(asmaraRiazArticle.slug)[0]).toBe(mariiJuhtArticle);
    expect(getRelatedArticles(hopeMakaraArticle.slug)).toContain(mariiJuhtArticle);
  });
});

describe("Marii Juht journal article: SEO", () => {
  const route = getRouteSeo(PATH);
  const articleNode = route.jsonLd[0] as Record<string, unknown>;
  const image = articleNode.image as Record<string, unknown>;

  it("has a unique, indexable route with a self-referencing www canonical", () => {
    expect(route.path).toBe(PATH);
    expect(route.canonical).toBe(CANONICAL);
    expect(route.robots).toBe("index");
    expect(route.title).toBe(
      "What If Integration Is Not the End of the Story? — Locker Room Talks"
    );
    const others = buildRouteSeo().filter((r) => r.path !== PATH);
    expect(others.map((r) => r.title)).not.toContain(route.title);
    expect(others.map((r) => r.description)).not.toContain(route.description);
    expect(route.description.startsWith("Marii Juht did not leave Estonia")).toBe(true);
  });

  it("has its own 1200x630 social card and article Open Graph metadata", () => {
    expect(route.ogType).toBe("article");
    expect(route.ogImage).toEqual({
      url: `${SITE_ORIGIN}/og/${SLUG}.jpg`,
      alt: mariiJuhtArticle.imageAlt,
      width: 1200,
      height: 630,
    });
    expect(route.article).toEqual({
      publishedTime: "2026-11-25",
      modifiedTime: "2026-11-25",
      author: "Farnaz Farahdel",
      section: "Migration",
    });
  });

  it("emits Article, BreadcrumbList, Organization and WebSite nodes", () => {
    expect(route.jsonLd.map((n) => (n as { "@type": string })["@type"])).toEqual([
      "Article",
      "BreadcrumbList",
      "Organization",
      "WebSite",
    ]);
    expect(articleNode).toMatchObject({
      "@id": `${CANONICAL}#article`,
      headline: mariiJuhtArticle.title,
      alternativeHeadline: mariiJuhtArticle.subtitle,
      articleSection: "Migration",
      datePublished: "2026-11-25",
      dateModified: "2026-11-25",
      mainEntityOfPage: CANONICAL,
      author: { "@type": "Person", name: "Farnaz Farahdel" },
    });
    expect(articleNode.wordCount as number).toBeGreaterThan(3000);

    const crumbs = route.jsonLd[1] as {
      itemListElement: Array<Record<string, unknown>>;
    };
    expect(crumbs.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_ORIGIN}/journal` },
      { "@type": "ListItem", position: 3, name: mariiJuhtArticle.title },
    ]);
  });

  it("claims no photographer, copyright or licence for the uncredited photographs", () => {
    expect(image["@type"]).toBe("ImageObject");
    expect(image.url).toBe(`${SITE_ORIGIN}/og/${SLUG}.jpg`);
    for (const field of [
      "creator",
      "creditText",
      "copyrightNotice",
      "license",
      "acquireLicensePage",
    ]) {
      expect(image, field).not.toHaveProperty(field);
    }
  });

  it("is in the sitemap with its own publication date", () => {
    expect(route.sitemap).toEqual({ lastmod: "2026-11-25" });
    expect(getRouteSeo("/").sitemap).toEqual({ lastmod: "2026-11-25" });
  });
});

describe("Marii Juht journal article: prerendered HTML", () => {
  /**
   * Mirrors renderPage() in scripts/seo-build.mjs: the build swaps only the
   * seo:start/seo:end region of index.html for the route's tags.
   */
  const template = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const start = template.indexOf("<!-- seo:start -->");
  const end = template.indexOf("<!-- seo:end -->");
  const html =
    template.slice(0, start) +
    "<!-- seo:start -->\n" +
    renderHeadTags(getRouteSeo(PATH)) +
    "\n\t\t" +
    template.slice(end);

  it("bakes the article's head tags into the page", () => {
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    expect(html).toContain(`<link rel="canonical" href="${CANONICAL}" data-seo`);
    expect(html).toContain(`<meta property="og:url" content="${CANONICAL}" data-seo`);
    expect(html).toContain(`<meta property="og:type" content="article" data-seo`);
    expect(html).toContain(`<meta name="twitter:card" content="summary_large_image" data-seo`);
    expect(html).toContain(`${SITE_ORIGIN}/og/${SLUG}.jpg`);
    expect(html).toContain('"@type":"Article"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).not.toContain("noindex");
  });

  it("keeps the Google Search Console verification tag intact", () => {
    const tag =
      '<meta name="google-site-verification" content="gfENezI1a7XvU8D4xwpGr14f0xkCTLZ7qWzX3jPXTKA" />';
    expect(template).toContain(tag);
    expect(html).toContain(tag);
    // Outside the region the build rewrites, so no route can drop it.
    expect(template.indexOf(tag)).toBeLessThan(start);
  });
});
