import React from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono tracking-wider uppercase border";
  
  const variants = {
    primary: "bg-primary-accent/15 text-primary-accent border-primary-accent/30 shadow-[0_0_12px_rgba(255,200,1,0.08)]",
    secondary: "bg-secondary-accent/15 text-secondary-accent border-secondary-accent/30 shadow-[0_0_12px_rgba(255,153,50,0.08)]",
    outline: "bg-transparent text-muted-text border-card-border",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
