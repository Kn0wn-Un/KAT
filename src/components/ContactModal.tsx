import React, { useState, useEffect } from 'react';
import { X, MapPin, Mail, Phone, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Desktop Layout - Two Column */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {/* Left Column - Contact Form */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Glassmorphic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#A8C0D6]/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-50"></div>
            
            {/* Content */}
            <div className="relative p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300"
                  />
                </div>

                {/* Project Type Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300 appearance-none cursor-pointer [&>option]:bg-[#1a1a24] [&>option]:text-white [&>option]:backdrop-blur-xl [&>option]:py-2"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      colorScheme: 'dark',
                    }}
                  >
                    <option value="" disabled className="bg-[#1a1a24] text-white">Select project type</option>
                    <option value="architectural" className="bg-[#1a1a24] text-white">Architectural Visualization</option>
                    <option value="interior" className="bg-[#1a1a24] text-white">Interior Design Rendering</option>
                    <option value="walkthrough" className="bg-[#1a1a24] text-white">3D Walkthrough Animation</option>
                    <option value="real-estate" className="bg-[#1a1a24] text-white">Real Estate</option>
                    <option value="panorama" className="bg-[#1a1a24] text-white">360° Panorama</option>
                    <option value="vr-ar" className="bg-[#1a1a24] text-white">VR/AR Experiences</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#4A5F72] to-[#5A6F82] hover:from-[#5A6F82] hover:to-[#6A7F92] text-white font-poppins flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#A8C0D6]/20"
                >
                  <Send size={18} />
                  Get a Quote
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Information Cards */}
          <div className="space-y-6">
            {/* Contact Information Card */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Glassmorphic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A8C0D6]/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-50"></div>
              
              {/* Content */}
              <div className="relative p-8">
                <h3 className="text-white font-poppins text-xl mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#A8C0D6]" size={20} />
                    </div>
                    <div>
                      <div className="text-white/60 font-poppins text-sm mb-1">Location</div>
                      <div className="text-white font-poppins">Bangalore, Karnataka, India</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#A8C0D6]" size={20} />
                    </div>
                    <div>
                      <div className="text-white/60 font-poppins text-sm mb-1">Email</div>
                      <div className="text-white font-poppins">katstudio.in@gmail.com</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-[#A8C0D6]" size={20} />
                    </div>
                    <div>
                      <div className="text-white/60 font-poppins text-sm mb-1">Phone</div>
                      <div className="text-white font-poppins">+91 9900526377</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Glassmorphic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A8C0D6]/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-50"></div>
              
              {/* Content */}
              <div className="relative p-8">
                <h3 className="text-white font-poppins text-xl mb-6">Business Hours</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-poppins">Monday - Friday:</span>
                    <span className="text-white font-poppins">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-poppins">Saturday:</span>
                    <span className="text-white font-poppins">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-poppins">Sunday:</span>
                    <span className="text-white font-poppins">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready to Start Card */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Glassmorphic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A8C0D6]/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-50"></div>
              
              {/* Content */}
              <div className="relative p-8">
                <h3 className="text-white font-poppins text-xl mb-4">Ready to start?</h3>
                <p className="text-white/70 font-inter mb-6 leading-relaxed">
                  Schedule a consultation to discuss your project requirements and get a customized quote.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      const element = document.getElementById('portfolio');
                      if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - offset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }, 100);
                  }}
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-poppins transition-all duration-300"
                >
                  View Our Work
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Form Only */}
        <div className="md:hidden">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Glassmorphic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#A8C0D6]/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-50"></div>
            
            {/* Content */}
            <div className="relative p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300"
                  />
                </div>

                {/* Project Type Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300 appearance-none cursor-pointer [&>option]:bg-[#1a1a24] [&>option]:text-white [&>option]:backdrop-blur-xl [&>option]:py-2"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      colorScheme: 'dark',
                    }}
                  >
                    <option value="" disabled className="bg-[#1a1a24] text-white">Select project type</option>
                    <option value="architectural" className="bg-[#1a1a24] text-white">Architectural Visualization</option>
                    <option value="interior" className="bg-[#1a1a24] text-white">Interior Design Rendering</option>
                    <option value="walkthrough" className="bg-[#1a1a24] text-white">3D Walkthrough Animation</option>
                    <option value="real-estate" className="bg-[#1a1a24] text-white">Real Estate</option>
                    <option value="panorama" className="bg-[#1a1a24] text-white">360° Panorama</option>
                    <option value="vr-ar" className="bg-[#1a1a24] text-white">VR/AR Experiences</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-white font-poppins mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 font-inter focus:outline-none focus:border-[#A8C0D6]/50 transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#4A5F72] to-[#5A6F82] hover:from-[#5A6F82] hover:to-[#6A7F92] text-white font-poppins flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#A8C0D6]/20"
                >
                  <Send size={18} />
                  Get a Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
