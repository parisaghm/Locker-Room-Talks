import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CornerNav from "@/components/CornerNav";
import GuestCard from "@/components/GuestCard";
import GuestDetailSheet from "@/components/GuestDetailSheet";
import FooterSection from "@/components/sections/FooterSection";
import { guests, type Guest } from "@/data/guests";

const AllVoices = () => {
  const [detailGuest, setDetailGuest] = useState<Guest | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openDetail = (guest: Guest) => {
    setDetailGuest(guest);
    setSheetOpen(true);
  };

  // Filter guests based on search query (name, tags, or bio)
  const filteredGuests = useMemo(() => {
    if (!searchQuery.trim()) return guests;
    const query = searchQuery.toLowerCase();
    return guests.filter(
      (guest) =>
        guest.name.toLowerCase().includes(query) ||
        guest.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        guest.bioShort.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <CornerNav />
      <main className="w-full min-w-0 max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity mb-8"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M6 5L3 8L6 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            BACK
          </Link>

          {/* Page heading */}
          <h1 className="heading-lg mb-8">
            all voices<span className="dot-green"></span>
          </h1>

          {/* Search bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name, topic, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-8">
            {filteredGuests.length} voice{filteredGuests.length !== 1 ? "s" : ""}
          </p>

          {/* Guest grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12">
            {filteredGuests.map((guest) => (
              <GuestCard
                key={guest.id}
                guest={guest}
                onOpenDetail={openDetail}
              />
            ))}
          </div>

          {filteredGuests.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No voices found matching your search.
            </p>
          )}
        </div>

        <GuestDetailSheet
          guest={detailGuest}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        />
      </main>
      <FooterSection />
    </>
  );
};

export default AllVoices;
