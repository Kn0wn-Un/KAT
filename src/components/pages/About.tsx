import React, { useState, useEffect } from "react";
import { GlassButton } from "../GlassButton";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BeforeAfterSlider } from "../BeforeAfterSlider";
import { ContactModal } from "../ContactModal";
import { OtherServicesModal } from "../OtherServicesModal";
import { Portfolio } from "./Portfolio";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Palette,
  Eye,
  Users,
  TrendingUp,
  Lightbulb,
  PaintbrushVertical,
  CheckCircle2,
  PhoneCall,
  Box,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "../ui/carousel";
import beforeImage from "figma:asset/before-image.png";
import afterImage from "figma:asset/after-image.png";
import katLogo from "figma:asset/logo-light.png";
import kowshikImage from "figma:asset/Kowshik.png";
import arpithaImage from "figma:asset/Arpitha.png";
import adithyaImage from "figma:asset/Adithya.png";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtherServicesOpen, setIsOtherServicesOpen] = useState(false);

  // Track carousel active slide
  useEffect(() => {
    if (!carouselApi) return;

    setActiveTestimonial(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setActiveTestimonial(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Real Estate Developer, Bangalore",
      initials: "RK",
      stars: 5,
      review:
        "Stunning photorealistic renders helped us secure investors within weeks. Their attention to lighting and material details is exceptional. Highly recommend!",
      gradient: "from-[#A8C0D6] to-[#6B8BA0]",
      glowColor: "from-[#A8C0D6]/25 via-purple-500/20 to-cyan-400/15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Principal Architect, Design Studio",
      initials: "PS",
      stars: 4.5,
      review:
        "Understood our minimalist design perfectly. Interior renders captured every nuance. The 3D-Streaming let clients experience spaces before construction. Professional team!",
      gradient: "from-purple-500 to-cyan-400",
      glowColor: "from-purple-500/20 via-[#A8C0D6]/25 to-cyan-500/15",
    },
    {
      id: 3,
      name: "Arun Mehta",
      role: "CEO, Urban Developers Ltd",
      initials: "AM",
      stars: 4,
      review:
        "VR tour was a game-changer. Investors could virtually walk through before groundbreaking. Quality rivals international studios at a fraction of the cost!",
      gradient: "from-cyan-500 to-blue-500",
      glowColor: "from-cyan-500/20 via-blue-500/20 to-[#A8C0D6]/25",
    },
    {
      id: 4,
      name: "Neha Chopra",
      role: "Interior Designer, Luxury Spaces",
      initials: "NC",
      stars: 5,
      review:
        "Renders so realistic, clients thought they were photographs! Material textures and lighting are remarkable. Essential part of my design process now.",
      gradient: "from-cyan-400 to-purple-500",
      glowColor: "from-cyan-400/20 via-purple-500/20 to-[#A8C0D6]/20",
    },
    {
      id: 5,
      name: "Vikram Reddy",
      role: "Project Director, Metro Builders",
      initials: "VR",
      stars: 4.5,
      review:
        "Exceptional renders for our township. Aerial views helped communicate our vision effectively. Outstanding understanding of landscaping and urban design. Fast delivery!",
      gradient: "from-[#A8C0D6] to-cyan-500",
      glowColor: "from-[#A8C0D6]/25 via-cyan-500/15 to-purple-500/20",
    },
    {
      id: 6,
      name: "Sanjay Desai",
      role: "Founder, Hospitality Ventures",
      initials: "SD",
      stars: 4,
      review:
        "Night renders with ambient lighting were breathtaking! Team collaborated closely and incorporated feedback promptly. Final renders became key assets in our pitch deck.",
      gradient: "from-purple-500 to-[#A8C0D6]",
      glowColor: "from-purple-500/25 via-cyan-400/20 to-[#A8C0D6]/15",
    },
  ];

  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1658800163313-0f9796a15a44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreWxpbmUlMjBza3lzY3JhcGVycyUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NjIwNzA0MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Night Skyline Cityscape",
    },
    {
      src: "https://images.unsplash.com/photo-1642287040066-2bd340523289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBuaWdodCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NjIwODQ0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Modern Architecture Night",
    },
    {
      src: "https://images.unsplash.com/photo-1672055290450-0fbc026c5b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzYyMDg0NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Luxury Building Exterior",
    },
    {
      src: "https://images.unsplash.com/photo-1614382765323-4a46d78ebf65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjB0d2lsaWdodHxlbnwxfHx8fDE3NjIwODQ0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Contemporary Architecture Twilight",
    },
    {
      src: "https://images.unsplash.com/photo-1672211488365-560cce4910b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lzY3JhcGVyJTIwbmlnaHQlMjB1cmJhbnxlbnwxfHx8fDE3NjIwODQ0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Skyscraper Night Urban",
    },
  ];

  const services = [
    {
      title: "Architecture",
      image:
        "https://images.unsplash.com/photo-1633109633238-e982d5b61f9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwM2QlMjByZW5kZXJpbmd8ZW58MXx8fHwxNzYxOTgwMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "3D Walkthrough",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      title: "Interior",
      image:
        "https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjE4ODEzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Real Estate",
      image:
        "https://images.unsplash.com/photo-1760561148422-bbb515696fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbW9kZXJuJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxOTc4ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "3D-Streaming",
      image:
        "https://images.unsplash.com/photo-1693771406380-dd37260e282f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzNjAlMjBwYW5vcmFtYSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjE5ODAzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "VR Tours",
      video:
        "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
    },
  ];

  const team = [
    {
      name: "Kowshik G T",
      role: "Co-Founder",
      qualification: "Masters in Digital Architecture, 3D Visualiser",
      image: kowshikImage,
    },
    {
      name: "Arpitha K",
      role: "Co-Founder",
      qualification: "Masters in Digital Architecture, 3D Visualiser",
      image: arpithaImage,
    },
    {
      name: "Adithya K",
      role: "Managing Director",
      qualification: "",
      image: adithyaImage,
    },
  ];

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  return (
    <div className='min-h-screen'>
      {/* Hero Section with Carousel */}
      <section className='relative h-screen flex items-center overflow-hidden'>
        {/* Background Image Carousel */}
        <div className='absolute inset-0 z-0'>
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className='w-full h-full object-cover object-right'
              />
            </div>
          ))}
          <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent'></div>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]'></div>
        </div>

        {/* Hero Content */}
        <div className='relative z-10 px-5 lg:px-20 w-full animate-fade-in'>
          <div className='max-w-3xl'>
            <h1 className='text-4xl md:text-6xl font-montserrat mb-6 text-white flex items-center gap-4 flex-wrap'>
              <img src={katLogo} alt='KAT' className='h-12 md:h-16 w-auto' />
              <span className='bg-gradient-to-r from-[#A8C0D6] to-white bg-clip-text text-transparent'>
                Architectural Visualization Studio
              </span>
            </h1>
            <p className='text-base md:text-lg text-white/80 font-poppins mb-8 leading-relaxed'>
              Delivers immersive architectural visualizations, Photorealistic
              renders & virtual experiences that bridge the gap between design &
              perception
            </p>
            <GlassButton onClick={() => setIsModalOpen(true)}>
              Contact Us
            </GlassButton>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-6'>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className='w-8 h-8 rounded-full glass-effect flex items-center justify-center text-white/70 hover:text-white hover:border-[#A8C0D6]/50 transition-all duration-300'
            aria-label='Previous slide'
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Navigation */}
          <div className='flex gap-2'>
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-8 h-2 bg-[#A8C0D6] glass-effect border-[#A8C0D6]/50"
                    : "w-2 h-2 glass-effect bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className='w-8 h-8 rounded-full glass-effect flex items-center justify-center text-white/70 hover:text-white hover:border-[#A8C0D6]/50 transition-all duration-300'
            aria-label='Next slide'
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce md:block hidden'>
          <div className='w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2'>
            <div className='w-1 h-3 bg-white/50 rounded-full'></div>
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className='py-12 px-5 lg:px-20 bg-[#0a0a0f]'>
        <div className='text-center'>
          <p className='text-2xl md:text-3xl font-poppins text-white/90 italic'>
            " Transforming concepts into breathtaking realities "
          </p>
        </div>
      </section>

      {/* Before/After Section */}
      <section className='py-20 bg-[#0a0a0f]'>
        <div className='px-5 lg:px-60'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-montserrat mb-4 text-white'>
              From <span className='text-[#A8C0D6]'>Concept</span> to Reality
            </h2>
            <p className='text-lg text-white/70 font-poppins max-w-2xl mx-auto'>
              Experience the transformation from raw 3D models to photorealistic
              visualizations
            </p>
          </div>
        </div>

        <div className='px-5 lg:px-60'>
          {/* Wrapper with glow effect */}
          <div className='relative'>
            {/* Enhanced blurred background glow - multiple layers */}
            <div className='absolute -inset-8 bg-[#A8C0D6]/30 rounded-3xl blur-3xl'></div>
            <div className='absolute -inset-6 bg-[#A8C0D6]/25 rounded-3xl blur-2xl'></div>
            {/* Content */}
            <div className='relative'>
              <BeforeAfterSlider
                beforeImage={beforeImage}
                afterImage={afterImage}
                beforeLabel='3D Model'
                afterLabel='Final Render'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id='services' className='py-20 px-5 lg:px-60 bg-[#0a0a0f]'>
        <div>
          <h2 className='text-4xl md:text-5xl font-montserrat text-center mb-16 text-white'>
            Our <span className='text-[#A8C0D6]'>Services</span>
          </h2>

          <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
            {services.map((service, index) => (
              <div
                key={index}
                className='group cursor-pointer'
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate("portfolio")}
              >
                {/* Wrapper with enhanced glow effect */}
                <div className='relative mb-3'>
                  {/* Enhanced blurred background glow - multiple layers for stronger effect */}
                  <div className='absolute -inset-4 bg-[#A8C0D6]/28 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='absolute -inset-3 bg-[#A8C0D6]/23 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  {/* Card content */}
                  <div className='relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-lg glass-effect'>
                    {"video" in service ? (
                      <video
                        src={service.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                    ) : (
                      <ImageWithFallback
                        src={service.image!}
                        alt={service.title}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                    )}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </div>
                <p className='text-center font-poppins text-white/90 group-hover:text-[#A8C0D6] transition-colors duration-300'>
                  {service.title}
                </p>
              </div>
            ))}
          </div>

          {/* Other Services Button */}
          <div className='mt-8 flex justify-center'>
            <button
              onClick={() => setIsOtherServicesOpen(true)}
              className='group relative'
            >
              {/* Hover glow */}
              <div className='absolute -inset-2 bg-[#A8C0D6]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              {/* Button */}
              <div className='relative glass-effect rounded-xl px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-300'>
                <p className='text-white font-poppins group-hover:text-[#A8C0D6] transition-colors duration-300'>
                  View Other Services
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section - Who We Serve */}
      <section className='py-20 px-5 lg:px-60 bg-[#0a0a0f]'>
        {/* Section Title */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-montserrat text-white'>
            Why <span className='text-[#A8C0D6]'>3D Visualization</span> Is
            Essential ?
          </h2>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Card 1: For Developers & Builders */}
          <div className='group relative'>
            {/* Glow effect */}
            <div className='absolute -inset-4 bg-gradient-to-br from-[#A8C0D6]/20 via-[#A8C0D6]/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            {/* Card */}
            <div className='relative glass-effect rounded-2xl p-8 md:p-10 h-full backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-500'>
              {/* Icon */}
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A8C0D6]/20 to-[#A8C0D6]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Building2 size={32} className='text-[#A8C0D6]' />
              </div>

              {/* Tag */}
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-1.5 h-1.5 rounded-full bg-[#A8C0D6] animate-pulse'></div>
                <p className='text-[#A8C0D6] font-poppins text-sm tracking-wide'>
                  For Developers & Builders
                </p>
              </div>

              {/* Title */}
              <h3 className='text-2xl md:text-3xl font-montserrat text-white mb-4 leading-tight'>
                Sell Before You Build
              </h3>

              {/* Description */}
              <p className='text-white/70 font-poppins mb-8 leading-relaxed'>
                Transform your unbuilt projects into investor magnets with
                AI-powered visualizations
              </p>

              {/* Benefits */}
              <div className='space-y-4 mb-8'>
                <div className='flex items-start gap-3 group/item'>
                  <div className='w-10 h-10 rounded-lg bg-[#A8C0D6]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#A8C0D6]/20 transition-colors'>
                    <Eye size={20} className='text-[#A8C0D6]' />
                  </div>
                  <div>
                    <h4 className='text-white font-poppins mb-1'>
                      Realistic Exteriors & Walkthroughs
                    </h4>
                    <p className='text-white/60 text-sm font-poppins'>
                      Market unbuilt projects with stunning photorealistic
                      renderings
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 group/item'>
                  <div className='w-10 h-10 rounded-lg bg-[#A8C0D6]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#A8C0D6]/20 transition-colors'>
                    <Users size={20} className='text-[#A8C0D6]' />
                  </div>
                  <div>
                    <h4 className='text-white font-poppins mb-1'>
                      Attract Premium Investors
                    </h4>
                    <p className='text-white/60 text-sm font-poppins'>
                      Create compelling visuals for brochures, ads, and
                      presentations
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 group/item'>
                  <div className='w-10 h-10 rounded-lg bg-[#A8C0D6]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#A8C0D6]/20 transition-colors'>
                    <TrendingUp size={20} className='text-[#A8C0D6]' />
                  </div>
                  <div>
                    <h4 className='text-white font-poppins mb-1'>
                      Accelerate Pre-Sales
                    </h4>
                    <p className='text-white/60 text-sm font-poppins'>
                      Increase sign-offs and secure funding faster with premium
                      visuals
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className='w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A8C0D6] to-[#8AA8C0] text-white font-poppins hover:shadow-lg hover:shadow-[#A8C0D6]/30 transition-all duration-300 hover:scale-[1.02] text-center'
              >
                Start Your Project
              </button>
            </div>
          </div>

          {/* Card 2: For Architects & Interior Designers */}
          <div className='group relative'>
            {/* Glow effect */}
            <div className='absolute -inset-4 bg-gradient-to-br from-[#A8C0D6]/20 via-[#A8C0D6]/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            {/* Card */}
            <div className='relative glass-effect rounded-2xl p-8 md:p-10 h-full backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-500'>
              {/* Icon */}
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A8C0D6]/20 to-[#A8C0D6]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Palette size={32} className='text-[#A8C0D6]' />
              </div>

              {/* Tag */}
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-1.5 h-1.5 rounded-full bg-[#A8C0D6] animate-pulse'></div>
                <p className='text-[#A8C0D6] font-poppins text-sm tracking-wide'>
                  For Architects & Interior Designers
                </p>
              </div>

              {/* Title */}
              <h3 className='text-2xl md:text-3xl font-montserrat text-white mb-4 leading-tight'>
                Design That Speaks Before It's Built
              </h3>

              {/* Description */}
              <p className='text-white/70 font-poppins mb-8 leading-relaxed'>
                Transform concepts into compelling visuals that win clients and
                streamline approvals
              </p>

              {/* Benefits */}
              <div className='space-y-4 mb-8'>
                <div className='flex items-start gap-3 group/item'>
                  <div className='w-10 h-10 rounded-lg bg-[#A8C0D6]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#A8C0D6]/20 transition-colors'>
                    <Eye size={20} className='text-[#A8C0D6]' />
                  </div>
                  <div>
                    <h4 className='text-white font-poppins mb-1'>
                      Realistic Renders & Walkthroughs
                    </h4>
                    <p className='text-white/60 text-sm font-poppins'>
                      Save time on client approvals with photorealistic
                      visualizations
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 group/item'>
                  <div className='w-10 h-10 rounded-lg bg-[#A8C0D6]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#A8C0D6]/20 transition-colors'>
                    <PaintbrushVertical size={20} className='text-[#A8C0D6]' />
                  </div>
                  <div>
                    <h4 className='text-white font-poppins mb-1'>
                      Showcase Complete Design Systems
                    </h4>
                    <p className='text-white/60 text-sm font-poppins'>
                      Present furniture layouts, color palettes, and materials
                      in realistic spaces
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 group/item'>
                  <div className='w-10 h-10 rounded-lg bg-[#A8C0D6]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#A8C0D6]/20 transition-colors'>
                    <CheckCircle2 size={20} className='text-[#A8C0D6]' />
                  </div>
                  <div>
                    <h4 className='text-white font-poppins mb-1'>
                      Visualize Before Construction
                    </h4>
                    <p className='text-white/60 text-sm font-poppins'>
                      Present design concepts convincingly to clients and
                      investors
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className='w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A8C0D6] to-[#8AA8C0] text-white font-poppins hover:shadow-lg hover:shadow-[#A8C0D6]/30 transition-all duration-300 hover:scale-[1.02] text-center'
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <div id='portfolio'>
        <Portfolio
          onNavigate={onNavigate}
          onOpenContactModal={() => setIsModalOpen(true)}
        />
      </div>

      {/* About Section */}
      <section id='about' className='py-20 px-5 lg:px-60 bg-[#0a0a0f]'>
        <div className='max-w-6xl mx-auto'>
          {/* About Header */}
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-montserrat mb-6 text-white flex items-center justify-center gap-4'>
              About{" "}
              <img src={katLogo} alt='KAT' className='h-10 md:h-14 w-auto' />
            </h2>

            <div className='glass-effect rounded-2xl p-5 md:p-8 mb-8'>
              <p className='text-sm md:text-lg text-white/90 font-poppins leading-relaxed'>
                At KAT, we combine art, form, and essence —{" "}
                <span className='text-[#A8C0D6]'>Kala, Aakruthi, Tatva</span> —
                to transform architectural concepts into visuals that inspire
                and persuade.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className='mb-20'>
            <h3 className='text-3xl md:text-4xl font-montserrat text-center mb-8 text-white'>
              Why Choose <span className='text-[#A8C0D6]'>Us</span>
            </h3>

            <div className='text-center px-5 md:px-12'>
              <p className='text-xs md:text-2xl text-white/90 font-poppins leading-relaxed italic'>
                "At KAT, we understand that a powerful visual can bridge the gap
                between imagination and reality. We combine artistic flair with
                advanced rendering technologies to meticulously craft visuals
                that not only showcase every detail of your design but also
                evoke emotion and tell your project's unique story. Whether you
                are an architect, developer, or interior designer, we are
                committed to providing you with striking visualizations that
                accelerate approvals, enhance your marketing and captivate your
                audience."
              </p>
            </div>
          </div>

          {/* Our Process Section */}
          <div className='mb-16'>
            <div className='text-center mb-12'>
              <h3 className='text-3xl md:text-4xl font-montserrat mb-4'>
                <span
                  className='bg-gradient-to-r from-[#FF6B6B] via-[#FFA500] via-[#FFD700] via-[#4CAF50] via-[#00BCD4] via-[#2196F3] to-[#9C27B0] bg-clip-text text-transparent'
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage:
                      "linear-gradient(to right, #FF6B6B, #FF8A65, #FFA726, #FFD54F, #FFEB3B, #66BB6A, #26C6DA, #42A5F5, #5C6BC0, #AB47BC, #9C27B0)",
                  }}
                >
                  Our Process
                </span>
              </h3>
              <p className='text-white/70 font-poppins text-sm md:text-base'>
                Four strategic steps to transform your vision into stunning
                photorealistic visuals
              </p>
            </div>

            {/* Process Steps */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
              {/* Step 01: Discovery Call */}
              <div className='group relative'>
                {/* Hover glow */}
                <div className='absolute -inset-2 bg-[#A8C0D6]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                {/* Card */}
                <div className='relative glass-effect rounded-xl md:rounded-2xl p-3 md:p-6 h-full backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-300'>
                  {/* Number Badge */}
                  <div className='w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#A8C0D6] to-[#6B8BA0] flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <span className='font-montserrat text-white text-xs md:text-base'>
                      01
                    </span>
                  </div>

                  {/* Icon */}
                  <div className='mb-2 md:mb-4'>
                    <PhoneCall
                      size={16}
                      className='text-[#A8C0D6] md:w-6 md:h-6'
                    />
                  </div>

                  {/* Title */}
                  <h4 className='text-sm md:text-xl font-montserrat text-white mb-1 md:mb-3'>
                    Discovery Call
                  </h4>

                  {/* Description */}
                  <p className='text-white/60 text-xs md:text-sm font-poppins mb-2 md:mb-4 leading-relaxed'>
                    Align on vision, mood, and deliverables before we begin.
                  </p>

                  {/* Tagline */}
                  <p className='text-[#A8C0D6] text-xs md:text-sm font-poppins italic'>
                    We listen first — to visualize right
                  </p>
                </div>
              </div>

              {/* Step 02: Moodboard */}
              <div className='group relative'>
                {/* Hover glow */}
                <div className='absolute -inset-2 bg-[#A8C0D6]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                {/* Card */}
                <div className='relative glass-effect rounded-xl md:rounded-2xl p-3 md:p-6 h-full backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-300'>
                  {/* Number Badge */}
                  <div className='w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#A8C0D6] to-[#6B8BA0] flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <span className='font-montserrat text-white text-xs md:text-base'>
                      02
                    </span>
                  </div>

                  {/* Icon */}
                  <div className='mb-2 md:mb-4'>
                    <Palette
                      size={16}
                      className='text-[#A8C0D6] md:w-6 md:h-6'
                    />
                  </div>

                  {/* Title */}
                  <h4 className='text-sm md:text-xl font-montserrat text-white mb-1 md:mb-3'>
                    Moodboard
                  </h4>

                  {/* Description */}
                  <p className='text-white/60 text-xs md:text-sm font-poppins mb-2 md:mb-4 leading-relaxed'>
                    Curated palettes, lighting, and composition references.
                  </p>

                  {/* Tagline */}
                  <p className='text-[#A8C0D6] text-xs md:text-sm font-poppins italic'>
                    Setting the tone for realism
                  </p>
                </div>
              </div>

              {/* Step 03: 3D Creation */}
              <div className='group relative'>
                {/* Hover glow */}
                <div className='absolute -inset-2 bg-[#A8C0D6]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                {/* Card */}
                <div className='relative glass-effect rounded-xl md:rounded-2xl p-3 md:p-6 h-full backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-300'>
                  {/* Number Badge */}
                  <div className='w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#A8C0D6] to-[#6B8BA0] flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <span className='font-montserrat text-white text-xs md:text-base'>
                      03
                    </span>
                  </div>

                  {/* Icon */}
                  <div className='mb-2 md:mb-4'>
                    <Box size={16} className='text-[#A8C0D6] md:w-6 md:h-6' />
                  </div>

                  {/* Title */}
                  <h4 className='text-sm md:text-xl font-montserrat text-white mb-1 md:mb-3'>
                    3D Creation
                  </h4>

                  {/* Description */}
                  <p className='text-white/60 text-xs md:text-sm font-poppins mb-2 md:mb-4 leading-relaxed'>
                    Precise modeling, natural lighting, and photorealistic
                    texturing.
                  </p>

                  {/* Tagline */}
                  <p className='text-[#A8C0D6] text-xs md:text-sm font-poppins italic'>
                    From linework to lifelike
                  </p>
                </div>
              </div>

              {/* Step 04: Final Delivery */}
              <div className='group relative'>
                {/* Hover glow */}
                <div className='absolute -inset-2 bg-[#A8C0D6]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                {/* Card */}
                <div className='relative glass-effect rounded-xl md:rounded-2xl p-3 md:p-6 h-full backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-300'>
                  {/* Number Badge */}
                  <div className='w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#A8C0D6] to-[#6B8BA0] flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <span className='font-montserrat text-white text-xs md:text-base'>
                      04
                    </span>
                  </div>

                  {/* Icon */}
                  <div className='mb-2 md:mb-4'>
                    <CheckCircle2
                      size={16}
                      className='text-[#A8C0D6] md:w-6 md:h-6'
                    />
                  </div>

                  {/* Title */}
                  <h4 className='text-sm md:text-xl font-montserrat text-white mb-1 md:mb-3'>
                    Final Delivery
                  </h4>

                  {/* Description */}
                  <p className='text-white/60 text-xs md:text-sm font-poppins mb-2 md:mb-4 leading-relaxed'>
                    High-resolution renders optimized for presentations and
                    marketing.
                  </p>

                  {/* Tagline */}
                  <p className='text-[#A8C0D6] text-xs md:text-sm font-poppins italic'>
                    Your vision, rendered to reality
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h3 className='text-3xl md:text-4xl font-montserrat text-center mb-12 text-white flex items-center justify-center gap-4'>
              Team{" "}
              <img src={katLogo} alt='KAT' className='h-10 md:h-12 w-auto' />
            </h3>

            {/* First Row - Two Co-Founders */}
            <div className='grid grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto px-4 md:px-0 mb-6 md:mb-12'>
              {team.slice(0, 2).map((member, index) => (
                <div
                  key={index}
                  className='glass-effect rounded-2xl overflow-hidden group hover:border-[#A8C0D6]/30 transition-all duration-300 backdrop-blur-xl'
                  style={{
                    boxShadow:
                      "0 0 40px rgba(168, 192, 214, 0.15), 0 0 80px rgba(168, 192, 214, 0.1)",
                  }}
                >
                  <div className='aspect-square overflow-hidden'>
                    <img
                      src={member.image}
                      alt={member.name}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                  </div>
                  <div className='p-3 md:p-6 text-center'>
                    <h4 className='text-sm md:text-2xl font-montserrat text-white mb-1 md:mb-2 group-hover:text-[#A8C0D6] transition-colors duration-300'>
                      {member.name}
                    </h4>
                    <p className='text-xs md:text-base text-[#A8C0D6] font-poppins mb-1 md:mb-2'>
                      {member.role}
                    </p>
                    <p className='text-xs md:text-base text-white/60 font-poppins'>
                      {member.qualification}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - Managing Director centered */}
            <div className='flex justify-center px-4 md:px-0'>
              <div
                className='glass-effect rounded-2xl overflow-hidden group hover:border-[#A8C0D6]/30 transition-all duration-300 backdrop-blur-xl w-full max-w-xs md:max-w-md'
                style={{
                  boxShadow:
                    "0 0 40px rgba(168, 192, 214, 0.15), 0 0 80px rgba(168, 192, 214, 0.1)",
                }}
              >
                <div className='aspect-square overflow-hidden'>
                  <img
                    src={team[2].image}
                    alt={team[2].name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                </div>
                <div className='p-3 md:p-6 text-center'>
                  <h4 className='text-sm md:text-2xl font-montserrat text-white mb-1 md:mb-2 group-hover:text-[#A8C0D6] transition-colors duration-300'>
                    {team[2].name}
                  </h4>
                  <p className='text-xs md:text-base text-[#A8C0D6] font-poppins'>
                    {team[2].role}
                  </p>
                </div>
              </div>
            </div>

            <div className='text-center mt-12 md:mt-16'>
              <p className='text-white/60 font-poppins mb-6'>
                Let's collaborate and bring your vision to life
              </p>
              <GlassButton onClick={() => setIsModalOpen(true)}>
                Work With Us
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 px-5 lg:px-60 bg-gradient-to-b from-[#0a0a0f] to-[#0a0a0f]/95'>
        {/* Section Title */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-5xl font-montserrat mb-4'>
            <span
              className='bg-gradient-to-r from-[#FF6B6B] via-[#FFA500] via-[#FFD700] via-[#4CAF50] via-[#00BCD4] via-[#2196F3] to-[#9C27B0] bg-clip-text text-transparent'
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(to right, #FF6B6B, #FF8A65, #FFA726, #FFD54F, #FFEB3B, #66BB6A, #26C6DA, #42A5F5, #5C6BC0, #AB47BC, #9C27B0)",
              }}
            >
              What Do Our Users Say?
            </span>
          </h2>
          <p className='text-white/70 font-poppins text-sm md:text-base max-w-2xl mx-auto'>
            Real experiences from architects, developers, and designers who
            trusted us with their visions
          </p>
        </div>

        {/* Mobile Carousel View */}
        <div className='md:hidden relative px-8'>
          <Carousel
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
              containScroll: "trimSnaps",
            }}
            className='w-full'
            setApi={setCarouselApi}
          >
            <CarouselContent className='-ml-2 md:-ml-4'>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className='pl-2 md:pl-4'>
                  <div
                    className={`relative rounded-2xl overflow-hidden transition-all duration-700 ${
                      activeTestimonial === index
                        ? "scale-100"
                        : "scale-95 opacity-60"
                    }`}
                  >
                    {/* Primary Glow effect - contained inside card */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        testimonial.glowColor
                      } blur-2xl transition-all duration-700 ${
                        activeTestimonial === index
                          ? "opacity-100 animate-testimonial-glow"
                          : "opacity-0"
                      }`}
                    ></div>

                    {/* Secondary inner glow */}
                    <div
                      className={`absolute inset-4 bg-gradient-to-br ${
                        testimonial.glowColor
                      } blur-xl transition-all duration-700 ${
                        activeTestimonial === index ? "opacity-60" : "opacity-0"
                      }`}
                    ></div>

                    {/* Card */}
                    <div
                      className={`relative glass-effect rounded-2xl p-6 h-full backdrop-blur-xl border transition-all duration-700 flex flex-col ${
                        activeTestimonial === index
                          ? "bg-white/10 border-[#A8C0D6]/50"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      {/* Stars */}
                      <div className='flex gap-1 mb-4'>
                        {[...Array(Math.floor(testimonial.stars))].map(
                          (_, i) => (
                            <svg
                              key={i}
                              className='w-5 h-5 fill-[#FFD700]'
                              viewBox='0 0 20 20'
                            >
                              <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                            </svg>
                          )
                        )}
                        {testimonial.stars % 1 !== 0 && (
                          <svg className='w-5 h-5' viewBox='0 0 20 20'>
                            <defs>
                              <linearGradient
                                id={`half-fill-${testimonial.id}`}
                              >
                                <stop offset='50%' stopColor='#FFD700' />
                                <stop offset='50%' stopColor='#4A5568' />
                              </linearGradient>
                            </defs>
                            <path
                              fill={`url(#half-fill-${testimonial.id})`}
                              d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'
                            />
                          </svg>
                        )}
                        {[...Array(5 - Math.ceil(testimonial.stars))].map(
                          (_, i) => (
                            <svg
                              key={`empty-${i}`}
                              className='w-5 h-5 fill-[#4A5568]'
                              viewBox='0 0 20 20'
                            >
                              <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                            </svg>
                          )
                        )}
                      </div>

                      {/* Review Text */}
                      <p className='text-white/80 font-poppins text-sm leading-relaxed mb-6 flex-grow italic'>
                        "{testimonial.review}"
                      </p>

                      {/* Reviewer Info */}
                      <div className='flex items-center gap-3 pt-4 border-t border-white/10'>
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center`}
                        >
                          <span className='text-white font-montserrat'>
                            {testimonial.initials}
                          </span>
                        </div>
                        <div>
                          <h4 className='text-white font-poppins'>
                            {testimonial.name}
                          </h4>
                          <p className='text-[#A8C0D6] text-sm font-poppins'>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Glassmorphic Previous Arrow */}
            <button
              onClick={() => carouselApi?.scrollPrev()}
              className='absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-effect backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#A8C0D6]/50 hover:bg-white/15 transition-all duration-300 z-10 active:scale-95 shadow-lg shadow-black/20'
              aria-label='Previous testimonial'
            >
              <ChevronLeft size={20} />
            </button>

            {/* Custom Glassmorphic Next Arrow */}
            <button
              onClick={() => carouselApi?.scrollNext()}
              className='absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-effect backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#A8C0D6]/50 hover:bg-white/15 transition-all duration-300 z-10 active:scale-95 shadow-lg shadow-black/20'
              aria-label='Next testimonial'
            >
              <ChevronRight size={20} />
            </button>

            {/* Hidden default carousel buttons */}
            <CarouselPrevious className='hidden' />
            <CarouselNext className='hidden' />
          </Carousel>

          {/* Carousel Dots Indicator */}
          <div className='flex flex-col items-center gap-3 mt-6'>
            <div className='flex gap-2'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    activeTestimonial === index
                      ? "w-8 bg-gradient-to-r from-[#A8C0D6] to-purple-500 shadow-lg shadow-[#A8C0D6]/50"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            {/* Swipe hint */}
            <p className='text-white/40 text-xs font-poppins flex items-center gap-2'>
              <ChevronLeft size={14} />
              Swipe or drag to navigate
              <ChevronRight size={14} />
            </p>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className='group relative rounded-2xl overflow-hidden'
            >
              {/* Glow effect - contained inside card */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.glowColor} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Secondary inner glow */}
              <div
                className={`absolute inset-4 bg-gradient-to-br ${testimonial.glowColor} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
              ></div>

              {/* Card */}
              <div className='relative glass-effect rounded-2xl p-6 h-full backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#A8C0D6]/30 transition-all duration-500 flex flex-col'>
                {/* Stars */}
                <div className='flex gap-1 mb-4'>
                  {[...Array(Math.floor(testimonial.stars))].map((_, i) => (
                    <svg
                      key={i}
                      className='w-5 h-5 fill-[#FFD700]'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                  {testimonial.stars % 1 !== 0 && (
                    <svg className='w-5 h-5' viewBox='0 0 20 20'>
                      <defs>
                        <linearGradient
                          id={`half-fill-desktop-${testimonial.id}`}
                        >
                          <stop offset='50%' stopColor='#FFD700' />
                          <stop offset='50%' stopColor='#4A5568' />
                        </linearGradient>
                      </defs>
                      <path
                        fill={`url(#half-fill-desktop-${testimonial.id})`}
                        d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'
                      />
                    </svg>
                  )}
                  {[...Array(5 - Math.ceil(testimonial.stars))].map((_, i) => (
                    <svg
                      key={`empty-${i}`}
                      className='w-5 h-5 fill-[#4A5568]'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className='text-white/80 font-poppins text-sm leading-relaxed mb-6 flex-grow italic'>
                  "{testimonial.review}"
                </p>

                {/* Reviewer Info */}
                <div className='flex items-center gap-3 pt-4 border-t border-white/10'>
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center`}
                  >
                    <span className='text-white font-montserrat'>
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className='text-white font-poppins'>
                      {testimonial.name}
                    </h4>
                    <p className='text-[#A8C0D6] text-sm font-poppins'>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className='text-center mt-12'>
          <p className='text-white/70 font-poppins mb-6'>
            Join our satisfied clients and bring your vision to life
          </p>
          <GlassButton onClick={() => setIsModalOpen(true)}>
            Start Your Project
          </GlassButton>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Other Services Modal */}
      <OtherServicesModal
        isOpen={isOtherServicesOpen}
        onClose={() => setIsOtherServicesOpen(false)}
      />
    </div>
  );
}
