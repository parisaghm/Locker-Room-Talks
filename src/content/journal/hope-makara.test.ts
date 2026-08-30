import { describe, expect, it } from "vitest";
import { hopeMakaraArticle } from "@/content/journal/hope-makara";
import { contentParagraphRoles } from "@/lib/articleRhythm";
import {
  featuredJournalArticle,
  getArticleBody,
  getArticleBySlug,
  getArticleImageUrl,
  getArticleReadingTime,
  journalArticles,
} from "@/data/journalArticles";

describe("Hope Makara journal article", () => {
  it("is the single shared source for homepage, listing, and article route", () => {
    expect(hopeMakaraArticle.slug).toBe("what-does-it-mean-to-belong");
    expect(featuredJournalArticle).toBe(hopeMakaraArticle);
    expect(journalArticles.filter((article) => article.slug === hopeMakaraArticle.slug)).toHaveLength(1);
    expect(getArticleBySlug("what-does-it-mean-to-belong")).toBe(hopeMakaraArticle);
  });

  it("exposes preview metadata without requiring a second copy of the story", () => {
    expect(hopeMakaraArticle.category).toBe("Identity");
    expect(hopeMakaraArticle.author).toBe("Farnaz Farahdel");
    expect(hopeMakaraArticle.photographer).toBe("Linda Wang");
    expect(getArticleReadingTime(hopeMakaraArticle)).toBe("21 min read");
    expect(getArticleImageUrl(hopeMakaraArticle)).toBe(
      "/images/journal/hope-makara/hero.jpg"
    );
    expect(hopeMakaraArticle.featured).toBe(true);
  });

  it("renders the publication text as structured blocks, not HTML", () => {
    const body = getArticleBody(hopeMakaraArticle);
    const blob = JSON.stringify(body);

    expect(body[0]).toEqual({
      type: "standfirst",
      text: hopeMakaraArticle.standfirst,
    });
    expect(body.some((block) => "html" in block)).toBe(false);
    expect(body.filter((block) => block.type === "paragraph").length).toBeGreaterThan(200);
    expect(body.filter((block) => block.type === "pullquote")).toHaveLength(4);
    expect(body.some((block) => block.type === "image")).toBe(true);
    expect(blob).toContain(
      "But after putting all this effort into belonging, I was really lonely. I felt inadequate. No matter how hard I tried, I still didn’t feel like I belonged, nor was I accepted by Finland or Finnish people."
    );
    expect(blob).toContain(
      "Belonging isn't really a geographical place. It's about accepting myself in whatever space I'm in."
    );
    expect(blob).toContain("See the person before the case.");
    expect(blob).toContain("Recognise the human being before the immigrant.");
    expect(blob).toContain("What could Finland become with this person in it?");
    expect(blob).toContain("I belong here because I’m here.");
    expect(blob).toContain("From Hope, after our conversation.");
  });
});

describe("Hope Makara block structure", () => {
  it("keeps the publication blocks in their original order and counts", () => {
    const types = (hopeMakaraArticle.content ?? []).map((block) => block.type);
    const counts = types.reduce<Record<string, number>>((acc, type) => {
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts.paragraph).toBe(282);
    expect(counts.pullquote).toBe(4);
    expect(counts.image).toBe(8);
    expect(counts["short-line-sequence"]).toBe(16);
    expect(types[0]).toBe("paragraph");
    expect(types.at(-1)).toBe("image");
  });

  it("records remaining text-heavy runs so they stay editorial, not accidental", () => {
    const blocks = hopeMakaraArticle.content ?? [];
    const roles = contentParagraphRoles(blocks);
    const walls: Array<{ length: number; start: string }> = [];
    let run = 0;
    let start = "";

    const flush = () => {
      if (run >= 5) {
        walls.push({ length: run, start });
      }
      run = 0;
      start = "";
    };

    blocks.forEach((block, index) => {
      const isDenseParagraph =
        block.type === "paragraph" && roles[index] === "normal";
      if (isDenseParagraph && "text" in block) {
        if (run === 0) start = block.text.slice(0, 72);
        run += 1;
        return;
      }
      flush();
    });
    flush();

    expect(walls).toEqual([
      {
        length: 5,
        start:
          "\"I'm not really from Texas,\" she says with a smile. \"I was born there, b",
      },
      {
        length: 6,
        start:
          "Language is part of that layering too. Hope speaks Finnish, but she reje",
      },
    ]);
  });
});
