import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LoadingAnimation } from './components/LoadingAnimation';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const handleNavigate = (page: string) => {
    // Navigate to About section on homepage (not separate page)
    setCurrentPage('home');
    
    // Small delay to ensure we're on the landing page
    setTimeout(() => {
      const element = document.getElementById(page);
      if (element) {
        const offset = 80; // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else if (page === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Show loading animation
  if (isLoading) {
    return <LoadingAnimation />;
  }

  // Render About page separately
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] relative overflow-x-hidden">
        {/* Gradient Orbs for Atmosphere */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#A8C0D6]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#6B92B9]/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A8C0D6]/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative z-10">
          <Navigation activePage={currentPage} onNavigate={handleNavigate} />
          
          <main className="min-h-screen">
            <About onNavigate={handleNavigate} />
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </div>
    );
  }

  // Render single-page landing with all sections
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-x-hidden">
      {/* Gradient Orbs for Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#A8C0D6]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#6B92B9]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A8C0D6]/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10">
        <Navigation activePage={currentPage} onNavigate={handleNavigate} />
        
        <main>
          {/* Home Section */}
          <div id="home">
            <Home onNavigate={handleNavigate} onPortfolioModalChange={setIsPortfolioModalOpen} />
          </div>
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp isHidden={isPortfolioModalOpen} />
    </div>
  );
}