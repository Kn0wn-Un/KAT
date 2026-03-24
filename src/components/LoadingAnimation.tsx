import React from "react";
import { motion } from "motion/react";
import katLogo from "figma:asset/logo-dark.png";

export function LoadingAnimation() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]'>
      {/* Animated background glow */}
      <motion.div
        className='absolute inset-0'
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(168, 192, 214, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(168, 192, 214, 0.15) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 50%, rgba(168, 192, 214, 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo container */}
      <div className='relative flex flex-col items-center gap-8'>
        {/* Logo with multiple animations */}
        <motion.div
          className='relative'
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Glow effect behind logo */}
          <motion.div
            className='absolute inset-0 blur-2xl'
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={katLogo}
              alt=''
              className='w-32 md:w-40 h-auto brightness-0 invert opacity-40'
              style={{ filter: "brightness(0) invert(1) opacity(0.4)" }}
            />
          </motion.div>

          {/* Main logo with brightness pulse */}
          <motion.img
            src={katLogo}
            alt='KAT Logo'
            className='w-32 md:w-40 h-auto relative z-10'
            style={{ filter: "brightness(0) invert(1)" }}
            animate={{
              filter: [
                "brightness(0) invert(1) drop-shadow(0 0 20px rgba(168, 192, 214, 0.5))",
                "brightness(0) invert(1) drop-shadow(0 0 40px rgba(168, 192, 214, 0.8))",
                "brightness(0) invert(1) drop-shadow(0 0 20px rgba(168, 192, 214, 0.5))",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Loading progress bar */}
        <div className='w-32 md:w-40 h-1 bg-white/10 rounded-full overflow-hidden'>
          <motion.div
            className='h-full bg-gradient-to-r from-[#A8C0D6] to-[#6B92B9]'
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className='text-[#A8C0D6] font-poppins tracking-[0.3em] uppercase text-[10px] md:text-xs'
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading
        </motion.p>
      </div>

      {/* Subtle floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-1 h-1 rounded-full bg-[#A8C0D6]'
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}
