import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ArticleContentBlock } from "@/data/journalArticles";
import PullQuote from "./PullQuote";
import ArticleImage from "./ArticleImage";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface ArticleBodyProps {
  content: ArticleContentBlock[];
}

const FadeParagraph = ({
  children,
  className = "article-paragraph",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLParagraphElement>();

  return (
    <p
      ref={ref}
      className={`${className} article-reveal ${
        isVisible ? "is-revealed" : ""
      }`}
    >
      {children}
    </p>
  );
};

const FadeHeading = ({
  level,
  children,
}: {
  level: 2 | 3;
  children: string;
}) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLHeadingElement>();
  const Tag = level === 2 ? "h2" : "h3";
  const className = level === 2 ? "article-h2" : "article-h3";

  return (
    <Tag
      ref={ref}
      className={`${className} article-reveal ${isVisible ? "is-revealed" : ""}`}
    >
      {children}
    </Tag>
  );
};

const FadeList = ({ items }: { items: string[] }) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLUListElement>();

  return (
    <ul
      ref={ref}
      className={`article-list article-reveal ${isVisible ? "is-revealed" : ""}`}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

const FadeShortLines = ({ lines }: { lines: string[] }) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`article-short-lines article-reveal ${
        isVisible ? "is-revealed" : ""
      }`}
    >
      {lines.map((line) => (
        <p key={line} className="article-short-line">
          {line}
        </p>
      ))}
    </div>
  );
};

const FadeCaption = ({ children }: { children: string }) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLParagraphElement>();

  return (
    <p
      ref={ref}
      className={`article-image-caption article-image-caption-block article-reveal ${
        isVisible ? "is-revealed" : ""
      }`}
    >
      {children}
    </p>
  );
};

const ArticleBody = ({ content }: ArticleBodyProps) => {
  return (
    <div className="article-body">
      {content.map((block, index) => {
        switch (block.type) {
          case "standfirst":
            return (
              <FadeParagraph key={index} className="article-standfirst">
                {block.text}
              </FadeParagraph>
            );

          case "paragraph":
            return <FadeParagraph key={index}>{block.text}</FadeParagraph>;

          case "paragraph-with-link":
            return (
              <FadeParagraph key={index}>
                {block.before}
                <Link to={block.href} className="article-link">
                  {block.linkText}
                </Link>
                {block.after}
              </FadeParagraph>
            );

          case "heading":
            return (
              <FadeHeading key={index} level={block.level}>
                {block.text}
              </FadeHeading>
            );

          case "pullquote":
            return (
              <PullQuote key={index} text={block.text} lines={block.lines} />
            );

          case "image":
            return (
              <ArticleImage
                key={index}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
                layout={block.layout}
                crop={block.crop}
                monochrome={block.monochrome}
              />
            );

          case "image-caption":
            return <FadeCaption key={index}>{block.text}</FadeCaption>;

          case "short-line-sequence":
            return <FadeShortLines key={index} lines={block.lines} />;

          case "list":
            return <FadeList key={index} items={block.items} />;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ArticleBody;
