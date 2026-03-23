import { useEffect, useCallback, type FC } from "react";
import type { GalleryImage } from "@/data/galleryImages";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const GalleryLightbox: FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const image = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const goToNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goToPrev, goToNext]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/50 text-xs tracking-widest font-medium select-none">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        type="button"
        onClick={goToPrev}
        disabled={!hasPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-default transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={goToNext}
        disabled={!hasNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-default transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label="Next image"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Image + caption */}
      <div className="relative z-10 flex flex-col items-center max-w-[90vw] max-h-[85vh] animate-in zoom-in-95 fade-in duration-200">
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[78vh] w-auto h-auto object-contain select-none"
          draggable={false}
        />
        {image.caption && (
          <p className="mt-4 text-white/60 text-sm tracking-wide lowercase text-center max-w-lg">
            {image.caption}
          </p>
        )}
      </div>
    </div>
  );
};

export default GalleryLightbox;
