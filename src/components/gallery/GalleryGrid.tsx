import { useState, type FC } from "react";
import type { GalleryImage } from "@/data/galleryImages";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
  /** Masonry column counts. Defaults to the homepage preview rhythm. */
  columnsClassName?: string;
  /**
   * "overlay" is the homepage treatment: caption slides up over the image on
   * hover. "below" sets it as a quiet editorial line under the frame, which
   * suits the denser /gallery page where captions should be readable at rest.
   */
  captionMode?: "overlay" | "below";
  /** How many leading images to load eagerly; the rest stay lazy. */
  eagerCount?: number;
}

const GalleryGrid: FC<GalleryGridProps> = ({
  images,
  onImageClick,
  columnsClassName = "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
  captionMode = "overlay",
  eagerCount = 0,
}) => {
  const [loadedSet, setLoadedSet] = useState<Set<string>>(new Set());

  const handleLoad = (id: string) => {
    setLoadedSet((prev) => new Set(prev).add(id));
  };

  return (
    <div className={`${columnsClassName} gap-4 md:gap-5`}>
      {images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onImageClick(index)}
          className={`group relative w-full break-inside-avoid mb-4 md:mb-5 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 ${
            captionMode === "overlay" ? "overflow-hidden" : ""
          }`}
          aria-label={`View ${image.alt}`}
        >
          <div className="relative overflow-hidden bg-neutral-200/40">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={index < eagerCount ? "eager" : "lazy"}
              fetchPriority={index < eagerCount ? "high" : "auto"}
              decoding="async"
              onLoad={() => handleLoad(image.id)}
              className={`w-full h-auto block grayscale transition-all duration-500 ease-out group-hover:grayscale-[30%] group-hover:scale-[1.03] ${
                loadedSet.has(image.id)
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
            {!loadedSet.has(image.id) && (
              <div className="absolute inset-0 bg-neutral-200/60 animate-pulse" />
            )}
          </div>

          {image.caption && captionMode === "overlay" && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 pb-5 pt-10">
                <div className="flex items-center min-h-[2.9em] text-xs sm:text-sm">
                  <p className="text-white/90 font-medium tracking-wide lowercase leading-[1.45] line-clamp-2">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          )}

          {image.caption && captionMode === "below" && (
            <div className="mt-3 flex items-center min-h-[2.9em] text-xs sm:text-sm">
              <p className="text-left text-muted-foreground tracking-wide lowercase leading-[1.45] line-clamp-2">
                {image.caption}
              </p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default GalleryGrid;
