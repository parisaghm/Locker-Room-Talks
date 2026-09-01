import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import {
  getArticleImageUrl,
  getArticleReadingTime,
  getArticleSubtitle,
  type JournalArticle,
} from "@/data/journalArticles";

type Orientation = "landscape" | "square" | "portrait";

/**
 * Grid cards read as one system when their images share a width and a frame,
 * but forcing every photograph into one box would flatten portraits into
 * letterbox crops. So each image is bound to the ratio of its own orientation:
 * a portrait stays taller than a landscape, while the spread of card heights
 * stays narrow enough that rows do not tear open into empty space.
 *
 * object-cover does the fitting, so nothing is ever stretched.
 */
const ASPECT_BY_ORIENTATION: Record<Orientation, string> = {
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
};

const orientationOf = (width: number, height: number): Orientation => {
  const ratio = width / height;
  if (ratio >= 1.15) return "landscape";
  if (ratio <= 0.85) return "portrait";
  return "square";
};

interface JournalCardProps {
  article: JournalArticle;
  /**
   * "stack" is the grid card: image above the story information.
   * "row" puts the image beside the text across the full container width —
   * JournalGrid uses it when there is only one secondary story, so a lone card
   * reads as a deliberate archive row instead of a half-empty grid cell.
   */
  layout?: "stack" | "row";
}

const JournalCard = ({ article, layout = "stack" }: JournalCardProps) => {
  const readingTime = getArticleReadingTime(article);
  const subtitle = getArticleSubtitle(article);
  const isRow = layout === "row";
  // Landscape until the file itself says otherwise — most Journal images are.
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  /**
   * A row has a tall image to sit beside, so it also carries the story's
   * opening lines. Grid cards stay tighter — subtitle only.
   */
  const standfirstPreview = isRow
    ? article.standfirst ??
      (article.excerpt !== subtitle ? article.excerpt : undefined)
    : undefined;

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (naturalWidth && naturalHeight) {
      setOrientation(orientationOf(naturalWidth, naturalHeight));
    }
  };

  return (
    <article className="min-w-0">
      <Link
        to={`/journal/${article.slug}`}
        className={`group block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background ${
          isRow
            ? "sm:grid sm:grid-cols-12 sm:gap-8 md:gap-10 lg:gap-12 sm:items-center"
            : ""
        }`}
        aria-label={`Read ${article.title}`}
      >
        {/*
          The white mat is the Journal's frame treatment: every image gets the
          same border, shadow and width within its column.
        */}
        <div
          className={`relative p-1.5 bg-white shadow-md group-hover:shadow-lg transition-shadow duration-300 ${
            isRow ? "mb-5 sm:mb-0 sm:col-span-5" : "mb-5 sm:mb-6"
          }`}
        >
          <div
            className={`overflow-hidden ${ASPECT_BY_ORIENTATION[orientation]}`}
          >
            <img
              src={getArticleImageUrl(article)}
              alt={article.imageAlt ?? article.title}
              loading="lazy"
              decoding="async"
              onLoad={handleImageLoad}
              className="block w-full h-full object-cover object-center grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        </div>

        <div
          className={`min-w-0 ${isRow ? "sm:col-span-7 sm:max-w-[36rem]" : ""}`}
        >
          <span className="block text-xs font-bold tracking-[0.12em] uppercase text-[#8E0F13] mb-2.5 sm:mb-3">
            {article.category}
          </span>

          <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.01em] leading-[1.15] text-[#1a1a1a] break-words text-balance mb-3 group-hover:opacity-70 transition-opacity duration-200">
            {article.title}
            <span
              aria-hidden="true"
              className="inline-block ml-1.5 text-[0.85em] opacity-0 -translate-x-1 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0 motion-reduce:transition-none motion-reduce:translate-x-0"
            >
              →
            </span>
          </h3>

          {subtitle && (
            <p className="text-sm sm:text-base leading-[1.5] text-[#555555] break-words text-balance mb-4 [font-family:'DM_Serif_Display',Georgia,serif]">
              {subtitle}
            </p>
          )}

          {standfirstPreview && (
            <p className="text-sm sm:text-base leading-relaxed text-[#666666] break-words text-pretty line-clamp-3 mb-4">
              {standfirstPreview}
            </p>
          )}

          {(article.author || readingTime) && (
            <div className="text-xs sm:text-sm leading-relaxed">
              {article.author && (
                <p className="font-semibold text-[#1a1a1a]">{article.author}</p>
              )}
              {readingTime && (
                <p className="text-[#9a9a9a] mt-0.5">{readingTime}</p>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default JournalCard;
