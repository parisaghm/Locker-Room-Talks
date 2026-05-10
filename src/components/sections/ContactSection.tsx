import { useState } from "react";
import { Link } from "react-router-dom";
import GuestCard from "../GuestCard";
import GuestDetailSheet from "../GuestDetailSheet";
import ScrollArrow from "@/components/ScrollArrow";
import { guests, type Guest } from "@/data/guests";

const homeGuests = guests.filter((guest) => guest.showOnHome !== false);

const ContactSection = () => {
  const [detailGuest, setDetailGuest] = useState<Guest | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openDetail = (guest: Guest) => {
    setDetailGuest(guest);
    setSheetOpen(true);
  };

  return (
    <section id="contact" className="page-section">
      <div className="section-container">
        <header className="text-center section-heading-block">
          <h2 className="heading-lg">
            meet the voices<span className="dot-green"></span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12 w-full min-w-0">
          {homeGuests.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              onOpenDetail={openDetail}
            />
          ))}
        </div>

        <div className="section-follow-block">
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

        <div className="section-scroll-group">
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
