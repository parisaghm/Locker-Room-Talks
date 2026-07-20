import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ArticleContentBlock } from "@/data/journalArticles";
import PullQuote from "./PullQuote";
import ArticleImage from "./ArticleImage";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface ArticleBodyProps {
  content: ArticleContentBlock[];
}

const FadeParagraph = ({ children }: { children: ReactNode }) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLParagraphElement>();

  return (
    <p
      ref={ref}
      className={`article-paragraph transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
  const className =
    level === 2
      ? "article-h2 transition-all duration-700 ease-out"
      : "article-h3 transition-all duration-700 ease-out";

  return (
    <Tag
      ref={ref}
      className={`${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
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
      className={`article-list transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

const ArticleBody = ({ content }: ArticleBodyProps) => {
  return (
    <div className="article-body mx-auto w-full max-w-[760px]">
      {content.map((block, index) => {
        switch (block.type) {
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
            return <PullQuote key={index} text={block.text} />;

          case "image":
            return (
              <ArticleImage
                key={index}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
              />
            );

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
