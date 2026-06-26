"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Cube16Solid, XMark, SearchIcon, SunIcon, MoonIcon } from "./Icons";
import { cn } from "@/lib/cn";

export const StickyNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Dynamically mount a 1px sentinel in the document flow at top: 80px
    const sentinel = document.createElement("div");
    sentinel.id = "nav-sentinel";
    sentinel.style.position = "absolute";
    sentinel.style.top = "80px";
    sentinel.style.left = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    sentinel.style.pointerEvents = "none";
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the sentinel is not intersecting, the user has scrolled past 80px
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);

    // Read stored or system theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const activeTheme = savedTheme || systemTheme;
    setTheme(activeTheme);
    document.documentElement.setAttribute("data-theme", activeTheme);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Workflow", href: "#workflow" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/85 backdrop-blur-xl py-4 border-card-border/30 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-6 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-primary-accent rounded-lg focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Veylon Homepage"
        >
          <Cube16Solid className="text-primary-accent transition-transform duration-300 group-hover:rotate-12" size={28} />
          <span className="font-mono text-xl font-black uppercase tracking-wider text-foreground">
            Veylon
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-muted-text hover:text-primary-accent transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-muted-text hover:text-primary-accent p-2 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-center mr-1 focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:outline-none"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
          <button
            className="text-muted-text hover:text-primary-accent p-2 rounded-md transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:outline-none"
            aria-label="Search"
          >
            <SearchIcon size={20} />
          </button>
          <Button variant="outline" size="sm" onClick={() => {
            const pricing = document.getElementById("pricing");
            pricing?.scrollIntoView({ behavior: "smooth" });
          }}>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggler & Theme Switcher */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="text-muted-text hover:text-primary-accent p-2 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:outline-none"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground hover:text-primary-accent p-2 rounded-md focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:outline-none cursor-pointer"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <XMark size={24} /> : (
              <span className="flex flex-col gap-1.5 w-6">
                <span className="h-0.5 w-full bg-current rounded-full"></span>
                <span className="h-0.5 w-3/4 bg-current rounded-full self-end"></span>
                <span className="h-0.5 w-full bg-current rounded-full"></span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[73px] bg-background/98 border-t border-card-border/30 transition-all duration-300 flex flex-col px-8 py-10 gap-6 z-40",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-mono font-bold tracking-wider uppercase text-muted-text hover:text-primary-accent transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="h-px bg-card-border/30 my-4"></div>
        <Button
          variant="primary"
          onClick={() => {
            setIsMobileMenuOpen(false);
            const pricing = document.getElementById("pricing");
            pricing?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};
