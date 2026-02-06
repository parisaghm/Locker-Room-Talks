import { Youtube, Instagram, Linkedin, Radio } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="footer" className="bg-[#1a1a1a] text-gray-200 py-6 sm:py-8 px-4 sm:px-6 w-full max-w-full min-w-0 overflow-x-hidden">
      <div className="max-w-4xl mx-auto text-center w-full min-w-0">
        {/* Contact Information */}
        <div className="mb-6">
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 lowercase break-words">
            If you're interested in taking part or would like to get in touch, write to:
          </p>
          <a
            href="mailto:lockerroomtalkmedia@gmail.com"
            className="text-base sm:text-lg md:text-xl text-gray-200 hover:text-white transition-colors lowercase inline-block break-all min-h-[44px] inline-flex items-center justify-center touch-manipulation"
          >
            lockerroomtalkmedia@gmail.com
          </a>
        </div>

        {/* Social Media Icons — touch-friendly */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-6 flex-wrap">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6 md:w-7 md:h-7 shrink-0" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 md:w-7 md:h-7 shrink-0" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 md:w-7 md:h-7 shrink-0" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Podcast"
          >
            <Radio className="w-6 h-6 md:w-7 md:h-7 shrink-0" strokeWidth={1.5} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs sm:text-sm md:text-base text-gray-400 break-words">
          © 2026 Locker Room Talks
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
