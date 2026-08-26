import { useParams } from "react-router-dom";
import CornerNav from "@/components/CornerNav";
import FooterSection from "@/components/sections/FooterSection";
import NotFound from "@/pages/NotFound";
import ArticleHeader from "@/components/journal/ArticleHeader";
import HeroImage from "@/components/journal/HeroImage";
import ArticleBody from "@/components/journal/ArticleBody";
import ShareSection from "@/components/journal/ShareSection";
import ArticleNavigation from "@/components/journal/ArticleNavigation";
import RelatedArticles from "@/components/journal/RelatedArticles";
import {
  getArticleBySlug,
  getAdjacentArticles,
  getRelatedArticles,
  getArticleBody,
  getArticleDescription,
  getArticleImageUrl,
} from "@/data/journalArticles";
import { usePageMeta } from "@/hooks/usePageMeta";

const JournalArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  usePageMeta({
    title: article
      ? `${article.title} — Locker Room Talks`
      : "Article not found — Locker Room Talks",
    description: article ? getArticleDescription(article) : undefined,
    ogImage: article ? getArticleImageUrl(article) : undefined,
  });

  if (!article) {
    return <NotFound />;
  }

  const { previous, next } = getAdjacentArticles(article.slug);
  const related = getRelatedArticles(article.slug);
  const body = getArticleBody(article);

  return (
    <>
      <CornerNav />
      <main className="w-full min-w-0 max-w-full overflow-x-hidden animate-in fade-in duration-500">
        <article className="article-page">
          <div className="article-page-inner">
            <ArticleHeader article={article} />

            {getArticleImageUrl(article) && (
              <HeroImage
                src={getArticleImageUrl(article)!}
                alt={article.imageAlt ?? article.title}
              />
            )}

            {body.length > 0 && <ArticleBody content={body} />}

            <ShareSection title={article.title} slug={article.slug} />
            <ArticleNavigation previous={previous} next={next} />
            <RelatedArticles articles={related} />
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default JournalArticle;
