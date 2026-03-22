import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface OtherServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OtherServicesModal({ isOpen, onClose }: OtherServicesModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const otherServices = [
    'Layout/Master plan rendering',
    '3D isometric floor plan',
    '2D floor plan render',
    'Short form videos - social media (Instagram/LinkedIn/Facebook)',
    'Brochure design',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Glassmorphic Modal */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Glassmorphic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A8C0D6]/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-50"></div>
          
          {/* Content */}
          <div className="relative p-8">
            <h2 className="text-2xl md:text-3xl font-montserrat text-white mb-6 text-center">
              Other <span className="text-[#A8C0D6]">Services</span>
            </h2>
            
            <div className="space-y-4">
              {otherServices.map((service, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-2 bg-[#A8C0D6]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Service Item */}
                  <div className="relative glass-effect rounded-xl p-4 backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#A8C0D6] flex-shrink-0"></div>
                      <p className="text-white font-poppins">{service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
