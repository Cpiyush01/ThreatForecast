import React from 'react';

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#030712]">
      {/* Dynamic radial gradient orbs */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full blur-[130px] opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(0, 229, 255, 0.45) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%)' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(30, 58, 138, 0.15) 60%, transparent 80%)' }}
      />
      <div 
        className="absolute top-[35%] right-[20%] w-[30vw] h-[30vw] rounded-full blur-[120px] opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, transparent 70%)' }}
      />

      {/* Cyber Grid pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />

      {/* Vignette border */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 100px 30px rgba(3, 7, 18, 0.85)'
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
