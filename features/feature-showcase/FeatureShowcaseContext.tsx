"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface FeatureShowcaseContextProps {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const FeatureShowcaseContext = createContext<FeatureShowcaseContextProps | undefined>(undefined);

export const FeatureShowcaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to the first feature as active initially
  const [activeId, setActiveId] = useState<string | null>("analytics");

  return (
    <FeatureShowcaseContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </FeatureShowcaseContext.Provider>
  );
};

export const useFeatureShowcase = () => {
  const context = useContext(FeatureShowcaseContext);
  if (!context) {
    throw new Error("useFeatureShowcase must be used within a FeatureShowcaseProvider");
  }
  return context;
};
