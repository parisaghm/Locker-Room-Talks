import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface GuestCardProps {
  id: string;
  name: string;
  photo: string;
  summary: string;
  fullBio: string;
  tags: string[];
  youtubeUrl?: string;
  applePodcastsUrl?: string;
  /** Optional object-position for the photo: "top" (default) or "center" for face-centered framing */
  imagePosition?: "top" | "center";
  /** Optional extra class(es) for the photo img (e.g. object-position or filter for a single guest) */
  imageClassName?: string;
}

const GuestCard = ({
  id,
  name,
  photo,
  summary,
  fullBio,
  tags,
  youtubeUrl = "#",
  applePodcastsUrl = "#",
  imagePosition = "top",
  imageClassName,
}: GuestCardProps) => {
  // Each card manages its own expanded state - completely isolated
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="w-full min-w-0 max-w-full h-full bg-white border border-gray-200/60 rounded-lg overflow-hidden flex flex-col">
      {/* Photo — aspect-ratio + object-cover */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50 flex-shrink-0 min-h-0">
        <img
          src={photo}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover grayscale ${imagePosition === "center" ? "object-center" : "object-top"} ${imageClassName ?? ""}`.trim()}
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col min-h-0 min-w-0">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">{name}</h3>

        {/* Variable content wrapper - takes remaining space */}
        <div className="flex-1 flex flex-col min-w-0">
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-2 leading-relaxed break-words">
            {summary}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 bg-gray-50 text-gray-600 lowercase font-medium rounded break-words"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Collapsible Bio */}
          <div className="mb-2 min-w-0">
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={isExpanded}
              aria-controls={`guest-bio-${id}`}
              className="flex items-center gap-2 text-sm text-foreground lowercase min-h-[44px] touch-manipulation"
            >
              {isExpanded ? (
                <>
                  Read less <ChevronUp className="w-4 h-4 shrink-0" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>

            {isExpanded && (
              <p
                id={`guest-bio-${id}`}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1.5 break-words"
              >
                {fullBio}
              </p>
            )}
          </div>
        </div>

        {/* CTAs — touch-friendly min height */}
        <div className="flex flex-row items-center gap-2 flex-wrap pt-3 mt-0 border-t border-gray-100 min-w-0">
          <a
            href={youtubeUrl}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-0 px-3 sm:px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap shrink-0 touch-manipulation"
          >
            <svg
              className="w-4 h-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                fill="#FF0000"
              />
            </svg>
            Watch on YouTube
          </a>
          <a
            href={applePodcastsUrl}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-0 px-3 sm:px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap shrink-0 touch-manipulation"
          >
            <svg
              className="w-4 h-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5c-4.135 0-7.5-3.365-7.5-7.5S7.865 4.5 12 4.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5zm0-13.5c-3.308 0-6 2.692-6 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6z"
                fill="#9933CC"
              />
              <circle cx="12" cy="12" r="3" fill="#9933CC" />
            </svg>
            Apple Podcasts
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuestCard;
