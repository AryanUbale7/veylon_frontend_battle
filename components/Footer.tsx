import React from "react";
import { Cube16Solid } from "./Icons";
import { RenderCountBadge } from "./RenderCountBadge";

export const Footer: React.FC = () => {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Workflow", href: "#workflow" },
      { name: "Pricing", href: "#pricing" },
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Changelog", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  };

  return (
    <footer 
      className="relative bg-gradient-to-b from-card-bg/40 to-background border-t border-card-border/30 py-16 px-6 transition-colors duration-200 overflow-hidden"
      role="contentinfo"
    >
      {/* Subtle top accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary-accent/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <Cube16Solid className="text-primary-accent" size={24} />
            <span className="font-mono text-lg font-black uppercase tracking-wider text-foreground">
              Veylon
            </span>
          </div>
          <p className="text-sm text-muted-text max-w-xs leading-relaxed">
            Building performance-first developer portals with strict engineering specifications. Made with precision and coder-focused aesthetics.
          </p>
          <div className="mt-2">
            <RenderCountBadge label="Footer" />
          </div>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-primary-accent">
                {category}
              </h3>
              <nav aria-label={`Footer ${category} Navigation`} className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-text hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-card-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-text font-mono">
          &copy; {new Date().getFullYear()} Veylon Platform Inc. All rights reserved.
        </p>
        <div className="flex gap-4">
          {/* Faux social icons */}
          <a href="#" className="text-muted-text hover:text-primary-accent transition-colors" aria-label="Veylon Twitter/X">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="text-muted-text hover:text-primary-accent transition-colors" aria-label="Veylon GitHub">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
