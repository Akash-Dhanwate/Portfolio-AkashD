"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from "framer-motion";
import type { UseScrollOptions } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Menu,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, portfolio, stats } from "@/data/portfolio";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  as = "div"
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p";
}) {
  const Tag = as === "h1" ? motion.h1 : as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : as === "p" ? motion.p : motion.div;
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <Tag
      className={cn("text-reveal", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } }
      }}
    >
      {childrenArray.map((child, index) => (
        <span className="text-mask" key={index}>
          <motion.span
            className="text-reveal-line"
            variants={{ hidden: { y: "115%", opacity: 0, rotate: 2 }, show: { y: "0%", opacity: 1, rotate: 0 } }}
            transition={{ duration: 0.82, ease }}
          >
            {child}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function StaggerText({
  text,
  mode = "words",
  className,
  delay = 0
}: {
  text: string;
  mode?: "words" | "chars";
  className?: string;
  delay?: number;
}) {
  const tokens = mode === "chars" ? Array.from(text) : text.split(" ");
  return (
    <motion.span
      className={cn("stagger-text", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: mode === "chars" ? 0.025 : 0.07, delayChildren: delay } } }}
      aria-label={text}
    >
      {tokens.map((token, index) => (
        <motion.span key={`${token}-${index}`} aria-hidden="true" variants={{ hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }} transition={{ duration: 0.45, ease }}>
          {token}{mode === "words" && index < tokens.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function BlurText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("blur-text", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.075, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} aria-hidden="true" variants={{ hidden: { opacity: 0, filter: "blur(12px)", scale: 1.08, y: 12 }, show: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } }} transition={{ duration: 0.7, ease }}>
          {word}{index < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function WaveText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={cn("wave-text", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.035, delayChildren: delay } } }}
      aria-label={text}
    >
      {Array.from(text).map((character, index) => (
        <motion.span key={`${character}-${index}`} aria-hidden="true" variants={{ hidden: { opacity: 0, y: reduced ? 0 : 18, rotateX: reduced ? 0 : -70 }, show: { opacity: 1, y: 0, rotateX: 0 } }} transition={{ duration: 0.52, ease }}>
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
    </motion.span>
  );
}

const scrambleGlyphs = "01<>[]{}#*+/$%";

export function ScrambleText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(() => reduced ? text : text.replace(/[^ ]/g, "·"));

  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0;
    let interval: number | undefined;
    const timer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        frame += 1;
        setDisplay(text.split("").map((character, index) => {
          if (character === " ") return " ";
          if (index < frame) return character;
          return scrambleGlyphs[(index + frame) % scrambleGlyphs.length];
        }).join(""));
        if (frame >= text.length + 4) window.clearInterval(interval);
      }, 42);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      if (interval) window.clearInterval(interval);
    };
  }, [delay, inView, reduced, text]);

  return <span ref={ref} className={cn("scramble-text", className)} aria-label={text}>{display}</span>;
}

export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 34%"] });
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.25, 1, 0.55]);
  const y = useTransform(scrollYProgress, [0, 1], [26, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.96, 1, 0.98]);
  const reduced = useReducedMotion();
  return <motion.span ref={ref} className={cn("scroll-text", className)} style={reduced ? undefined : { opacity, y, scale }}>{text}</motion.span>;
}

export function ScrollParallax({ children, distance = 36, className }: { children: React.ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const reduced = useReducedMotion();
  return <motion.div ref={ref} style={reduced ? undefined : { y }} className={className}>{children}</motion.div>;
}

type ScrollMotionVariant = "lift" | "slide" | "zoom" | "tilt" | "blur" | "clip" | "skew" | "depth";

export function ScrollMotion({
  children,
  variant = "lift",
  className,
  distance = 42,
  offset = ["start end", "end start"]
}: {
  children: React.ReactNode;
  variant?: ScrollMotionVariant;
  className?: string;
  distance?: number;
  offset?: UseScrollOptions["offset"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const rawVelocity = useVelocity(scrollYProgress);
  const scrollVelocity = useSpring(rawVelocity, { stiffness: 110, damping: 24, mass: 0.45 });
  const reduced = useReducedMotion();

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [distance, 0, -distance]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-distance, 0, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.2, 1, 1, 0.52]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.88, 1, 0.96]);
  const depthScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.98]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -6]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 2]);
  const velocitySkew = useTransform(scrollVelocity, [-0.12, 0, 0.12], [-3, 0, 3]);
  const blur = useTransform(scrollYProgress, [0, 0.45, 1], ["6px", "0px", "3px"]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.25, 0.74, 1],
    ["inset(16% 0 16% 0)", "inset(0% 0 0% 0)", "inset(0% 0 0% 0)", "inset(8% 0 8% 0)"]
  );

  const style = reduced ? undefined : variant === "slide"
    ? { opacity, x }
    : variant === "zoom"
      ? { opacity, scale }
      : variant === "tilt"
        ? { opacity, y, rotateX, rotateZ, transformPerspective: 1000 }
        : variant === "blur"
          ? { opacity, y, filter: blur }
          : variant === "clip"
            ? { opacity, y, clipPath }
            : variant === "skew"
              ? { opacity, y, skewX: velocitySkew }
              : variant === "depth"
                ? { opacity, y, scale: depthScale, rotateZ }
                : { opacity, y, scale };

  return <motion.div ref={ref} className={cn("scroll-motion", className)} style={style}>{children}</motion.div>;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function HorizontalScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-64%"]);
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const reduced = useReducedMotion();
  const simplified = useMediaQuery("(max-width: 800px), (pointer: coarse)");

  return (
    <div ref={ref} className={cn("horizontal-scroll-section", className)}>
      <div className="horizontal-scroll-sticky">
        <div className="horizontal-scroll-head">
          <span className="mono-label">Scroll / horizontal sequence</span>
          <span aria-hidden="true">↔</span>
        </div>
        <motion.div className="horizontal-scroll-track" style={reduced || simplified ? undefined : { x }}>
          {children}
        </motion.div>
        <div className="horizontal-scroll-progress" aria-hidden="true"><motion.span style={reduced || simplified ? undefined : { scaleX: progress }} /></div>
      </div>
    </div>
  );
}

type StoryStep = { number: string; title: string; text: string };

function PinnedStoryStep({ step, progress, index, total, disabled }: { step: StoryStep; progress: ReturnType<typeof useScroll>["scrollYProgress"]; index: number; total: number; disabled: boolean }) {
  const start = index / total;
  const end = (index + 1) / total;
  const localProgress = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(localProgress, [0, 0.16, 0.84, 1], [0.18, 1, 1, 0.18]);
  const y = useTransform(localProgress, [0, 0.5, 1], [24, 0, -24]);
  const scale = useTransform(localProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <motion.article className="sticky-story-step" style={disabled ? undefined : { opacity, y, scale }}>
      <span className="sticky-story-number">{step.number}</span>
      <h3><WaveText text={step.title} /></h3>
      <p><BlurText text={step.text} /></p>
    </motion.article>
  );
}

export function PinnedStory({
  kicker,
  title,
  description,
  visual,
  steps,
  className
}: {
  kicker: string;
  title: React.ReactNode;
  description: string;
  visual: React.ReactNode;
  steps: StoryStep[];
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.04]);
  const visualY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const reduced = useReducedMotion();
  const simplified = useMediaQuery("(max-width: 800px), (pointer: coarse)");
  const disabled = Boolean(reduced || simplified);

  return (
    <section ref={ref} className={cn("sticky-story", className)}>
      <div className="sticky-story-inner">
        <div className="sticky-story-visual">
          <motion.div className="sticky-story-visual-inner" style={disabled ? undefined : { scale: visualScale, y: visualY }}>
            {visual}
          </motion.div>
        </div>
        <div className="sticky-story-copy">
          <span className="section-kicker"><WaveText text={kicker} /></span>
          <TextReveal as="h2" className="section-title">{title}</TextReveal>
          <p className="body-copy"><BlurText text={description} /></p>
          <div className="sticky-story-steps">
            {steps.map((step, index) => <PinnedStoryStep key={step.number} step={step} progress={scrollYProgress} index={index} total={steps.length} disabled={disabled} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StackedCards({ items }: { items: { number: string; title: string; text: string }[] }) {
  return (
    <div className="stacked-cards">
      {items.map((item, index) => (
        <motion.article
          key={item.number}
          className="stacked-card"
          style={{ "--stack-index": index } as React.CSSProperties}
          initial={{ opacity: 0, y: 56, rotate: index % 2 ? 1.2 : -1.2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease, delay: index * 0.08 }}
        >
          <span className="stacked-card-number">{item.number}</span>
          <h3><WaveText text={item.title} /></h3>
          <p><BlurText text={item.text} /></p>
        </motion.article>
      ))}
    </div>
  );
}

export function TypewriterText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(() => reduced ? text : "");

  useEffect(() => {
    if (!inView || reduced) return;
    let index = 0;
    let interval: number | undefined;
    const timer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setDisplay(text.slice(0, index));
        if (index >= text.length) window.clearInterval(interval);
      }, 36);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      if (interval) window.clearInterval(interval);
    };
  }, [delay, inView, reduced, text]);

  return <span ref={ref} className={cn("typewriter-text", className)} aria-label={text}>{display}<i className="typewriter-caret" aria-hidden="true" /></span>;
}

export function GlitchText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return <span ref={ref} className={cn("glitch-text", inView && "glitch-text-active", className)} data-text={text}>{text}</span>;
}

export function InversionText({ text, className }: { text: string; className?: string }) {
  return <span className={cn("invert-hover", className)} data-cursor="INVERT">{text}</span>;
}

export function TimelineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 82%", "end 38%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.45 });
  return <motion.div ref={ref} className="timeline-progress" style={{ scaleY }} aria-hidden="true" />;
}

function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(() => reduced || value.includes("∞") ? value : "0");
  const motionValue = useMotionValue(0);
  const numeric = Number.parseFloat(value.replace("+", ""));
  useEffect(() => {
    if (!inView || value.includes("∞")) return;
    if (reduced) return;
    const controls = animate(motionValue, numeric, { duration: 1.15, ease: "easeOut" });
    const unsubscribe = motionValue.on("change", (latest) => {
      const decimals = value.includes(".") ? 1 : 0;
      setDisplay(`${latest.toFixed(decimals)}${value.includes("+") ? "+" : ""}`);
    });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [inView, motionValue, numeric, reduced, value]);
  return <span ref={ref}>{display}</span>;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  style
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y, filter: reduced ? "none" : "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.5 });
  const [mode, setMode] = useState("");

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const over = (event: Event) => {
      const target = event.target as HTMLElement;
      const cursor = target.closest<HTMLElement>("[data-cursor]");
      setMode(cursor?.dataset.cursor ?? "");
    };
    const out = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-cursor]")) setMode("");
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [x, y]);

  return (
    <>
      <motion.div className={cn("cursor-dot", mode && "cursor-dot-active")} style={{ left: x, top: y }} />
      <motion.div className={cn("cursor-ring", mode && "cursor-ring-active")} style={{ left: smoothX, top: smoothY }}>
        <AnimatePresence mode="wait">
          {mode ? (
            <motion.span
              key={mode}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              className="cursor-label"
            >
              {mode}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.45, ease }}
      className="mobile-menu"
    >
      <div className="mobile-menu-top">
        <span className="mono-label">Navigation</span>
        <button type="button" onClick={onClose} aria-label="Close menu" className="icon-button">
          <X size={20} />
        </button>
      </div>
      <nav aria-label="Mobile navigation">
        {navItems.map((item, index) => (
          <Link key={item.href} href={item.href} onClick={onClose} className="mobile-nav-link">
            <span className="mobile-nav-number">0{index + 1}</span>
            <span>{item.label}</span>
            <ArrowUpRight size={19} />
          </Link>
        ))}
      </nav>
      <p className="handwritten mobile-menu-note">still learning. still building.</p>
    </motion.div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="site-nav">
          <Link href="/" className="brand-mark" aria-label="Akash Dhanwate home">
            <span>AD</span>
            <strong>AKASH<span>.</span></strong>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="nav-talk">
            Let&apos;s talk <ArrowUpRight size={14} />
          </Link>
          <button type="button" onClick={() => setMenuOpen(true)} className="menu-trigger" aria-label="Open menu">
            <Menu size={22} />
            <span>Menu</span>
          </button>
        </div>
      </header>
      <AnimatePresence>{menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}</AnimatePresence>
    </>
  );
}

export function PageTransition() {
  return (
    <motion.div
      initial={{ scaleX: 1, opacity: 1 }}
      animate={{ scaleX: 0, opacity: 0 }}
      transition={{ delay: 0.12, duration: 0.48, ease }}
      className="page-transition"
      aria-hidden="true"
    />
  );
}

export function MagneticLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <Link href={href} className={cn("magnetic-link", variant === "ghost" && "magnetic-link-ghost")} data-cursor="">
      <span>{children}</span>
      <ArrowUpRight size={17} />
    </Link>
  );
}

export function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ["start end", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.03]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!query.matches) return;
    const onMove = (event: MouseEvent) => {
      if (!visualRef.current) return;
      const rect = visualRef.current.getBoundingClientRect();
      setOffset({
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 10,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 10
      });
    };
    const node = visualRef.current;
    node?.addEventListener("mousemove", onMove);
    return () => node?.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div ref={visualRef} className="hero-visual" data-cursor="EXPLORE" initial={{ opacity: 0, clipPath: "inset(12% 0 12% 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease }}>
      <motion.div style={reduced ? { x: offset.x } : { x: offset.x, y: scrollY, scale: scrollScale }} animate={{ x: offset.x }} transition={{ type: "spring", stiffness: 90, damping: 18 }} className="hero-image-wrap">
        <Image src="/assets/akash-hero.png" alt="Abstract computational artwork representing AI, software, and data" fill priority sizes="(max-width: 767px) 100vw, 58vw" className="hero-image" />
      </motion.div>
      <div className="hero-visual-grid" aria-hidden="true" />
      <div className="visual-caption visual-caption-top"><span className="status-dot" /> Signal / 001</div>
      <div className="visual-caption visual-caption-bottom">creative system <span>↗</span></div>
      <div className="hero-visual-cross" aria-hidden="true" />
    </motion.div>
  );
}

export function StatCounter() {
  return (
    <div className="stat-grid">
      {stats.map((stat, index) => (
        <Reveal key={stat.label} delay={index * 0.06} className="stat-item">
          <span className="stat-value"><AnimatedStatValue value={stat.value} /></span>
          <WaveText text={stat.label} className="stat-label" />
        </Reveal>
      ))}
    </div>
  );
}

export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...["AI", "CODE", "DATA", "BUILDING", "AI", "CODE", "DATA", "BUILDING"]];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-1.2, 0, 1.2]);
  const reduced = useReducedMotion();
  return (
    <motion.div ref={ref} style={reduced ? undefined : { rotate }} className={cn("marquee", reverse && "marquee-reverse")} aria-label="AI code data building">
      <motion.div style={reduced ? undefined : { x }} className="marquee-scroll-shift">
        <div className="marquee-track">
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <b>✳</b>
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectGlyph({ type }: { type: Project["visual"] }) {
  if (type === "metrics") {
    return <div className="glyph-metrics"><i /><i /><i /><i /><i /><span>+84%</span></div>;
  }
  if (type === "agent") {
    return <div className="glyph-agent"><span className="agent-core">AI</span><i /><i /><i /><i /></div>;
  }
  if (type === "vision") {
    return <div className="glyph-vision"><span className="vision-frame" /><i /><i /><i /></div>;
  }
  if (type === "water") {
    return <div className="glyph-water"><span /><span /><span /><i>H₂O</i></div>;
  }
  return <div className="glyph-prediction"><span /><span /><span /><span /><i /></div>;
}

export function ProjectArt({ project }: { project: Project }) {
  return (
    <div className={cn("project-art", `project-art-${project.visual}`)} aria-hidden="true">
      <div className="project-art-noise" />
      <div className="project-art-line project-art-line-a" />
      <div className="project-art-line project-art-line-b" />
      <ProjectGlyph type={project.visual} />
      <span className="project-art-label">0{project.number} / SYSTEM</span>
    </div>
  );
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 42, clipPath: "inset(0 0 10% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-70px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease }}
      className={cn("project-card", featured && "project-card-featured")}
      data-cursor="VIEW"
    >
      <Link href={project.href ?? `/work#${project.slug}`} className="project-card-link">
        <ProjectArt project={project} />
        <div className="project-card-content">
          <div className="project-card-meta">
            <span>{project.number}</span>
            <span><ScrambleText text={project.category} delay={0.15} /></span>
          </div>
          <div className="project-card-title-row">
            <h3><BlurText text={project.title} /></h3>
            <ArrowUpRight className="project-arrow" size={24} />
          </div>
          <p><ScrollText text={project.description} /></p>
          <div className="tech-list">
            {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <span className="project-view">View project <ArrowRight size={15} /></span>
        </div>
      </Link>
    </motion.article>
  );
}

export function SystemVisual() {
  return (
    <motion.div className="system-visual" data-cursor="EXPLORE" initial={{ opacity: 0, scale: 0.96, clipPath: "inset(8% 8% 8% 8%)" }} whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true, margin: "-90px" }} transition={{ duration: 1, ease }}>
      <Image src="/assets/akash-system.png" alt="Abstract visual of data transforming through an intelligent system" fill loading="lazy" sizes="(max-width: 900px) 100vw, 50vw" className="system-image" />
      <div className="system-overlay" aria-hidden="true" />
      <div className="system-label system-label-top">input / output</div>
      <div className="system-label system-label-bottom">signal becomes system <span>↗</span></div>
    </motion.div>
  );
}

export function Timeline() {
  return (
    <div className="timeline">
      <div className="timeline-line" aria-hidden="true"><span /></div>
      {/* Timeline content is supplied by each page to keep the data layer editable. */}
    </div>
  );
}

export function SkillCloud({ groups }: { groups: { title: string; index: string; skills: string[] }[] }) {
  const [active, setActive] = useState(groups[0]?.title);
  const activeGroup = groups.find((group) => group.title === active) ?? groups[0];
  return (
    <div className="skill-cloud">
      <div className="skill-tabs" role="tablist" aria-label="Skill groups">
        {groups.map((group) => (
          <button key={group.title} type="button" role="tab" aria-selected={active === group.title} onClick={() => setActive(group.title)} className={cn("skill-tab", active === group.title && "skill-tab-active")}>
            <span>{group.index}</span>{group.title}<ArrowUpRight size={15} />
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeGroup.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }} className="skill-bubbles">
          {activeGroup.skills.map((skill, index) => <span key={skill} style={{ "--i": index } as React.CSSProperties}>{skill}</span>)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
      <label>Name<input name="name" required placeholder="Your name" /></label>
      <label>Email<input type="email" name="email" required placeholder="you@company.com" /></label>
      <label>Subject<input name="subject" required placeholder="Let’s build something" /></label>
      <label>Message<textarea name="message" required rows={5} placeholder="Tell me a little about the idea..." /></label>
      <button type="submit" className="submit-button">
        {sent ? <><Check size={17} /> Message queued</> : <>Send message <ArrowUpRight size={17} /> </>}
      </button>
      {sent ? <p className="form-success">Thanks — this frontend-only form is ready to connect to an email API or backend route.</p> : null}
    </form>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" className="brand-mark"><span>AD</span><strong>AKASH<span>.</span></strong></Link>
        <p>Still learning. Still building.</p>
        <a href="#top" className="back-to-top">Back to top <ArrowUp size={15} /></a>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {portfolio.name}</span><span>AI × CODE × DATA × BUILDING</span></div>
    </footer>
  );
}
