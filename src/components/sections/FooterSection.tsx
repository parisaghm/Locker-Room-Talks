import type { SVGProps } from "react";
import { Youtube, Radio } from "lucide-react";

/** Instagram logo (lucide's brand icon is deprecated; SVG from Simple Icons) */
const InstagramIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

/** LinkedIn logo (lucide's brand icon is deprecated; SVG from Simple Icons) */
const LinkedInIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

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
            <InstagramIcon className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
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
