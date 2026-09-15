// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function About() {
//   const sectionRef = useRef<HTMLElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   const secondLines = [
//     "TURNING",
//     "IDEAS INTO",
//     "REAL SOFTWARE.",
//   ];

//   // --------------------------------
//   // INDIVIDUAL BIG TEXT ANIMATIONS
//   // --------------------------------

//   const y1 = useTransform(
//     scrollYProgress,
//     [0.08, 0.20],
//     [120, 0]
//   );

//   const opacity1 = useTransform(
//     scrollYProgress,
//     [0.08, 0.16],
//     [0, 1]
//   );

//   const x2 = useTransform(
//     scrollYProgress,
//     [0.16, 0.28],
//     [120, 0]
//   );

//   const opacity2 = useTransform(
//     scrollYProgress,
//     [0.16, 0.24],
//     [0, 1]
//   );

//   const y3 = useTransform(
//     scrollYProgress,
//     [0.24, 0.36],
//     [120, 0]
//   );

//   const opacity3 = useTransform(
//     scrollYProgress,
//     [0.24, 0.32],
//     [0, 1]
//   );

//   const x4 = useTransform(
//     scrollYProgress,
//     [0.32, 0.44],
//     [-120, 0]
//   );

//   const opacity4 = useTransform(
//     scrollYProgress,
//     [0.32, 0.40],
//     [0, 1]
//   );

//   const scale5 = useTransform(
//     scrollYProgress,
//     [0.40, 0.52],
//     [0.7, 1]
//   );

//   const opacity5 = useTransform(
//     scrollYProgress,
//     [0.40, 0.48],
//     [0, 1]
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="
//         relative
//         min-h-[220vh]
//         bg-[#121212]
//         text-white
//         px-6
//         md:px-12
//         overflow-hidden
//       "
//     >
//       <div className="sticky top-0 min-h-screen flex items-center overflow-hidden">
//         <div className="max-w-7xl w-full mx-auto py-20">

//           {/* -------------------------------- */}
//           {/* SECTION LABEL */}
//           {/* -------------------------------- */}

//           <p className="mb-12 text-xs uppercase tracking-[0.5em] text-white/40">
//             01 — About Me
//           </p>

//           {/* -------------------------------- */}
//           {/* BIG ANIMATED INTRO */}
//           {/* -------------------------------- */}

//           <div className="space-y-1">

//             <motion.h2
//               style={{
//                 y: y1,
//                 opacity: opacity1,
//               }}
//               className="
//                 text-[9vw]
//                 md:text-[7vw]
//                 leading-[0.85]
//                 font-black
//                 tracking-[-0.06em]
//               "
//             >
//               I'M A
//             </motion.h2>

//             <motion.h2
//               style={{
//                 x: x2,
//                 opacity: opacity2,
//               }}
//               className="
//                 text-[9vw]
//                 md:text-[7vw]
//                 leading-[0.85]
//                 font-black
//                 tracking-[-0.06em]
//               "
//             >
//               B.TECH
//             </motion.h2>

//             <motion.h2
//               style={{
//                 y: y3,
//                 opacity: opacity3,
//               }}
//               className="
//                 text-[9vw]
//                 md:text-[7vw]
//                 leading-[0.85]
//                 font-black
//                 tracking-[-0.06em]
//               "
//             >
//               COMPUTER
//             </motion.h2>

//             <motion.h2
//               style={{
//                 x: x4,
//                 opacity: opacity4,
//               }}
//               className="
//                 text-[9vw]
//                 md:text-[7vw]
//                 leading-[0.85]
//                 font-black
//                 tracking-[-0.06em]
//               "
//             >
//               ENGINEERINGx
//             </motion.h2>

//             <motion.h2
//               style={{
//                 scale: scale5,
//                 opacity: opacity5,
//               }}
//               className="
//                 text-[9vw]
//                 md:text-[7vw]
//                 leading-[0.85]
//                 font-black
//                 tracking-[-0.06em]
//               "
//             >
//               STUDENT.
//             </motion.h2>

//           </div>

//           {/* -------------------------------- */}
//           {/* SECOND STATEMENT */}
//           {/* -------------------------------- */}

//           <div className="mt-32 space-y-1">
//             {secondLines.map((line, index) => (
//               <motion.h2
//                 key={line}
//                 initial={{
//                   opacity: 0,
//                   x: -100,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   x: 0,
//                 }}
//                 viewport={{
//                   once: false,
//                   margin: "-120px",
//                 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: index * 0.1,
//                   ease: [0.16, 1, 0.3, 1],
//                 }}
//                 className={`text-[8vw] md:text-[7vw] leading-[0.88] font-black tracking-[-0.06em] ${
//                   index === 2
//                     ? "text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-white to-neutral-500"
//                     : "text-white"
//                 }`}
//               >
//                 {line}
//               </motion.h2>
//             ))}
//           </div>

//           {/* -------------------------------- */}
//           {/* ACTUAL ABOUT INFORMATION */}
//           {/* -------------------------------- */}

//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 60,
//             }}
//             whileInView={{
//               opacity: 1,
//               y: 0,
//             }}
//             viewport={{
//               once: false,
//               margin: "-100px",
//             }}
//             transition={{
//               duration: 0.9,
//               delay: 0.2,
//               ease: [0.16, 1, 0.3, 1],
//             }}
//             className="mt-24 max-w-2xl font-mono"
//           >
//             <p className="text-lg md:text-xl leading-relaxed text-white/60">
//               I'm currently pursuing my{" "}
//               <span className="font-bold text-white">
//                 B.Tech
//               </span>{" "}
//               in Computer Engineering and I'm passionate about turning
//               ideas into useful software.
//             </p>

//             <br />

//             <p className="text-lg md:text-xl leading-relaxed text-white/50">
//               I enjoy taking ideas from concept to reality
//               <br />
//               breaking problems down,
//               <br />
//               understanding how systems work,
//               <br />
//               and building
//               <br />
//               useful digital experiences along the way.
//             </p>

//             <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/50">
//               I'm constantly learning, experimenting with new technologies,
//               exploring AI, and building projects that push me to think
//               beyond just writing code.
//             </p>

//             <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/50">
//               For me, every idea is an opportunity to build, every bug is
//               a lesson, and every project is a chance to improve.
//             </p>
//           </motion.div>

//           {/* -------------------------------- */}
//           {/* MINDSET */}
//           {/* -------------------------------- */}

//           <motion.div
//             initial={{
//               opacity: 0,
//               scale: 0.95,
//             }}
//             whileInView={{
//               opacity: 1,
//               scale: 1,
//             }}
//             viewport={{
//               once: false,
//               margin: "-100px",
//             }}
//             transition={{
//               duration: 0.8,
//             }}
//             className="mt-32 border-t border-white/10 pt-8"
//           >
//             <p className="text-xs uppercase tracking-[0.4em] text-white/30">
//               My mindset
//             </p>

//             <p className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
//               Learn.
//               <span className="text-white/30"> Build.</span>
//               <span className="text-white/20"> Break.</span>
//               <span className="text-white/10"> Improve.</span>
//             </p>
//           </motion.div>

//         </div>
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

  // --------------------------------
  // FIRST BIG TEXT
  // --------------------------------

  // I'M A
  const y1 = useTransform(
    scrollYProgress,
    [0.00, 0.06],
    [70, 0]
  );

  const opacity1 = useTransform(
    scrollYProgress,
    [0.00, 0.04],
    [0, 1]
  );

  // B.TECH
  const x2 = useTransform(
    scrollYProgress,
    [0.055, 0.12],
    [70, 0]
  );

  const opacity2 = useTransform(
    scrollYProgress,
    [0.055, 0.10],
    [0, 1]
  );

  // COMPUTER
  const y3 = useTransform(
    scrollYProgress,
    [0.115, 0.18],
    [70, 0]
  );

  const opacity3 = useTransform(
    scrollYProgress,
    [0.115, 0.16],
    [0, 1]
  );

  // ENGINEERING
  const x4 = useTransform(
    scrollYProgress,
    [0.175, 0.245],
    [-70, 0]
  );

  const opacity4 = useTransform(
    scrollYProgress,
    [0.175, 0.225],
    [0, 1]
  );

  // STUDENT
  const scale5 = useTransform(
    scrollYProgress,
    [0.235, 0.30],
    [0.8, 1]
  );

  const opacity5 = useTransform(
    scrollYProgress,
    [0.235, 0.275],
    [0, 1]
  );

  // --------------------------------
  // SECOND STATEMENT
  // --------------------------------

  // TURNING
  const secondY1 = useTransform(
    scrollYProgress,
    [0.30, 0.38],
    [45, 0]
  );

  const secondOpacity1 = useTransform(
    scrollYProgress,
    [0.30, 0.36],
    [0, 1]
  );

  // IDEAS INTO
  const secondY2 = useTransform(
    scrollYProgress,
    [0.35, 0.43],
    [45, 0]
  );

  const secondOpacity2 = useTransform(
    scrollYProgress,
    [0.35, 0.41],
    [0, 1]
  );

  // REAL SOFTWARE
  const secondY3 = useTransform(
    scrollYProgress,
    [0.40, 0.48],
    [45, 0]
  );

  const secondOpacity3 = useTransform(
    scrollYProgress,
    [0.40, 0.46],
    [0, 1]
  );

  // --------------------------------
  // RESPONSIVE TYPOGRAPHY
  // --------------------------------

  const mainHeadingClass = `
    text-[clamp(1.85rem,7vw,7rem)]
    leading-[0.85]
    font-black
    tracking-[-0.06em]
    whitespace-nowrap
  `;

  const secondHeadingClass = `
    text-[clamp(1.7rem,6.5vw,7rem)]
    leading-[0.88]
    font-black
    tracking-[-0.06em]
    text-white
    whitespace-nowrap
  `;

  const bodyTextClass = `
    text-[clamp(0.9rem,1.35vw,1.25rem)]
    leading-[1.7]
  `;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[220vh]
        w-full
        overflow-hidden
        bg-[#121212]
        text-white
        px-[clamp(1rem,4vw,3rem)]
      "
    >
      <div
        className="
          sticky
          top-0
          flex
          min-h-screen
          w-full
          items-center
          overflow-hidden
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            py-[clamp(3rem,6vw,5rem)]
          "
        >

          {/* -------------------------------- */}
          {/* SECTION LABEL */}
          {/* -------------------------------- */}

          <p
            className="
              mb-[clamp(1.75rem,4vw,3rem)]
              text-[clamp(0.6rem,0.75vw,0.75rem)]
              uppercase
              tracking-[clamp(0.25em,0.5vw,0.5em)]
              text-white/40
            "
          >
            01 — About Me
          </p>

          {/* -------------------------------- */}
          {/* FIRST BIG STATEMENT */}
          {/* -------------------------------- */}

          <div
            className="
              space-y-[clamp(0.1rem,0.2vw,0.25rem)]
            "
          >

            {/* I'M A */}

            <motion.h2
              style={{
                y: y1,
                opacity: opacity1,
              }}
              className={mainHeadingClass}
            >
              I'M A
            </motion.h2>

            {/* B.TECH */}

            <motion.h2
              style={{
                x: x2,
                opacity: opacity2,
              }}
              className={mainHeadingClass}
            >
              B.TECH
            </motion.h2>

            {/* COMPUTER */}

            <motion.h2
              style={{
                y: y3,
                opacity: opacity3,
              }}
              className={mainHeadingClass}
            >
              COMPUTER
            </motion.h2>

            {/* ENGINEERING */}

            <motion.h2
              style={{
                x: x4,
                opacity: opacity4,
              }}
              className="
                text-[clamp(1.4rem,5.5vw,5.5rem)]
                leading-[0.85]
                font-black
                tracking-[-0.06em]
                whitespace-nowrap
                text-c
              "
            >
              ENGINEERING
            </motion.h2>

            {/* STUDENT */}

            <motion.h2
              style={{
                scale: scale5,
                opacity: opacity5,
              }}
              className={mainHeadingClass}
            >
              STUDENT.
            </motion.h2>

          </div>

          {/* -------------------------------- */}
          {/* SECOND STATEMENT */}
          {/* -------------------------------- */}

          <div
            className="
              mt-[clamp(3.5rem,9vw,8rem)]
              space-y-[clamp(0.1rem,0.2vw,0.25rem)]
            "
          >

            {/* TURNING */}

            <motion.h2
              style={{
                y: secondY1,
                opacity: secondOpacity1,
              }}
              className={secondHeadingClass}
            >
              TURNING
            </motion.h2>

            {/* IDEAS INTO */}

            <motion.h2
              style={{
                y: secondY2,
                opacity: secondOpacity2,
              }}
              className={secondHeadingClass}
            >
              IDEAS INTO
            </motion.h2>

            {/* REAL SOFTWARE */}

            <motion.h2
              style={{
                y: secondY3,
                opacity: secondOpacity3,
              }}
              className="
                text-[clamp(1.65rem,6.5vw,7rem)]
                leading-[0.88]
                font-black
                tracking-[-0.06em]
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-neutral-400
                via-white
                to-neutral-500
                whitespace-nowrap
              "
            >
              REAL
            </motion.h2>
            <motion.h2
              style={{
                y: secondY3,
                opacity: secondOpacity3,
              }}
              className="
                text-[clamp(1.65rem,6.5vw,7rem)]
                leading-[0.88]
                font-black
                tracking-[-0.06em]
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-neutral-400
                via-white
                to-neutral-500
                whitespace-nowrap
              "
            >
              SOFTWARE.
            </motion.h2>

          </div>

          {/* -------------------------------- */}
          {/* ABOUT INFORMATION */}
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
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mt-[clamp(2.5rem,6vw,6rem)]
              w-full
              max-w-2xl
              font-mono
            "
          >

            <p
              className={`
                ${bodyTextClass}
                text-white/60
              `}
            >
              I'm currently pursuing my{" "}
              <span className="font-bold text-white text-c">
                B.Tech
              </span>{" "}
              in Computer Engineering and I'm passionate
              about turning ideas into useful software.
            </p>

            <div className="h-[clamp(1rem,2.5vw,2rem)]" />

            <p
              className={`
                ${bodyTextClass}
                text-white/50
              `}
            >
              I enjoy taking ideas from concept to reality
              <br />
              breaking problems down,
              <br />
              understanding how systems work,
              <br />
              and building
              <br />
              useful digital experiences along the way.
            </p>

            <p
              className={`
                mt-[clamp(1rem,2vw,1.5rem)]
                ${bodyTextClass}
                text-white/50
              `}
            >
              I'm constantly learning, experimenting with
              new technologies, exploring AI, and building
              projects that push me to think beyond just
              writing code.
            </p>

            <p
              className={`
                mt-[clamp(1rem,2vw,1.5rem)]
                ${bodyTextClass}
                text-white/50
              `}
            >
              For me, every idea is an opportunity to build,
              every bug is a lesson, and every project is a
              chance to improve.
            </p>

          </motion.div>

          {/* -------------------------------- */}
          {/* MINDSET */}
          {/* -------------------------------- */}

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
              duration: 0.7,
            }}
            className="
              mt-[clamp(3.5rem,9vw,8rem)]
              border-t
              border-white/10
              pt-[clamp(1.5rem,3vw,2rem)]
            "
          >

            <p
              className="
                text-[clamp(0.6rem,0.75vw,0.75rem)]
                uppercase
                tracking-[clamp(0.2em,0.4vw,0.4em)]
                text-white/30
              "
            >
              My mindset
            </p>

            <p
              className="
                mt-[clamp(1rem,2vw,1.5rem)]
                text-[clamp(1.5rem,3.5vw,3rem)]
                leading-tight
                font-bold
                tracking-tight
              "
            >
              Learn.
              <span className="text-white/30">
                {" "}Build.
              </span>
              <span className="text-white/20">
                {" "}Break.
              </span>
              <span className="text-white/10">
                {" "}Improve.
              </span>
            </p>

          </motion.div>

        </div>
      </div>
    </section>
  );
}