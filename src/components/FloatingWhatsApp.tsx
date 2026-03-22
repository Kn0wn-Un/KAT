import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '919900526377'; // +91 9900526377
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp fixed bottom-8 right-8 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      {/* Glassmorphic circular button */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/30 blur-xl group-hover:bg-[#25D366]/50 transition-all duration-300"></div>
        
        {/* Main button */}
        <div className="relative w-16 h-16 rounded-full glass-effect border border-white/20 flex items-center justify-center text-white hover:border-[#25D366]/50 transition-all duration-300 hover:scale-110 active:scale-95">
          <MessageCircle 
            size={28} 
            className="transition-colors duration-300 group-hover:text-[#25D366]" 
          />
          
          {/* Notification pulse */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full animate-pulse border-2 border-[#0a0a0f]"></div>
        </div>

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap glass-effect px-4 py-2 rounded-lg border border-white/20 animate-fade-in">
            <p className="font-poppins text-white/90">Chat with us on WhatsApp</p>
          </div>
        )}
      </div>
    </a>
  );
}