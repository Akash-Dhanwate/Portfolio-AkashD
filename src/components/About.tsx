// "use client";

// import { motion } from "framer-motion";

// const mainLines = [
//   "I'M A B.TECH",
//   "COMPUTER",
//   "ENGINEERING",
//   "STUDENT.",
// ];

// const secondLines = [
//   "TURNING",
//   "IDEAS INTO",
//   "REAL SOFTWARE.",
// ];

// export default function About() {
//   return (
//     <section className="relative min-h-screen bg-[#121212] text-white px-6 md:px-12 py-40 overflow-hidden">

//       <div className="max-w-7xl mx-auto">

//         {/* SECTION LABEL */}
//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, margin: "-120px" }}
//           transition={{
//             duration: 0.6,
//             ease: [0.16, 1, 0.3, 1],
//           }}
//           className="mb-20 text-xs uppercase tracking-[0.5em] text-white/40"
//         >
//           01 — About Me
//         </motion.p>


//         {/* INTRO */}
//         <div className="space-y-1">
//           {mainLines.map((line, index) => (
//             <motion.h2
//               key={line}
//               initial={{
//                 opacity: 0,
//                 y: 100,
//               }}
//               whileInView={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               viewport={{
//                 once: false,
//                 margin: "-120px",
//               }}
//               transition={{
//                 duration: 0.8,
//                 delay: index * 0.08,
//                 ease: [0.16, 1, 0.3, 1],
//               }}
//               className="text-[8vw] md:text-[7vw] leading-[0.88] font-black tracking-[-0.06em]"
//             >
//               {line}
//             </motion.h2>
//           ))}
//         </div>


//         {/* IDEAS → SOFTWARE */}
//         <div className="mt-32 space-y-1">
//           {secondLines.map((line, index) => (
//             <motion.h2
//               key={line}
//               initial={{
//                 opacity: 0,
//                 x: -100,
//               }}
//               whileInView={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               viewport={{
//                 once: false,
//                 margin: "-120px",
//               }}
//               transition={{
//                 duration: 0.8,
//                 delay: index * 0.1,
//                 ease: [0.16, 1, 0.3, 1],
//               }}
//               className={`text-[8vw] md:text-[7vw] leading-[0.88] font-black tracking-[-0.06em] ${
//                 index === 2
//                   ? "text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-white to-neutral-500"
//                   : "text-white"
//               }`}
//             >
//               {line}
//             </motion.h2>
//           ))}
//         </div>


//         {/* DESCRIPTION */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 60,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           viewport={{
//             once: false,
//             margin: "-100px",
//           }}
//           transition={{
//             duration: 0.9,
//             delay: 0.2,
//             ease: [0.16, 1, 0.3, 1],
//           }}
//           className="mt-24 max-w-2xl font-mono"
//         >
//           <p className="text-lg md:text-xl leading-relaxed text-white/50">
//             I enjoy taking ideas from concept to reality 
//             <br/>
//             breaking problems down,
//             <br/>
//             understanding how systems work, 
//             <br/>
//             and building
//             <br/>
//             useful digital experiences along the way.
//           </p>

//           <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/50">
//             I'm constantly learning, experimenting with new technologies,
//             exploring AI, and building projects that push me to think
//             beyond just writing code.
//           </p>

//           <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/50">
//             For me, every idea is an opportunity to build, every bug is
//             a lesson, and every project is a chance to improve.
//           </p>
//         </motion.div>


//         {/* MINDSET */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             scale: 0.95,
//           }}
//           whileInView={{
//             opacity: 1,
//             scale: 1,
//           }}
//           viewport={{
//             once: false,
//             margin: "-100px",
//           }}
//           transition={{
//             duration: 0.8,
//           }}
//           className="mt-32 border-t border-white/10 pt-8"
//         >
//           <p className="text-xs uppercase tracking-[0.4em] text-white/30">
//             My mindset
//           </p>

//           <p className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
//             Learn.
//             <span className="text-white/30"> Build.</span>
//             <span className="text-white/20"> Break.</span>
//             <span className="text-white/10"> Improve.</span>
//           </p>
//         </motion.div>

//       </div>
//     </section>
//   );
// }













"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });


const secondLines = [
  "TURNING",
  "IDEAS INTO",
  "REAL SOFTWARE.",
];
  // --------------------------------
  // INDIVIDUAL BIG TEXT ANIMATIONS
  // --------------------------------

  const y1 = useTransform(
    scrollYProgress,
    [0.08, 0.20],
    [120, 0]
  );

  const opacity1 = useTransform(
    scrollYProgress,
    [0.08, 0.16],
    [0, 1]
  );

  const x2 = useTransform(
    scrollYProgress,
    [0.16, 0.28],
    [120, 0]
  );

  const opacity2 = useTransform(
    scrollYProgress,
    [0.16, 0.24],
    [0, 1]
  );

  const y3 = useTransform(
    scrollYProgress,
    [0.24, 0.36],
    [120, 0]
  );

  const opacity3 = useTransform(
    scrollYProgress,
    [0.24, 0.32],
    [0, 1]
  );

  const x4 = useTransform(
    scrollYProgress,
    [0.32, 0.44],
    [-120, 0]
  );

  const opacity4 = useTransform(
    scrollYProgress,
    [0.32, 0.40],
    [0, 1]
  );

  const scale5 = useTransform(
    scrollYProgress,
    [0.40, 0.52],
    [0.7, 1]
  );

  const opacity5 = useTransform(
    scrollYProgress,
    [0.40, 0.48],
    [0, 1]
  );

  // --------------------------------
  // ABOUT DESCRIPTION
  // --------------------------------

  const infoOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.68],
    [0, 1]
  );

  const infoY = useTransform(
    scrollYProgress,
    [0.55, 0.68],
    [80, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[220vh] bg-[#121212] text-white px-6 md:px-12"
    >
      <div className="sticky top-0 min-h-screen flex items-center">
        <div className="max-w-7xl w-full mx-auto py-20">

          {/* -------------------------------- */}
          {/* SECTION LABEL */}
          {/* -------------------------------- */}

          <p className="mb-12 text-xs uppercase tracking-[0.5em] text-white/40">
            01 — About Me
          </p>


          {/* -------------------------------- */}
          {/* BIG ANIMATED INTRO */}
          {/* -------------------------------- */}

          <div className="space-y-1">

            <motion.h2
              style={{
                y: y1,
                opacity: opacity1,
              }}
              className="text-[9vw] md:text-[7vw] leading-[0.85] font-black tracking-[-0.06em]"
            >
              I'M A
            </motion.h2>


            <motion.h2
              style={{
                x: x2,
                opacity: opacity2,
              }}
              className="text-[9vw] md:text-[7vw] leading-[0.85] font-black tracking-[-0.06em]"
            >
              B.TECH
            </motion.h2>


            <motion.h2
              style={{
                y: y3,
                opacity: opacity3,
              }}
              className="text-[9vw] md:text-[7vw] leading-[0.85] font-black tracking-[-0.06em]"
            >
              COMPUTER
            </motion.h2>


            <motion.h2
              style={{
                x: x4,
                opacity: opacity4,
              }}
              className="text-[9vw] md:text-[7vw] leading-[0.85] font-black tracking-[-0.06em]"
            >
              ENGINEERING
            </motion.h2>


            <motion.h2
              style={{
                scale: scale5,
                opacity: opacity5,
              }}
              className="text-[9vw] md:text-[7vw] leading-[0.85] font-black tracking-[-0.06em]"
            >
              STUDENT.
            </motion.h2>

          </div>


          {/* -------------------------------- */}
          {/* SECOND STATEMENT */}
          {/* -------------------------------- */}
             <div className="mt-32 space-y-1">
            {secondLines.map((line, index) => (
            <motion.h2
              key={line}
              initial={{
                opacity: 0,
                x: -100,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: false,
                margin: "-120px",
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`text-[8vw] md:text-[7vw] leading-[0.88] font-black tracking-[-0.06em] ${
                index === 2
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-white to-neutral-500"
                  : "text-white"
              }`}
            >
              {line}
            </motion.h2>
          ))}
          {/* <motion.div
            style={{
              opacity: infoOpacity,
              y: infoY,
            }}
            className="mt-24"
          >

            <p className="text-[6vw] md:text-[4vw] font-black leading-[0.95] tracking-[-0.04em]">
              TURNING
              <br />

              <span className="text-white/40">
                IDEAS INTO
              </span>

              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-white to-neutral-500">
                REAL SOFTWARE.
              </span>
            </p>

          </motion.div> */}


          {/* -------------------------------- */}
          {/* ACTUAL ABOUT INFORMATION */}
          {/* -------------------------------- */}

            <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            margin: "-100px",
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-24 max-w-2xl font-mono"
        >
          <p className="text-lg md:text-xl leading-relaxed text-white/60">
              I'm currently pursuing my <span className="font-bold text-white">B.Tech</span> in Computer
              Engineering and I'm passionate about turning
              ideas into useful software.
          </p>
            <br/>
          <p className="text-lg md:text-xl leading-relaxed text-white/50">
            I enjoy taking ideas from concept to reality 
            <br/>
            breaking problems down,
            <br/>
            understanding how systems work, 
            <br/>
            and building
            <br/>
            useful digital experiences along the way.
          </p>

          <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/50">
            I'm constantly learning, experimenting with new technologies,
            exploring AI, and building projects that push me to think
            beyond just writing code.
          </p>

          <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/50">
            For me, every idea is an opportunity to build, every bug is
            a lesson, and every project is a chance to improve.
          </p>
        </motion.div>


        {/* MINDSET */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: false,
            margin: "-100px",
          }}
          transition={{
            duration: 0.8,
          }}
          className="mt-32 border-t border-white/10 pt-8"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/30">
            My mindset
          </p>

          <p className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
            Learn.
            <span className="text-white/30"> Build.</span>
            <span className="text-white/20"> Break.</span>
            <span className="text-white/10"> Improve.</span>
          </p>
        </motion.div>

        </div>
      </div>
    </div>
    </section>
  );
}