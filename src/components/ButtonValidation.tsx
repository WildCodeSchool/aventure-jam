"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

type Props = {
  to: string;
  label: string;
  duration?: number;
  className: string;
};

const ButtonToValidate = ({ to, label, duration = 1000, className }: Props) => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProgress(0);
  };

  const handleStart = () => {
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const toFlowOut = Date.now() - (startTimeRef.current || 0);
      setProgress(Math.min(toFlowOut / duration, 1));
    }, 16);

    timeoutRef.current = setTimeout(() => {
      clearTimers();
      router.push(to);
    }, duration);
  };

  const handleEnd = () => {
    clearTimers();
  };

  return (
    <button
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      className={className}
      data-progress={progress}
    >
      {label}
    </button>
  );
};

export default ButtonToValidate;
