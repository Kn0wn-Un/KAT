import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import katLogo from 'figma:asset/444bf92e5917804e6307c17f8cf03002306eb41c.png';

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ activePage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'About', id: 'about' },
  ];

  // Detect active section based on scroll position
  useEffect(() => {
    // Only run scroll detection when on landing page (not on About page)
    if (activePage === 'about') {
      setActiveSection('about');
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="px-5 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <img src={katLogo} alt="KAT Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`font-poppins transition-all duration-300 ${
                  (activePage === 'about' && item.id === 'about') || 
                  (activePage !== 'about' && activeSection === item.id)
                    ? 'text-[#A8C0D6]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left font-poppins transition-all duration-300 ${
                  (activePage === 'about' && item.id === 'about') || 
                  (activePage !== 'about' && activeSection === item.id)
                    ? 'text-[#A8C0D6]'
                    : 'text-white/70 hover:text-white'
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