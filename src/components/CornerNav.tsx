import { useState } from "react";
import { X } from "lucide-react";

const menuItems = [
  { label: "home", href: "#hero", dotColor: "bg-yellow-400" },
  { label: "team", href: "#team", dotColor: "bg-pink-500" },
  { label: "Meet the voices", href: "#Meet the voices", dotColor: "bg-green-400" },
  { label: "contact", href: "#footer", dotColor: "bg-blue-400" },
];

const CornerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Logo Corner */}
      <div className="corner-logo">
        <span className="text-primary-foreground font-bold text-lg md:text-xl tracking-tight">
          LRT
        </span>
      </div>

      {/* Menu Corner */}
      <button 
        className="corner-menu" 
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-col gap-1.5">
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </div>
      </button>

      {/* Sliding Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Dark background */}
        <div className="absolute inset-0 bg-primary" />
        
        {/* Close button */}
        <button
          className="absolute top-6 right-6 md:top-8 md:right-8 text-primary-foreground hover:opacity-70 transition-opacity z-10"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
        </button>

        {/* Menu items */}
        <nav className="absolute inset-0 flex items-center justify-center">
          <ul className="flex flex-col items-center gap-2 md:gap-4">
            {menuItems.map((item, index) => (
              <li key={item.label}>
                <button
                  onClick={() => handleMenuClick(item.href)}
                  className="group flex items-center text-primary-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold lowercase tracking-tight hover:opacity-70 transition-opacity"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {item.label}
                  <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ml-1 ${item.dotColor}`} />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CornerNav;
