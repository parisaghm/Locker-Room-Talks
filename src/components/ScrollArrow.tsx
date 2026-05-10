import { ChevronDown } from "lucide-react";

interface ScrollArrowProps {
  targetId: string;
  label?: string;
}

const ScrollArrow = ({ targetId, label }: ScrollArrowProps) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
