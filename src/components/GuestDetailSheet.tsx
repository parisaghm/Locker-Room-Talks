import type { Guest } from "@/data/guests";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface GuestDetailSheetProps {
  guest: Guest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GuestDetailSheet = ({
  guest,
  open,
  onOpenChange,
}: GuestDetailSheetProps) => {
  const {
    name,
    bioFull,
    bioShort,
    imageUrl,
    tags,
    youtubeUrl,
    appleUrl,
    imagePosition = "top",
  } = guest ?? {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-md sm:max-w-lg overflow-y-auto bg-background border-gray-200"
      >
        {guest && (
          <>
            <SheetHeader>
              <SheetTitle className="text-2xl sm:text-3xl font-bold break-words lowercase">
                {name}
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50 rounded-lg">
                <img
                  src={imageUrl}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                  style={{ objectPosition: imagePosition }}
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs sm:text-sm px-2.5 py-0.5 border border-gray-300 text-gray-600 lowercase font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
                {bioFull || bioShort}
              </p>

              <div className="flex flex-row flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap shrink-0 touch-manipulation"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
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
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap shrink-0 touch-manipulation"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
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
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default GuestDetailSheet;
