// // // "use client";

// // // import { useEffect, useRef, useState, useCallback } from "react";
// // // import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

// // // const FRAME_COUNT = 105;

// // // const getImagePath = (index: number) => 
// // //   `/sequence/frame_${index.toString().padStart(3, '0')}_delay-0.067s.webp`;

// // // export default function ScrollyCanvas({ children }: { children?: React.ReactNode }) {
// // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // //   const containerRef = useRef<HTMLDivElement>(null);
  
// // //   const { scrollYProgress } = useScroll({
// // //     target: containerRef,
// // //     offset: ["start start", "end end"]
// // //   });

// // //   // Added spring for buttery smooth frame scrubbing
// // //   const smoothProgress = useSpring(scrollYProgress, {
// // //     damping: 20,
// // //     stiffness: 100,
// // //     restDelta: 0.0001
// // //   });
  
// // //   const [images, setImages] = useState<HTMLImageElement[]>([]);
// // //   const [isLoaded, setIsLoaded] = useState(false);
// // //   const currentFrameIndex = useRef(0);

// // //   useEffect(() => {
// // //     let loadedCount = 0;
// // //     const loadedImages: HTMLImageElement[] = [];
    
// // //     for (let i = 0; i < FRAME_COUNT; i++) {
// // //       const img = new Image();
// // //       img.src = getImagePath(i);
// // //       img.onload = () => {
// // //         loadedCount++;
// // //         if (loadedCount === FRAME_COUNT) {
// // //           setImages(loadedImages);
// // //           setIsLoaded(true);
// // //         }
// // //       };
// // //       loadedImages.push(img);
// // //     }
// // //   }, []);

// // //   const renderFrame = useCallback((index: number) => {
// // //     if (!images[index] || !canvasRef.current) return;
    
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext("2d");
// // //     if (!ctx) return;
    
// // //     // Match internal canvas size to display size
// // //     const { width, height } = canvas.getBoundingClientRect();
// // //     if (canvas.width !== width || canvas.height !== height) {
// // //       canvas.width = width;
// // //       canvas.height = height;
// // //     }
    
// // //     // Object-fit: cover logic
// // //     const img = images[index];
// // //     const imageAspectRatio = img.width / img.height;
// // //     const canvasAspectRatio = canvas.width / canvas.height;
    
// // //     let renderableHeight, renderableWidth, xStart, yStart;
    
// // //     if (imageAspectRatio < canvasAspectRatio) {
// // //       renderableWidth = canvas.width;
// // //       renderableHeight = img.height * (canvas.width / img.width);
// // //       xStart = 0;
// // //       yStart = (canvas.height - renderableHeight) / 2;
// // //     } else if (imageAspectRatio > canvasAspectRatio) {
// // //       renderableHeight = canvas.height;
// // //       renderableWidth = img.width * (canvas.height / img.height);
// // //       xStart = (canvas.width - renderableWidth) / 2;
// // //       yStart = 0;
// // //     } else {
// // //       renderableHeight = canvas.height;
// // //       renderableWidth = canvas.width;
// // //       xStart = 0;
// // //       yStart = 0;
// // //     }
    
// // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //     ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);
// // //   }, [images]);

// // //   useEffect(() => {
// // //     if (isLoaded) {
// // //       renderFrame(0);
// // //     }
// // //   }, [isLoaded, renderFrame]);

// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       if (isLoaded) renderFrame(currentFrameIndex.current);
// // //     };
// // //     window.addEventListener("resize", handleResize);
// // //     return () => window.removeEventListener("resize", handleResize);
// // //   }, [isLoaded, renderFrame]);

// // //   useMotionValueEvent(smoothProgress, "change", (latest) => {
// // //     if (!isLoaded) return;
// // //     const frameIndex = Math.min(
// // //       FRAME_COUNT - 1,
// // //       Math.max(0, Math.floor(latest * FRAME_COUNT))
// // //     );
// // //     currentFrameIndex.current = frameIndex;
// // //     renderFrame(frameIndex);
// // //   });

// // //   return (
// // //     <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
// // //       <div className="sticky top-0 h-screen w-full overflow-hidden">
// // //         <canvas
// // //           ref={canvasRef}
// // //           className="absolute inset-0 h-full w-full block"
// // //         />
// // //         {/* Parallax Overlay */}
// // //         {children}
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // "use client";

// // import {
// //   useEffect,
// //   useRef,
// //   useState,
// //   useCallback,
// // } from "react";
// // import {
// //   useScroll,
// //   useMotionValueEvent,
// // } from "framer-motion";

// // const FRAME_COUNT = 105;

// // const getImagePath = (index: number) =>
// //   `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.067s.webp`;

// // export default function ScrollyCanvas({
// //   children,
// // }: {
// //   children?: React.ReactNode;
// // }) {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const canvasRef = useRef<HTMLCanvasElement>(null);

// //   // Keep images outside React state.
// //   // Images do not need to trigger React renders.
// //   const imagesRef = useRef<HTMLImageElement[]>([]);

// //   const currentFrameRef = useRef(0);
// //   const requestedFrameRef = useRef(0);

// //   const animationFrameRef = useRef<number | null>(null);

// //   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

// //   const canvasSizeRef = useRef({
// //     width: 0,
// //     height: 0,
// //     dpr: 1,
// //   });

// //   const [isLoaded, setIsLoaded] = useState(false);

// //   const { scrollYProgress } = useScroll({
// //     target: containerRef,
// //     offset: ["start start", "end end"],
// //   });

// //   // ============================================================
// //   // CANVAS RESIZE
// //   // ============================================================

// //   const resizeCanvas = useCallback(() => {
// //     const canvas = canvasRef.current;

// //     if (!canvas) return;

// //     const rect = canvas.getBoundingClientRect();

// //     const width = Math.round(rect.width);
// //     const height = Math.round(rect.height);

// //     // Limit DPR.
// //     // Retina displays can otherwise create a very large canvas.
// //     const dpr = Math.min(window.devicePixelRatio || 1, 2);

// //     const previous = canvasSizeRef.current;

// //     // Don't resize if nothing changed.
// //     if (
// //       previous.width === width &&
// //       previous.height === height &&
// //       previous.dpr === dpr
// //     ) {
// //       return;
// //     }

// //     canvasSizeRef.current = {
// //       width,
// //       height,
// //       dpr,
// //     };

// //     canvas.width = Math.round(width * dpr);
// //     canvas.height = Math.round(height * dpr);

// //     canvas.style.width = `${width}px`;
// //     canvas.style.height = `${height}px`;

// //     const ctx = ctxRef.current;

// //     if (!ctx) return;

// //     // Work in CSS pixels while using the higher resolution backing canvas.
// //     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

// //     // Re-render current frame after resizing.
// //     drawFrame(currentFrameRef.current);
// //   }, []);

// //   // ============================================================
// //   // DRAW FRAME
// //   // ============================================================

// //   const drawFrame = useCallback((index: number) => {
// //     const canvas = canvasRef.current;
// //     const ctx = ctxRef.current;
// //     const images = imagesRef.current;

// //     if (!canvas || !ctx) return;

// //     const img = images[index];

// //     if (!img || !img.complete || img.naturalWidth === 0) {
// //       return;
// //     }

// //     const { width, height } = canvasSizeRef.current;

// //     if (!width || !height) return;

// //     const imageAspect = img.naturalWidth / img.naturalHeight;
// //     const canvasAspect = width / height;

// //     let drawWidth: number;
// //     let drawHeight: number;
// //     let x: number;
// //     let y: number;

// //     // ==========================================================
// //     // OBJECT-FIT: COVER
// //     // ==========================================================

// //     if (imageAspect > canvasAspect) {
// //       // Image is wider than canvas.
// //       drawHeight = height;
// //       drawWidth = height * imageAspect;

// //       x = (width - drawWidth) / 2;
// //       y = 0;
// //     } else {
// //       // Image is taller than canvas.
// //       drawWidth = width;
// //       drawHeight = width / imageAspect;

// //       x = 0;
// //       y = (height - drawHeight) / 2;
// //     }

// //     ctx.clearRect(0, 0, width, height);

// //     ctx.drawImage(
// //       img,
// //       x,
// //       y,
// //       drawWidth,
// //       drawHeight
// //     );

// //     currentFrameRef.current = index;
// //   }, []);

// //   // ============================================================
// //   // REQUEST ANIMATION FRAME
// //   // ============================================================

// //   const scheduleFrame = useCallback(
// //     (index: number) => {
// //       requestedFrameRef.current = index;

// //       // Already scheduled.
// //       if (animationFrameRef.current !== null) {
// //         return;
// //       }

// //       animationFrameRef.current = requestAnimationFrame(() => {
// //         animationFrameRef.current = null;

// //         const frame = requestedFrameRef.current;

// //         // Don't redraw the exact same frame.
// //         if (frame === currentFrameRef.current) {
// //           return;
// //         }

// //         drawFrame(frame);
// //       });
// //     },
// //     [drawFrame]
// //   );

// //   // ============================================================
// //   // PRELOAD ALL FRAMES
// //   // ============================================================

// //   useEffect(() => {
// //     let cancelled = false;

// //     const preloadImages = async () => {
// //       const images: HTMLImageElement[] = [];

// //       for (let i = 0; i < FRAME_COUNT; i++) {
// //         const img = new Image();

// //         img.decoding = "async";
// //         img.src = getImagePath(i);

// //         images.push(img);
// //       }

// //       imagesRef.current = images;

// //       try {
// //         // Wait for all images to load.
// //         await Promise.all(
// //           images.map((img) => {
// //             if (img.complete) {
// //               return img.decode?.().catch(() => {});
// //             }

// //             return new Promise<void>((resolve) => {
// //               img.onload = async () => {
// //                 try {
// //                   await img.decode?.();
// //                 } catch {
// //                   // Ignore decode errors.
// //                 }

// //                 resolve();
// //               };

// //               img.onerror = () => {
// //                 resolve();
// //               };
// //             });
// //           })
// //         );
// //       } finally {
// //         if (!cancelled) {
// //           setIsLoaded(true);
// //         }
// //       }
// //     };

// //     preloadImages();

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, []);

// //   // ============================================================
// //   // INITIALIZE CANVAS
// //   // ============================================================

// //   useEffect(() => {
// //     const canvas = canvasRef.current;

// //     if (!canvas) return;

// //     const ctx = canvas.getContext("2d", {
// //       alpha: false,
// //       desynchronized: true,
// //     });

// //     if (!ctx) return;

// //     ctxRef.current = ctx;

// //     resizeCanvas();

// //     const observer = new ResizeObserver(() => {
// //       resizeCanvas();
// //     });

// //     observer.observe(canvas);

// //     return () => {
// //       observer.disconnect();
// //     };
// //   }, [resizeCanvas]);

// //   // ============================================================
// //   // FIRST FRAME
// //   // ============================================================

// //   useEffect(() => {
// //     if (!isLoaded) return;

// //     resizeCanvas();

// //     // Draw first frame immediately.
// //     drawFrame(0);
// //   }, [isLoaded, drawFrame, resizeCanvas]);

// //   // ============================================================
// //   // SCROLL → FRAME
// //   // ============================================================

// //   useMotionValueEvent(scrollYProgress, "change", (progress) => {
// //     if (!isLoaded) return;

// //     const clampedProgress = Math.max(
// //       0,
// //       Math.min(1, progress)
// //     );

// //     const frameIndex = Math.min(
// //       FRAME_COUNT - 1,
// //       Math.floor(
// //         clampedProgress * (FRAME_COUNT - 1)
// //       )
// //     );

// //     scheduleFrame(frameIndex);
// //   });

// //   // ============================================================
// //   // CLEANUP
// //   // ============================================================

// //   useEffect(() => {
// //     return () => {
// //       if (animationFrameRef.current !== null) {
// //         cancelAnimationFrame(animationFrameRef.current);
// //       }
// //     };
// //   }, []);

// //   // ============================================================
// //   // RENDER
// //   // ============================================================

// //   return (
// //     <div
// //       ref={containerRef}
// //       className="relative h-[500vh] bg-[#121212]"
// //     >
// //       <div className="sticky top-0 h-screen w-full overflow-hidden">

// //         <canvas
// //           ref={canvasRef}
// //           className="absolute inset-0 block h-full w-full"
// //         />

// //         {/* Text / Portfolio Overlay */}
// //         {children}

// //       </div>
// //     </div>
// //   );
// // }




// "use client";

// import {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
// } from "react";

// import {
//   motion,
//   useScroll,
//   useMotionValueEvent,
//   useTransform,
//   MotionValue,
// } from "framer-motion";

// const FRAME_COUNT = 105;

// const getImagePath = (index: number) =>
//   `/sequence/frame_${index
//     .toString()
//     .padStart(3, "0")}_delay-0.067s.webp`;

// type ScrollyCanvasProps = {
//   children?: React.ReactNode;

//   // Allows Overlay to receive exactly the same scroll progress.
//   onProgress?: (progress: MotionValue<number>) => void;
// };

// export default function ScrollyCanvas({
//   children,
//   onProgress,
// }: ScrollyCanvasProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const imagesRef = useRef<HTMLImageElement[]>([]);

//   const currentFrameRef = useRef(0);
//   const requestedFrameRef = useRef(0);

//   const animationFrameRef = useRef<number | null>(null);

//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

//   const canvasSizeRef = useRef({
//     width: 0,
//     height: 0,
//     dpr: 1,
//   });

//   const [isLoaded, setIsLoaded] = useState(false);

//   // ============================================================
//   // SCROLL PROGRESS
//   // ============================================================

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Give the parent/overlay access to the SAME progress.
//   useEffect(() => {
//     onProgress?.(scrollYProgress);
//   }, [onProgress, scrollYProgress]);

//   // ============================================================
//   // SQUARE TRANSFORMATION
//   // ============================================================

//   /*
//     0%   → fullscreen
//     65%  → fullscreen
//     82%  → medium square
//     100% → stays square
//   */

//   const canvasScale = useTransform(
//     scrollYProgress,
//     [0, 0.65, 0.82, 1],
//     [1, 1, 0.58, 0.58]
//   );

//   const canvasBorderRadius = useTransform(
//     scrollYProgress,
//     [0, 0.65, 0.82],
//     [0, 0, 32]
//   );

//   const canvasShadowOpacity = useTransform(
//     scrollYProgress,
//     [0.65, 0.82],
//     [0, 0.45]
//   );

//   const canvasBorderOpacity = useTransform(
//     scrollYProgress,
//     [0.65, 0.82],
//     [0, 1]
//   );

//   // ============================================================
//   // RESIZE CANVAS
//   // ============================================================

//   const resizeCanvas = useCallback(() => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();

//     const width = Math.round(rect.width);
//     const height = Math.round(rect.height);

//     const dpr = Math.min(window.devicePixelRatio || 1, 2);

//     const previous = canvasSizeRef.current;

//     if (
//       previous.width === width &&
//       previous.height === height &&
//       previous.dpr === dpr
//     ) {
//       return;
//     }

//     canvasSizeRef.current = {
//       width,
//       height,
//       dpr,
//     };

//     canvas.width = Math.round(width * dpr);
//     canvas.height = Math.round(height * dpr);

//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;

//     const ctx = ctxRef.current;

//     if (!ctx) return;

//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     drawFrame(currentFrameRef.current);
//   }, []);

//   // ============================================================
//   // DRAW FRAME
//   // ============================================================

//   const drawFrame = useCallback((index: number) => {
//     const canvas = canvasRef.current;
//     const ctx = ctxRef.current;
//     const images = imagesRef.current;

//     if (!canvas || !ctx) return;

//     const img = images[index];

//     if (!img || !img.complete || img.naturalWidth === 0) {
//       return;
//     }

//     const { width, height } = canvasSizeRef.current;

//     if (!width || !height) return;

//     const imageAspect =
//       img.naturalWidth / img.naturalHeight;

//     const canvasAspect = width / height;

//     let drawWidth: number;
//     let drawHeight: number;
//     let x: number;
//     let y: number;

//     // ==========================================================
//     // OBJECT-FIT: COVER
//     // ==========================================================

//     if (imageAspect > canvasAspect) {
//       drawHeight = height;
//       drawWidth = height * imageAspect;

//       x = (width - drawWidth) / 2;
//       y = 0;
//     } else {
//       drawWidth = width;
//       drawHeight = width / imageAspect;

//       x = 0;
//       y = (height - drawHeight) / 2;
//     }

//     ctx.clearRect(0, 0, width, height);

//     ctx.drawImage(
//       img,
//       x,
//       y,
//       drawWidth,
//       drawHeight
//     );

//     currentFrameRef.current = index;
//   }, []);

//   // ============================================================
//   // REQUEST ANIMATION FRAME
//   // ============================================================

//   const scheduleFrame = useCallback(
//     (index: number) => {
//       requestedFrameRef.current = index;

//       if (animationFrameRef.current !== null) {
//         return;
//       }

//       animationFrameRef.current =
//         requestAnimationFrame(() => {
//           animationFrameRef.current = null;

//           const frame =
//             requestedFrameRef.current;

//           if (
//             frame === currentFrameRef.current
//           ) {
//             return;
//           }

//           drawFrame(frame);
//         });
//     },
//     [drawFrame]
//   );

//   // ============================================================
//   // PRELOAD IMAGES
//   // ============================================================

//   useEffect(() => {
//     let cancelled = false;

//     const preloadImages = async () => {
//       const images: HTMLImageElement[] = [];

//       for (let i = 0; i < FRAME_COUNT; i++) {
//         const img = new Image();

//         img.decoding = "async";

//         img.src = getImagePath(i);

//         images.push(img);
//       }

//       imagesRef.current = images;

//       await Promise.all(
//         images.map((img) => {
//           if (img.complete) {
//             return img
//               .decode?.()
//               .catch(() => {});
//           }

//           return new Promise<void>((resolve) => {
//             img.onload = async () => {
//               try {
//                 await img.decode?.();
//               } catch {}

//               resolve();
//             };

//             img.onerror = () => {
//               resolve();
//             };
//           });
//         })
//       );

//       if (!cancelled) {
//         setIsLoaded(true);
//       }
//     };

//     preloadImages();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // ============================================================
//   // INITIALIZE CANVAS
//   // ============================================================

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const ctx = canvas.getContext("2d", {
//       alpha: false,
//       desynchronized: true,
//     });

//     if (!ctx) return;

//     ctxRef.current = ctx;

//     resizeCanvas();

//     const observer = new ResizeObserver(() => {
//       resizeCanvas();
//     });

//     observer.observe(canvas);

//     return () => {
//       observer.disconnect();
//     };
//   }, [resizeCanvas]);

//   // ============================================================
//   // FIRST FRAME
//   // ============================================================

//   useEffect(() => {
//     if (!isLoaded) return;

//     resizeCanvas();

//     drawFrame(0);
//   }, [
//     isLoaded,
//     drawFrame,
//     resizeCanvas,
//   ]);

//   // ============================================================
//   // SCROLL → FRAME
//   // ============================================================

//   useMotionValueEvent(
//     scrollYProgress,
//     "change",
//     (progress) => {
//       if (!isLoaded) return;

//       const clampedProgress =
//         Math.max(
//           0,
//           Math.min(1, progress)
//         );

//       const frameIndex = Math.min(
//         FRAME_COUNT - 1,
//         Math.floor(
//           clampedProgress *
//             (FRAME_COUNT - 1)
//         )
//       );

//       scheduleFrame(frameIndex);
//     }
//   );

//   // ============================================================
//   // CLEANUP
//   // ============================================================

//   useEffect(() => {
//     return () => {
//       if (
//         animationFrameRef.current !== null
//       ) {
//         cancelAnimationFrame(
//           animationFrameRef.current
//         );
//       }
//     };
//   }, []);

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <div
//       ref={containerRef}
//       className="
//         relative
//         h-[500vh]
//         bg-[#121212]
//       "
//     >
//       <div
//         className="
//           sticky
//           top-0
//           h-screen
//           w-full
//           overflow-hidden
//           flex
//           items-center
//           justify-center
//         "
//       >

//         {/* ==================================================
//             CINEMATIC FRAME CONTAINER
//             ================================================== */}

//         <motion.div
//           style={{
//             scale: canvasScale,
//             borderRadius:
//               canvasBorderRadius,
//             overflow: "hidden",
//           }}
//           className="
//             relative
//             h-full
//             w-full
//             flex
//             items-center
//             justify-center
//             will-change-transform
//           "
//         >

//           <canvas
//             ref={canvasRef}
//             className="
//               absolute
//               inset-0
//               block
//               h-full
//               w-full
//             "
//           />

//           {/* Border */}
//           <motion.div
//             style={{
//               opacity:
//                 canvasBorderOpacity,
//               borderRadius:
//                 canvasBorderRadius,
//             }}
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               border
//               border-white/20
//             "
//           />

//           {/* Shadow */}
//           <motion.div
//             style={{
//               opacity:
//                 canvasShadowOpacity,
//               borderRadius:
//                 canvasBorderRadius,
//             }}
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               shadow-[0_30px_100px_rgba(0,0,0,0.6)]
//             "
//           />

//         </motion.div>

//         {/* ==================================================
//             TEXT OVERLAY
//             ================================================== */}

//         {children}

//       </div>
//     </div>
//   );
// }




"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

const FRAME_COUNT = 105;

const getImagePath = (index: number) =>
  `/sequence/frame_${index
    .toString()
    .padStart(3, "0")}_delay-0.067s.webp`;

export default function ScrollyCanvas({
  children,
}: {
  children?: React.ReactNode;
}) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const ctxRef =
    useRef<CanvasRenderingContext2D | null>(null);

  const imagesRef =
    useRef<HTMLImageElement[]>([]);

  const currentFrameRef =
    useRef(0);

  const [isLoaded, setIsLoaded] =
    useState(false);

  const { scrollYProgress } =
    useScroll({
      target: containerRef,
      offset: ["start start", "end end"],
    });

  // ============================================================
  // SQUARE ANIMATION
  // ============================================================

  const scale = useTransform(
    scrollYProgress,
    [0, 0.65, 0.82, 1],
    [1, 1, 0.58, 0.58]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.65, 0.82, 1],
    [0, 0, 28, 28]
  );

  const borderOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.82],
    [0, 1]
  );

  // ============================================================
  // DRAW FRAME
  // ============================================================

  const renderFrame = useCallback(
    (index: number) => {
      const canvas =
        canvasRef.current;

      const ctx =
        ctxRef.current;

      const img =
        imagesRef.current[index];

      if (!canvas || !ctx || !img) {
        return;
      }

      if (
        !img.complete ||
        img.naturalWidth === 0
      ) {
        return;
      }

      const width =
        canvas.clientWidth;

      const height =
        canvas.clientHeight;

      if (!width || !height) {
        return;
      }

      // Internal resolution
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      if (
        canvas.width !==
          width * dpr ||
        canvas.height !==
          height * dpr
      ) {
        canvas.width =
          width * dpr;

        canvas.height =
          height * dpr;

        ctx.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0
        );
      }

      const imageRatio =
        img.naturalWidth /
        img.naturalHeight;

      const canvasRatio =
        width / height;

      let drawWidth;
      let drawHeight;
      let x;
      let y;

      // ========================================================
      // OBJECT FIT: COVER
      // ========================================================

      if (
        imageRatio > canvasRatio
      ) {
        drawHeight = height;

        drawWidth =
          height * imageRatio;

        x =
          (width - drawWidth) / 2;

        y = 0;
      } else {
        drawWidth = width;

        drawHeight =
          width / imageRatio;

        x = 0;

        y =
          (height - drawHeight) / 2;
      }

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      ctx.drawImage(
        img,
        x,
        y,
        drawWidth,
        drawHeight
      );

      currentFrameRef.current =
        index;
    },
    []
  );

  // ============================================================
  // LOAD ALL IMAGES
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    const images: HTMLImageElement[] =
      [];

    let loaded = 0;

    for (
      let i = 0;
      i < FRAME_COUNT;
      i++
    ) {
      const img =
        new Image();

      img.src =
        getImagePath(i);

      img.onload = () => {
        loaded++;

        if (
          loaded === FRAME_COUNT &&
          !cancelled
        ) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        console.error(
          `Failed to load frame ${i}:`,
          getImagePath(i)
        );
      };

      images.push(img);
    }

    imagesRef.current =
      images;

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // INITIALIZE CANVAS
  // ============================================================

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    ctxRef.current = ctx;

    const resize = () => {
      renderFrame(
        currentFrameRef.current
      );
    };

    window.addEventListener(
      "resize",
      resize
    );

    resize();

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, [renderFrame]);

  // ============================================================
  // DRAW FIRST FRAME
  // ============================================================

  useEffect(() => {
    if (!isLoaded) return;

    renderFrame(0);
  }, [
    isLoaded,
    renderFrame,
  ]);

  // ============================================================
  // SCROLL → FRAME
  // ============================================================

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      if (!isLoaded) return;

      const progress =
        Math.max(
          0,
          Math.min(1, latest)
        );

      const frame =
        Math.floor(
          progress *
            (FRAME_COUNT - 1)
        );

      if (
        frame ===
        currentFrameRef.current
      ) {
        return;
      }

      renderFrame(frame);
    }
  );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-[500vh]
        w-full
        bg-[#121212]
      "
    >
      <div
        className="
          sticky
          top-0
          flex
          h-screen
          w-full
          items-center
          justify-center
          overflow-hidden
        "
      >

        {/* ==================================================
            ANIMATED VIDEO CONTAINER
            ================================================== */}

        <motion.div
          style={{
            scale,
            borderRadius,
          }}
          className="
            relative
            h-full
            w-full
            overflow-hidden
          "
        >

          <canvas
            ref={canvasRef}
            className="
              absolute
              inset-0
              block
              h-full
              w-full
            "
          />

          {/* BORDER */}

          <motion.div
            style={{
              opacity:
                borderOpacity,
              borderRadius,
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              border
              border-white/20
            "
          />

        </motion.div>

        {/* ==================================================
            OVERLAY
            ================================================== */}

        {children}

      </div>
    </div>
  );
}