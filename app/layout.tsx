import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LogoPreloader } from "@/components/LogoPreloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["Courier New", "Courier", "monospace"],
});

export const metadata: Metadata = {
  title: "Veylon - Premium Tech Showcase & Intelligent Pricing Engine",
  description: "An engineering demonstration of bento grid accordion layouts, isolated pricing engines, and WCAG AA accessible frontend design.",
  openGraph: {
    title: "Veylon - Premium Tech Showcase & Intelligent Pricing Engine",
    description: "An engineering demonstration of bento grid accordion layouts, isolated pricing engines, and WCAG AA accessible frontend design.",
    type: "website",
    locale: "en_US",
    images: [
      {
        // ASSUMPTION: If a custom og-image.png is later generated, ensure it contains the Veylon branding and is updated here.
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Veylon UI - Bento Sync Grid and Pricing Engine Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veylon - Premium Tech Showcase",
    description: "An engineering demonstration of bento grid accordion layouts, isolated pricing engines, and WCAG AA accessible frontend design.",
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = savedTheme || systemTheme;
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="antialiased font-sans text-foreground bg-background">
        <LogoPreloader />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </body>
    </html>
  );
}
