import { describe, expect, it } from "vitest";
import {
  contentParagraphRoles,
  paragraphModifierClass,
  paragraphRole,
} from "./articleRhythm";

describe("paragraphRole", () => {
  it("treats important short lines as narrative beats", () => {
    expect(paragraphRole("It sounded almost unreal.")).toBe("beat");
    expect(paragraphRole("But sometimes life changes because of one sentence.")).toBe(
      "beat"
    );
    expect(paragraphRole("Humanity.")).toBe("beat");
    expect(paragraphRole("Loneliness.")).toBe("beat");
    expect(paragraphRole("It layers.")).toBe("beat");
    expect(paragraphRole("We only get this one.")).toBe("beat");
  });

  it("keeps ordinary long paragraphs grouped", () => {
    expect(
      paragraphRole(
        "There is a moment in almost every migrant's journey when geography stops being the hardest part."
      )
    ).toBe("normal");
    expect(
      paragraphRole(
        "The paperwork gets approved. The language slowly improves. The streets become familiar."
      )
    ).toBe("normal");
  });

  it("keeps lowercase continuations close to the previous line", () => {
    expect(paragraphRole("trying to understand where you fit.")).toBe(
      "continuation"
    );
    expect(paragraphRole("would she make the same decision again?")).toBe(
      "continuation"
    );
  });

  it("treats short setup lines as lead-ins", () => {
    expect(paragraphRole("Not only:", "What does this person need from Finland?")).toBe(
      "lead-in"
    );
    expect(paragraphRole("She pauses.", "“Maybe it's not always where I want to be.”")).toBe(
      "lead-in"
    );
  });

  it("joins a slightly longer line that sits inside a short cadence", () => {
    const roles = contentParagraphRoles([
      { type: "paragraph", text: "She tells me about walking alone at night." },
      {
        type: "paragraph",
        text: "About leaving her wallet behind and having strangers return it with everything still inside.",
      },
      { type: "paragraph", text: "Violence on the streets." },
    ]);

    expect(roles).toEqual(["beat", "beat", "beat"]);
  });

  it("marks long paragraphs without changing their text", () => {
    const long =
      "Still, identity remained the question she kept returning to. Migration had changed her life in visible ways—another language, another career, a family—but also in the way she understood herself. When I go back to the United States, she says, people tell me I sound different. In Finland, people remind her how American she sounds.";
    expect(paragraphModifierClass(long, "normal")).toContain("is-long");
    expect(paragraphModifierClass("Humanity.", "beat")).toBe("is-beat");
  });
});
