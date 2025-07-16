"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from "./ButtonValidation.module.css";

type Props = {
  link: string;
  label: string;
};

const ButtonToValidate = ({ link, label }: Props) => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 1000;

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setProgress(0);
  };

  const handleStart = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - (startTimeRef.current || 0);
      setProgress(Math.min(elapsed / duration, 1));
    }, 16);

    timeoutRef.current = window.setTimeout(() => {
      clearTimers();
      router.push(link);
    }, duration);
  };

  const handleEnd = () => {
    clearTimers();
  };
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return (
    <button
      className={styles.choiceButton}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      data-progress={progress}
    >
      {label}
    </button>
  );
};

export default ButtonToValidate;
