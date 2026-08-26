import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface PullQuoteProps {
  text?: string;
  lines?: string[];
}

const PullQuote = ({ text, lines }: PullQuoteProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLQuoteElement>();
  const quoteLines = lines?.length ? lines : text ? [text] : [];

  if (quoteLines.length === 0) return null;

  return (
    <blockquote
      ref={ref}
      className={`article-pullquote article-reveal ${
        isVisible ? "is-revealed" : ""
      }`}
    >
      <div className="article-pullquote-divider" aria-hidden="true" />
      <div className="article-pullquote-lines">
        {quoteLines.map((line) => (
          <p key={line} className="article-pullquote-text">
            {line}
          </p>
        ))}
      </div>
    </blockquote>
  );
};

export default PullQuote;
