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
  isExpanded: boolean;
  onToggleExpanded: () => void;
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
  isExpanded,
  onToggleExpanded,
}: GuestCardProps) => {

  return (
    <div className="w-full bg-white border border-gray-200/60 rounded-lg overflow-hidden flex flex-col">
      {/* Photo */}
      <div className="relative w-full pt-[75%] overflow-hidden bg-gray-50 flex-shrink-0">
        <img
          src={photo}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{name}</h3>

        <p className="text-base md:text-lg text-muted-foreground mb-3 leading-relaxed">
          {summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-2.5 py-0.5 bg-gray-50 text-gray-600 lowercase font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Collapsible Bio */}
        <div className="mb-2">
          <button
            type="button"
            onClick={onToggleExpanded}
            aria-expanded={isExpanded}
            aria-controls={`guest-bio-${id}`}
            className="flex items-center gap-2 text-sm text-foreground hover:text-foreground/70 transition-colors lowercase mb-1"
          >
            {isExpanded ? (
              <>
                Read less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>

          {isExpanded && (
            <p
              id={`guest-bio-${id}`}
              className="text-base text-muted-foreground leading-relaxed"
            >
              {fullBio}
            </p>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 pt-3 border-t border-gray-100 mt-auto">
          <a
            href={youtubeUrl}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-medium hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
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
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-gray-700 text-[11px] font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
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
