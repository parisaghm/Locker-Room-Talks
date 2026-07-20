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
      className={`article-hero-image mx-auto w-full max-w-[800px] transition-all duration-700 ease-out delay-100 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="group relative p-1.5 bg-white rounded-lg shadow-md">
        <div className="aspect-[16/10] overflow-hidden rounded-md">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </figure>
  );
};

export default HeroImage;
