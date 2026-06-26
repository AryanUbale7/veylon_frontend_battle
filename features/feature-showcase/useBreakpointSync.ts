"use client";

import { useState, useEffect } from "react";

/**
 * ResizeObserver-based media query hook to monitor viewport changes.
 * Avoids unthrottled window resize events to prevent layout thrashing.
 */
export function useMediaQuery(widthBreakpoint: number = 1024): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Set initial match state on mount
    setIsMatch(window.innerWidth >= widthBreakpoint);

    const targetElement = document.documentElement;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      
      const width = entries[0].contentBoxSize?.[0]?.inlineSize ?? entries[0].contentRect.width;
      
      // Update match state
      setIsMatch(width >= widthBreakpoint);
    });

    resizeObserver.observe(targetElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [widthBreakpoint]);

  return isMatch;
}
export default useMediaQuery;
