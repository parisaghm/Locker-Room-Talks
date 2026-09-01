import type { MouseEvent, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import {
  featuredJournalArticle,
  getArticleImageUrl,
  getArticleReadingTime,
  getArticleSubtitle,
  type JournalArticle,
} from "@/data/journalArticles";

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8H13M10 5L13 8L10 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type JournalNavLinkProps = PropsWithChildren<{
  to: string;
  className: string;
  ariaLabel?: string;
}>;

const JournalNavLink = ({
  to,
  className,
  ariaLabel,
  children,
}: JournalNavLinkProps) => {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

const FeaturedArticleMeta = ({ article }: { article: JournalArticle }) => {
  const readingTime = getArticleReadingTime(article);

  if (!article.author && !article.photographer && !readingTime) {
    return null;
  }

  return (
    <div className="text-xs sm:text-sm leading-relaxed mb-8 sm:mb-10">
      {article.author && (
        <p className="font-semibold text-[#1a1a1a]">{article.author}</p>
      )}
      {readingTime && (
        <p className="text-[#9a9a9a] mt-0.5">{readingTime}</p>
      )}
    </div>
  );
};

const FeaturedArticle = ({ article }: { article: JournalArticle }) => (
  <article className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 md:items-center w-full min-w-0">
    <JournalNavLink
      to={`/journal/${article.slug}`}
      className="group block min-w-0"
      ariaLabel={`Read ${article.title}`}
    >
      <div className="relative p-1.5 bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={getArticleImageUrl(article)}
            alt={article.imageAlt ?? article.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </JournalNavLink>

    <div className="flex flex-col min-w-0 text-left justify-center w-full max-w-full md:max-w-[500px]">
      <JournalNavLink
        to={`/journal/${article.slug}`}
        className="group/title block w-full min-w-0 touch-manipulation"
        ariaLabel={`Read ${article.title}`}
      >
        <h3 className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.375rem] lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-[1.08] text-[#1a1a1a] text-balance break-words mb-4 sm:mb-5 transition-opacity duration-200 group-hover/title:opacity-75">
          {article.title}
        </h3>
      </JournalNavLink>

      {getArticleSubtitle(article) && (
        <p className="text-[0.9375rem] sm:text-base md:text-[1.0625rem] leading-[1.45] text-[#555555] mb-6 sm:mb-7 break-words text-pretty italic [font-family:'DM_Serif_Display',Georgia,serif]">
          {getArticleSubtitle(article)}
        </p>
      )}

      {article.standfirst && (
        <p className="text-[0.875rem] sm:text-[0.9375rem] leading-[1.6] text-[#555555] max-w-[30rem] mb-6 sm:mb-7 break-words text-pretty italic [font-family:'DM_Serif_Display',Georgia,serif]">
          {article.standfirst}
        </p>
      )}

      <FeaturedArticleMeta article={article} />

      <JournalNavLink
        to={`/journal/${article.slug}`}
        className="group relative z-10 pointer-events-auto inline-flex items-center gap-1.5 min-h-[44px] py-2 px-1 -ml-1 text-sm sm:text-[0.9375rem] font-semibold text-[#8E0F13] hover:opacity-70 transition-opacity duration-200 self-start touch-manipulation"
        ariaLabel={`Read ${article.title}`}
      >
        Read the story
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </JournalNavLink>
    </div>
  </article>
);

const LatestJournalSection = () => {
  return (
    <div className="w-full min-w-0 section-body-stack text-left">
      <FeaturedArticle article={featuredJournalArticle} />

      <div className="section-follow-block text-center">
        <JournalNavLink
          to="/journal"
          className="relative z-10 pointer-events-auto inline-flex items-center gap-2 min-h-[44px] py-2 px-1 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity duration-[250ms] border-b border-foreground touch-manipulation"
          ariaLabel="Explore the Journal"
        >
          Explore the Journal
          <ArrowIcon className="w-4 h-4" />
        </JournalNavLink>
      </div>
    </div>
  );
};

export default LatestJournalSection;
