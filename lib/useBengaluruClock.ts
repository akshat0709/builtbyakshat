"use client";

import { useEffect, useState } from "react";

export interface ClockParts {
  hh: string;
  mm: string;
  ss: string;
  period: string;
}

const fmt = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

function read(formatter: Intl.DateTimeFormat): ClockParts {
  const parts = formatter.formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  return { hh: get("hour"), mm: get("minute"), ss: get("second"), period: get("dayPeriod").toLowerCase() };
}

/**
 * Live Asia/Kolkata clock. Returns null until mounted so server and client
 * markup match. Ticks on the second boundary rather than drifting with setInterval.
 */
export function useBengaluruClock(): ClockParts | null {
  const [time, setTime] = useState<ClockParts | null>(null);

  useEffect(() => {
    const formatter = fmt();
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setTime(read(formatter));
      timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return time;
}
