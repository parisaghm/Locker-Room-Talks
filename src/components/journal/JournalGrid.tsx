import type { JournalArticle } from "@/data/journalArticles";
import JournalCard from "./JournalCard";

interface JournalGridProps {
  articles: JournalArticle[];
  activeCategory: string;
}

const JournalGrid = ({ articles, activeCategory }: JournalGridProps) => {
  if (articles.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12 [font-family:'DM_Serif_Display',Georgia,serif]">
        No stories in this category yet — they are on their way.
      </p>
    );
  }

  return (
    <div
      // Re-keying by category re-mounts the grid so the fade-in plays on each filter change.
      key={activeCategory}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 animate-in fade-in duration-500 motion-reduce:animate-none"
    >
      {articles.map((article) => (
        <JournalCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default JournalGrid;
