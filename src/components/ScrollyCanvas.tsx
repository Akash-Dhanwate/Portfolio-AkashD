"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 160;

const getImagePath = (index: number) => 
  `/sequence/frame_${index.toString().padStart(3, '0')}_delay-0.05s.webp`;

export default function ScrollyCanvas({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Added spring for buttery smooth frame scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  });
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameIndex = useRef(0);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getImagePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderFrame = useCallback((index: number) => {
    if (!images[index] || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Match internal canvas size to display size
    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    
    // Object-fit: cover logic
    const img = images[index];
    const imageAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvas.width / canvas.height;
    
    let renderableHeight, renderableWidth, xStart, yStart;
    
    if (imageAspectRatio < canvasAspectRatio) {
      renderableWidth = canvas.width;
      renderableHeight = img.height * (canvas.width / img.width);
      xStart = 0;
      yStart = (canvas.height - renderableHeight) / 2;
    } else if (imageAspectRatio > canvasAspectRatio) {
      renderableHeight = canvas.height;
      renderableWidth = img.width * (canvas.height / img.height);
      xStart = (canvas.width - renderableWidth) / 2;
      yStart = 0;
    } else {
      renderableHeight = canvas.height;
      renderableWidth = canvas.width;
      xStart = 0;
      yStart = 0;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);
  }, [images]);

  useEffect(() => {
    if (isLoaded) {
      renderFrame(0);
    }
  }, [isLoaded, renderFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) renderFrame(currentFrameIndex.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, renderFrame]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!isLoaded) return;
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    currentFrameIndex.current = frameIndex;
    renderFrame(frameIndex);
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block"
        />
        {/* Parallax Overlay */}
        {children}
      </div>
    </div>
  );
}
