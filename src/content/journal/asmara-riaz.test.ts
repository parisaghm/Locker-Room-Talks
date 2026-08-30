import { describe, expect, it } from "vitest";
import { asmaraRiazArticle } from "@/content/journal/asmara-riaz";
import { hopeMakaraArticle } from "@/content/journal/hope-makara";
import {
  featuredJournalArticle,
  getArticleBody,
  getArticleBySlug,
  getArticleImageUrl,
  getArticleReadingTime,
  getRelatedArticles,
  journalArticles,
} from "@/data/journalArticles";

describe("Asmara Riaz journal article", () => {
  it("is the single shared source for the listing and the article route", () => {
    expect(asmaraRiazArticle.slug).toBe("what-happens-to-us-when-we-leave-home");
    expect(
      journalArticles.filter((article) => article.slug === asmaraRiazArticle.slug)
    ).toHaveLength(1);
    expect(getArticleBySlug("what-happens-to-us-when-we-leave-home")).toBe(
      asmaraRiazArticle
    );
  });

  it("leaves Hope Makara as the featured story for the homepage", () => {
    expect(asmaraRiazArticle.featured).toBeUndefined();
    expect(featuredJournalArticle).toBe(hopeMakaraArticle);
  });

  it("exposes preview metadata without requiring a second copy of the story", () => {
    expect(asmaraRiazArticle.title).toBe("What Happens to Us When We Leave Home?");
    expect(asmaraRiazArticle.subtitle).toBe(
      "Asmara Riaz on Lahore, Finland and the Long, Unfinished Journey of Belonging"
    );
    expect(asmaraRiazArticle.category).toBe("Migration");
    expect(asmaraRiazArticle.author).toBe("Farnaz Farahdel");
    expect(getArticleReadingTime(asmaraRiazArticle)).toBe("19 min read");
    expect(getArticleImageUrl(asmaraRiazArticle)).toBe(
      "/images/journal/asmara-riaz/hero.jpg"
    );
  });

  it("renders the draft text as structured blocks, not HTML", () => {
    const body = getArticleBody(asmaraRiazArticle);
    const blob = JSON.stringify(body);

    expect(body[0]).toEqual({
      type: "standfirst",
      text: asmaraRiazArticle.standfirst,
    });
    expect(body.some((block) => "html" in block)).toBe(false);
    expect(
      body.filter((block) => block.type === "paragraph").length
    ).toBeGreaterThan(200);
    expect(blob).toContain("Whoever has not seen Lahore has not been born.");
    expect(blob).toContain(
      "Badshahi Mosque, Lahore, Pakistan — Photos by Jiayi Wang / The Diary of a Nomad"
    );
    expect(blob).toContain("It changes the person asking it.");
  });

  it("keeps the draft blocks in their original order and counts", () => {
    const types = (asmaraRiazArticle.content ?? []).map((block) => block.type);
    const counts = types.reduce<Record<string, number>>((acc, type) => {
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts).toEqual({
      paragraph: 287,
      "short-line-sequence": 21,
      heading: 13,
      image: 4,
      pullquote: 4,
      "after-conversation": 1,
    });
    expect(types[0]).toBe("paragraph");
    expect(types.at(-1)).toBe("after-conversation");
  });

  it("carries the draft's section headings in order", () => {
    const headings = (asmaraRiazArticle.content ?? [])
      .filter((block) => block.type === "heading")
      .map((block) => (block as { text: string }).text);

    expect(headings).toEqual([
      "A City That Lets You Be",
      "The Silent Room",
      "Learning What Independence Costs",
      "The Plan That Wasn't the Plan",
      "When Identity Shatters and Rebuilds",
      "The Country That Doesn't Open Easily",
      "The Language You Learn, and the Language People Actually Speak",
      "When Information Exists but You Cannot Find It",
      "Warm Food, Warm Hugs",
      "What Finland Has Given Her",
      "See the Person, Not Only the Immigrant",
      "Would She Choose Finland Again?",
      "Thirteen Years Later",
    ]);
  });

  it("keeps the editorial pull quotes without removing them from the body", () => {
    const content = asmaraRiazArticle.content ?? [];
    const quotes = content
      .filter((block) => block.type === "pullquote")
      .map((block) => (block as { text: string }).text);

    expect(quotes).toEqual([
      "“Living somewhere else shatters you. And then it rebuilds you.”",
      "“It is a bit frustrating that you are doing a lot to integrate and society is not accepting you.”",
      "“People are people at the end of the day, and you need to treat them as humans in every situation.”",
      "“Even though you love the country, you can't waste your life.”",
    ]);

    // The three quotes the draft also prints inside the running text stay there.
    const paragraphs = content
      .filter((block) => block.type === "paragraph")
      .map((block) => (block as { text: string }).text);

    expect(paragraphs).toContain(
      "“It is a bit frustrating that you are doing a lot to integrate and society is not accepting you,” she says."
    );
    expect(paragraphs).toContain(
      "“People are people at the end of the day,” she says, “and you need to treat them as humans in every situation.”"
    );
    expect(
      paragraphs.some((text) =>
        text.includes("even though you love the country, you can't waste your life.")
      )
    ).toBe(true);
  });

  it("closes with Asmara's reflection on the conversation", () => {
    const closing = (asmaraRiazArticle.content ?? []).at(-1);

    expect(closing).toEqual({
      type: "after-conversation",
      label: "After the Conversation",
      intro: "Asmara’s reflection on her Locker Room Talks experience",
      image: {
        src: "/images/journal/asmara-riaz/after-the-conversation.jpg",
        alt: "Asmara Riaz writing in a lined notebook, beside the handwritten note she left for Locker Room Talks",
        monochrome: false,
      },
      note: {
        lines: [
          "Locker Room Talk",
          "A big thanks to Farnaz for inviting me and letting me open those parts of my journey which were long forgotten. I hope success for this project and best",
        ],
        signature: "love, Asmara",
      },
    });
  });

  it("sizes its imagery from the draft rather than forcing one layout", () => {
    const images = (asmaraRiazArticle.content ?? []).filter(
      (block) => block.type === "image"
    ) as Array<{ src: string; layout?: string; crop?: string; monochrome?: boolean }>;

    expect(images.map((image) => [image.src, image.layout, image.crop])).toEqual([
      ["/images/journal/asmara-riaz/badshahi-mosque.jpg", "wide", "natural"],
      ["/images/journal/asmara-riaz/rooftop-view.jpg", "column", "natural"],
      ["/images/journal/asmara-riaz/truck-art.jpg", "column", "natural"],
      ["/images/journal/asmara-riaz/asmara-and-farnaz.jpg", "column", "natural"],
    ]);
    // The Lahore material keeps its colour; the studio frame matches Hope's.
    expect(images.map((image) => image.monochrome)).toEqual([
      false,
      false,
      false,
      true,
    ]);
  });

  it("can surface alongside Hope in related stories", () => {
    const relatedToHope = getRelatedArticles(hopeMakaraArticle.slug);
    const relatedToAsmara = getRelatedArticles(asmaraRiazArticle.slug);

    expect(relatedToHope).toContain(asmaraRiazArticle);
    expect(relatedToAsmara).not.toContain(asmaraRiazArticle);
    expect(relatedToAsmara.length).toBeGreaterThan(0);
  });
});
