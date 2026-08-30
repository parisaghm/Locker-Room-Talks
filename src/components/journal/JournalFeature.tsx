import { Link } from "react-router-dom";
import {
  getArticleImageUrl,
  getArticleReadingTime,
  getArticleSubtitle,
  type JournalArticle,
} from "@/data/journalArticles";

interface JournalFeatureProps {
  article: JournalArticle;
}

/**
 * The lead story on the Journal listing: a wide editorial spread rather than a
 * card, so it reads as more important than the JournalCard grid beneath it.
 */
const JournalFeature = ({ article }: JournalFeatureProps) => {
  const readingTime = getArticleReadingTime(article);
  const subtitle = getArticleSubtitle(article);

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 md:items-center w-full min-w-0">
      <Link
        to={`/journal/${article.slug}`}
        className="group block min-w-0 md:col-span-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        aria-label={`Read ${article.title}`}
      >
        <div className="relative p-1.5 bg-white shadow-md group-hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={getArticleImageUrl(article)}
              alt={article.imageAlt ?? article.title}
              decoding="async"
              className="w-full h-full object-cover object-center grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-col min-w-0 text-left justify-center md:col-span-5">
        <span className="block text-xs font-bold tracking-[0.12em] uppercase text-[#8E0F13] mb-4">
          {article.category}
        </span>

        <Link
          to={`/journal/${article.slug}`}
          className="group/title block w-full min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          aria-label={`Read ${article.title}`}
        >
          <h2 className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-[1.08] text-[#1a1a1a] text-balance break-words mb-4 sm:mb-5 transition-opacity duration-200 group-hover/title:opacity-75">
            {article.title}
          </h2>
        </Link>

        {subtitle && (
          <p className="text-base sm:text-lg leading-[1.45] text-[#555555] break-words text-pretty italic mb-5 sm:mb-6 [font-family:'DM_Serif_Display',Georgia,serif]">
            {subtitle}
          </p>
        )}

        {(article.author || readingTime) && (
          <div className="text-xs sm:text-sm leading-relaxed">
            {article.author && (
              <p className="font-semibold text-[#1a1a1a]">{article.author}</p>
            )}
            {readingTime && <p className="text-[#9a9a9a] mt-0.5">{readingTime}</p>}
          </div>
        )}
      </div>
    </article>
  );
};

export default JournalFeature;
