import { Link } from "react-router-dom";
import {
  getArticleReadingTime,
  getArticleSubtitle,
  type JournalArticle,
} from "@/data/journalArticles";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface ArticleHeaderProps {
  article: JournalArticle;
}

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
        to="/journal"
        className="article-back-link inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase text-[#8E0F13] hover:opacity-70 transition-opacity duration-200 mb-10 sm:mb-14 self-start"
      >
        <span aria-hidden="true">←</span>
        The Journal
      </Link>

      <div className="article-header-inner">
        <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-bold tracking-[-0.02em] leading-[1.08] text-[#1a1a1a] text-balance mb-5 sm:mb-7">
          {article.title}
        </h1>

        {getArticleSubtitle(article) && (
          <p className="text-base sm:text-lg md:text-xl leading-[1.45] text-[#555555] mb-7 sm:mb-9 text-pretty italic [font-family:'DM_Serif_Display',Georgia,serif]">
            {getArticleSubtitle(article)}
          </p>
        )}

        {(article.author ||
          article.photographer ||
          article.date ||
          getArticleReadingTime(article)) && (
          <div className="text-xs sm:text-sm leading-relaxed">
            {article.author && (
              <p className="font-semibold text-[#1a1a1a]">
                By {article.author}
              </p>
            )}
            {article.photographer && (
              <p className="text-[#9a9a9a] mt-1">
                Photography by {article.photographer}
              </p>
            )}
            {(article.date || getArticleReadingTime(article)) && (
              <p className="text-[#9a9a9a] mt-1">
                {article.date}
                {article.date && getArticleReadingTime(article) && (
                  <span aria-hidden="true"> · </span>
                )}
                {getArticleReadingTime(article)}
              </p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default ArticleHeader;
