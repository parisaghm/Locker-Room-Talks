import { useEffect, useRef, useState } from "react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { shapeFromRatio, type ImageShape } from "@/lib/imageShape";

interface HeroImageProps {
  src: string;
  alt: string;
}

const HeroImage = ({ src, alt }: HeroImageProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();
  const imageRef = useRef<HTMLImageElement>(null);
  // Landscape until measured, so a wide hero never reflows narrower on load.
  const [shape, setShape] = useState<ImageShape>("landscape");

  const applyShape = (image: HTMLImageElement) => {
    if (image.naturalWidth && image.naturalHeight) {
      setShape(shapeFromRatio(image.naturalWidth, image.naturalHeight));
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) applyShape(image);
  }, [src]);

  return (
    <figure
      ref={ref}
      className={`article-hero-image is-${shape} article-reveal ${
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
          className="grayscale"
        />
      </div>
    </figure>
  );
};

export default HeroImage;
