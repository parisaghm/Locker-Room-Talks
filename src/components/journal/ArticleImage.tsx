import { useEffect, useRef, useState } from "react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  layout?: "column" | "wide";
  crop?: "cover" | "natural";
  monochrome?: boolean;
}

type ImageShape = "landscape" | "portrait" | "square";

function shapeFromRatio(width: number, height: number): ImageShape {
  const ratio = width / height;
  if (ratio >= 1.2) return "landscape";
  if (ratio <= 0.86) return "portrait";
  return "square";
}

function initialShape(crop?: "cover" | "natural"): ImageShape {
  return crop === "cover" ? "landscape" : "portrait";
}

const ArticleImage = ({
  src,
  alt,
  caption,
  layout = "column",
  crop = "cover",
  monochrome = true,
}: ArticleImageProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();
  const imageRef = useRef<HTMLImageElement>(null);
  const [shape, setShape] = useState<ImageShape>(() => initialShape(crop));

  const applyShape = (image: HTMLImageElement) => {
    if (image.naturalWidth && image.naturalHeight) {
      setShape(shapeFromRatio(image.naturalWidth, image.naturalHeight));
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) applyShape(image);
  }, [src]);

  const isWideLandscape = layout === "wide" && shape === "landscape";

  return (
    <figure
      ref={ref}
      className={`article-inline-image is-${shape}${isWideLandscape ? " is-wide" : ""} article-reveal ${
        isVisible ? "is-revealed" : ""
      }`}
    >
      <div className="article-image-frame">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={(event) => applyShape(event.currentTarget)}
          className={monochrome ? "grayscale" : undefined}
        />
      </div>
      {caption && (
        <figcaption className="article-image-caption">{caption}</figcaption>
      )}
    </figure>
  );
};

export default ArticleImage;
