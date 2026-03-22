import React, { useState } from 'react';
import { GlassButton } from '../GlassButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const projectTypes = [
    'Architectural Visualization',
    '3D Walkthrough Animation',
    'Interior Design Rendering',
    'Real Estate',
    '360° Panorama',
    'VR/AR Experiences',
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1595218757059-28da236e03bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMG5pZ2h0JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxOTgwOTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Urban Architecture Night"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/90 to-[#0a0a0f]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-montserrat mb-6 text-white">
              Get In <span className="text-[#A8C0D6]">Touch</span>
            </h1>
            <p className="text-lg text-white/80 font-poppins">
              Let's bring your architectural vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-effect rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white font-poppins mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="glass-effect border-white/20 text-white placeholder:text-white/40 focus:border-[#A8C0D6]"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white font-poppins mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="glass-effect border-white/20 text-white placeholder:text-white/40 focus:border-[#A8C0D6]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white font-poppins mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    className="glass-effect border-white/20 text-white placeholder:text-white/40 focus:border-[#A8C0D6]"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="projectType" className="text-white font-poppins mb-2 block">
                    Project Type
                  </Label>
                  <Select onValueChange={(value) => handleChange('projectType', value)} value={formData.projectType}>
                    <SelectTrigger className="glass-effect border-white/20 text-white focus:border-[#A8C0D6]">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a2e] border-white/20 text-white">
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type} className="hover:bg-white/10">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white font-poppins mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    rows={5}
                    className="glass-effect border-white/20 text-white placeholder:text-white/40 focus:border-[#A8C0D6] resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <GlassButton className="w-full flex items-center justify-center gap-2">
                  <Send size={18} />
                  Get a Quote
                </GlassButton>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-montserrat text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-[#A8C0D6]" />
                    </div>
                    <div>
                      <p className="font-poppins text-white/60 mb-1">Location</p>
                      <p className="font-poppins text-white">Bangalore, Karnataka, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-[#A8C0D6]" />
                    </div>
                    <div>
                      <p className="font-poppins text-white/60 mb-1">Email</p>
                      <a 
                        href="mailto:katstudio.in@gmail.com" 
                        className="font-poppins text-white hover:text-[#A8C0D6] transition-colors"
                      >
                        katstudio.in@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-[#A8C0D6]" />
                    </div>
                    <div>
                      <p className="font-poppins text-white/60 mb-1">Phone</p>
                      <a 
                        href="tel:+919900526377" 
                        className="font-poppins text-white hover:text-[#A8C0D6] transition-colors"
                      >
                        +91 9900526377
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-montserrat text-white mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 font-poppins text-white/80">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-[#A8C0D6]/10 to-transparent">
                <h3 className="text-xl font-montserrat text-white mb-3">
                  Ready to start?
                </h3>
                <p className="font-poppins text-white/70 mb-4">
                  Schedule a consultation to discuss your project requirements and get a customized quote.
                </p>
                <GlassButton variant="secondary" onClick={() => onNavigate('portfolio')}>
                  View Our Work
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
