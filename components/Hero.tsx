"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { ArrowTrendingUp } from "./Icons";
import * as Icons from "./Icons";

// Metric Card with dynamic mount width animation (once, ease-out, 600ms)
const IngestMetricCard: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const timer = setTimeout(() => setProgressWidth("99.8%"), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="glass-card p-4 rounded-xl absolute -top-8 -left-8 z-30 w-44 flex flex-col gap-2 border-primary-accent/30 shadow-[0_15px_30px_rgba(0,0,0,0.65),_0_0_15px_rgba(255,200,1,0.12)] pointer-events-none"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary-accent">
        Cognitive Ingest
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-2xl font-black text-foreground">99.8%</span>
        <span className="text-[10px] text-emerald-400 font-mono font-bold">▲ 0.4%</span>
      </div>
      <div className="w-full h-1 bg-nocturnal-expedition/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-accent rounded-full transition-all duration-[600ms] ease-out" 
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    let rafId: number = 0;

    const handleScroll = () => {
      if (rafId) return;
      // Throttled read scrollY once per frame
      rafId = requestAnimationFrame(() => {
        const offset = window.scrollY * 0.45; // ASSUMPTION: 45% scroll speed parallax offset
        sectionRef.current?.style.setProperty("--hero-parallax-offset", `${offset}px`);
        rafId = 0;
      });
    };

    // Scope Guard: Only calculate parallax when Hero is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", handleScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", handleScroll);
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background Parallax Container */}
      <div 
        className="absolute inset-0 pointer-events-none -z-20"
        style={{
          transform: "translateY(var(--hero-parallax-offset, 0px))",
          willChange: "transform",
        }}
      >
        {/* Grid Effect Layers */}
        <div className="hero-grid-bg" />
        <div className="hero-grid-dots" />
        <div className="hero-grid-sweep" />

        {/* Background Gradients & Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] radial-glow-spot opacity-75 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-nocturnal-expedition/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-deep-saffron/8 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary-accent/[0.03] rounded-full blur-[150px] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start relative z-10">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <Badge variant="primary">
              VEYLON PLATFORM v1.5
            </Badge>
          </div>
          
          <h1 
            id="hero-title"
            className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-primary-accent leading-[1.05] mb-3"
          >
            AI-Driven<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent via-deep-saffron to-secondary-accent">
              Data
            </span>{" "}
            Automation
          </h1>
          
          <p className="mt-1 text-base md:text-lg text-muted-text/90 max-w-xl font-sans leading-relaxed">
            A premium, high-converting automation platform for complex enterprise workflows. Build fast cognitive ingestion pipelines, orchestrate vector ETL jobs, and visualize streams in real-time.
          </p>
          
          <div className="mt-5 flex flex-wrap gap-4 items-center">
            <Button 
              variant="primary" 
              size="lg"
              className="group shadow-[0_0_20px_rgba(255,200,1,0.15)] hover:shadow-[0_0_25px_rgba(255,153,50,0.25)] transition-all duration-200"
            >
              <a href="#pricing" className="flex items-center gap-2">
                Get Started <ArrowTrendingUp size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-nocturnal-expedition/40 text-foreground hover:border-primary-accent/40"
            >
              <a href="#features">Explore Features</a>
            </Button>
          </div>
        </div>

        {/* Right Column: 3D Layered Dashboard Visual */}
        <div className="lg:col-span-5 relative w-full aspect-square max-w-[500px] mx-auto lg:max-w-none flex items-center justify-center">
          
          {/* Accent Glow Backer */}
          <div className="absolute inset-0 radial-glow-accent -z-10 rounded-full blur-3xl opacity-100 pointer-events-none scale-150"></div>
          <div className="absolute inset-0 -z-10 rounded-full blur-[80px] pointer-events-none scale-110 bg-nocturnal-expedition/20"></div>

          {/* FOREGROUND layer: Cohesive Overlapping Visuals */}
          <IngestMetricCard />

          {/* Main Dashboard Frame: anchored centerpiece with layered drop shadows */}
          <div className="w-full h-full relative z-10 shadow-[0_35px_80px_rgba(0,0,0,0.8),_0_0_40px_rgba(255,200,1,0.08),_0_0_80px_rgba(17,76,90,0.15)] rounded-2xl border border-card-border/60 bg-card-bg/95 overflow-hidden flex flex-col justify-between">
            {/* Window Topbar */}
            <div className="h-10 border-b border-card-border/30 bg-background/80 px-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-accent/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary-accent/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-accent-dark/80"></span>
              </div>
              <span className="font-mono text-[10px] font-bold text-muted-text/80 uppercase tracking-widest">
                veylon_agent_console
              </span>
              <div className="w-10"></div>
            </div>

            {/* Window Workspace */}
            <div className="p-6 h-[calc(100%-40px)] flex flex-col justify-between bg-dot-pattern">
              {/* Top Metrics Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="glass-card p-3 rounded-lg border border-card-border/35 flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-muted-text uppercase">TPS</span>
                  <span className="font-mono text-lg font-black text-primary-accent">1,480</span>
                </div>
                <div className="glass-card p-3 rounded-lg border border-card-border/35 flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-muted-text uppercase">ERR</span>
                  <span className="font-mono text-lg font-black text-secondary-accent">0</span>
                </div>
                <div className="glass-card p-3 rounded-lg border border-card-border/35 flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-muted-text uppercase">LAT</span>
                  <span className="font-mono text-lg font-black text-muted-text">12ms</span>
                </div>
              </div>

              {/* Console log outputs / JSON Panel */}
              <div className="my-3 bg-background/50 border border-card-border/30 p-4 rounded-lg font-mono text-[10px] text-muted-text flex flex-col gap-1.5 select-none">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/80">&gt; orchestrating vector index...</span>
                  <span className="text-primary-accent font-bold">SUCCESS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/80">&gt; resolving target schemas...</span>
                  <span className="text-secondary-accent font-bold">RESOLVED</span>
                </div>
                <div className="flex items-center justify-between border-t border-card-border/20 pt-1.5 mt-1.5">
                  <span className="text-muted-text/80">status:</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">ready</span>
                </div>
              </div>

              {/* Central Processing Pipeline (Repurposed Mini-Pipeline Visual) */}
              <div className="flex flex-col">
                <div className="font-sans text-[9px] font-bold uppercase tracking-wider text-muted-text/40 mb-2">
                  PROCESSING PIPELINE
                </div>
                <div className="p-3.5 border border-card-border/35 bg-background/30 rounded-lg flex items-center justify-between relative overflow-hidden h-16">
                  <div className="absolute inset-0 bg-mesh-pattern opacity-40"></div>
                  
                  {/* Node 1: Ingest */}
                  <div className="relative z-10 w-8 h-8 rounded-lg border border-primary-accent/40 bg-card-bg flex items-center justify-center shadow-md" title="Ingestion Stage">
                    <Icons.ChartPie size={16} className="text-primary-accent" />
                  </div>

                  {/* Flow Path 1 */}
                  <div className="flex-1 h-[2px] bg-card-border/40 relative mx-3 overflow-hidden">
                    <div className="absolute inset-0 w-full h-full animate-flow-line opacity-80"></div>
                  </div>

                  {/* Node 2: Transform */}
                  <div className="relative z-10 w-8 h-8 rounded-lg border border-secondary-accent/40 bg-card-bg flex items-center justify-center shadow-md" title="Cleaning & Transformation Stage">
                    <Icons.Cog8Tooth size={16} className="text-secondary-accent" />
                  </div>

                  {/* Flow Path 2 */}
                  <div className="flex-1 h-[2px] bg-card-border/40 relative mx-3 overflow-hidden">
                    <div className="absolute inset-0 w-full h-full animate-flow-line opacity-80"></div>
                  </div>

                  {/* Node 3: Output */}
                  <div className="relative z-10 w-8 h-8 rounded-lg border border-primary-accent/40 bg-card-bg flex items-center justify-center shadow-md" title="Output Delivery Stage">
                    <Icons.ArrowPath size={16} className="text-primary-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
