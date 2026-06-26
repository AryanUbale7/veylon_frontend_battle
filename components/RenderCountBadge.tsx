"use client";

import React, { useRef } from "react";

interface RenderCountBadgeProps {
  label: string;
}

export const RenderCountBadge: React.FC<RenderCountBadgeProps> = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return null;
};
export default RenderCountBadge;
