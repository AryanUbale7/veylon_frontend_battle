"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export const LogoPreloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    // Smooth progress simulation
    const startTime = Date.now();
    const duration = 1600; // 1.6 seconds loading

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(calculatedProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        // Staging the exit transition
        setTimeout(() => {
          setIsExiting(true);
          // Wait for exit animation to complete before unmounting
          setTimeout(() => {
            setIsMounted(false);
            document.body.style.overflow = "";
          }, 600); // matches the transition-duration
        }, 300);
      }
    }, 16);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMounted) return null;

  const logoText = "VEYLON";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#0b161b] to-[#050c0e] transition-all duration-600 ease-in-out",
        isExiting ? "opacity-0 pointer-events-none scale-[1.03] translate-y-[-10px]" : "opacity-100"
      )}
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full radial-glow-accent opacity-60 pointer-events-none blur-3xl" />
      <div className="absolute w-[600px] h-[600px] rounded-full radial-glow-spot opacity-20 pointer-events-none blur-3xl" />

      {/* Main Logo Container */}
      <div className="flex flex-col items-center text-center select-none z-10">
        
        {/* Animated 3D Isometric Veylon Cube */}
        <div className="w-24 h-24 mb-8 preloader-cube relative">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(255,200,1,0.25)]"
          >
            {/* Top Face - Gold/Yellow */}
            <path
              d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034z"
              fill="#FFC801"
              className="preloader-top-face"
            />
            {/* Left Face - Medium Yellow/Gold (shaded) */}
            <path
              d="M7.25 14.435V8.43L2 5.357V11c0 .27.144.518.378.651z"
              fill="#FFAE00"
              className="preloader-left-face"
            />
            {/* Right Face - Saffron/Orange Accent (darker for 3D depth) */}
            <path
              d="M14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11z"
              fill="#FF9932"
              className="preloader-right-face"
            />
          </svg>
        </div>

        {/* Staggered Logo Letters */}
        <h2 className="flex items-center justify-center font-sans text-3xl font-black uppercase tracking-[0.4em] text-foreground pl-[0.4em] mb-6">
          {logoText.split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block opacity-0 animate-letter-reveal"
              style={{
                animationDelay: `${450 + index * 100}ms`,
              }}
            >
              {letter}
            </span>
          ))}
        </h2>

        {/* Sleek Minimalist Progress Bar */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-primary-accent to-secondary-accent transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,200,1,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Small percentage readout */}
        <span className="font-mono text-[10px] font-bold text-muted-text/40 mt-3 uppercase tracking-wider">
          System Loading {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};
export default LogoPreloader;
