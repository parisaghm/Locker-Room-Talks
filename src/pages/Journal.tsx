import { useMemo, useState } from "react";
import CornerNav from "@/components/CornerNav";
import FooterSection from "@/components/sections/FooterSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import JournalFilters from "@/components/journal/JournalFilters";
import JournalFeature from "@/components/journal/JournalFeature";
import JournalIntroCopy from "@/components/journal/JournalIntroCopy";
import JournalGrid from "@/components/journal/JournalGrid";
import JournalSectionLabel from "@/components/journal/JournalSectionLabel";
import { journalArticles, type JournalArticle } from "@/data/journalArticles";

/**
 * The category filter bar oversells the size of the archive while the Journal
 * is this small. Flip this to true to bring it back — JournalFilters, the
 * journalCategories list, and the per-article category data are all intact.
 */
const SHOW_CATEGORY_FILTERS: boolean = false;

/**
 * The published stories, in display order. Which one leads the page is decided
 * by `featured: true` in the article data, not by this order. Articles left out
 * of this list stay in journalArticles (and reachable at their own
 * /journal/:slug) — add a slug here to publish it to the listing.
 */
const LAUNCH_ARTICLE_SLUGS = [
  "what-does-it-mean-to-belong",
  "what-happens-to-us-when-we-leave-home",
];

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { featuredArticle, secondaryArticles } = useMemo(() => {
    const published = LAUNCH_ARTICLE_SLUGS.map((slug) =>
      journalArticles.find((article) => article.slug === slug)
    ).filter((article): article is JournalArticle => Boolean(article));

    const visible =
      !SHOW_CATEGORY_FILTERS || activeCategory === "All"
        ? published
        : published.filter((article) => article.category === activeCategory);

    /**
     * Hope leads the Journal because her story carries `featured: true`. If no
     * visible story is flagged, the first one leads, so the page never loses
     * its feature spread — and flagging a different story is all it takes to
     * change the lead.
     */
    const flagged = visible.findIndex((article) => article.featured);
    const leadIndex = flagged === -1 ? 0 : flagged;

    return {
      featuredArticle: visible[leadIndex],
      secondaryArticles: visible.filter((_, index) => index !== leadIndex),
    };
  }, [activeCategory]);

  return (
    <>
      <CornerNav />
      <main className="w-full min-w-0 max-w-full overflow-x-hidden">
        {/*
          The listing uses .journal-listing-section / .journal-listing-container
          rather than .page-section / .section-container: a wider measure (1220px)
          for the archive, and intrinsic height instead of 100vh. Article reading
          pages keep their own narrower measure.
        */}
        <section className="journal-listing-section">
          <div className="journal-listing-container">
            <header className="text-center pt-6 sm:pt-8">
              <h1 className="heading-lg mb-4 break-words">
                journal<span className="dot-teal"></span>
              </h1>
              <JournalIntroCopy />
            </header>

            {SHOW_CATEGORY_FILTERS && (
              <div className="mt-10 sm:mt-12">
                <JournalFilters
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>
            )}

            {featuredArticle ? (
              <>
                {/* Intro → feature: 48px / 56px / 64px. */}
                <section
                  aria-label="Featured story"
                  className="mt-12 sm:mt-14 lg:mt-16"
                >
                  <JournalSectionLabel>Featured story</JournalSectionLabel>
                  <JournalFeature article={featuredArticle} />
                </section>

                {secondaryArticles.length > 0 && (
                  /* Feature → latest stories: 80px / 96px / 104px. */
                  <section
                    aria-label="Latest stories"
                    className="mt-20 sm:mt-24 lg:mt-[6.5rem]"
                  >
                    <JournalSectionLabel>Latest stories</JournalSectionLabel>
                    <JournalGrid
                      articles={secondaryArticles}
                      activeCategory={activeCategory}
                    />
                  </section>
                )}
              </>
            ) : (
              // Only reachable with filters restored and a category that has no stories.
              <JournalGrid articles={[]} activeCategory={activeCategory} />
            )}

            {/* NewsletterSection brings its own top rule and padding. */}
            <div className="mt-16 sm:mt-20">
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
