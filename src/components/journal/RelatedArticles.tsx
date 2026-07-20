import { Link } from "react-router-dom";
import type { JournalArticle } from "@/data/journalArticles";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface RelatedArticlesProps {
  articles: JournalArticle[];
}

const RelatedArticleCard = ({ article }: { article: JournalArticle }) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <Link
        to={`/journal/${article.slug}`}
        className="group block min-w-0"
        aria-label={`Read ${article.title}`}
      >
        <div className="relative p-1.5 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 mb-4 rounded-lg">
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img
              src={article.imageUrl}
              alt={article.imageAlt ?? article.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <span className="block text-xs font-bold tracking-[0.12em] uppercase text-[#8E0F13] mb-3">
          {article.category}
        </span>

        <h3 className="text-lg sm:text-xl font-bold leading-[1.2] text-[#1a1a1a] break-words [font-family:'DM_Serif_Display',Georgia,serif] group-hover:opacity-70 transition-opacity duration-200">
          {article.title}
        </h3>
      </Link>
    </article>
  );
};

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();

  if (articles.length === 0) return null;

  return (
    <section
      ref={ref}
      aria-label="More from the Journal"
      className={`article-related mx-auto w-full max-w-[800px] transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="article-related-header">
        <h2 className="heading-md text-[#1a1a1a]">
          more from the journal<span className="dot-teal"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {articles.map((article) => (
          <RelatedArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
