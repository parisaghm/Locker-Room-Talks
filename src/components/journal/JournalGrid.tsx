import type { JournalArticle } from "@/data/journalArticles";
import JournalCard from "./JournalCard";

interface JournalGridProps {
  articles: JournalArticle[];
  activeCategory: string;
}

/**
 * Column count follows how much there is to show, so the archive never looks
 * padded out with empty cells:
 *
 *   1 story    → one full-width row (image beside text)
 *   2 stories  → two columns from md up
 *   3+ stories → two columns from md, three from xl
 *
 * Nothing here is tied to a specific article, so publishing story #3, #4, #5…
 * moves the grid to the next arrangement on its own.
 */
const JournalGrid = ({ articles, activeCategory }: JournalGridProps) => {
  if (articles.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12 [font-family:'DM_Serif_Display',Georgia,serif]">
        No stories in this category yet — they are on their way.
      </p>
    );
  }

  const isSingle = articles.length === 1;
  const columns = isSingle
    ? "grid-cols-1"
    : articles.length >= 3
      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <div
      // Re-keying by category re-mounts the grid so the fade-in plays on each filter change.
      key={activeCategory}
      className={`grid ${columns} items-start gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 animate-in fade-in duration-500 motion-reduce:animate-none`}
    >
      {articles.map((article) => (
        <JournalCard
          key={article.id}
          article={article}
          layout={isSingle ? "row" : "stack"}
        />
      ))}
    </div>
  );
};

export default JournalGrid;
