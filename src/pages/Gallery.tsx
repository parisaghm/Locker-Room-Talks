import { useState, useCallback } from "react";
import CornerNav from "@/components/CornerNav";
import FooterSection from "@/components/sections/FooterSection";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { allGalleryImages } from "@/data/galleryImages";

const Gallery = () => {
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
      <CornerNav />
      <main className="w-full min-w-0 max-w-full overflow-x-hidden">
        <section className="page-section items-start">
          <div className="section-container">
            <header className="text-center section-heading-block pt-10 sm:pt-12">
              <h1 className="heading-lg mb-4 break-words">
                gallery<span className="dot-amber"></span>
              </h1>
              <p className="body-text text-muted-foreground max-w-xl mx-auto">
                Behind the scenes — moments from our conversations.
              </p>
            </header>

            <GalleryGrid
              images={allGalleryImages}
              onImageClick={openLightbox}
              columnsClassName="columns-1 sm:columns-2 md:columns-3 xl:columns-4"
              captionMode="below"
              eagerCount={4}
            />
          </div>
        </section>
      </main>
      <FooterSection />

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={allGalleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
};

export default Gallery;
