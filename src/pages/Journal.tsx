import { useMemo, useState } from "react";
import CornerNav from "@/components/CornerNav";
import FooterSection from "@/components/sections/FooterSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import JournalFilters from "@/components/journal/JournalFilters";
import JournalGrid from "@/components/journal/JournalGrid";
import { journalArticles } from "@/data/journalArticles";
import { usePageMeta } from "@/hooks/usePageMeta";

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  usePageMeta({
    title: "Journal — Locker Room Talks",
    description:
      "Long-form writing on migration, belonging, identity, and life between two places.",
  });

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return journalArticles;
    return journalArticles.filter(
      (article) => article.category === activeCategory
    );
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
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-[700px] mx-auto text-center break-words [font-family:'DM_Serif_Display',Georgia,serif]">
                Where the podcast slows down. Long-form writing on migration,
                belonging, and the quiet business of building a life between
                two places.
              </p>
            </header>

            <div className="mb-12 sm:mb-16">
              <JournalFilters
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            <JournalGrid
              articles={filteredArticles}
              activeCategory={activeCategory}
            />

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
