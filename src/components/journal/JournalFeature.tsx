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
 * The lead story on the Journal listing: a magazine feature spread rather than
 * a card. From lg up, the image takes 7 of 12 columns (~57%) and the story
 * information 5 (~40%), vertically centred against the photograph. Below lg it
 * stacks — at tablet width a two-column split leaves the image too small to
 * carry the page.
 *
 * The image keeps its native aspect ratio — no fixed crop box — so photography
 * is never stretched or cut to fit the layout.
 */
const JournalFeature = ({ article }: JournalFeatureProps) => {
  const readingTime = getArticleReadingTime(article);
  const subtitle = getArticleSubtitle(article);
  /**
   * A taste of the story's own opening. Falls back to the excerpt, but never
   * repeats whatever is already on screen as the subtitle.
   */
  const standfirstPreview =
    article.standfirst ??
    (article.excerpt !== subtitle ? article.excerpt : undefined);

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:items-center w-full min-w-0">
      <Link
        to={`/journal/${article.slug}`}
        className="group block min-w-0 lg:col-span-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        aria-label={`Read ${article.title}`}
      >
        <div className="relative p-1.5 sm:p-2 bg-white shadow-md group-hover:shadow-lg transition-shadow duration-300">
          <div className="overflow-hidden">
            <img
              src={getArticleImageUrl(article)}
              alt={article.imageAlt ?? article.title}
              decoding="async"
              className="block w-full h-auto grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-col min-w-0 text-left lg:col-span-5">
        <span className="block text-xs font-bold tracking-[0.12em] uppercase text-[#8E0F13] mb-3 sm:mb-4">
          {article.category}
        </span>

        <Link
          to={`/journal/${article.slug}`}
          className="group/title block w-full min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          aria-label={`Read ${article.title}`}
        >
          <h3 className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-[1.08] text-[#1a1a1a] text-balance break-words mb-4 sm:mb-5 transition-opacity duration-200 group-hover/title:opacity-75">
            {article.title}
          </h3>
        </Link>

        {subtitle && (
          <p className="text-base sm:text-lg leading-[1.45] text-[#555555] break-words text-pretty italic mb-4 sm:mb-5 [font-family:'DM_Serif_Display',Georgia,serif]">
            {subtitle}
          </p>
        )}

        {standfirstPreview && (
          <p className="text-sm sm:text-base leading-relaxed text-[#666666] break-words text-pretty line-clamp-4 mb-5 sm:mb-6">
            {standfirstPreview}
          </p>
        )}

        {(article.author || readingTime) && (
          <div className="text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
            {article.author && (
              <p className="font-semibold text-[#1a1a1a]">{article.author}</p>
            )}
            {readingTime && (
              <p className="text-[#9a9a9a] mt-0.5">{readingTime}</p>
            )}
          </div>
        )}

        <Link
          to={`/journal/${article.slug}`}
          className="group/cta inline-flex items-center gap-1.5 self-start text-sm sm:text-[0.9375rem] font-semibold text-[#8E0F13] hover:opacity-70 transition-opacity duration-200"
          aria-label={`Read ${article.title}`}
        >
          Read the story
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-1 motion-reduce:transition-none"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
};

export default JournalFeature;
