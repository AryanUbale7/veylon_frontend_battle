import React from "react";
import { Cube16Solid } from "./Icons";

export const TrustedBy: React.FC = () => {
  const logos = [
    { name: "NUCLEUS", icon: <Cube16Solid size={20} className="text-primary-accent" /> },
    {
      name: "ACME CORP",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-secondary-accent" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      name: "ORBIT.IO",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-primary-accent" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      name: "PULSE",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-secondary-accent" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      name: "APEX LIFT",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-primary-accent" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
        </svg>
      ),
    },
  ];

  // Duplicate logos for seamless infinite scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section 
      className="py-16 border-y border-card-border/20 bg-gradient-to-b from-card-bg/10 via-card-bg/25 to-card-bg/10 relative overflow-hidden"
      aria-label="Supported brands"
    >
      {/* Background Accent Glow */}
      <div className="absolute inset-0 radial-glow-accent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="text-center font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-text/50 mb-10 flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 sm:w-12 bg-card-border/30"></span>
          Trusted by high-performance engineering teams
          <span className="h-[1px] w-8 sm:w-12 bg-card-border/30"></span>
        </p>
        
        {/* Marquee Wrapper with fading edges mask */}
        <div className="w-full overflow-hidden marquee-mask py-4">
          <div className="animate-marquee flex gap-8 items-center">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-card-border/30 bg-card-bg/20 backdrop-blur-sm transition-all duration-300 hover:border-primary-accent/40 hover:bg-card-bg/45 hover:shadow-[0_4px_20px_-4px_rgba(255,200,1,0.15)] group cursor-pointer transform hover:-translate-y-0.5"
              >
                <div className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-out">
                  {logo.icon}
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-muted-text group-hover:text-foreground transition-colors duration-300">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
