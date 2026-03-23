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
      <section
        id="gallery"
        className="w-full max-w-full min-w-0 relative flex flex-col justify-start px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-28 overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="heading-lg mb-4 break-words">
              gallery<span className="dot-teal"></span>
            </h2>
            <p className="body-text text-muted-foreground max-w-xl mx-auto">
              Behind the scenes — moments from our conversations.
            </p>
          </div>

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
