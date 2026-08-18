import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "@/lib/scrollToSection";

const menuItems = [
  { label: "home", href: "#hero", dotColor: "bg-yellow-400" },
  { label: "team", href: "#team", dotColor: "bg-pink-500" },
  { label: "Meet the voices", href: "#contact", dotColor: "bg-green-400" },
  { label: "journal", href: "#journal", dotColor: "bg-teal-400" },
  { label: "gallery", href: "#gallery", dotColor: "bg-amber-400" },
  { label: "contact", href: "#footer", dotColor: "bg-blue-400" },
];

const CornerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // When arriving at the home page with a pending section target (set by a
  // menu click from another route, e.g. /voices), scroll to that section.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (location.pathname === "/" && target) {
      // Clear the state so refresh/back doesn't re-trigger the scroll.
      navigate("/", { replace: true, state: null });
      // Wait for the home page sections to render before scrolling.
      requestAnimationFrame(() => scrollToSection(target));
    }
  }, [location, navigate]);

  const handleMenuClick = (href: string) => {
    setIsOpen(false);
    // Route links (e.g. /journal) navigate directly.
    if (href.startsWith("/")) {
      if (location.pathname !== href) {
        navigate(href);
      }
      return;
    }
    // Section anchors only exist on the home page. From any other route,
    // navigate home first and carry the target so we can scroll on arrival.
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: href } });
      return;
    }
    scrollToSection(href);
  };

  return (
    <>
      {/* Menu Corner — toggles the overlay; hamburger morphs into an X when open */}
      <button
        className={`corner-menu${isOpen ? " corner-menu--open" : ""}`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex flex-col gap-1.5">
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </div>
      </button>

      {/* Sliding Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] transition-transform duration-500 ease-out translate-x-0 pointer-events-auto"
          aria-hidden={!isOpen}
        >
          {/* Dark background */}
          <div className="absolute inset-0 bg-primary" />

          {/* Menu items — touch-friendly min height */}
          <nav className="absolute inset-0 flex items-center justify-center p-4">
            <ul className="flex flex-col items-center gap-1 sm:gap-2 md:gap-4">
              {menuItems.map((item, index) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleMenuClick(item.href)}
                    className="group flex items-center text-primary-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold lowercase tracking-tight hover:opacity-70 transition-opacity min-h-[44px] py-2 px-3 touch-manipulation"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <span className="break-words text-center">{item.label}</span>
                    <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ml-1 shrink-0 ${item.dotColor}`} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default CornerNav;
