"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HeroCore } from "./HeroCore";

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    // Check WebGL and media capability
    const hasWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    
    setCanRender3D(hasWebGL() && !prefersReduced && !isCoarse);
  }, []);

  useEffect(() => {
    if (!canRender3D || !canvasRef.current || !containerRef.current) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x172b36, 0.075); // Fog to fade centerpiece edges into background

    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 100);
    camera.position.set(0, 1.5, 20);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Add Centerpiece Data Pipeline
    const core = new HeroCore();
    scene.add(core.group);

    // Watch for theme changes
    const updateTheme = () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
      core.setTheme(activeTheme);
    };
    updateTheme();

    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          updateTheme();
        }
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffc801, 1.2, 100);
    pointLight.position.set(0, 8, 4);
    scene.add(pointLight);

    // 4. Camera Parallax Mouse Easing
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX - window.innerWidth / 2) * 0.0006;
      targetY = (event.clientY - window.innerHeight / 2) * 0.0006;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Render loop lock via IntersectionObserver
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(canvasRef.current);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Update centerpiece data pipeline
      core.update(elapsed);
      
      // Interactive core rotation ease
      core.group.rotation.x = mouseY * 0.12;
      core.group.rotation.y = elapsed * 0.05 + mouseX * 0.12; // slow auto-spin + mouse parallax

      // Smooth camera parallax easing (slower/more damped)
      mouseX += (targetX - mouseX) * 0.02;
      mouseY += (targetY - mouseY) * 0.02;
      camera.position.x = mouseX * 7;
      camera.position.y = 1.5 + mouseY * 5;
      camera.lookAt(new THREE.Vector3(0, 0, -5));

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

      // Cleanups
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", handleResize);
        observer.disconnect();
        themeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
        if (renderer) renderer.dispose();
      };
    }, [canRender3D]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-mesh-pattern bg-dot-pattern opacity-20 filter blur-[1.5px]"
      aria-hidden="true"
    >
      {canRender3D ? (
        <canvas ref={canvasRef} className="w-full h-full block" />
      ) : (
        /* Fallback Schematic Blueprint SVG Line-Art */
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-muted-text w-72 h-72 md:w-96 md:h-96">
            <polygon points="50,15 80,35 80,65 50,85 20,65 20,35" strokeWidth="0.4" stroke="currentColor" />
            <line x1="50" y1="15" x2="50" y2="85" strokeWidth="0.4" />
            <line x1="20" y1="35" x2="80" y2="35" strokeWidth="0.4" />
            <line x1="20" y1="65" x2="80" y2="65" strokeWidth="0.4" />
            <line x1="20" y1="35" x2="50" y2="85" strokeWidth="0.4" />
            <line x1="80" y1="35" x2="50" y2="85" strokeWidth="0.4" />
            <line x1="20" y1="65" x2="50" y2="15" strokeWidth="0.4" />
            <line x1="80" y1="65" x2="50" y2="15" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="42" strokeWidth="0.2" strokeDasharray="1, 1" />
            <ellipse cx="50" cy="50" rx="46" ry="16" transform="rotate(-30 50 50)" strokeWidth="0.3" />
            <ellipse cx="50" cy="50" rx="48" ry="12" transform="rotate(45 50 50)" strokeWidth="0.25" strokeDasharray="3, 1" />
          </svg>
        </div>
      )}
    </div>
  );
};
export default HeroScene;
