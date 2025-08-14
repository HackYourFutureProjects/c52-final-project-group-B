import { useEffect, useState } from "react";

/**
 * Lightweight number jitter hook.
 * - keeps the value within [min; max]
 * - every `interval` ms adds/subtracts a random delta "step"
 * - optionally persists the value in localStorage (persistKey)
 */
export default function useJitterNumber({
  start, // base number
  min, // lower bound
  max, // upper bound
  interval = 2000, // how often to update (ms)
  jitter = 20, // max absolute step per tick
  persistKey, // string key for localStorage (optional)
}) {
  const safeClamp = (n) => Math.min(max, Math.max(min, n));

  const [value, setValue] = useState(() => {
    if (persistKey && typeof window !== "undefined") {
      const saved = window.localStorage.getItem(persistKey);
      if (saved) return safeClamp(Number(saved));
    }
    // Slightly jitter the start value on first render
    const initial = start + Math.round((Math.random() - 0.5) * jitter * 2);
    return safeClamp(initial);
  });

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const delta = Math.round((Math.random() - 0.35) * jitter * 2); // slightly biased towards increase
        const next = safeClamp(v + delta);
        if (persistKey) localStorage.setItem(persistKey, String(next));
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [interval, jitter, persistKey]); // min/max/start do not change at runtime

  return value;
}
