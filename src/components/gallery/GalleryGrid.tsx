import { useState, type FC } from "react";
import type { GalleryImage } from "@/data/galleryImages";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

const GalleryGrid: FC<GalleryGridProps> = ({ images, onImageClick }) => {
  const [loadedSet, setLoadedSet] = useState<Set<string>>(new Set());

  const handleLoad = (id: string) => {
    setLoadedSet((prev) => new Set(prev).add(id));
  };

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
      {images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onImageClick(index)}
          className="group relative w-full break-inside-avoid mb-0 block overflow-hidden bg-neutral-200/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
          aria-label={`View ${image.alt}`}
        >
          <div className="relative overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              onLoad={() => handleLoad(image.id)}
              className={`w-full h-auto block transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.92] ${
                loadedSet.has(image.id)
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
            {!loadedSet.has(image.id) && (
              <div className="absolute inset-0 bg-neutral-200/60 animate-pulse" />
            )}
          </div>

          {image.caption && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-5 pt-10">
                <p className="text-white/90 text-xs sm:text-sm font-medium tracking-wide lowercase">
                  {image.caption}
                </p>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default GalleryGrid;
