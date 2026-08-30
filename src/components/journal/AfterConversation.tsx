import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface AfterConversationProps {
  label?: string;
  intro?: string;
  image: {
    src: string;
    alt: string;
    caption?: string;
    monochrome?: boolean;
  };
  note?: { lines: string[]; signature?: string };
}

/**
 * Closing panel for a Journal story: the guest's own reflection on the
 * conversation. Set apart from the article body so it reads as a coda rather
 * than another paragraph, and reusable by any future story.
 */
const AfterConversation = ({
  label = "After the Conversation",
  intro,
  image,
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

      <figure className="article-after-conversation-figure">
        <div className="article-image-frame">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className={image.monochrome ? "grayscale" : undefined}
          />
        </div>
        {image.caption && (
          <figcaption className="article-image-caption">
            {image.caption}
          </figcaption>
        )}
      </figure>

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
