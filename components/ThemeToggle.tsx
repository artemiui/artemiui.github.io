"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer transition-opacity hover:opacity-80"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <img
          src="/darkmode.svg"
          alt="Dark mode"
          className="w-24 h-30 object-contain"
        />
      ) : (
        <img
          src="/lightmode.svg"
          alt="Light mode"
          className="w-24 h-30 object-contain"
        />
      )}
    </button>
  );
}