import { useState, type CSSProperties } from "react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface AfterConversationImage {
  src: string;
  alt: string;
  caption?: string;
  monochrome?: boolean;
}

interface AfterConversationProps {
  label?: string;
  intro?: string;
  image: AfterConversationImage;
  /** Optional second photograph (usually the note itself), shown beside `image`. */
  noteImage?: AfterConversationImage;
  note?: { lines: string[]; signature?: string };
}

const AfterConversationFigure = ({
  image,
  onRatio,
  style,
}: {
  image: AfterConversationImage;
  onRatio?: (ratio: number) => void;
  style?: CSSProperties;
}) => (
  <figure className="article-after-conversation-figure" style={style}>
    <div className="article-image-frame">
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        onLoad={
          onRatio
            ? (event) => {
                const { naturalWidth, naturalHeight } = event.currentTarget;
                if (naturalWidth && naturalHeight) {
                  onRatio(naturalWidth / naturalHeight);
                }
              }
            : undefined
        }
        className={image.monochrome ? "grayscale" : undefined}
      />
    </div>
    {image.caption && (
      <figcaption className="article-image-caption">{image.caption}</figcaption>
    )}
  </figure>
);

/**
 * Two photographs side by side. Each figure grows in proportion to its own
 * aspect ratio, so both images render at the same height with their natural
 * proportions — nothing is cropped or stretched.
 */
const AfterConversationPair = ({
  image,
  noteImage,
}: {
  image: AfterConversationImage;
  noteImage: AfterConversationImage;
}) => {
  const [ratios, setRatios] = useState<[number, number]>([1, 1]);

  return (
    <div className="article-after-conversation-pair">
      <AfterConversationFigure
        image={image}
        style={{ flexGrow: ratios[0] }}
        onRatio={(ratio) => setRatios(([, other]) => [ratio, other])}
      />
      <AfterConversationFigure
        image={noteImage}
        style={{ flexGrow: ratios[1] }}
        onRatio={(ratio) => setRatios(([other]) => [other, ratio])}
      />
    </div>
  );
};

/**
 * Closing panel for a Journal story: the guest's own reflection on the
 * conversation. Set apart from the article body so it reads as a coda rather
 * than another paragraph, and reusable by any future story.
 */
const AfterConversation = ({
  label = "After the Conversation",
  intro,
  image,
  noteImage,
  note,
}: AfterConversationProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();

  return (
    <aside
      ref={ref}
      aria-label={label}
      className={`article-after-conversation article-reveal ${
        isVisible ? "is-revealed" : ""
      }`}
    >
      <div className="article-after-conversation-rule" aria-hidden="true" />
      <p className="article-after-conversation-label">{label}</p>
      {intro && <p className="article-after-conversation-intro">{intro}</p>}

      {noteImage ? (
        <AfterConversationPair image={image} noteImage={noteImage} />
      ) : (
        <AfterConversationFigure image={image} />
      )}

      {note && (
        <blockquote className="article-after-conversation-note">
          {note.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {note.signature && (
            <footer className="article-after-conversation-signature">
              {note.signature}
            </footer>
          )}
        </blockquote>
      )}
    </aside>
  );
};

export default AfterConversation;
