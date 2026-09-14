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

      // ========================================================
      // DEVICE
      // ========================================================

      const isMobile =
        window.innerWidth < 768;

      // ========================================================
      // CANVAS RESOLUTION
      // ========================================================

      const dpr = isMobile
        ? Math.min(
            window.devicePixelRatio || 1,
            1.5
          )
        : Math.min(
            window.devicePixelRatio || 1,
            2
          );

      if (
        canvas.width !== width * dpr ||
        canvas.height !== height * dpr
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

      // ========================================================
      // IMAGE RATIO
      // ========================================================

      const imageRatio =
        img.naturalWidth /
        img.naturalHeight;

      const canvasRatio =
        width / height;

      let drawWidth: number;
      let drawHeight: number;
      let x: number;
      let y: number;

      // ========================================================
      // DESKTOP
      // ========================================================

      if (!isMobile) {
        /*
         * Keep your original desktop
         * cover behavior.
         */

        if (
          imageRatio >
          canvasRatio
        ) {
          drawHeight =
            height;

          drawWidth =
            height *
            imageRatio;

          x =
            (width -
              drawWidth) /
            2;

          y = 0;
        } else {
          drawWidth =
            width;

          drawHeight =
            width /
            imageRatio;

          x = 0;

          y =
            (height -
              drawHeight) /
            2;
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
      }

      // ========================================================
      // MOBILE
      // ========================================================

      else {
        /*
         * =====================================================
         * MOBILE CINEMATIC MODE
         * =====================================================
         *
         * Main image:
         * - 100% screen height
         * - original aspect ratio
         * - centered horizontally
         *
         * Background:
         * - same frame
         * - enlarged
         * - blurred
         * - fills entire screen
         */

        // ------------------------------------------------------
        // 1. CLEAR
        // ------------------------------------------------------

        ctx.clearRect(
          0,
          0,
          width,
          height
        );

        // ------------------------------------------------------
        // 2. DRAW BLURRED BACKGROUND
        // ------------------------------------------------------

        /*
         * Background uses cover.
         */

        let bgWidth: number;
        let bgHeight: number;
        let bgX: number;
        let bgY: number;

        if (
          imageRatio >
          canvasRatio
        ) {
          bgHeight =
            height;

          bgWidth =
            height *
            imageRatio;

          bgX =
            (width -
              bgWidth) /
            2;

          bgY = 0;
        } else {
          bgWidth =
            width;

          bgHeight =
            width /
            imageRatio;

          bgX = 0;

          bgY =
            (height -
              bgHeight) /
            2;
        }

        /*
         * Slight zoom on background.
         */

        const bgScale = 1.15;

        bgWidth *= bgScale;
        bgHeight *= bgScale;

        bgX =
          (width -
            bgWidth) /
          2;

        bgY =
          (height -
            bgHeight) /
          2;

        /*
         * Blur background.
         */

        ctx.save();

        ctx.filter =
          "blur(24px)";

        ctx.globalAlpha = 0.45;

        ctx.drawImage(
          img,
          bgX,
          bgY,
          bgWidth,
          bgHeight
        );

        ctx.restore();

        // ------------------------------------------------------
        // 3. DRAW MAIN IMAGE
        // ------------------------------------------------------

        /*
         * FULL HEIGHT.
         */

        drawHeight =
          height;

        drawWidth =
          height *
          imageRatio;

        /*
         * Center horizontally.
         */

        x =
          (width -
            drawWidth) /
          2;

        y = 0;

        /*
         * Draw sharp foreground.
         */

        ctx.save();

        ctx.globalAlpha = 1;

        ctx.drawImage(
          img,
          x,
          y,
          drawWidth,
          drawHeight
        );

        ctx.restore();
      }

      // ========================================================
      // CURRENT FRAME
      // ========================================================

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

      img.decoding = "async";

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

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

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
    if (!isLoaded) {
      return;
    }

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
      if (!isLoaded) {
        return;
      }

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

          {/* ==================================================
              CANVAS
              ================================================== */}

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

          {/* ==================================================
              BORDER
              ================================================== */}

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