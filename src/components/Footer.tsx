import React from 'react';
import { Instagram, Facebook, Linkedin, MapPin, Mail, Phone, Youtube } from 'lucide-react';
import { FaPinterest, FaWhatsapp } from 'react-icons/fa';
import katLogo from 'figma:asset/444bf92e5917804e6307c17f8cf03002306eb41c.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const socialLinks = [
    { icon: FaWhatsapp, label: 'WhatsApp', url: 'https://wa.me/919900526377' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Youtube, label: 'YouTube', url: '#' },
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: FaPinterest, label: 'Pinterest', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
  ];

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'About', id: 'about' },
  ];

  return (
    <footer className="glass-effect mt-20">
      <div className="px-5 lg:px-20 py-16 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12 md:mb-8">
          {/* Logo & Description */}
          <div>
            <div className="mb-4">
              <img src={katLogo} alt="KAT Logo" className="h-10 w-auto" />
            </div>
            <p className="text-white/60 font-poppins">
              Kala I Aakruthi I Tatva
            </p>
          </div>

          {/* Quick Links - Centered */}
          <div className="text-center">
            <h3 className="font-montserrat text-white mb-4">Quick Links</h3>
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-white/60 hover:text-[#A8C0D6] transition-colors duration-300 font-poppins"
                >
                  {link.name}
                </button>
              ))}
            </div>
            
            {/* Social Links - Centered */}
            <div className="flex gap-4 justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-white/60 hover:text-[#A8C0D6] hover:border-[#A8C0D6]/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info - Right Aligned */}
          <div className="text-left md:text-right">
            <h3 className="font-montserrat text-white mb-4">Contact</h3>
            <div className="space-y-2 text-white/60 font-poppins">
              <div className="flex items-center gap-2 md:justify-end">
                <MapPin size={16} className="text-[#A8C0D6]" />
                <span>Bangalore, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <Mail size={16} className="text-[#A8C0D6]" />
                <a href="mailto:katstudio.in@gmail.com" className="hover:text-[#A8C0D6] transition-colors">
                  katstudio.in@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <Phone size={16} className="text-[#A8C0D6]" />
                <a href="tel:+919900526377" className="hover:text-[#A8C0D6] transition-colors">
                  +91 9900526377
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 font-poppins">
            © 2025 KAT Architectural Visualization Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}