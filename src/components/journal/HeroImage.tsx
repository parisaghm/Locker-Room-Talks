import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface HeroImageProps {
  src: string;
  alt: string;
}

const HeroImage = ({ src, alt }: HeroImageProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={`article-hero-image article-reveal ${
        isVisible ? "is-revealed" : ""
      }`}
    >
      <div className="article-image-frame">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="grayscale"
        />
      </div>
    </figure>
  );
};

export default HeroImage;
