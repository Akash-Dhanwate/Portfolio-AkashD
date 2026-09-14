"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const VIDEO_DURATION = 8;

type SceneProps = {
  progress: any;
  start: number;
  end: number;
  children: React.ReactNode;
  className?: string;
  enterX?: number;
  enterY?: number;
  scaleFrom?: number;
};

function Scene({
  progress,
  start,
  end,
  children,
  className = "",
  enterX = 0,
  enterY = 0,
  scaleFrom = 0.96,
}: SceneProps) {
  const fadeInEnd = start + 0.03;
  const fadeOutStart = end - 0.09;

  const opacity = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0]
  );

  const x = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [enterX, 0, 0, enterX * -0.2]
  );

  const y = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [enterY, 0, 0, -15]
  );

  const scale = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [scaleFrom, 1, 1, 0.98]
  );

  return (
    <motion.div
      style={{
        opacity,
        x,
        y,
        scale,
      }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Overlay() {
  // IMPORTANT:
  // This Overlay reads the page scroll directly.
  const { scrollYProgress } = useScroll();

  const time = useTransform(
    scrollYProgress,
    [0, 1],
    [0, VIDEO_DURATION]
  );

  // ============================================================
  // FINAL SQUARE PHASE
  // ============================================================

  const finalOpacity = useTransform(
    scrollYProgress,
    [0.76, 0.82],
    [0, 1]
  );

  const finalY = useTransform(
    scrollYProgress,
    [0.76, 0.88],
    [50, 0]
  );
  

  return (
    
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-30
        overflow-hidden
        text-white
      "
    >
      {/* =====================================================
          01 — INTRO
          ===================================================== */}

      <Scene
        progress={time}
        start={0}
        end={0.8}
        enterY={30}
        scaleFrom={0.94}
        className="
          flex
          items-center
          justify-center
          px-6
          text-center
        "
      >
        <div>
          <p
            className="
              mb-5
              font-mono
              text-[10px]
              uppercase
              tracking-[0.6em]
              text-white/40
              absolute top-48 left-20
            "
          >
            00 / 01 — INTRODUCING
          </p>

          <h1
            className="
              font-serif
              text-[17vw]
              font-light
              italic
              leading-[0.7]
              tracking-[-0.08em]
              md:text-[12vw]
              absolute top-60 left-20
            "
          >
            Akash
          </h1>
          <h1
            className="
              font-serif
              text-[17vw]
              font-light
              leading
              tracking-[-0.08em]
              md:text-[4vw]
              absolute top-99 left-20
              margin-2px
            "
            >
              Software Engineer
            </h1>

          <div className="mt-7 flex items-center justify-center gap-4">
          </div>
        </div>
      </Scene>

      {/* =====================================================
          02 — CURIOUS
          ===================================================== */}

      <Scene
        progress={time}
        start={0.8}
        end={1.37}
        enterX={-60}
        enterY={-20}
        scaleFrom={0.94}
        className="
          flex
          items-start
          justify-end
          px-[7vw]
          pt-[16vh]
          text-right
        "
      >
        <div>
          <p
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.55em]
              text-white/30
            "
          >
            01 — MINDSET
          </p>

          <h2
            className="
              mt-5
              font-serif
              text-[9vw]
              font-light
              italic
              leading-[0.75]
              tracking-[-0.08em]
              md:text-[7vw]
            "
          >
            Curious
            <br />
            <span 
            className="
            mr-[1em]
            absolute right-10 top-50"
            >
              by nature.
            </span>
          </h2>
        </div>
      </Scene>

      {/* =====================================================
          03 — LEARN
          ===================================================== */}

      <Scene
        progress={time}
        start={1.35}
        end={2}
        enterX={-70}
        enterY={25}
        className="
          flex
          items-center
          justify-start
          px-[7vw]
        "
      >
        <div>
          <p
            className="
              mb-5
              font-mono
              text-[9px]
              uppercase
              tracking-[0.55em]
              text-white/30
            "
          >
            01 | LEARN
          </p>

          <h2
            className="
              font-sans
              text-[10vw]
              font-black
              uppercase
              leading-[0.72]
              tracking-[-0.09em]
              md:text-[8vw]
              absolute left-10 bottom-30
            "
          >
            Always
            <br />
            <span className="text-white/35">
              learning.
            </span>
          </h2>

          <h1
            className="
              mt-5
              font-serif
              text-[3vw]
              font-light
              italic
              leading
              tracking-[-0.08em]
              md:text-[3vw]
              absolute left-10 bottom-24
            "
          >
            <span className="text-c" >Curiosity</span> →  <span className="text-r" >Capability . </span> 
          </h1>
        </div>
      </Scene>

      {/* =====================================================
          04 — BUILD
          ===================================================== */}

      <Scene
        progress={time}
        start={2}
        end={2.3}
        enterX={70}
        enterY={-30}
        className="
          flex
          items-end
          justify-end
          px-[7vw]
          pb-[17vh]
          text-right
        "
      >
        <div>
          <p
            className="
              mb-5
              font-mono
              text-[9px]
              uppercase
              tracking-[0.55em]
              text-white/30
            "
          >
            02 / BUILD
          </p>

          <h2
            className="
              font-sans
              text-[10vw]
              font-black
              uppercase
              leading-[0.72]
              tracking-[-0.09em]
              md:text-[8vw]
            "
          >
            Always
            <br />
            <span className="text-white/35">
              building.
            </span>
          </h2>
        </div>
      </Scene>

      {/* =====================================================
          05 — CODE
          ===================================================== */}

      <Scene
        progress={time}
        start={2.8}
        end={3.3}
        enterX={0}
        enterY={80}
        scaleFrom={0.92}
        className="
          flex
          items-center
          justify-center
          px-6
          text-center
        "
      >
        <div>
          <h2
            className="
              mt-6
              font-serif
              text-[11vw]
              font-light
              bold
              leading-[0.72]
              tracking-[-0.08em]
              md:text-[4vw]
              absolute bottom-11 left-1/2 -translate-x-1/2 -translate-y-1/2
            "
          >
            I don't just write <span className="text-c" >Code</span>.
          </h2>  
        </div>
      </Scene>

      {/* =====================================================
          07 — PROCESS
          ===================================================== */}

      <Scene
        progress={time}
        start={3.3}
        end={5}
        enterY={45}
        scaleFrom={0.9}
        className="
          flex
          items-center
          justify-center
          px-6
          text-center
        "
      >
        <div>
          <p
            className="
              mb-8
              font-mono
              text-[9px]
              uppercase
              tracking-[0.6em]
              text-white/30
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            "
          >
            THE PROCESS
          </p>

          <h2
            className="
              font-serif
              text-[10vw]
              font-light
              italic
              leading-[0.7]
              tracking-[-0.09em]
              md:text-[8vw]
            "
          >
            Think.
            <br />

            <span className="ml-[0.7em]">
              Build.
            </span>

            <br />

            <span className="ml-[-0.4em] text-white/35">
              Break.
            </span>

            <br />

            <span className="ml-[1.2em]">
              Improve.
            </span>
          </h2>
        </div>
      </Scene>

      {/* =====================================================
          08 — PHILOSOPHY
          ===================================================== */}

      <Scene
        progress={time}
        start={6}
        end={7.2}
        enterX={-60}
        enterY={25}
        className="
          flex
          items-end
          justify-start
          px-[7vw]
          pb-[14vh]
        "
      >
        <div>
          <p
            className="
              mb-5
              font-mono
              text-[9px]
              uppercase
              tracking-[0.55em]
              text-white/30
            "
          >
            PHILOSOPHY
          </p>

          <h2
            className="
              font-serif
              text-[10vw]
              font-light
              leading-[0.72]
              tracking-[-0.08em]
              md:text-[7vw]
            "
          >
            Make it
            <br />
            <span className="italic text-white/40">
              better.
            </span>
          </h2>
        </div>
      </Scene>

      {/* =====================================================
          FINAL COMPOSITION
          ===================================================== */}

      <motion.div
        style={{
          opacity: finalOpacity,
          y: finalY,
        }}
        className="
          absolute
          inset-0
        "
      >
        {/* TOP LEFT */}

        <div
          className="
            absolute
            left-[5vw]
            top-[8vh]
          "
        >
          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.5em]
              text-white/35
            "
          >
            AKASH / 2026
          </p>
        </div>

        {/* TOP RIGHT */}

        <div
          className="
            absolute
            right-[5vw]
            top-[8vh]
            text-right
          "
        >
          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.45em]
              text-white/35
            "
          >
            01 — 08
          </p>
        </div>

        {/* LEFT */}

        <div
          className="
            absolute
            left-[5vw]
            top-1/2
            hidden
            -translate-y-1/2
            md:block
          "
        >
          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.45em]
              text-white/30
              [writing-mode:vertical-rl]
            "
          >
            CURIOUS · BUILD · IMPROVE
          </p>
        </div>

        {/* RIGHT */}

        <div
          className="
            absolute
            right-[5vw]
            top-1/2
            hidden
            -translate-y-1/2
            md:block
          "
        >
          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.45em]
              text-white/30
              [writing-mode:vertical-rl]
            "
          >
            IDEAS → SYSTEMS → PRODUCTS
          </p>
        </div>

        {/* BOTTOM */}

        <div
          className="
            absolute
            bottom-[8vh]
            left-[5vw]
          "
        >
          <p
            className="
              mb-4
              font-mono
              text-[9px]
              uppercase
              tracking-[0.55em]
              text-white/30
            "
          >
            THE WORK STARTS WITH AN IDEA
          </p>

          <h2
            className="
              font-serif
              text-[8vw]
              font-light
              leading-[0.72]
              tracking-[-0.08em]
              md:text-[6vw]
            "
          >
            Let's build
            <br />
            <span className="italic text-white/40">
              something.
            </span>
          </h2>
        </div>

        {/* BOTTOM RIGHT */}

        <div
          className="
            absolute
            bottom-[8vh]
            right-[5vw]
            text-right
          "
        >
          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.45em]
              text-white/30
            "
          >
            SOFTWARE ENGINEER
          </p>
        </div>
      </motion.div>
    </div>
  );
}