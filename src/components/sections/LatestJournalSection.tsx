import type { MouseEvent, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import {
  featuredJournalArticle,
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

const JournalCategory = ({ children }: { children: string }) => (
  <span className="block text-xs font-bold tracking-[0.12em] uppercase text-[#8E0F13] shrink-0 mb-4">
    {children}
  </span>
);

type JournalNavLinkProps = PropsWithChildren<{
  to: string;
  className: string;
  ariaLabel?: string;
}>;

type DisabledJournalCtaProps = PropsWithChildren<{
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

const DisabledJournalCta = ({
  className,
  ariaLabel,
  children,
}: DisabledJournalCtaProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      aria-disabled="true"
    >
      {children}
    </button>
  );
};

const FeaturedArticleMeta = ({ article }: { article: JournalArticle }) => {
  if (!article.author && !article.date && !article.readTime) {
    return null;
  }

  return (
    <p className="text-xs sm:text-sm leading-normal mb-10 sm:mb-12">
      {article.author && (
        <span className="font-semibold text-[#1a1a1a]">{article.author}</span>
      )}
      {article.date && (
        <>
          {article.author && (
            <span className="text-[#9a9a9a]"> • </span>
          )}
          <span className="text-[#9a9a9a]">{article.date}</span>
        </>
      )}
      {article.readTime && (
        <>
          {(article.author || article.date) && (
            <span className="text-[#9a9a9a]"> • </span>
          )}
          <span className="text-[#9a9a9a]">{article.readTime}</span>
        </>
      )}
    </p>
  );
};

const FeaturedArticle = ({ article }: { article: JournalArticle }) => (
  <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 lg:items-center w-full min-w-0">
    <JournalNavLink
      to={`/journal/${article.slug}`}
      className="group block min-w-0"
      ariaLabel={`Read ${article.title}`}
    >
      <div className="relative p-1.5 bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.imageAlt ?? article.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </JournalNavLink>

    <div className="flex flex-col min-w-0 text-left justify-center w-full max-w-full lg:max-w-[500px]">
      <JournalCategory>{article.category}</JournalCategory>

      <JournalNavLink
        to={`/journal/${article.slug}`}
        className="group/title inline-block self-start touch-manipulation"
        ariaLabel={`Read ${article.title}`}
      >
        <h3 className="text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.05] text-[#1a1a1a] break-words mb-5 sm:mb-6 transition-opacity duration-200 group-hover/title:opacity-75">
          {article.title}
        </h3>
      </JournalNavLink>

      {article.excerpt && (
        <p className="text-base sm:text-lg leading-[1.55] text-[#555555] mb-8 sm:mb-9 break-words italic [font-family:'DM_Serif_Display',Georgia,serif]">
          {article.excerpt}
        </p>
      )}

      <FeaturedArticleMeta article={article} />

      <DisabledJournalCta
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
      </DisabledJournalCta>
    </div>
  </article>
);

const LatestJournalSection = () => {
  return (
    <div className="w-full min-w-0 section-body-stack text-left">
      <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-accent-teal mb-6 sm:mb-8">
        Latest from the Journal
      </p>

      <FeaturedArticle article={featuredJournalArticle} />

      <div className="section-follow-block text-center">
        <DisabledJournalCta
          className="relative z-10 pointer-events-auto inline-flex items-center gap-2 min-h-[44px] py-2 px-1 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity duration-[250ms] border-b border-foreground touch-manipulation"
          ariaLabel="Explore the Journal"
        >
          Explore the Journal
          <ArrowIcon className="w-4 h-4" />
        </DisabledJournalCta>
      </div>
    </div>
  );
};

export default LatestJournalSection;
