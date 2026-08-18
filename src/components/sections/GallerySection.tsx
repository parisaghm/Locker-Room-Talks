import { useState, useCallback } from "react";
import { galleryImages } from "@/data/galleryImages";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

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
              gallery<span className="dot-teal"></span>
            </h2>
            <p className="body-text text-muted-foreground max-w-xl mx-auto">
              Behind the scenes — moments from our conversations.
            </p>
          </header>

          <GalleryGrid images={galleryImages} onImageClick={openLightbox} />
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
};

export default GallerySection;
