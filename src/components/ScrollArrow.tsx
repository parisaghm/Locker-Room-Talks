import { ChevronDown } from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";

interface ScrollArrowProps {
  targetId: string;
  label?: string;
}

const ScrollArrow = ({ targetId, label }: ScrollArrowProps) => {
  const handleClick = () => {
    scrollToSection(targetId);
  };

  return (
    <div className="scroll-arrow-wrapper">
      {label && <span className="label-text">{label}</span>}
      <button
        onClick={handleClick}
        className="scroll-arrow"
        aria-label={`Scroll to ${targetId}`}
      >
        <ChevronDown />
      </button>
    </div>
  );
};

export default ScrollArrow;
