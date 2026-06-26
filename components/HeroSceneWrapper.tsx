"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import dynamic from "next/dynamic";

const LazyHeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
});

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class HeroErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("HeroScene WebGL error captured by ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20" aria-hidden="true">
          {/* Schematic SVG fallback */}
          <svg className="w-full h-full p-10 max-w-lg stroke-primary-accent/40" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="2 2" />
            <polygon points="50,15 80,75 20,75" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="50" y1="50" x2="50" y2="15" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="80" y2="75" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="20" y2="75" strokeWidth="0.5" />
          </svg>
        </div>
      );
    }

    return this.props.children;
  }
}

export const HeroSceneWrapper: React.FC = () => {
  return (
    <HeroErrorBoundary>
      <LazyHeroScene />
    </HeroErrorBoundary>
  );
};

export default HeroSceneWrapper;
