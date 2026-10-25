
"use client";

import { useEffect, useState } from "react";
import styles from "./PortfolioLoader.module.css";

export default function PortfolioLoader() {
  const [phase, setPhase] = useState<
    "show" | "exit" | "done"
  >("show");

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 1500);

    const removeTimer = setTimeout(() => {
      setPhase("done");
    }, 2000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.loader} ${
        phase === "exit" ? styles.exit : ""
      }`}
      role="status"
      aria-label="Opening portfolio"
    >
      <h1 className={styles.name}>
        AKASH <span>!</span>
      </h1>

      <div className={styles.progress}>
        <div className={styles.progressBar} />
      </div>

      <p className={styles.subtitle}>
        CREATIVE DEVELOPER
      </p>
    </div>
  );
}
