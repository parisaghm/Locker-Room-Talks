import { useState } from "react";
import GuestCard from "../GuestCard";
import GuestDetailSheet from "../GuestDetailSheet";
import { guests, type Guest } from "@/data/guests";

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
      className="w-full max-w-full min-w-0 relative px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-24 md:pb-32 overflow-x-hidden"
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
          {guests.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              onOpenDetail={openDetail}
            />
          ))}
        </div>

        {/* SEE ALL GUESTS → footer link */}
        <div className="mt-12 sm:mt-16">
          <a
            href="#"
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
          </a>
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
