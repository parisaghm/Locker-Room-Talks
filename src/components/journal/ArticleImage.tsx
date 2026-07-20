import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const ArticleImage = ({ src, alt, caption }: ArticleImageProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={`article-inline-image transition-all duration-700 ease-out ${
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
      {caption && (
        <figcaption className="mt-4 text-center text-xs sm:text-sm text-[#9a9a9a] leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ArticleImage;
