import { useMemo, useState } from "react";
import CornerNav from "@/components/CornerNav";
import FooterSection from "@/components/sections/FooterSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import JournalFilters from "@/components/journal/JournalFilters";
import JournalFeature from "@/components/journal/JournalFeature";
import JournalGrid from "@/components/journal/JournalGrid";
import { journalArticles, type JournalArticle } from "@/data/journalArticles";
import { usePageMeta } from "@/hooks/usePageMeta";

/**
 * The category filter bar oversells the size of the archive while the Journal
 * is this small. Flip this to true to bring it back — JournalFilters, the
 * journalCategories list, and the per-article category data are all intact.
 */
const SHOW_CATEGORY_FILTERS: boolean = false;

/**
 * The stories on the Journal at launch, in display order: the first is the lead
 * spread, the rest fill the grid beneath it. Articles left out of this list stay
 * in journalArticles (and reachable at their own /journal/:slug) — add a slug
 * here to publish it to the listing.
 */
const LAUNCH_ARTICLE_SLUGS = [
  "what-does-it-mean-to-belong",
  "what-happens-to-us-when-we-leave-home",
  "home-is-a-conversation",
];

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  usePageMeta({
    title: "Journal — Locker Room Talks",
    description:
      "Long-form writing on migration, belonging, identity, and life between two places.",
  });

  const [featuredArticle, ...secondaryArticles] = useMemo(() => {
    const published = LAUNCH_ARTICLE_SLUGS.map((slug) =>
      journalArticles.find((article) => article.slug === slug)
    ).filter((article): article is JournalArticle => Boolean(article));

    if (!SHOW_CATEGORY_FILTERS || activeCategory === "All") {
      return published;
    }

    return published.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <CornerNav />
      <main className="w-full min-w-0 max-w-full overflow-x-hidden">
        <section className="page-section items-start">
          <div className="section-container">
            <header className="text-center section-heading-block pt-10 sm:pt-12">
              <h1 className="heading-lg mb-4 break-words">
                journal<span className="dot-teal"></span>
              </h1>
              <p className="body-text max-w-[700px] mx-auto text-center">
                Where the podcast slows down. Long-form writing on migration,
                belonging, and the quiet business of building a life between
                two places.
              </p>
            </header>

            {SHOW_CATEGORY_FILTERS && (
              <div className="mb-12 sm:mb-16">
                <JournalFilters
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>
            )}

            {featuredArticle ? (
              <>
                <JournalFeature article={featuredArticle} />

                {secondaryArticles.length > 0 && (
                  <div className="mt-16 sm:mt-20 md:mt-24">
                    {/*
                      Labels the grid beneath the lead spread so the hierarchy
                      stays readable as more stories are published. The grid
                      itself is unbounded — it wraps to as many rows as needed.
                    */}
                    <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-accent-teal pb-4 sm:pb-5 mb-10 sm:mb-12 border-b border-border">
                      Latest stories
                    </h2>
                    <JournalGrid
                      articles={secondaryArticles}
                      activeCategory={activeCategory}
                    />
                  </div>
                )}
              </>
            ) : (
              // Only reachable with filters restored and a category that has no stories.
              <JournalGrid articles={[]} activeCategory={activeCategory} />
            )}

            <div className="mt-20 sm:mt-24 md:mt-28">
              <NewsletterSection />
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Journal;
