import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import AfterConversation from "./AfterConversation";
import { asmaraRiazArticle } from "@/content/journal/asmara-riaz";
import { mariiJuhtArticle } from "@/content/journal/marii-juht";
import type { ArticleContentBlock } from "@/data/journalArticles";

type AfterConversationBlock = Extract<
  ArticleContentBlock,
  { type: "after-conversation" }
>;

const closingOf = (content: ArticleContentBlock[] = []) =>
  content.find(
    (block): block is AfterConversationBlock =>
      block.type === "after-conversation"
  ) as AfterConversationBlock;

describe("AfterConversation", () => {
  beforeAll(() => {
    // jsdom has no IntersectionObserver; the fade-in hook only needs it to exist.
    globalThis.IntersectionObserver ??= class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });

  it("renders a single photograph exactly as before when no noteImage is given", () => {
    const block = closingOf(asmaraRiazArticle.content);
    const { container } = render(<AfterConversation {...block} />);

    expect(container.querySelector(".article-after-conversation-pair")).toBeNull();
    const figures = container.querySelectorAll(".article-after-conversation-figure");
    expect(figures).toHaveLength(1);
    expect(figures[0].getAttribute("style")).toBeNull();
    expect(screen.getByRole("img")).toHaveAttribute("src", block.image.src);
  });

  it("renders Marii's portrait beside her note, with the corrected caption", () => {
    const block = closingOf(mariiJuhtArticle.content);
    const { container } = render(<AfterConversation {...block} />);

    const pair = container.querySelector(".article-after-conversation-pair");
    expect(pair).not.toBeNull();
    const images = screen.getAllByRole("img");
    expect(images.map((img) => img.getAttribute("src"))).toEqual([
      block.image.src,
      block.noteImage?.src,
    ]);
    for (const img of images) {
      expect(img).not.toHaveClass("grayscale");
      expect(img.getAttribute("alt")?.length).toBeGreaterThan(30);
    }
    expect(screen.getByText("From Marii, after our conversation.")).toBeInTheDocument();
    expect(screen.queryByText(/From Hope/)).toBeNull();
    expect(screen.getByText("Locker Room Talks")).toBeInTheDocument();
    expect(screen.getByText("Marii")).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: "After the Conversation" })
    ).toBeInTheDocument();
  });
});
