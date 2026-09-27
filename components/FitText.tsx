"use client";

import { useLayoutEffect, useRef } from "react";

// Scales a single line of text so it spans the full width of its container
export function FitText({ text, className }: { text: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = box.current;
    const span = line.current;
    if (!el || !span) return;

    const fit = () => {
      span.style.fontSize = "100px";
      const w = span.getBoundingClientRect().width;
      if (w > 0) span.style.fontSize = `${(100 * el.clientWidth) / w}px`;
    };

    fit();
    // Re-measure once the display font replaces the fallback
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={box} className={className}>
      <span ref={line} className="inline-block whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}
