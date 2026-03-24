import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import katLogo from "figma:asset/logo-light.png";

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ activePage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "About", id: "about" },
  ];

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "portfolio", "about"];
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      // Default to 'home' if at the very top
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Check each section from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);

        if (element) {
          const { offsetTop } = element;

          // If scroll position has passed this section's start, it's active
          if (scrollPosition >= offsetTop) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      // Fallback to home if no section matched
      setActiveSection("home");
    };

    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 glass-effect'>
      <div className='px-5 lg:px-20 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div
            className='cursor-pointer'
            onClick={() => handleNavigate("home")}
          >
            <img src={katLogo} alt='KAT Logo' className='h-10 w-auto' />
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`relative font-poppins transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-[#A8C0D6]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {/* Blue glow for active item */}
                {activeSection === item.id && (
                  <span className='absolute -inset-2 bg-[#A8C0D6]/30 rounded-lg blur-lg animate-pulse' />
                )}
                <span className='relative z-10'>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-white'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden mt-4 pb-4 space-y-4'>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left font-poppins transition-all duration-300 ${
                  (activePage === "about" && item.id === "about") ||
                  (activePage !== "about" && activeSection === item.id)
                    ? "text-[#A8C0D6]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
