import { Link } from "react-router-dom";
import type { JournalArticle } from "@/data/journalArticles";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface ArticleHeaderProps {
  article: JournalArticle;
}

const ArticleCategory = ({ children }: { children: string }) => (
  <span className="block text-xs font-bold tracking-[0.12em] uppercase text-[#8E0F13] mb-5 sm:mb-6">
    {children}
  </span>
);

const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();

  return (
    <header
      ref={ref}
      className={`article-header text-center transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <Link
        to="/"
        state={{ scrollTo: "#journal" }}
        className="article-back-link inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase text-[#8E0F13] hover:opacity-70 transition-opacity duration-200 mb-10 sm:mb-14 self-start"
      >
        <span aria-hidden="true">←</span>
        Back to Journal
      </Link>

      <div className="mx-auto w-full max-w-[800px]">
        <ArticleCategory>{article.category}</ArticleCategory>

        <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3rem] font-bold tracking-[-0.02em] leading-[1.08] text-[#1a1a1a] text-balance mb-6 sm:mb-8">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-lg sm:text-xl md:text-[1.35rem] leading-[1.5] text-[#555555] mb-8 sm:mb-10 text-balance italic [font-family:'DM_Serif_Display',Georgia,serif]">
            {article.excerpt}
          </p>
        )}

        {(article.author || article.date || article.readTime) && (
          <p className="text-xs sm:text-sm leading-normal">
            {article.author && (
              <span className="font-semibold text-[#1a1a1a]">
                {article.author}
              </span>
            )}
            {article.date && (
              <>
                {article.author && (
                  <span className="text-[#9a9a9a]"> · </span>
                )}
                <span className="text-[#9a9a9a]">{article.date}</span>
              </>
            )}
            {article.readTime && (
              <>
                {(article.author || article.date) && (
                  <span className="text-[#9a9a9a]"> · </span>
                )}
                <span className="text-[#9a9a9a]">{article.readTime}</span>
              </>
            )}
          </p>
        )}
      </div>
    </header>
  );
};

export default ArticleHeader;
