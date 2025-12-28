"use client";

import { useMemo } from "react";

type NetworkStatusProps = {
  lastUpdatedDate: string; // ISO date string
};

export default function NetworkStatus({ lastUpdatedDate }: NetworkStatusProps) {
  const { bars, tooltipText } = useMemo(() => {
    const now = new Date();
    const lastUpdate = new Date(lastUpdatedDate);
    const daysSince = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));

    let bars: number;
    if (daysSince <= 7) {
      bars = 4;
    } else if (daysSince <= 14) {
      bars = 3;
    } else if (daysSince <= 21) {
      bars = 2;
    } else if (daysSince <= 30) {
      bars = 1;
    } else {
      bars = 1; // Still show 1 bar even if older
    }

    const formattedDate = lastUpdate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return {
      bars,
      tooltipText: `Connection Strength: ${formattedDate}`
    };
  }, [lastUpdatedDate]);

  return (
    <div
      className="flex items-end gap-0.5"
      title={tooltipText}
    >
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-1 bg-current transition-colors ${
            bar <= bars
              ? 'text-green-500 dark:text-green-400'
              : 'text-zinc-300 dark:text-zinc-600'
          }`}
          style={{
            height: `${bar * 2}px`, // Stair step: 2px, 4px, 6px, 8px
          }}
        />
      ))}
    </div>
  );
}