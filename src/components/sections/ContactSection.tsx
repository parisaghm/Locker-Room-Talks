import { useState } from "react";
import { Link } from "react-router-dom";
import GuestCard from "../GuestCard";
import GuestDetailSheet from "../GuestDetailSheet";
import ScrollArrow from "@/components/ScrollArrow";
import { guests, type Guest } from "@/data/guests";

// Filter guests for homepage - only show those with showOnHome !== false
const homeGuests = guests.filter((guest) => guest.showOnHome !== false);

const ContactSection = () => {
  const [detailGuest, setDetailGuest] = useState<Guest | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openDetail = (guest: Guest) => {
    setDetailGuest(guest);
    setSheetOpen(true);
  };

  return (
    <section
      id="contact"
      className="min-h-0 w-full max-w-full min-w-0 relative flex flex-col justify-start px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 md:pt-12 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        {/* Left-aligned section heading */}
        <div className="mb-10 md:mb-14">
          <h2 className="heading-lg text-center">
            meet the voices<span className="dot-green"></span>
          </h2>
        </div>

        {/* Responsive guest grid: 1 col mobile · 2 col tablet · 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12 w-full min-w-0">
          {homeGuests.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              onOpenDetail={openDetail}
            />
          ))}
        </div>

        {/* SEE ALL GUESTS → footer link */}
        <div className="mt-12 sm:mt-16">
          <Link
            to="/voices"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-foreground hover:opacity-70 transition-opacity border-b border-foreground pb-1"
          >
            SEE ALL GUESTS
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8H13M10 5L13 8L10 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div id="contact-arrow" className="hero-bottom-group flex flex-col items-center">
          <ScrollArrow targetId="gallery" />
        </div>

      </div>

      <GuestDetailSheet
        guest={detailGuest}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </section>
  );
};

export default ContactSection;
