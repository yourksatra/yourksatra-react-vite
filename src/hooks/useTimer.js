import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useTimer — countdown hook for Timed Challenge
 * @param {number} initialSeconds  Total seconds for the countdown
 * @param {function} onExpire      Callback fired when time reaches 0
 */
export default function useTimer(initialSeconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const expireCbRef = useRef(onExpire);
  expireCbRef.current = onExpire;

  const stop = useCallback(() => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(initialSeconds);
  }, [initialSeconds, stop]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          expireCbRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const percentage = (timeLeft / initialSeconds) * 100;

  const formatted = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(
    timeLeft % 60
  ).padStart(2, "0")}`;

  return { timeLeft, formatted, percentage, isRunning, start, stop, reset };
}
