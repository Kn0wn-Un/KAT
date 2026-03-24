import React, { useState, useRef, useEffect, useMemo } from "react";
import { GlassButton } from "../GlassButton";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "motion/react";
import { portfolioItems } from "../../assets/portfolio";

interface PortfolioProps {
  onNavigate: (page: string) => void;
  onOpenContactModal?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
}

interface PortfolioItem {
  title: string;
  category: string;
  image?: string;
  video?: string;
  altImage?: string; // Alternate image to show in modal
}

export function Portfolio({
  onNavigate,
  onOpenContactModal,
  onModalStateChange,
}: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filters = [
    "All",
    "Architecture",
    "Interior",
    "3D-Walkthrough",
    "Real Estate",
    "3D-Streaming",
    "VR",
  ];

  // Randomize portfolio items once on component mount
  const portfolioItems: PortfolioItem[] = useMemo(() => {
    const items = portfolioItems;

    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  // Get current item in modal
  const currentItem =
    selectedIndex !== null ? filteredItems[currentModalIndex] : null;

  // Handle opening an image
  const openImage = (index: number) => {
    setSelectedIndex(index);
    setCurrentModalIndex(index);
  };

  // Handle video when modal opens/closes
  useEffect(() => {
    // Notify parent about modal state change
    onModalStateChange?.(selectedIndex !== null);

    if (currentItem && currentItem.video) {
      // Start playing when video modal opens
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else if (!currentItem) {
      // Reset video when modal closes
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    } else {
      // Stop video when switching to non-video item
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [currentItem]);

  // Handle video play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Navigation functions
  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentModalIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentModalIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  // Handle swipe gestures
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50; // Minimum swipe distance

    if (isMobile) {
      // Vertical swipe for mobile
      if (info.offset.y < -threshold) {
        // Swipe up - go to next
        goToNext();
      } else if (info.offset.y > threshold) {
        // Swipe down - go to previous
        goToPrevious();
      }
    } else {
      // Horizontal swipe for desktop
      if (info.offset.x < -threshold) {
        // Swipe left - go to next
        goToNext();
      } else if (info.offset.x > threshold) {
        // Swipe right - go to previous
        goToPrevious();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goToPrevious();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goToNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  // Calculate position for Cover Flow effect (horizontal for desktop, vertical for mobile)
  const getItemStyle = (index: number) => {
    const diff = index - currentModalIndex;
    const absDiff = Math.abs(diff);

    // Hide items too far from center
    if (absDiff > 2) {
      if (isMobile) {
        return {
          opacity: 0,
          transform: `translateY(${diff > 0 ? "100%" : "-100%"}) scale(0.5)`,
          zIndex: 0,
          filter: "blur(8px)",
          pointerEvents: "none" as const,
        };
      }
      return {
        opacity: 0,
        transform: `translateX(${diff > 0 ? "100%" : "-100%"}) scale(0.5)`,
        zIndex: 0,
        filter: "blur(8px)",
        pointerEvents: "none" as const,
      };
    }

    if (diff === 0) {
      // Center item - fully visible, no transforms
      if (isMobile) {
        return {
          opacity: 1,
          transform: "translateY(0%) translateZ(0px) rotateX(0deg) scale(1)",
          zIndex: 10,
          filter: "blur(0px)",
          pointerEvents: "auto" as const,
        };
      }
      return {
        opacity: 1,
        transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)",
        zIndex: 10,
        filter: "blur(0px)",
        pointerEvents: "auto" as const,
      };
    }

    // Side items - angled and blurred
    const direction = diff > 0 ? 1 : -1;
    const blur = 3 * absDiff;
    const opacity = 0.5 - (absDiff - 1) * 0.2;

    if (isMobile) {
      // Vertical Cover Flow for mobile
      const translateY = direction * 60 * absDiff;
      const translateZ = -150 * absDiff;
      const rotateX = direction * 30;
      const scale = 0.75 - (absDiff - 1) * 0.15;

      return {
        opacity,
        transform: `translateY(${translateY}%) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
        zIndex: 10 - absDiff,
        filter: `blur(${blur}px)`,
        pointerEvents: "auto" as const,
      };
    }

    // Horizontal Cover Flow for desktop
    const translateX = direction * 70 * absDiff;
    const translateZ = -200 * absDiff;
    const rotateY = direction * 35;
    const scale = 0.75 - (absDiff - 1) * 0.15;

    return {
      opacity,
      transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: 10 - absDiff,
      filter: `blur(${blur}px)`,
      pointerEvents: "auto" as const,
    };
  };

  return (
    <div className='min-h-screen'>
      {/* Portfolio Section */}
      <section className='py-20 px-5 lg:px-20 bg-gradient-to-b from-[#0a0a0f] to-transparent'>
        <div className='text-center'>
          <h1 className='text-5xl md:text-6xl font-montserrat mb-6 text-white'>
            Our <span className='text-[#A8C0D6]'>Portfolio</span>
          </h1>
          <p className='text-lg text-white/80 font-poppins mb-12 max-w-3xl mx-auto'>
            Explore our collection of breathtaking architectural visualizations
            and 3D renders
          </p>

          {/* Filter Buttons */}
          <div className='flex flex-wrap justify-center gap-3 md:gap-4 mb-12'>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full font-poppins text-xs md:text-base transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#A8C0D6]/20 border border-[#A8C0D6] text-[#A8C0D6]"
                    : "glass-effect text-white/70 hover:text-white hover:border-white/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className='pb-20 px-5 lg:px-20 bg-[#0a0a0f]'>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => openImage(index)}
                className='group glass-effect rounded-xl overflow-hidden hover:border-[#A8C0D6]/30 transition-all duration-300 cursor-pointer'
              >
                <div className='overflow-hidden relative aspect-video md:aspect-video'>
                  {item.video ? (
                    <>
                      <video
                        src={item.video}
                        className='w-full h-full object-cover'
                        loop
                        muted
                        playsInline
                        autoPlay
                        preload='auto'
                        poster='https://images.unsplash.com/photo-1696237461860-630be53f179c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMGFyY2hpdGVjdHVyZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjE4NjkwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                      >
                        Your browser does not support the video tag.
                      </video>
                      {/* Play icon overlay */}
                      <div className='absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300'>
                        <div className='w-16 h-16 rounded-full glass-effect flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300'>
                          <Play size={28} fill='white' />
                        </div>
                      </div>
                    </>
                  ) : (
                    <ImageWithFallback
                      src={item.image!}
                      alt={item.title}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                  )}
                  {/* Mobile: Text at bottom left */}
                  <div className='md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-transparent to-transparent'>
                    <div className='p-4'>
                      <h3 className='font-montserrat text-white'>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  {/* Desktop: Show on hover at bottom left */}
                  <div className='hidden md:flex absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end'>
                    <div className='p-6 w-full'>
                      <h3 className='text-xl font-montserrat text-white mb-2'>
                        {item.title}
                      </h3>
                      <p className='text-[#A8C0D6] font-poppins'>
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className='text-center py-20'>
              <p className='text-white/60 font-poppins'>
                No projects found in this category
              </p>
            </div>
          )}

          <div className='text-center mt-16'>
            <p className='text-white/60 font-poppins mb-6'>
              Interested in working together?
            </p>
            <GlassButton onClick={() => onOpenContactModal?.()}>
              Start Your Project
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Fullscreen Cover Flow Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-50 flex items-center justify-center'
            onClick={() => setSelectedIndex(null)}
          >
            {/* Liquid Glass Background */}
            <div className='absolute inset-0 bg-[#0a0a0f]/95 backdrop-blur-xl'>
              {/* Glow Effects */}
              <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#A8C0D6]/20 rounded-full blur-[100px] animate-pulse'></div>
              <div
                className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A8C0D6]/10 rounded-full blur-[120px] animate-pulse'
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className='absolute top-8 right-8 z-50 w-12 h-12 rounded-full glass-effect backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-[#A8C0D6] hover:border-[#A8C0D6]/50 transition-all duration-300'
              aria-label='Close'
            >
              <X size={24} />
            </button>

            {/* Cover Flow Carousel Container */}
            <motion.div
              className='relative w-full h-full flex items-center justify-center px-[10px] md:px-[150px]'
              style={{ perspective: "1500px" }}
              onClick={(e) => e.stopPropagation()}
              drag={isMobile ? "y" : "x"}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              {/* Carousel Items */}
              <div className='relative w-full h-full flex items-center justify-center'>
                {filteredItems.map((item, index) => {
                  const style = getItemStyle(index);
                  const isCenter = index === currentModalIndex;

                  return (
                    <motion.div
                      key={index}
                      className='absolute cursor-pointer flex items-center justify-center'
                      style={{
                        width: "100%",
                        height: "100%",
                        pointerEvents: style.pointerEvents,
                      }}
                      initial={false}
                      animate={{
                        opacity: style.opacity,
                        transform: style.transform,
                        zIndex: style.zIndex,
                        filter: style.filter,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      onClick={() => {
                        if (!isCenter) {
                          setCurrentModalIndex(index);
                        }
                      }}
                    >
                      <div
                        className={`glass-effect rounded-2xl overflow-hidden ${
                          isCenter ? "border-[#A8C0D6]/50" : "border-white/10"
                        } transition-all duration-300`}
                        style={{
                          width: "100%",
                          aspectRatio: isMobile ? "3/4" : "16/9",
                          maxHeight: "100%",
                          boxShadow: isCenter
                            ? "0 0 80px rgba(168, 192, 214, 0.3), 0 0 120px rgba(168, 192, 214, 0.2)"
                            : "none",
                        }}
                      >
                        <div className='w-full h-full relative flex items-center justify-center bg-black/20'>
                          {item.video ? (
                            <div className='relative w-full h-full flex items-center justify-center'>
                              {isCenter ? (
                                <>
                                  <video
                                    ref={videoRef}
                                    src={item.video}
                                    className='w-full h-full object-cover'
                                    loop
                                    muted
                                    playsInline
                                    preload='auto'
                                    onClick={togglePlayPause}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                  {/* Video Controls Overlay */}
                                  <div
                                    className='absolute inset-0 flex items-center justify-center cursor-pointer'
                                    onClick={togglePlayPause}
                                  >
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: isPlaying ? 0 : 1 }}
                                      transition={{ duration: 0.3 }}
                                      className='w-20 h-20 rounded-full glass-effect flex items-center justify-center text-white pointer-events-none'
                                    >
                                      {isPlaying ? (
                                        <Pause size={36} />
                                      ) : (
                                        <Play size={36} fill='white' />
                                      )}
                                    </motion.div>
                                  </div>
                                </>
                              ) : (
                                <video
                                  src={item.video}
                                  className='w-full h-full object-cover'
                                  loop
                                  muted
                                  playsInline
                                  poster='https://images.unsplash.com/photo-1696237461860-630be53f179c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMGFyY2hpdGVjdHVyZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjE4NjkwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                                >
                                  Your browser does not support the video tag.
                                </video>
                              )}
                            </div>
                          ) : (
                            <img
                              src={item.image}
                              alt={item.title}
                              className='w-full h-full object-cover'
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Arrows - Glassmorphic */}
              {filteredItems.length > 1 && (
                <>
                  {/* Previous Button - Horizontal on Desktop, Vertical on Mobile */}
                  <button
                    onClick={goToPrevious}
                    className={`absolute z-40 w-12 h-12 md:w-14 md:h-14 rounded-full glass-effect backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#A8C0D6]/20 hover:border-[#A8C0D6]/50 hover:text-[#A8C0D6] hover:scale-110 transition-all duration-300 group ${
                      isMobile
                        ? "top-24 left-1/2 -translate-x-1/2"
                        : "left-4 md:left-10 top-1/2 -translate-y-1/2"
                    }`}
                    aria-label='Previous'
                  >
                    {isMobile ? (
                      <ChevronUp
                        size={28}
                        className='group-hover:scale-110 transition-transform'
                      />
                    ) : (
                      <ChevronLeft
                        size={28}
                        className='group-hover:scale-110 transition-transform'
                      />
                    )}
                  </button>

                  {/* Next Button - Horizontal on Desktop, Vertical on Mobile */}
                  <button
                    onClick={goToNext}
                    className={`absolute z-40 w-12 h-12 md:w-14 md:h-14 rounded-full glass-effect backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#A8C0D6]/20 hover:border-[#A8C0D6]/50 hover:text-[#A8C0D6] hover:scale-110 transition-all duration-300 group ${
                      isMobile
                        ? "bottom-24 left-1/2 -translate-x-1/2"
                        : "right-4 md:right-10 top-1/2 -translate-y-1/2"
                    }`}
                    aria-label='Next'
                  >
                    {isMobile ? (
                      <ChevronDown
                        size={28}
                        className='group-hover:scale-110 transition-transform'
                      />
                    ) : (
                      <ChevronRight
                        size={28}
                        className='group-hover:scale-110 transition-transform'
                      />
                    )}
                  </button>
                </>
              )}
            </motion.div>

            {/* Current Item Info */}
            {currentItem && (
              <div
                className={`absolute z-40 left-0 right-0 text-center px-5 ${
                  isMobile ? "top-4" : "bottom-8"
                }`}
              >
                {/* Pagination Dots - At top for mobile, above text for desktop */}
                <div
                  className={`flex justify-center gap-2 ${
                    isMobile ? "mb-3" : "mt-4 order-last"
                  }`}
                >
                  {filteredItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentModalIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentModalIndex
                          ? "w-8 bg-[#A8C0D6]"
                          : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <motion.h2
                  key={currentModalIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className='text-base md:text-3xl font-montserrat text-white mb-1 md:mb-2 truncate'
                  style={{
                    textShadow:
                      "0 3px 12px rgba(0, 0, 0, 0.8), 0 6px 24px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  {currentItem.title}
                </motion.h2>
                <motion.p
                  key={`cat-${currentModalIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className='text-xs md:text-xl text-[#A8C0D6] font-poppins truncate'
                  style={{
                    textShadow:
                      "0 2px 10px rgba(0, 0, 0, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  {currentItem.category}
                </motion.p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
