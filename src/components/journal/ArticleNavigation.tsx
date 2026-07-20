import { Link } from "react-router-dom";
import type { JournalArticle } from "@/data/journalArticles";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface ArticleNavigationProps {
  previous?: JournalArticle;
  next?: JournalArticle;
}

const ArticleNavigation = ({ previous, next }: ArticleNavigationProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();

  if (!previous && !next) return null;

  return (
    <nav
      ref={ref}
      aria-label="Article navigation"
      className={`article-navigation mx-auto w-full max-w-[800px] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {previous ? (
        <Link
          to={`/journal/${previous.slug}`}
          className="article-nav-card group text-left"
        >
          <span className="article-nav-label">← Previous</span>
          <span className="article-nav-title">{previous.title}</span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}

      {next ? (
        <Link
          to={`/journal/${next.slug}`}
          className="article-nav-card group text-right sm:col-start-2"
        >
          <span className="article-nav-label">Next →</span>
          <span className="article-nav-title">{next.title}</span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
    </nav>
  );
};

export default ArticleNavigation;
