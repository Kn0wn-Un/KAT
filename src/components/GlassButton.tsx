import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function GlassButton({ children, onClick, className = '', variant = 'primary' }: GlassButtonProps) {
  const baseClasses = 'px-6 py-2.5 rounded-full backdrop-blur-xl transition-all duration-300 font-poppins';
  
  const variantClasses = variant === 'primary' 
    ? 'bg-gradient-to-r from-[#A8C0D6]/20 to-[#6B92B9]/20 border border-[#A8C0D6]/30 text-white hover:from-[#A8C0D6]/30 hover:to-[#6B92B9]/30 hover:border-[#A8C0D6]/50 hover:shadow-[0_0_30px_rgba(168,192,214,0.3)]'
    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
