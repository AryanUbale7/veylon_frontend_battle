import React from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono font-bold tracking-wide uppercase transition-all duration-200 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-primary-accent text-oceanic-noir hover:bg-deep-saffron shadow-[0_4px_14px_0_rgba(255,200,1,0.3)] hover:shadow-[0_4px_14px_0_rgba(255,153,50,0.3)]",
    secondary: "bg-secondary-accent text-oceanic-noir hover:bg-primary-accent shadow-[0_4px_14px_0_rgba(255,153,50,0.3)] hover:shadow-[0_4px_14px_0_rgba(255,200,1,0.3)]",
    outline: "border border-primary-accent text-primary-accent bg-transparent hover:bg-primary-accent/10",
    ghost: "text-foreground bg-transparent hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
