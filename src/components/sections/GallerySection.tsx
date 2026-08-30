import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { homeGalleryImages } from "@/data/galleryImages";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import ScrollArrow from "@/components/ScrollArrow";

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <>
      <section id="gallery" className="page-section home-content-section">
        <div className="section-container">
          <header className="text-center section-heading-block">
            <h2 className="heading-lg mb-4 break-words">
              gallery<span className="dot-amber"></span>
            </h2>
            <p className="body-text text-muted-foreground max-w-xl mx-auto">
              Behind the scenes — moments from our conversations.
            </p>
          </header>

          <GalleryGrid images={homeGalleryImages} onImageClick={openLightbox} />

          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/gallery"
              className="relative z-10 pointer-events-auto inline-flex items-center gap-2 min-h-[44px] py-2 px-1 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity duration-[250ms] border-b border-foreground touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View full gallery
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="section-scroll-group">
            <ScrollArrow targetId="team" />
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={homeGalleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
};

export default GallerySection;
