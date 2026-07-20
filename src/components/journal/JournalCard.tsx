import { Link } from "react-router-dom";
import type { JournalArticle } from "@/data/journalArticles";

interface JournalCardProps {
  article: JournalArticle;
}

const JournalCard = ({ article }: JournalCardProps) => {
  return (
    <article className="min-w-0">
      <Link
        to={`/journal/${article.slug}`}
        className="group block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        aria-label={`Read ${article.title}`}
      >
        <div className="relative p-1.5 bg-white shadow-md group-hover:shadow-xl transition-shadow duration-300 mb-5 sm:mb-6">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.imageAlt ?? article.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        </div>

        <span className="block text-xs font-bold tracking-[0.12em] uppercase text-[#8E0F13] mb-3">
          {article.category}
        </span>

        <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.01em] leading-[1.15] text-[#1a1a1a] break-words mb-3 group-hover:opacity-70 transition-opacity duration-200">
          {article.title}
          <span
            aria-hidden="true"
            className="inline-block ml-1.5 text-[0.85em] opacity-0 -translate-x-1 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0 motion-reduce:transition-none motion-reduce:translate-x-0"
          >
            →
          </span>
        </h2>

        {article.excerpt && (
          <p className="text-sm sm:text-base leading-[1.6] text-[#555555] break-words mb-4 [font-family:'DM_Serif_Display',Georgia,serif]">
            {article.excerpt}
          </p>
        )}

        {(article.date || article.readTime) && (
          <p className="text-xs sm:text-sm text-[#9a9a9a]">
            {article.date}
            {article.date && article.readTime && (
              <span aria-hidden="true"> · </span>
            )}
            {article.readTime}
          </p>
        )}
      </Link>
    </article>
  );
};

export default JournalCard;
