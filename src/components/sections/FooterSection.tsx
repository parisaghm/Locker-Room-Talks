import { Youtube, Instagram, Linkedin, Radio } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="footer" className="bg-[#1a1a1a] text-gray-200 py-8 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Brand Section */}
        <div className="mb-4">
          <div className="text-2xl md:text-3xl tracking-tight">
            <span className="font-bold">lrt</span>
            <span className="italic font-normal">
              {" "}conversations<span className="font-bold not-italic">.unfold.</span>
            </span>
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-px bg-gray-300/30 mb-6 max-w-2xl mx-auto"></div>

        {/* Contact Information */}
        <div className="mb-6">
          <p className="text-base md:text-lg text-gray-300 mb-4 lowercase">
            If you're interested in taking part or would like to get in touch, write to:
          </p>
          <a 
            href="mailto:lockerroomtalkmedia@gmail.com" 
            className="text-lg md:text-xl text-gray-200 hover:text-white transition-colors lowercase inline-block"
          >
            lockerroomtalkmedia@gmail.com
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-6 md:gap-8 mb-6">
          <a 
            href="#" 
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
          </a>
          <a 
            href="#" 
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
          </a>
          <a 
            href="#" 
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
          </a>
          <a 
            href="#" 
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Podcast"
          >
            <Radio className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm md:text-base text-gray-400 lowercase">
          © 2026 Locker Room Talks
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
