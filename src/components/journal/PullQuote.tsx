import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface PullQuoteProps {
  text: string;
}

const PullQuote = ({ text }: PullQuoteProps) => {
  const { ref, isVisible } = useFadeInOnScroll<HTMLQuoteElement>();

  return (
    <blockquote
      ref={ref}
      className={`article-pullquote transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="article-pullquote-divider" aria-hidden="true" />
      <p className="text-xl sm:text-2xl md:text-[1.65rem] leading-[1.45] text-[#1a1a1a] italic text-center text-balance [font-family:'DM_Serif_Display',Georgia,serif]">
        {text}
      </p>
    </blockquote>
  );
};

export default PullQuote;
