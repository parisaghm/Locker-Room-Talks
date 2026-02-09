import type { Guest } from "@/data/guests";

interface GuestCardProps {
  guest: Guest;
  onOpenDetail: (guest: Guest) => void;
}

const GuestCard = ({ guest, onOpenDetail }: GuestCardProps) => {
  const {
    name,
    bioShort,
    imageUrl,
    tags,
    youtubeUrl,
    appleUrl,
    imagePosition = "top",
  } = guest;

  return (
    <div className="flex flex-col min-w-0">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover grayscale"
          style={{ objectPosition: imagePosition }}
        />
      </div>

      {/* Content */}
      <div className="pt-5 flex flex-col flex-1 min-w-0">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 break-words">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3 break-words">
          {bioShort}
        </p>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 border border-gray-300 text-gray-500 rounded-full lowercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <button
          type="button"
          onClick={() => onOpenDetail(guest)}
          className="text-sm text-foreground font-medium inline-flex items-center gap-1 mb-4 hover:underline cursor-pointer self-start touch-manipulation"
        >
          read more
          <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* YouTube + Apple Podcasts buttons */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors touch-manipulation"
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                fill="#FF0000"
              />
            </svg>
            Watch on YouTube
          </a>
          <a
            href={appleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors touch-manipulation"
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c4.638 0 8.4 3.762 8.4 8.4 0 3.093-1.675 5.793-4.167 7.254l-.153-1.322a6.808 6.808 0 0 0 2.72-5.932c0-3.748-3.052-6.8-6.8-6.8s-6.8 3.052-6.8 6.8a6.808 6.808 0 0 0 2.72 5.932l-.153 1.322A8.38 8.38 0 0 1 3.6 12c0-4.638 3.762-8.4 8.4-8.4zm0 3.6a4.8 4.8 0 0 1 2.252 9.047l-.58-5.007a1.68 1.68 0 1 0-3.344 0l-.58 5.007A4.8 4.8 0 0 1 12 7.2zm1.408 10.391c-.206 1.78-.368 3.176-.44 3.681-.126.878-.492 1.128-.968 1.128s-.842-.25-.968-1.128c-.072-.505-.234-1.901-.44-3.681a4.77 4.77 0 0 0 1.408.209 4.77 4.77 0 0 0 1.408-.209z"
                fill="#9933CC"
              />
            </svg>
            Apple Podcasts
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuestCard;
