import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { GlassButton } from './GlassButton';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    closeBanner();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    closeBanner();
  };

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-500 ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="group relative rounded-2xl overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A8C0D6]/20 via-purple-500/15 to-cyan-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Glass Card */}
          <div className="relative glass-effect backdrop-blur-xl bg-[#1a1a2e]/95 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeBanner}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-effect backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#A8C0D6]/50 hover:bg-white/15 transition-all duration-300"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#A8C0D6] to-purple-500 flex items-center justify-center">
                  <Cookie className="text-white" size={24} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pr-8 md:pr-0">
                <h3 className="text-white font-poppins font-semibold text-lg md:text-xl mb-2">
                  We Value Your Privacy
                </h3>
                <p className="text-white/70 font-poppins text-sm md:text-base leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or decline at any time.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-6 py-2.5 rounded-lg glass-effect backdrop-blur-xl bg-white/5 border border-white/20 text-white/80 hover:text-white hover:border-[#A8C0D6]/30 hover:bg-white/10 transition-all duration-300 font-poppins text-sm whitespace-nowrap"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#A8C0D6] to-purple-500 text-white font-poppins text-sm shadow-lg shadow-[#A8C0D6]/30 hover:shadow-[#A8C0D6]/50 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
