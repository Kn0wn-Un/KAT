import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clampedPercentage);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    setHasInteracted(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // Intersection Observer to detect when slider is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setIsVisible(true);
            // Trigger animation every time it enters viewport
            setShouldAnimate(true);
            setTimeout(() => setShouldAnimate(false), 1000);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the slider is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative w-full aspect-[3/4] md:aspect-video overflow-hidden rounded-lg cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image (Full) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
          />
          {/* After Label */}
          <div className="absolute top-4 md:top-6 right-4 md:right-6 glass-effect px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
            <span className="text-xs md:text-base text-white font-poppins">{afterLabel}</span>
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
          />
          {/* Before Label */}
          <div className="absolute top-4 md:top-6 left-4 md:left-6 glass-effect px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
            <span className="text-xs md:text-base text-white font-poppins">{beforeLabel}</span>
          </div>
        </div>

        {/* Animated Slider Line */}
        <motion.div
          ref={sliderRef}
          className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          animate={shouldAnimate ? {
            x: [0, -10, 10, -10, 10, -5, 5, 0],
          } : {}}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 glass-effect rounded-full backdrop-blur-md bg-white/20 border-2 border-white/80 flex items-center justify-center shadow-xl">
            <div className="flex gap-1">
              <div className="w-0.5 h-6 bg-white/80 rounded-full"></div>
              <div className="w-0.5 h-6 bg-white/80 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instruction Label - Shows every time slider enters viewport */}
      <AnimatePresence>
        {isVisible && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-4 glass-effect px-3 md:px-6 py-1.5 md:py-3 rounded-full backdrop-blur-md bg-[#A8C0D6]/20 border border-[#A8C0D6]/40 pointer-events-none"
          >
            <span className="text-xs md:text-base text-white font-poppins flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-5 md:h-5"
              >
                <path d="M18 8L22 12L18 16" />
                <path d="M6 8L2 12L6 16" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
              Swipe to see final render
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}