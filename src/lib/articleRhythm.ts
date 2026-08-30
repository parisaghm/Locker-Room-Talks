/**
 * Editorial rhythm helpers for long-form Journal articles.
 * Classification is presentational only — it never rewrites article text.
 */

export type ParagraphRole = "normal" | "beat" | "lead-in" | "continuation";

type TextBlock = {
  type: string;
  text?: string;
  before?: string;
  linkText?: string;
  after?: string;
};

const SHORT_WORD_LIMIT = 12;
const SHORT_CHAR_LIMIT = 75;
const ALMOST_WORD_LIMIT = 16;
const ALMOST_CHAR_LIMIT = 110;
const LONG_CHAR_LIMIT = 280;

export function blockPlainText(block: TextBlock): string | undefined {
  if (block.type === "paragraph" || block.type === "standfirst") {
    return block.text;
  }
  if (block.type === "paragraph-with-link") {
    return `${block.before ?? ""}${block.linkText ?? ""}${block.after ?? ""}`;
  }
  return undefined;
}

export function isLongParagraph(text: string): boolean {
  return text.trim().length >= LONG_CHAR_LIMIT;
}

export function paragraphRole(text: string, nextText?: string): ParagraphRole {
  const trimmed = text.trim();
  if (!trimmed) return "normal";

  if (/^[a-zà-öø-ÿ]/.test(trimmed)) return "continuation";

  const next = nextText?.trim() ?? "";
  const short = isShortParagraph(trimmed);

  if (short && /[:：]\s*$/.test(trimmed)) return "lead-in";

  if (
    short &&
    next.length > 0 &&
    /^[“"«]/.test(next) &&
    !/^[“"«]/.test(trimmed)
  ) {
    return "lead-in";
  }

  if (short) return "beat";
  return "normal";
}

export function contentParagraphRoles(blocks: TextBlock[]): Array<ParagraphRole | null> {
  const raw = blocks.map((block, index) => {
    const text = blockPlainText(block);
    if (text === undefined) return null;
    const next = blocks[index + 1] ? blockPlainText(blocks[index + 1]) : undefined;
    return paragraphRole(text, next);
  });

  return raw.map((role, index) => {
    if (role !== "normal") return role;
    const text = blockPlainText(blocks[index]);
    if (!text || !isAlmostBeat(text)) return role;
    if (raw[index - 1] === "beat" || raw[index + 1] === "beat") return "beat";
    return role;
  });
}

export function paragraphModifierClass(
  text: string,
  role: ParagraphRole | null
): string {
  const classes: string[] = [];
  if (role && role !== "normal") classes.push(`is-${role}`);
  if (isLongParagraph(text)) classes.push("is-long");
  return classes.join(" ");
}

function isShortParagraph(text: string): boolean {
  const words = text.split(/\s+/).filter(Boolean);
  const sentenceCount = countSentences(text);

  if (words.length <= 6) return true;
  return (
    sentenceCount === 1 &&
    words.length <= SHORT_WORD_LIMIT &&
    text.length <= SHORT_CHAR_LIMIT
  );
}

function isAlmostBeat(text: string): boolean {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    countSentences(text) === 1 &&
    words.length <= ALMOST_WORD_LIMIT &&
    text.length <= ALMOST_CHAR_LIMIT
  );
}

function countSentences(text: string): number {
  const matches = text.match(/[.!?]+(?:["”']+)?(?=\s|$)/g);
  if (!matches) return 1;
  return matches.length;
}
