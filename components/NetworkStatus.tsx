"use client";

import { useState, useEffect, useMemo } from "react";

type NetworkStatusProps = {
  lastUpdatedDate: string; // ISO date string
};

export default function NetworkStatus({ lastUpdatedDate }: NetworkStatusProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const { bars } = useMemo(() => {
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

    return { bars };
  }, [lastUpdatedDate]);

  const svgName = bars === 4 ? 'full' : bars.toString();
  const src = `/networkstatus_${svgName}${isDark ? '_dark' : ''}.svg`;

  return (
    <img
      src={src}
      alt={`Signal strength: ${bars} bars`}
      title={`Connection Strength: ${new Date(lastUpdatedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}`}
      className="w-4 h-4"
    />
  );
}