"use client";

import { useEffect, useState } from "react";

const fmt = (d: Date) => d.toLocaleTimeString("en-GB", { hour12: false });

export function Clock() {
  // Empty on the server so the static export doesn't bake in a build-time clock
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    setNow(fmt(new Date()));
    const id = setInterval(() => setNow(fmt(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-sm leading-none tabular-nums">{now ?? " "}</span>;
}
