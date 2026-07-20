import { journalCategories } from "@/data/journalArticles";

interface JournalFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const JournalFilters = ({
  activeCategory,
  onCategoryChange,
}: JournalFiltersProps) => {
  return (
    <div className="border-b border-border">
      <ul
        className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-1"
        aria-label="Filter articles by category"
      >
        {journalCategories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onCategoryChange(category)}
                aria-pressed={isActive}
                className={`relative inline-flex items-center min-h-[44px] px-1 pb-1 text-sm sm:text-[0.9375rem] transition-colors duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
                <span
                  aria-hidden="true"
                  className={`absolute left-1 right-1 bottom-0 h-[2px] bg-accent-teal transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default JournalFilters;
